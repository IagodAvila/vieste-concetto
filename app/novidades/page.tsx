import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Novidades — VIESTE CONCETTO",
  description: "Todas as peças recém-chegadas da Vieste Concetto: vestidos, conjuntos e tricôs de modelagem precisa e caimento fluido.",
};

export default function NovidadesPage() {
  return (
    <main>
      <AnnouncementBar />
      <Header />
      <section className="mx-auto max-w-[1600px] px-4 py-10 md:px-10 md:py-16">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Navegação estrutural"><Link className="transition-colors hover:text-clay" href="/">Início</Link><span aria-hidden>›</span><span className="text-graphite">Novidades</span></nav>
        <div className="mt-6"><p className="eyebrow text-clay">Acabou de chegar</p><h1 className="mt-3 font-serif text-7xl md:text-8xl">Novidades</h1><p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{products.length} peças recém-chegadas, com modelagem precisa e matérias que acolhem o corpo.</p></div>
        <Suspense>
          <ProductCatalog />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
