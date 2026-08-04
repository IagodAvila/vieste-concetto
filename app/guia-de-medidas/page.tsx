import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Guia de medidas — VIESTE CONCETTO",
  description: "Como medir seu corpo e escolher o tamanho certo nas peças da Vieste Concetto.",
};

export default function GuiaDeMedidasPage() {
  return (
    <InfoPage eyebrow="Ajuda" title="Guia de medidas">
      <p>Nossas peças seguem modelagem brasileira em quatro tamanhos — PP, P, M e G. As medidas de cada produto estão descritas na página do produto; use este guia para comparar com o seu corpo.</p>

      <h2>Como se medir</h2>
      <p><strong>Busto:</strong> passe a fita métrica pela parte mais volumosa do busto, mantendo-a paralela ao chão.</p>
      <p><strong>Cintura:</strong> meça na linha natural da cintura, geralmente a parte mais estreita do tronco.</p>
      <p><strong>Quadril:</strong> meça na parte mais larga do quadril, cerca de 20 cm abaixo da cintura.</p>
      <p><strong>Comprimento:</strong> meça da base do pescoço até onde deseja que a peça termine, para comparar com o comprimento informado.</p>

      <h2>Tabela de referência</h2>
      <p>PP — busto 78–84 cm · cintura 62–66 cm · quadril 88–92 cm</p>
      <p>P — busto 84–90 cm · cintura 68–72 cm · quadril 94–98 cm</p>
      <p>M — busto 90–96 cm · cintura 74–78 cm · quadril 100–104 cm</p>
      <p>G — busto 96–102 cm · cintura 80–84 cm · quadril 106–110 cm</p>
      <p>As medidas podem variar até 2 cm entre peças, por conta do processo artesanal de confecção.</p>

      <h2>Ainda com dúvida?</h2>
      <p>Fale com a gente em <a href="/contato">Fale com a gente</a> e ajudamos a escolher o tamanho ideal antes da compra.</p>
    </InfoPage>
  );
}
