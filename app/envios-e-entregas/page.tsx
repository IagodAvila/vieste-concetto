import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Envios e entregas — VIESTE CONCETTO",
  description: "Prazos, custos de frete e rastreio dos pedidos da Vieste Concetto para todo o Brasil.",
};

export default function EnviosEEntregasPage() {
  return (
    <InfoPage eyebrow="Ajuda" title="Envios e entregas">
      <h2>Para onde entregamos</h2>
      <p>Enviamos para todo o território brasileiro através dos Correios e transportadoras parceiras.</p>

      <h2>Frete grátis</h2>
      <p>Pedidos acima de R$ 499,00 têm frete grátis para todo o Brasil. Abaixo desse valor, o custo do frete é calculado no checkout de acordo com o CEP de entrega.</p>

      <h2>Prazo de produção e envio</h2>
      <p>Pedidos são despachados em até 2 dias úteis após a confirmação do pagamento. O prazo de entrega varia conforme a região, e é informado no checkout antes da finalização da compra.</p>

      <h2>Rastreio</h2>
      <p>Assim que o pedido é postado, enviamos o código de rastreio por e-mail. Você também pode acompanhar o status do pedido em <a href="/minha-conta">Minha conta</a>.</p>

      <h2>Pedido não chegou ou chegou danificado?</h2>
      <p>Fale com a gente em <a href="/contato">Fale com a gente</a> informando o número do pedido — resolvemos o mais rápido possível.</p>
    </InfoPage>
  );
}
