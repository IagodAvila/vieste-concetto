"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";
import { products } from "@/data/products";

type Overlay = "menu" | "search" | "favorites" | "cart" | null;

const navItems = ["Novidades", "Feminino"];
const collections = ["Movimento 01", "Movimento 02", "Essenciais"];

export function Header() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [query, setQuery] = useState("");
  const { addToCart, cart, cartCount, favoriteCount, favoriteSlugs, removeFromCart, toggleFavorite, updateQuantity } = useShop();

  const favoriteProducts = products.filter((product) => favoriteSlugs.includes(product.slug));
  const cartLines = cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    return product ? [{ ...line, product }] : [];
  });
  const cartTotal = cartLines.reduce((total, line) => total + parsePrice(line.product.price) * line.quantity, 0);
  const searchResults = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    if (!term) return [];
    return products.filter((product) => [product.name, product.category, product.color].some((value) => value.toLocaleLowerCase("pt-BR").includes(term)));
  }, [query]);

  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [overlay]);

  function closeOverlay() {
    setOverlay(null);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center gap-4 px-4 py-4 md:px-10">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => <a className="eyebrow link-underline" href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
            <div className="group relative">
              <button className="eyebrow link-underline cursor-pointer border-0 bg-transparent" type="button">Coleções</button>
              <div className="pointer-events-none absolute top-full left-0 w-56 translate-y-1 border border-border bg-background pt-4 pb-3 opacity-0 shadow-sm transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                {collections.map((item) => <a className="block px-5 py-2 text-sm transition-colors hover:bg-secondary" href="#campanha" key={item}>{item}</a>)}
              </div>
            </div>
          </nav>
          <Action label="Abrir menu" className="flex justify-self-start lg:hidden" onClick={() => setOverlay("menu")}><MenuIcon className="h-5 w-5" /></Action>

          <Link className="justify-self-center" href="/" aria-label="VIESTE CONCETTO — página inicial">
            <Image priority src="/assets/logo-vieste.svg" alt="VIESTE CONCETTO" width={1098} height={423} className="h-auto w-[clamp(7rem,12vw,10.5rem)]" />
          </Link>

          <div className="flex items-center justify-end gap-1 md:gap-2">
            <Action label="Buscar" onClick={() => setOverlay("search")}><SearchIcon className="h-[19px] w-[19px]" /></Action>
            <Link aria-label="Minha conta" href="/minha-conta" className="hidden h-11 w-11 items-center justify-center transition-colors hover:text-clay sm:flex"><UserIcon className="h-[19px] w-[19px]" /></Link>
            <Action label={`Favoritos (${favoriteCount})`} className="relative hidden sm:flex" onClick={() => setOverlay("favorites")}><HeartIcon className={`h-[19px] w-[19px] ${favoriteCount ? "fill-current text-clay" : ""}`} />{favoriteCount > 0 && <CountBadge count={favoriteCount} />}</Action>
            <Action label={`Abrir sacola (${cartCount} itens)`} className="relative" onClick={() => setOverlay("cart")}><BagIcon className="h-[19px] w-[19px]" />{cartCount > 0 && <CountBadge count={cartCount} />}</Action>
          </div>
        </div>
      </header>

      <button aria-label="Fechar painel" onClick={closeOverlay} className={`fixed inset-0 z-50 bg-graphite/35 transition-opacity duration-500 ${overlay ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <aside className={`fixed inset-0 z-60 flex flex-col bg-peach-soft transition-[opacity,transform] duration-500 lg:hidden ${overlay === "menu" ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"}`} aria-hidden={overlay !== "menu"} aria-label="Menu">
        <PanelHeader logo title="" close={closeOverlay} closeLabel="Fechar menu" />
        <nav className="flex-1 overflow-y-auto px-6 pt-6">
          {[...navItems, "Contato"].map((item) => <a onClick={closeOverlay} className="block py-3 font-serif text-6xl" href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>)}
          <p className="eyebrow mt-10 text-clay">Coleções</p>
          <div className="mt-4 space-y-1 border-t border-clay/20 pt-4">{collections.map((item) => <a onClick={closeOverlay} className="block py-1.5 text-sm" href="#campanha" key={item}>{item}</a>)}</div>
          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-clay/20 py-6"><Link onClick={closeOverlay} href="/minha-conta" className="flex items-center gap-2 py-2 text-sm"><UserIcon className="h-4 w-4" />Minha conta</Link><button onClick={() => setOverlay("favorites")} className="flex items-center gap-2 py-2 text-sm"><HeartIcon className="h-4 w-4" />Favoritos ({favoriteCount})</button></div>
        </nav>
      </aside>

      <SidePanel open={overlay === "favorites"} title={`Favoritos · ${favoriteCount}`} close={closeOverlay} label="Favoritos">
        {favoriteProducts.length ? <div className="divide-y divide-border">{favoriteProducts.map((product) => <ProductLine key={product.slug} product={product} actionLabel="Adicionar à sacola" onAction={(size) => addToCart(product.slug, size)} onRemove={() => toggleFavorite(product.slug)} />)}</div> : <EmptyPanel title="Você ainda não favoritou nenhuma peça." text="Toque no coração de um produto para guardá-lo aqui." close={closeOverlay} />}
      </SidePanel>

      <SidePanel open={overlay === "cart"} title={`Sacola · ${cartCount}`} close={closeOverlay} label="Sacola">
        {cartLines.length ? <><div className="flex-1 divide-y divide-border overflow-y-auto">{cartLines.map(({ product, quantity, size }) => <div className="flex gap-4 py-5" key={`${product.slug}-${size}`}><Image src={product.image} alt="" width={90} height={130} className="h-[120px] w-20 object-cover" /><div className="flex flex-1 flex-col"><p className="text-sm font-medium">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.color} · Tamanho {size}</p><p className="mt-2 text-sm">{product.price}</p><div className="mt-auto flex items-center justify-between"><div className="flex items-center border border-border"><button onClick={() => updateQuantity(product.slug, size, quantity - 1)} className="h-8 w-8 transition-colors hover:bg-peach-soft" aria-label={`Diminuir quantidade de ${product.name}, tamanho ${size}`}>−</button><span className="min-w-7 text-center text-xs">{quantity}</span><button onClick={() => updateQuantity(product.slug, size, quantity + 1)} className="h-8 w-8 transition-colors hover:bg-peach-soft" aria-label={`Aumentar quantidade de ${product.name}, tamanho ${size}`}>+</button></div><button onClick={() => removeFromCart(product.slug, size)} className="text-xs text-muted-foreground underline transition-colors hover:text-clay">Remover</button></div></div></div>)}</div><div className="border-t border-border pt-5"><div className="flex justify-between font-medium"><span>Total</span><span>{formatPrice(cartTotal)}</span></div><p className="mt-1 text-xs text-muted-foreground">Frete calculado na próxima etapa.</p><Link onClick={closeOverlay} href="/checkout" className="button-primary eyebrow mt-5 w-full px-8 py-4">Finalizar compra</Link></div></> : <EmptyPanel title="Sua sacola está vazia." text="Descubra as peças que acabaram de chegar." close={closeOverlay} />}
      </SidePanel>

      <div className={`fixed inset-x-0 top-0 z-60 border-b border-border bg-background transition-[opacity,transform] duration-500 ${overlay === "search" ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`} aria-hidden={overlay !== "search"}>
        <div className="mx-auto max-w-[1600px] px-4 py-4 md:px-10"><div className="flex h-14 items-center gap-3 md:h-[4.05rem] md:gap-4"><SearchIcon className="h-[18px] w-[18px] shrink-0 text-muted-foreground" /><label className="sr-only" htmlFor="site-search">Buscar produtos</label><input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus={overlay === "search"} id="site-search" className="min-w-0 flex-1 bg-transparent font-serif text-3xl leading-none outline-none placeholder:text-muted-foreground md:text-5xl" placeholder="Buscar produtos" /><CloseButton onClick={closeOverlay} label="Fechar busca" /></div>{query.trim() && <div className="grid max-h-[55vh] gap-3 overflow-y-auto border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">{searchResults.length ? searchResults.map((product) => <button onClick={() => { closeOverlay(); document.getElementById("novidades")?.scrollIntoView({ behavior: "smooth" }); }} className="flex gap-3 p-2 text-left transition-colors hover:bg-secondary" key={product.slug}><Image src={product.image} alt="" width={64} height={90} className="h-20 w-14 object-cover" /><span><strong className="block text-sm font-medium">{product.name}</strong><small className="mt-1 block text-muted-foreground">{product.category} · {product.color}</small><small className="mt-2 block">{product.price}</small></span></button>) : <p className="py-5 text-sm text-muted-foreground">Nenhuma peça encontrada para “{query}”.</p>}</div>}</div>
      </div>

    </>
  );
}

