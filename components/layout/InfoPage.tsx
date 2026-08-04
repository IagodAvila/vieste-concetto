import Link from "next/link";
import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function InfoPage({ children, eyebrow, title }: { children: ReactNode; eyebrow: string; title: string }) {
  return (
    <main>
      <AnnouncementBar />
      <Header />
      <section className="mx-auto max-w-3xl px-4 py-10 md:px-10 md:py-16">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Navegação estrutural"><Link className="transition-colors hover:text-clay" href="/">Início</Link><span aria-hidden>›</span><span className="text-graphite">{title}</span></nav>
        <p className="eyebrow mt-8 text-clay">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-6xl md:text-7xl">{title}</h1>
        <div className="mt-8 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-graphite [&_h2]:mt-10 [&_h2]:mb-3 [&_li]:list-disc [&_li]:ml-5 [&_strong]:text-graphite [&_strong]:font-medium [&_a]:text-clay [&_a]:underline [&_a]:underline-offset-2">{children}</div>
      </section>
      <Footer />
    </main>
  );
}
