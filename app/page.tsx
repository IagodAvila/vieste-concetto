import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Benefits } from "@/components/sections/Benefits";
import { Campaign } from "@/components/sections/Campaign";
import { Editorial } from "@/components/sections/Editorial";
import { Hero } from "@/components/sections/Hero";
import { Lines } from "@/components/sections/Lines";
import { Newsletter } from "@/components/sections/Newsletter";
import { NewArrivals } from "@/components/sections/NewArrivals";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Header />
      <Hero />
      <NewArrivals />
      <Lines />
      <Campaign
        id="movimento-01"
        eyebrow="Coleção"
        title="Movimento 01"
        description="Silhuetas contínuas, tecidos que respiram e uma paleta construída a partir da luz do litoral brasileiro."
        image1="/assets/campaign-1.jpg"
        image1Alt="Detalhe de tecido de linho terracota em luz natural"
        image2="/assets/campaign-2.jpg"
        image2Alt="Modelo sentada em banco de pedra usando calça ampla e tricot"
      />
      <Campaign
        id="movimento-02"
        eyebrow="Coleção"
        title="Movimento 02"
        description="Camadas leves e cores neutras para uma rotina que se move entre a praia e a cidade sem esforço."
        image1="/assets/hero-2.jpg"
        image1Alt="Modelo com vestido pêssego junto a parede branca"
        image2="/assets/product-4.jpg"
        image2Alt="Tricot leve combinado à saia longa"
      />
      <Campaign
        id="essenciais"
        eyebrow="Coleção"
        title="Essenciais"
        description="Peças atemporais, de modelagem limpa e caimento preciso — a base de um guarda-roupa que dura estações."
        image1="/assets/product-2.jpg"
        image1Alt="Conjunto de linho terracota em ambiente natural"
        image2="/assets/hero-1.jpg"
        image2Alt="Modelo em peça essencial de tricot"
      />
      <Benefits />
      <Editorial />
      <Newsletter />
      <Footer />
    </main>
  );
}