function Action({ label, onClick, children, className = "" }: { label: string; onClick: () => void; children: ReactNode; className?: string }) { return <button onClick={onClick} type="button" className={`h-11 w-11 cursor-pointer items-center justify-center transition-colors hover:text-clay ${className || "flex"}`} aria-label={label}>{children}</button>; }
function CountBadge({ count }: { count: number }) { return <span className="absolute top-0 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-clay px-1 text-[9px] text-white">{count}</span>; }
function CloseButton({ onClick, label }: { onClick: () => void; label: string }) { return <button onClick={onClick} type="button" className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center" aria-label={label}><CloseIcon className="h-5 w-5" /></button>; }
function PanelHeader({ close, closeLabel, logo, title }: { close: () => void; closeLabel: string; logo?: boolean; title: string }) { return <div className="flex items-center justify-between border-b border-border px-5 py-4">{logo ? <Image src="/assets/logo-vieste.svg" alt="VIESTE CONCETTO" width={1098} height={423} className="h-auto w-40" /> : <h2 className="eyebrow">{title}</h2>}<CloseButton onClick={close} label={closeLabel} /></div>; }
function SidePanel({ children, close, label, open, title }: { children: ReactNode; close: () => void; label: string; open: boolean; title: string }) { return <aside className={`fixed top-0 right-0 z-60 flex h-dvh w-full max-w-[460px] transform-gpu flex-col bg-background opacity-0 shadow-2xl transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform ${open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-[105%]"}`} aria-hidden={!open} aria-label={label}><PanelHeader close={close} closeLabel={`Fechar ${label.toLowerCase()}`} title={title} /><div className={`flex min-h-0 flex-1 flex-col px-5 pb-5 transition-opacity duration-300 ${open ? "opacity-100 delay-150" : "opacity-0"}`}>{children}</div></aside>; }
function EmptyPanel({ close, text, title }: { close: () => void; text: string; title: string }) { return <div className="flex flex-1 flex-col items-center justify-center gap-5 px-3 text-center"><p className="font-serif text-5xl">{title}</p><p className="text-sm text-muted-foreground">{text}</p><a onClick={close} className="button-primary eyebrow px-8 py-4" href="#novidades">Ver novidades</a></div>; }
function ProductLine({ actionLabel, onAction, onRemove, product }: { actionLabel: string; onAction: (size: string) => void; onRemove: () => void; product: (typeof products)[number] }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  return <div className="flex gap-4 py-5"><Image src={product.image} alt="" width={90} height={130} className="h-[120px] w-20 object-cover" /><div className="flex flex-1 flex-col"><div className="flex justify-between gap-3"><p className="text-sm font-medium">{product.name}</p><button onClick={onRemove} className="text-xs text-muted-foreground underline">Remover</button></div><p className="mt-1 text-xs text-muted-foreground">{product.category} · {product.color}</p><p className="mt-2 text-sm">{product.price}</p><div className="mt-3 flex gap-1.5">{product.sizes.map((size) => <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }} type="button" aria-pressed={selectedSize === size} className={`h-8 min-w-8 border px-1.5 text-xs transition-colors ${selectedSize === size ? "border-clay bg-clay text-white" : sizeError ? "border-clay text-clay" : "border-border hover:border-clay"}`}>{size}</button>)}</div><button onClick={() => { if (!selectedSize) { setSizeError(true); return; } onAction(selectedSize); }} className="mt-3 self-start border-b border-graphite pb-1 text-xs font-medium uppercase tracking-wider">{sizeError ? "Escolha o tamanho" : actionLabel}</button></div></div>;
}
function parsePrice(price: string) { return Number(price.replace("R$", "").trim().replaceAll(".", "").replace(",", ".")); }
function formatPrice(value: number) { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value); }
