import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Política de privacidade — VIESTE CONCETTO",
  description: "Como a Vieste Concetto coleta, usa e protege os dados pessoais de clientes, em conformidade com a LGPD.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <InfoPage eyebrow="Ajuda" title="Política de privacidade">
      <p>Esta política explica como a Vieste Concetto coleta, usa, armazena e protege os dados pessoais de quem visita este site ou realiza uma compra, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Última atualização: agosto de 2026.</p>

      <h2>Quais dados coletamos</h2>
      <p>Dados de identificação e contato (nome, e-mail, telefone, CPF), dados de endereço para entrega, dados de navegação (páginas visitadas, itens favoritados e no carrinho) e dados de pagamento, processados diretamente pelo nosso parceiro de pagamentos.</p>

      <h2>Como usamos os dados</h2>
      <p>Para processar e entregar pedidos, para comunicar sobre o status da compra, para prevenção a fraudes, para atendimento ao cliente e, quando autorizado, para enviar novidades e ofertas por e-mail.</p>

      <h2>Pagamentos</h2>
      <p>Os dados de pagamento (cartão, Pix ou boleto) são processados diretamente pela PagBank, nossa instituição de pagamentos parceira. Não armazenamos números completos de cartão em nossos servidores.</p>

      <h2>Compartilhamento de dados</h2>
      <p>Compartilhamos dados apenas com prestadores de serviço necessários à operação da loja — processamento de pagamento (PagBank), transportadoras e Correios para entrega, e ferramentas de e-mail e análise de site — sempre limitado ao necessário para a prestação do serviço.</p>

      <h2>Cookies</h2>
      <p>Utilizamos cookies essenciais para o funcionamento do carrinho, dos favoritos e da sessão de compra, armazenados localmente no seu navegador.</p>

      <h2>Seus direitos</h2>
      <p>Você pode solicitar a qualquer momento a confirmação de tratamento, o acesso, a correção, a exclusão ou a portabilidade dos seus dados, bem como revogar consentimentos, entrando em contato pelo e-mail <a href="mailto:privacidade@viesteconcetto.com.br">privacidade@viesteconcetto.com.br</a>.</p>

      <h2>Retenção de dados</h2>
      <p>Mantemos os dados de pedidos pelo prazo exigido pela legislação fiscal e consumerista brasileira. Dados de navegação e marketing são mantidos apenas enquanto forem necessários para as finalidades descritas nesta política.</p>

      <h2>Alterações nesta política</h2>
      <p>Podemos atualizar esta política periodicamente. A data da última atualização está sempre indicada no início desta página.</p>
    </InfoPage>
  );
}
