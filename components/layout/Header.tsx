"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";

const navItems = ["Novidades", "Feminino", "UOMO"];
const collections = ["Movimento 01", "Movimento 02", "Essenciais", "UOMO 01"];

export function Header() {
  const [overlay, setOverlay] = useState<"menu" | "search" | "cart" | null>(null);

  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [overlay]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center gap-4 px-4 py-4 md:px-10">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => <a className="eyebrow link-underline" href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
            <div className="group relative">
              <button className="eyebrow link-underline cursor-pointer border-0 bg-transparent" type="button">Coleções</button>
              <div className="pointer-events-none absolute top-full left-0 w-56 translate-y-1 border border-border bg-background pt-4 pb-3 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                {collections.map((item) => <a className="block px-5 py-2 text-sm transition-colors hover:bg-secondary" href="#campanha" key={item}>{item}</a>)}
              </div>
            </div>
          </nav>
          <button onClick={() => setOverlay("menu")} className="flex h-11 w-11 items-center justify-center justify-self-start text-graphite lg:hidden" type="button" aria-label="Abrir menu"><MenuIcon className="h-5 w-5" /></button>

          <a className="justify-self-center" href="#top" aria-label="VIESTE CONCETTO — página inicial">
            <Image priority src="/assets/logo-vieste.png" alt="VIESTE CONCETTO" width={320} height={180} className="h-9 w-auto object-contain md:h-11" />
          </a>

          <div className="flex items-center justify-end gap-1 md:gap-2">
            <Action label="Buscar" onClick={() => setOverlay("search")}><SearchIcon className="h-[19px] w-[19px]" /></Action>
            <a className="hidden h-11 w-11 items-center justify-center transition-colors hover:text-clay sm:flex" href="#conta" aria-label="Minha conta"><UserIcon className="h-[19px] w-[19px]" /></a>
            <a className="hidden h-11 w-11 items-center justify-center transition-colors hover:text-clay sm:flex" href="#favoritos" aria-label="Favoritos (0)"><HeartIcon className="h-[19px] w-[19px]" /></a>
            <Action label="Abrir sacola (0 itens)" onClick={() => setOverlay("cart")}><BagIcon className="h-[19px] w-[19px]" /></Action>
          </div>
        </div>
      </header>

      <div onClick={() => setOverlay(null)} className={`fixed inset-0 z-50 bg-graphite/35 transition-opacity duration-500 ${overlay ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <aside className={`fixed inset-0 z-60 flex flex-col bg-peach-soft transition-[opacity,transform] duration-500 lg:hidden ${overlay === "menu" ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"}`} aria-hidden={overlay !== "menu"} aria-label="Menu">
        <div className="flex items-center justify-between px-4 py-4">
          <Image src="/assets/logo-vieste.png" alt="VIESTE CONCETTO" width={320} height={180} className="h-8 w-auto" />
          <CloseButton onClick={() => setOverlay(null)} label="Fechar menu" />
        </div>
        <nav className="flex-1 overflow-y-auto px-6 pt-6">
          {[...navItems, "Nossa história", "Contato"].map((item) => <a onClick={() => setOverlay(null)} className="block py-3 font-serif text-3xl" href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>)}
          <p className="eyebrow mt-10 text-clay">Coleções</p>
          <div className="mt-4 space-y-1 border-t border-clay/20 pt-4">{collections.map((item) => <a onClick={() => setOverlay(null)} className="block py-1.5 text-sm" href="#campanha" key={item}>{item}</a>)}</div>
        </nav>
      </aside>

      <aside className={`fixed top-0 right-0 z-60 flex h-dvh w-full max-w-[420px] flex-col bg-background transition-transform duration-500 ${overlay === "cart" ? "translate-x-0" : "pointer-events-none translate-x-full"}`} aria-hidden={overlay !== "cart"} aria-label="Sacola">
        <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="eyebrow">Sacola (0)</h2><CloseButton onClick={() => setOverlay(null)} label="Fechar sacola" /></div>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center"><p className="font-serif text-2xl">Sua sacola está vazia.</p><p className="text-sm text-muted-foreground">Descubra as peças que acabaram de chegar.</p><a onClick={() => setOverlay(null)} className="eyebrow bg-clay px-8 py-4 text-white transition-colors hover:bg-graphite" href="#novidades">Ver novidades</a></div>
      </aside>

      <div className={`fixed inset-x-0 top-0 z-60 border-b border-border bg-background transition-[opacity,transform] duration-500 ${overlay === "search" ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`} aria-hidden={overlay !== "search"}>
        <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-10"><div className="flex items-center gap-4 border-b border-border pb-3"><SearchIcon className="h-[18px] w-[18px] text-muted-foreground" /><label className="sr-only" htmlFor="site-search">Buscar produtos</label><input autoFocus={overlay === "search"} id="site-search" className="flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-muted-foreground md:text-2xl" placeholder="Buscar por peça, categoria ou coleção" /><CloseButton onClick={() => setOverlay(null)} label="Fechar busca" /></div></div>
      </div>
    </>
  );
}

function Action({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return <button onClick={onClick} type="button" className="flex h-11 w-11 items-center justify-center transition-colors hover:text-clay" aria-label={label}>{children}</button>;
}

function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return <button onClick={onClick} type="button" className="flex h-11 w-11 items-center justify-center" aria-label={label}><CloseIcon className="h-5 w-5" /></button>;
}
