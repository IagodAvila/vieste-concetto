"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import type { OrderSummary } from "@/lib/orders";

const terminalStatuses = new Set(["PAID", "DECLINED", "CANCELED", "EXPIRED"]);

const statusContent: Record<string, { eyebrow: string; title: string; description: string; color: string }> = {
  DRAFT: { eyebrow: "Preparando pagamento", title: "Seu pedido foi criado", description: "Estamos preparando o ambiente seguro para o pagamento.", color: "text-clay" },
  CHECKOUT_CREATED: { eyebrow: "Pagamento pendente", title: "Finalize seu pagamento", description: "O pedido está reservado e aguarda a conclusão no PagBank.", color: "text-clay" },
  WAITING_PAYMENT: { eyebrow: "Aguardando pagamento", title: "Estamos acompanhando", description: "Assim que o PagBank confirmar o pagamento, esta página será atualizada automaticamente.", color: "text-clay" },
  IN_ANALYSIS: { eyebrow: "Em análise", title: "Pagamento em análise", description: "O PagBank está analisando a transação. Você não precisa refazer o pagamento.", color: "text-clay" },
  PAID: { eyebrow: "Pagamento confirmado", title: "Pedido realizado com sucesso", description: "Recebemos a confirmação e seu pedido seguirá para preparação.", color: "text-forest" },
  DECLINED: { eyebrow: "Pagamento recusado", title: "Não foi possível aprovar", description: "Você pode retornar ao pagamento e escolher outra forma para concluir a compra.", color: "text-clay" },
  CANCELED: { eyebrow: "Pagamento cancelado", title: "O pagamento foi cancelado", description: "Se desejar, retorne à loja para iniciar uma nova compra.", color: "text-clay" },
  EXPIRED: { eyebrow: "Checkout expirado", title: "O prazo de pagamento terminou", description: "Retorne à loja para gerar um novo pedido.", color: "text-clay" },
  PAYMENT_UPDATE: { eyebrow: "Atualizando pedido", title: "Recebemos uma atualização", description: "Estamos confirmando as novas informações do pagamento.", color: "text-clay" },
};

export function OrderStatus({ initialOrder }: { initialOrder: OrderSummary }) {
  const [order, setOrder] = useState(initialOrder);
  const cartCleared = useRef(false);
  const { clearCart } = useShop();
  const content = statusContent[order.status] ?? statusContent.PAYMENT_UPDATE;

  useEffect(() => {
    if (order.status === "PAID" && !cartCleared.current) {
      cartCleared.current = true;
      clearCart();
    }
    if (terminalStatuses.has(order.status)) return;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/orders/${order.id}`, { cache: "no-store" });
        if (response.ok) setOrder(await response.json() as OrderSummary);
      } catch {
        // A próxima consulta automática tentará novamente.
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [clearCart, order.id, order.status]);

  return (
    <section className="px-4 py-12 md:px-10 md:py-20" aria-labelledby="order-status-title">
      <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="border border-border bg-background p-7 shadow-[0_20px_55px_rgba(64,64,64,.07)] md:p-12">
          <p className={`eyebrow ${content.color}`}>{content.eyebrow}</p>
          <h1 className="mt-4 max-w-2xl font-serif text-7xl leading-[.9] md:text-8xl" id="order-status-title">{content.title}</h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{content.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {order.paymentUrl && ["CHECKOUT_CREATED", "WAITING_PAYMENT", "DECLINED"].includes(order.status) && <a className="button-primary eyebrow px-8 py-4" href={order.paymentUrl}>Ir para o pagamento</a>}
            <Link className="button-secondary eyebrow px-8 py-4" href="/">Voltar à loja</Link>
          </div>
          {!terminalStatuses.has(order.status) && <p className="mt-7 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-2 w-2 animate-pulse rounded-full bg-clay" />Status atualizado automaticamente</p>}
        </div>

        <aside className="border border-border bg-background p-6" aria-label="Dados do pedido">
          <p className="eyebrow text-clay">Pedido</p>
          <p className="mt-3 break-all text-xs text-muted-foreground">{order.referenceId}</p>
          <p className="mt-5 text-sm">Olá, {order.customerName.split(" ")[0]}.</p>
          <p className="mt-1 text-xs text-muted-foreground">Entrega em {order.city} · {order.state}</p>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {order.items.map((item) => <div className="py-4" key={item.id}><p className="text-sm font-medium">{item.productName}</p><p className="mt-1 text-xs text-muted-foreground">Tam. {item.size} · Qtd. {item.quantity}</p><p className="mt-2 text-sm">{formatCurrency(item.totalAmount)}</p></div>)}
          </div>
          <div className="mt-5 flex items-center justify-between font-medium"><span>Total</span><span>{formatCurrency(order.totalAmount)}</span></div>
        </aside>
      </div>
    </section>
  );
}

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valueInCents / 100);
}
