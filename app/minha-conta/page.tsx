import type { Metadata } from "next";
import Image from "next/image";
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
    <main className="bg-peach-soft">
      <AnnouncementBar />
      <Header />
      <section className="relative overflow-hidden px-4 py-10 md:px-10 md:py-16" aria-labelledby="account-title">
        <Image src="/assets/monogram-vieste.svg" alt="" aria-hidden width={568} height={620} className="pointer-events-none absolute -top-24 -left-24 h-[34rem] w-auto opacity-[.035]" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Navegação estrutural"><Link className="transition-colors hover:text-clay" href="/">Início</Link><span aria-hidden>›</span><span className="text-graphite">Minha conta</span></nav>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
            <div className="py-4 lg:sticky lg:top-32 lg:py-10">
              <p className="eyebrow text-clay">Área do cliente</p>
              <h1 className="mt-4 font-serif text-8xl leading-[.82] text-clay md:text-9xl" id="account-title">Minha conta</h1>
              <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">Um espaço simples para acompanhar suas compras e deixar sua próxima experiência ainda mais fluida.</p>
              <ul className="mt-10 grid gap-4 border-t border-clay/20 pt-7 text-sm text-graphite">{accountBenefits.map((benefit, index) => <li className="flex items-center gap-4" key={benefit}><span className="font-serif text-3xl text-clay" aria-hidden>0{index + 1}</span><span>{benefit}</span></li>)}</ul>
            </div>
            <AccountAccess />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
