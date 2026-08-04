import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Trocas e devoluções — VIESTE CONCETTO",
  description: "Política de trocas e devoluções da Vieste Concetto, incluindo o direito de arrependimento previsto no Código de Defesa do Consumidor.",
};

export default function TrocasEDevolucoesPage() {
  return (
    <InfoPage eyebrow="Ajuda" title="Trocas e devoluções">
      <h2>Direito de arrependimento (7 dias)</h2>
      <p>Como a compra é feita à distância, você tem até <strong>7 dias corridos</strong> após o recebimento do produto para desistir da compra, sem precisar justificar o motivo, conforme o art. 49 do Código de Defesa do Consumidor. Nesse caso, devolvemos o valor pago, incluindo o frete, em até 10 dias úteis após recebermos a peça de volta.</p>

      <h2>Primeira troca facilitada (30 dias)</h2>
      <p>Além do direito legal, oferecemos a primeira troca por outro tamanho ou peça sem custo de frete em até 30 dias corridos após o recebimento, desde que o produto esteja nas condições descritas abaixo.</p>

      <h2>Condições para troca ou devolução</h2>
      <p>A peça deve estar sem uso, sem lavagem, com etiquetas originais afixadas e na embalagem original, sem manchas, odores ou sinais de uso.</p>

      <h2>Como solicitar</h2>
      <p>Escreva para <a href="/contato">Fale com a gente</a> informando o número do pedido e o motivo da troca ou devolução. Enviaremos as instruções de postagem e o código de rastreio da coleta.</p>

      <h2>Reembolso</h2>
      <p>Pedidos pagos via Pix ou boleto são reembolsados por transferência bancária. Pedidos pagos no cartão de crédito são reembolsados na fatura, podendo levar até duas faturas para aparecer, conforme prazo da operadora do cartão.</p>

      <h2>Produtos com defeito</h2>
      <p>Se a peça apresentar defeito de fabricação, você tem até 90 dias para solicitar troca, reparo ou reembolso integral, sem custo, conforme o art. 26 do Código de Defesa do Consumidor.</p>
    </InfoPage>
  );
}
