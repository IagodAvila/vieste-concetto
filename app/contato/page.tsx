import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Fale com a gente — VIESTE CONCETTO",
  description: "Canais de atendimento da Vieste Concetto para dúvidas sobre pedidos, trocas e produtos.",
};

export default function ContatoPage() {
  return (
    <InfoPage eyebrow="Atendimento" title="Fale com a gente">
      <p>Estamos à disposição para ajudar com dúvidas sobre pedidos, produtos, trocas e devoluções. Escolha o canal mais conveniente para você.</p>

      <h2>E-mail</h2>
      <p>Para qualquer assunto, escreva para <a href="mailto:contato@viesteconcetto.com.br">contato@viesteconcetto.com.br</a>. Respondemos em até 2 dias úteis.</p>

      <h2>WhatsApp</h2>
      <p>Consultoria de estilo e suporte a pedidos, de segunda a sábado, das 9h às 18h.</p>

      <h2>Instagram</h2>
      <p>Acompanhe lançamentos e envie mensagem direta pelo <a href="https://www.instagram.com/viesteconcetto" target="_blank" rel="noreferrer">@viesteconcetto</a>.</p>

      <h2>Antes de escrever</h2>
      <p>Se a sua dúvida é sobre tamanhos, consulte o nosso <a href="/guia-de-medidas">guia de medidas</a>. Para trocas ou devoluções, veja o passo a passo em <a href="/trocas-e-devolucoes">Trocas e devoluções</a>.</p>
    </InfoPage>
  );
}
