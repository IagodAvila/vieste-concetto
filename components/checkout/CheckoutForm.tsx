"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import { products } from "@/data/products";

const inputClass = "mt-2 h-13 w-full border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/65 focus:border-clay";

export function CheckoutForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { cart } = useShop();
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    return product ? [{ ...line, product }] : [];
  });
  const subtotal = lines.reduce((total, line) => total + priceInCents(line.product.price) * line.quantity, 0);
  const freeShipping = subtotal >= 49900;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart.map(({ slug, size, quantity }) => ({ slug, size, quantity })),
          customer: { name: data.get("name"), email: data.get("email"), phone: data.get("phone"), document: data.get("document") },
          shippingAddress: { postalCode: data.get("postalCode"), address: data.get("address"), number: data.get("number"), complement: data.get("complement"), district: data.get("district"), city: data.get("city"), state: data.get("state") },
        }),
      });
      const result = await response.json() as { error?: string; referenceId?: string; paymentUrl?: string };
      if (!response.ok) throw new Error(result.error ?? "Não foi possível criar o pedido.");
      if (!result.paymentUrl) throw new Error("O link de pagamento não foi recebido.");
      setMessage(`Pedido ${result.referenceId} criado. Abrindo o ambiente seguro do PagBank...`);
      window.location.assign(result.paymentUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível criar o pedido.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!lines.length) {
    return (
      <section className="mx-auto flex min-h-[58vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="eyebrow text-clay">Sua sacola</p>
        <h1 className="mt-4 font-serif text-7xl leading-none">Ainda está vazia</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Escolha suas peças e volte aqui para informar os dados de entrega.</p>
        <Link className="button-primary eyebrow mt-8 px-9 py-4" href="/novidades">Ver novidades</Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 md:px-10 md:py-16" aria-labelledby="checkout-title">
      <div className="mx-auto max-w-[1280px]">
        <div className="border-b border-clay/20 pb-8">
          <p className="eyebrow text-clay">Finalizar compra</p>
          <h1 className="mt-3 font-serif text-7xl leading-none md:text-8xl" id="checkout-title">Checkout</h1>
          <p className="mt-4 text-sm text-muted-foreground">Revise o pedido e informe seus dados para seguir ao pagamento seguro.</p>
        </div>

        <form className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_25rem] lg:gap-12" onSubmit={submit}>
          <div className="space-y-6">
            <FormSection number="01" title="Contato">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field autoComplete="email" label="E-mail" name="email" placeholder="voce@email.com" type="email" />
                <Field autoComplete="tel" label="Telefone" name="phone" placeholder="(00) 00000-0000" type="tel" />
              </div>
            </FormSection>

            <FormSection number="02" title="Entrega">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field autoComplete="name" className="sm:col-span-2" label="Nome completo" name="name" type="text" />
                <Field inputMode="numeric" label="CPF" maxLength={11} name="document" placeholder="Somente números" type="text" />
                <Field autoComplete="postal-code" inputMode="numeric" label="CEP" maxLength={9} name="postalCode" placeholder="00000-000" type="text" />
                <Field autoComplete="address-line1" className="sm:col-span-2" label="Endereço" name="address" type="text" />
                <Field label="Número" name="number" type="text" />
                <Field label="Complemento" name="complement" required={false} type="text" />
                <Field label="Bairro" name="district" type="text" />
                <Field autoComplete="address-level2" label="Cidade" name="city" type="text" />
                <Field autoComplete="address-level1" label="Estado" maxLength={2} name="state" placeholder="UF" type="text" />
              </div>
            </FormSection>

            <FormSection number="03" title="Forma de entrega">
              <label className="flex cursor-pointer items-start justify-between gap-4 border border-clay bg-peach-soft p-5">
                <span className="flex items-start gap-3"><input defaultChecked className="mt-1 h-4 w-4 accent-clay" name="shipping" type="radio" value="standard" /><span><strong className="block text-sm font-medium">Entrega padrão</strong><small className="mt-1 block text-muted-foreground">O prazo será confirmado após a validação do CEP.</small></span></span>
                <strong className="text-sm text-clay">{freeShipping ? "Grátis" : "A calcular"}</strong>
              </label>
            </FormSection>
          </div>

          <aside className="border border-border bg-background p-5 shadow-[0_20px_55px_rgba(64,64,64,.07)] lg:sticky lg:top-28" aria-label="Resumo do pedido">
            <h2 className="eyebrow text-clay">Resumo do pedido</h2>
            <div className="mt-5 divide-y divide-border border-y border-border">
              {lines.map(({ product, quantity, size }) => (
                <div className="flex gap-4 py-4" key={`${product.slug}-${size}`}>
                  <div className="relative h-24 w-16 shrink-0 overflow-hidden bg-secondary"><Image src={product.image} alt="" fill sizes="64px" className="object-cover" /></div>
                  <div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">Tam. {size} · Qtd. {quantity}</p><p className="mt-3 text-sm">{formatCurrency(priceInCents(product.price) * quantity)}</p></div>
                </div>
              ))}
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Frete</dt><dd className={freeShipping ? "text-clay" : ""}>{freeShipping ? "Grátis" : "A calcular"}</dd></div>
              <div className="flex justify-between border-t border-border pt-4 text-base font-medium"><dt>Total</dt><dd>{formatCurrency(subtotal)}</dd></div>
            </dl>
            <button className="button-primary eyebrow mt-6 w-full px-6 py-4 disabled:cursor-wait disabled:opacity-60" disabled={submitting} type="submit">{submitting ? "Criando pedido..." : "Continuar para pagamento"}</button>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">O pagamento será processado no ambiente seguro do PagBank.</p>
            {message && <p className="mt-4 border-l-2 border-clay bg-peach-soft px-3 py-3 text-xs leading-relaxed text-clay" role="status">{message}</p>}
          </aside>
        </form>
      </div>
    </section>
  );
}

function FormSection({ children, number, title }: { children: React.ReactNode; number: string; title: string }) {
  return <fieldset className="border border-border bg-background p-5 md:p-7"><legend className="sr-only">{title}</legend><div className="mb-6 flex items-baseline gap-4"><span className="font-serif text-4xl text-clay" aria-hidden>{number}</span><h2 className="font-serif text-6xl leading-none">{title}</h2></div>{children}</fieldset>;
}

function Field({ autoComplete, className = "", inputMode, label, maxLength, name, placeholder, required = true, type }: { autoComplete?: string; className?: string; inputMode?: "numeric" | "tel"; label: string; maxLength?: number; name: string; placeholder?: string; required?: boolean; type: string }) {
  return <label className={`block text-xs font-medium tracking-wider uppercase ${className}`}>{label}<input className={inputClass} autoComplete={autoComplete} inputMode={inputMode} maxLength={maxLength} name={name} placeholder={placeholder} required={required} type={type} /></label>;
}

function priceInCents(price: string) {
  return Math.round(Number(price.replace("R$", "").trim().replaceAll(".", "").replace(",", ".")) * 100);
}

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valueInCents / 100);
}
