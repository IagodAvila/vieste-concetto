import type { Metadata } from "next";
import Link from "next/link";
import { AccountAccess } from "@/components/account/AccountAccess";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Minha conta — VIESTE CONCETTO",
  description: "Acesse ou crie sua conta Vieste Concetto para acompanhar pedidos, endereços e preferências.",
};

const accountBenefits = [
  "Acompanhe seus pedidos",
  "Salve seus endereços",
  "Finalize compras com mais agilidade",
];

export default function AccountPage() {
  return (
    <main>
      <AnnouncementBar />
      <Header />
      <section className="border-b border-border bg-peach-soft px-4 py-14 md:px-10 md:py-20" aria-labelledby="account-title">
        <div className="mx-auto max-w-[1200px]">
          <nav className="eyebrow flex items-center gap-2 text-muted-foreground" aria-label="Navegação estrutural"><Link className="transition-colors hover:text-clay" href="/">Início</Link><span aria-hidden>/</span><span className="text-graphite">Minha conta</span></nav>
          <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div><p className="eyebrow text-clay">Área do cliente</p><h1 className="mt-3 font-serif text-8xl text-clay md:text-9xl" id="account-title">Minha conta</h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">Entre para acompanhar sua experiência com a Vieste ou crie uma conta para começar.</p></div>
            <ul className="space-y-2 text-sm text-muted-foreground">{accountBenefits.map((benefit) => <li className="flex items-center gap-3" key={benefit}><span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />{benefit}</li>)}</ul>
          </div>
        </div>
      </section>
      <AccountAccess />
      <Footer />
    </main>
  );
}
