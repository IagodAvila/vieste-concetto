type CheckoutPayload = Record<string, unknown>;

type PagBankCheckoutResponse = {
  id?: string;
  reference_id?: string;
  links?: Array<{ rel?: string; href?: string; method?: string }>;
  error_messages?: Array<{ code?: string; description?: string; parameter_name?: string }>;
};

export async function createPagBankCheckout(payload: CheckoutPayload) {
  const runtimeEnv = await getRuntimeEnv();
  const token = await getPagBankToken(runtimeEnv);
  const apiUrl = await getPagBankApiUrl(runtimeEnv);

  const response = await fetch(`${apiUrl}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json() as PagBankCheckoutResponse;
  if (!response.ok) {
    const description = result.error_messages
      ?.map((error) => (error.parameter_name ? `${error.parameter_name}: ${error.description}` : error.description))
      .filter(Boolean)
      .join("; ");
    throw new PagBankApiError(description || "O PagBank recusou a criação do checkout.", response.status);
  }

  const paymentUrl = result.links?.find((link) => link.rel === "PAY")?.href;
  if (!result.id || !paymentUrl) throw new PagBankApiError("O PagBank não devolveu um link de pagamento válido.", 502);
  return { checkoutId: result.id, paymentUrl };
}

export async function getPagBankToken(runtimeEnv?: Record<string, unknown>) {
  const environment = runtimeEnv ?? await getRuntimeEnv();
  const token = readString(environment.PAGBANK_TOKEN) ?? process.env.PAGBANK_TOKEN;
  if (!token) throw new PagBankConfigurationError("O token Sandbox do PagBank ainda não foi configurado.");
  return token;
}

async function getPagBankApiUrl(runtimeEnv?: Record<string, unknown>) {
  const environment = runtimeEnv ?? await getRuntimeEnv();
  const apiUrl = readString(environment.PAGBANK_API_URL) ?? process.env.PAGBANK_API_URL ?? "https://sandbox.api.pagseguro.com";
  return apiUrl.replace(/\/$/, "");
}

/**
 * Reforço ao webhook: consulta ativamente o status de pagamento de um checkout.
 * O webhook do PagBank nem sempre chega de forma confiável (sobretudo em sandbox),
 * então esta função é usada como fallback quando um pedido segue pendente.
 * Retorna o status bruto da charge (ex. "PAID", "DECLINED") ou null se ainda
 * não houver pedido/cobrança associada ou a consulta falhar.
 */
export async function fetchPagBankChargeStatus(checkoutId: string): Promise<string | null> {
  try {
    const runtimeEnv = await getRuntimeEnv();
    const token = await getPagBankToken(runtimeEnv);
    const apiUrl = await getPagBankApiUrl(runtimeEnv);
    const headers = { Authorization: `Bearer ${token}` };

    const checkoutResponse = await fetch(`${apiUrl}/checkouts/${checkoutId}`, { headers });
    if (!checkoutResponse.ok) return null;
    const checkout = await checkoutResponse.json() as { orders?: Array<{ id?: string }> };
    const orderId = checkout.orders?.[0]?.id;
    if (!orderId) return null;

    const orderResponse = await fetch(`${apiUrl}/orders/${orderId}`, { headers });
    if (!orderResponse.ok) return null;
    const order = await orderResponse.json() as { charges?: Array<{ status?: string }> };
    return order.charges?.[0]?.status ?? null;
  } catch (error) {
    console.error("Não foi possível consultar o status do pagamento no PagBank", error);
    return null;
  }
}

export function mapPagBankStatus(status: string) {
  const statuses: Record<string, string> = {
    PAID: "PAID",
    AUTHORIZED: "PAID",
    IN_ANALYSIS: "IN_ANALYSIS",
    DECLINED: "DECLINED",
    CANCELED: "CANCELED",
    WAITING: "WAITING_PAYMENT",
    EXPIRED: "EXPIRED",
    ACTIVE: "CHECKOUT_CREATED",
    INACTIVE: "CANCELED",
  };
  return statuses[status] ?? "PAYMENT_UPDATE";
}

async function getRuntimeEnv(): Promise<Record<string, unknown>> {
  try {
    const cloudflare = await import("cloudflare:workers");
    return cloudflare.env;
  } catch {
    return {};
  }
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export class PagBankConfigurationError extends Error {}

export class PagBankApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
