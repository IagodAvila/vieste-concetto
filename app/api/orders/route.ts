import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { products } from "@/data/products";
import { createPagBankCheckout, PagBankApiError, PagBankConfigurationError } from "@/lib/pagbank";

const MOTOBOY_SHIPPING_AMOUNT = 2000;

type OrderRequest = {
  cart?: Array<{ slug?: string; size?: string; quantity?: number }>;
  customer?: { name?: string; email?: string; phone?: string; document?: string };
  shippingAddress?: { postalCode?: string; address?: string; number?: string; complement?: string; district?: string; city?: string; state?: string; hasDoorman?: boolean };
  shippingMethod?: string;
};

export async function POST(request: Request) {
  let input: OrderRequest;
  try {
    input = await request.json() as OrderRequest;
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const validationError = validateInput(input);
  if (validationError) return Response.json({ error: validationError }, { status: 400 });

  const normalizedItems = input.cart!.map((line) => {
    const product = products.find((item) => item.slug === line.slug)!;
    const unitAmount = priceInCents(product.price);
    return {
      product,
      quantity: line.quantity!,
      size: line.size!,
      unitAmount,
      totalAmount: unitAmount * line.quantity!,
    };
  });
  const subtotalAmount = normalizedItems.reduce((total, item) => total + item.totalAmount, 0);
  const shippingMethod = input.shippingMethod === "motoboy" ? "motoboy" : "standard";
  if (shippingMethod === "standard" && subtotalAmount < 49900) return Response.json({ error: "O cálculo de frete para este pedido ainda não está disponível." }, { status: 422 });
  const shippingAmount = shippingMethod === "motoboy" ? MOTOBOY_SHIPPING_AMOUNT : 0;
  const totalAmount = subtotalAmount + shippingAmount;
  const id = crypto.randomUUID();
  const referenceId = `VIESTE-${Date.now()}-${id.slice(0, 8).toUpperCase()}`;

  try {
    const db = await getDb();
    await db.insert(orders).values({
      id,
      referenceId,
      customerName: input.customer!.name!.trim(),
      customerEmail: input.customer!.email!.trim().toLowerCase(),
      customerPhone: digits(input.customer!.phone!),
      customerDocument: digits(input.customer!.document!),
      postalCode: digits(input.shippingAddress!.postalCode!),
      address: input.shippingAddress!.address!.trim(),
      addressNumber: input.shippingAddress!.number!.trim(),
      addressComplement: input.shippingAddress!.complement?.trim() || null,
      district: input.shippingAddress!.district!.trim(),
      city: input.shippingAddress!.city!.trim(),
      state: input.shippingAddress!.state!.trim().toUpperCase(),
      hasDoorman: Boolean(input.shippingAddress!.hasDoorman),
      shippingMethod,
      shippingAmount,
      subtotalAmount,
      totalAmount,
    });
    await db.insert(orderItems).values(normalizedItems.map((item) => ({
      orderId: id,
      productSlug: item.product.slug,
      productName: item.product.name,
      size: item.size,
      quantity: item.quantity,
      unitAmount: item.unitAmount,
      totalAmount: item.totalAmount,
    })));

    const requestUrl = new URL(request.url);
    const siteUrl = `${requestUrl.protocol}//${requestUrl.host}`;
    const phone = digits(input.customer!.phone!);
    const checkout = await createPagBankCheckout({
      reference_id: referenceId,
      customer: {
        name: input.customer!.name!.trim(),
        email: input.customer!.email!.trim().toLowerCase(),
        tax_id: digits(input.customer!.document!),
        phone: { country: "+55", area: phone.slice(0, 2), number: phone.slice(2) },
      },
      customer_modifiable: false,
      items: normalizedItems.map((item) => ({
        reference_id: `${item.product.slug}-${item.size}`.slice(0, 64),
        name: `${item.product.name} - Tam. ${item.size}`.slice(0, 100),
        quantity: item.quantity,
        unit_amount: item.unitAmount,
      })),
      shipping: {
        type: shippingAmount > 0 ? "FIXED" : "FREE",
        amount: shippingAmount,
        address: {
          country: "BRA",
          region_code: input.shippingAddress!.state!.trim().toUpperCase(),
          city: input.shippingAddress!.city!.trim(),
          postal_code: digits(input.shippingAddress!.postalCode!),
          street: input.shippingAddress!.address!.trim(),
          number: input.shippingAddress!.number!.trim(),
          locality: input.shippingAddress!.district!.trim(),
          complement: appendDoormanNote(input.shippingAddress!.complement, input.shippingAddress!.hasDoorman),
        },
        address_modifiable: false,
      },
      payment_methods: [{ type: "CREDIT_CARD" }, { type: "PIX" }, { type: "BOLETO" }],
      payment_methods_configs: [{
        type: "CREDIT_CARD",
        config_options: [
          { option: "INSTALLMENTS_LIMIT", value: "6" },
          { option: "INTEREST_FREE_INSTALLMENTS", value: "6" },
        ],
      }],
      soft_descriptor: "VIESTE CONCETTO",
      redirect_url: `${siteUrl}/pedido/${id}`,
      return_url: `${siteUrl}/pedido/${id}`,
      redirect_waiting_time: 3,
      notification_urls: [`${siteUrl}/api/webhooks/pagbank`],
      payment_notification_urls: [`${siteUrl}/api/webhooks/pagbank`],
    });
    await db.update(orders).set({
      status: "CHECKOUT_CREATED",
      pagbankCheckoutId: checkout.checkoutId,
      paymentUrl: checkout.paymentUrl,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    }).where(eq(orders.id, id));

    return Response.json({ id, referenceId, status: "CHECKOUT_CREATED", totalAmount, paymentUrl: checkout.paymentUrl }, { status: 201 });
  } catch (error) {
    if (error instanceof PagBankConfigurationError) return Response.json({ error: error.message }, { status: 503 });
    if (error instanceof PagBankApiError) {
      console.error("O PagBank não criou o checkout", { status: error.status, message: error.message });
      return Response.json({ error: error.message }, { status: 502 });
    }
    console.error("Não foi possível criar o pedido", error);
    return Response.json({ error: "O serviço de pedidos está temporariamente indisponível." }, { status: 503 });
  }
}

function validateInput(input: OrderRequest) {
  if (!input.cart?.length) return "A sacola está vazia.";
  for (const line of input.cart) {
    const product = products.find((item) => item.slug === line.slug);
    if (!product || !line.size || !product.sizes.includes(line.size) || !Number.isInteger(line.quantity) || line.quantity! < 1 || line.quantity! > 20) return "Há um item inválido na sacola.";
  }
  const customer = input.customer;
  if (!customer?.name?.trim() || !customer.email?.includes("@") || digits(customer.phone ?? "").length < 10 || digits(customer.document ?? "").length !== 11) return "Confira os dados de contato e CPF.";
  const address = input.shippingAddress;
  if (!address?.address?.trim() || !address.number?.trim() || !address.district?.trim() || !address.city?.trim() || address.state?.trim().length !== 2 || digits(address.postalCode ?? "").length !== 8) return "Confira o endereço de entrega.";
  return null;
}

function appendDoormanNote(complement: string | undefined, hasDoorman: boolean | undefined) {
  const trimmed = complement?.trim();
  const note = hasDoorman ? "Com portaria/porteiro" : "Sem portaria/porteiro";
  return trimmed ? `${trimmed} — ${note}` : note;
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function priceInCents(price: string) {
  return Math.round(Number(price.replace("R$", "").trim().replaceAll(".", "").replace(",", ".")) * 100);
}
