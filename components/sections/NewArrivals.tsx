"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseIcon, PlusIcon, HeartIcon } from "@/components/ui/Icons";
import { useShop } from "@/components/providers/ShopProvider";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

export function NewArrivals() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-10 md:py-28" id="novidades" aria-labelledby="novidades-title">
        <div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-clay">Acabou de chegar</p><h2 id="novidades-title" className="mt-3 font-serif text-6xl md:text-7xl">Novidades</h2></div><a href="#novidades" className="eyebrow link-underline hidden md:block">Ver tudo</a></div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {products.map((product) => <li key={product.name}><ProductCard product={product} onOpen={() => setSelectedProduct(product)} /></li>)}
        </ul>
        <div className="mt-12 text-center md:hidden"><a href="#novidades" className="eyebrow border border-graphite px-8 py-4">Ver tudo</a></div>
      </section>
      {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const { addToCart, cart, isFavorite, toggleFavorite } = useShop();
  const favorite = isFavorite(product.slug);
  const quantity = cart.filter((line) => line.slug === product.slug).reduce((total, line) => total + line.quantity, 0);

  function selectSize(size: string) {
    setSelectedSize(size);
    setSizeError(false);
  }

  function addSelectedSize() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product.slug, selectedSize);
  }

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-secondary">
        <Image src={product.image} alt={`${product.name} — ${product.category}`} width={1000} height={1500} sizes="(min-width:1024px) 25vw, 50vw" className="aspect-2/3 w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.02] group-hover:opacity-0" />
        <Image src={product.secondaryImage} alt="" aria-hidden width={1000} height={1500} sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0 aspect-2/3 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100" />
        {product.badge && <span className="eyebrow absolute top-3 left-3 bg-background/90 px-2 py-1">{product.badge}</span>}
        <button className="absolute inset-0 cursor-zoom-in" onClick={onOpen} type="button" aria-label={`Ampliar fotos e ver detalhes de ${product.name}`} />
        <button onClick={addSelectedSize} className="button-light eyebrow absolute bottom-3 left-3 z-10 hidden translate-y-2 gap-2 px-5 py-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:flex" type="button"><PlusIcon className="h-3.5 w-3.5" />{sizeError ? "Escolha o tamanho" : quantity ? `Na sacola · ${quantity}` : "Adicionar à sacola"}</button>
      </div>
      <button onClick={() => toggleFavorite(product.slug)} type="button" aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`} aria-pressed={favorite} className={`absolute top-2 right-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center transition-colors ${favorite ? "text-clay" : "text-graphite hover:text-clay"}`}><HeartIcon className={`h-[20px] w-[20px] ${favorite ? "fill-current" : ""}`} /></button>
      <div className="mt-4 space-y-1"><h3 className="min-h-[2.65rem] text-[.95rem] leading-snug font-medium"><button className="line-clamp-2 cursor-pointer text-left transition-colors hover:text-clay" onClick={onOpen} type="button">{product.name}</button></h3><p className="text-xs tracking-wide text-muted-foreground">{product.category} · {product.color}</p><p className="pt-1 text-sm">{product.price}</p><p className="text-xs text-muted-foreground">{product.installments}</p></div>
      <SizeSelector error={sizeError} onSelect={selectSize} selected={selectedSize} sizes={product.sizes} compact />
      <button onClick={addSelectedSize} className="button-secondary eyebrow mt-3 w-full px-3 py-3 md:hidden" type="button">{sizeError ? "Escolha o tamanho" : quantity ? `Na sacola · ${quantity}` : "Adicionar à sacola"}</button>
    </article>
  );
}

function ProductDetails({ product, onClose }: { product: Product; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [zoomed, setZoomed] = useState(false);
  const [touchZoomed, setTouchZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const { addToCart, cart } = useShop();
  const quantity = cart.filter((line) => line.slug === product.slug).reduce((total, line) => total + line.quantity, 0);
  const gallery = [product.image, product.secondaryImage];

  function updateZoomPosition(element: HTMLElement, clientX: number, clientY: number) {
    const bounds = element.getBoundingClientRect();
    setZoomPosition({
      x: Math.min(80, Math.max(20, ((clientX - bounds.left) / bounds.width) * 100)),
      y: Math.min(80, Math.max(20, ((clientY - bounds.top) / bounds.height) * 100)),
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-70 overflow-y-auto bg-graphite/55 p-0 backdrop-blur-sm md:p-6" role="dialog" aria-modal="true" aria-labelledby={`product-title-${product.slug}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="relative mx-auto grid min-h-dvh max-w-6xl bg-background shadow-2xl md:min-h-0 md:grid-cols-2">
        <button onClick={onClose} className="absolute top-4 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-background/90 shadow-sm" type="button" aria-label="Fechar detalhes do produto"><CloseIcon className="h-5 w-5" /></button>

        <div className="bg-secondary p-3 md:p-6">
          <div
            className="relative aspect-square min-w-0 touch-none overflow-hidden bg-background md:cursor-zoom-in md:touch-auto"
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={(event) => updateZoomPosition(event.currentTarget, event.clientX, event.clientY)}
            onPointerDown={(event) => {
              if (event.pointerType !== "touch") return;
              event.currentTarget.setPointerCapture(event.pointerId);
              updateZoomPosition(event.currentTarget, event.clientX, event.clientY);
              setTouchZoomed(true);
            }}
            onPointerMove={(event) => {
              if (event.pointerType === "touch" && event.currentTarget.hasPointerCapture(event.pointerId)) updateZoomPosition(event.currentTarget, event.clientX, event.clientY);
            }}
            onPointerUp={(event) => { if (event.pointerType === "touch") setTouchZoomed(false); }}
            onPointerCancel={(event) => { if (event.pointerType === "touch") setTouchZoomed(false); }}
          >
            <Image
              src={activeImage}
              alt={`${product.name} — foto ampliada`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="pointer-events-none object-contain"
              priority
            />
            <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-150 md:hidden ${touchZoomed ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
              <div
                className="absolute"
                style={{
                  width: "250%",
                  height: "250%",
                  left: `${50 - zoomPosition.x * 2.5}%`,
                  top: `${50 - zoomPosition.y * 2.5}%`,
                }}
              >
                <Image src={activeImage} alt="" fill sizes="250vw" className="object-contain" />
              </div>
            </div>
            <span className={`eyebrow pointer-events-none absolute right-3 bottom-3 z-20 bg-background/90 px-3 py-2 transition-opacity md:hidden ${touchZoomed ? "opacity-0" : "opacity-100"}`}>Toque e arraste para ampliar</span>
            <span className={`pointer-events-none absolute hidden border border-white/90 bg-white/65 shadow-md transition-opacity duration-200 md:block ${zoomed ? "opacity-100" : "opacity-0"}`} style={{ width: "40%", height: "40%", left: `${zoomPosition.x - 20}%`, top: `${zoomPosition.y - 20}%` }} />
            <span className={`eyebrow pointer-events-none absolute right-3 bottom-3 hidden bg-background/90 px-3 py-2 transition-opacity md:block ${zoomed ? "opacity-0" : "opacity-100"}`}>Passe a lupa para ver os detalhes</span>
          </div>
          <div className="mt-3 flex justify-center gap-3">
            {gallery.map((image, index) => <button key={`${image}-${index}`} onClick={() => { setActiveImage(image); setZoomed(false); setTouchZoomed(false); setZoomPosition({ x: 50, y: 50 }); }} type="button" aria-label={`Ver foto ${index + 1} de ${product.name}`} aria-pressed={activeImage === image} className={`w-16 overflow-hidden border-2 bg-background md:w-[4.5rem] ${activeImage === image ? "border-clay" : "border-transparent"}`}><Image src={image} alt="" width={120} height={180} className="aspect-2/3 object-cover" /></button>)}
          </div>
        </div>

        <div className="relative flex flex-col p-6 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto md:p-10">
          <div className={`pointer-events-none absolute inset-x-0 top-0 z-30 hidden aspect-square overflow-hidden border border-border bg-background shadow-[0_4px_20px_rgba(0,0,0,.2)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] md:inset-x-6 md:top-6 md:block ${zoomed ? "translate-x-0 scale-100 opacity-100" : "-translate-x-5 scale-[.96] opacity-0"}`} aria-hidden="true">
            <div
              className="absolute"
              style={{
                width: "250%",
                height: "250%",
                left: `${50 - zoomPosition.x * 2.5}%`,
                top: `${50 - zoomPosition.y * 2.5}%`,
              }}
            >
              <Image src={activeImage} alt="" fill sizes="40vw" className="object-contain" />
            </div>
          </div>
          <p className="eyebrow text-clay">{product.category}</p>
          <h2 id={`product-title-${product.slug}`} className="mt-3 pr-10 font-serif text-6xl leading-tight md:text-7xl">{product.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{product.color}</p>
          <p className="mt-6 text-lg">{product.price}</p>
          <p className="mt-1 text-xs text-muted-foreground">{product.installments}</p>
          <SizeSelector error={sizeError} onSelect={(size) => { setSelectedSize(size); setSizeError(false); }} selected={selectedSize} sizes={product.sizes} />
          <p className="mt-7 text-sm leading-relaxed">{product.description}</p>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="eyebrow">Composição</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.composition}</p>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <h3 className="eyebrow">Medidas da peça</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">{product.measurements.map((measurement) => <li key={measurement}>{measurement}</li>)}</ul>
            <p className="mt-3 text-xs text-muted-foreground">As medidas podem variar até 2 cm.</p>
          </div>

          <button onClick={() => { if (!selectedSize) { setSizeError(true); return; } addToCart(product.slug, selectedSize); }} className="button-primary eyebrow mt-8 w-full px-8 py-4" type="button">{sizeError ? "Selecione um tamanho" : quantity ? `Adicionar mais uma · ${quantity} na sacola` : "Adicionar à sacola"}</button>
        </div>
      </div>
    </div>
  );
}

function SizeSelector({ compact = false, error, onSelect, selected, sizes }: { compact?: boolean; error: boolean; onSelect: (size: string) => void; selected: string; sizes: string[] }) {
  return (
    <div className={compact ? "mt-4" : "mt-7"}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[.68rem] font-medium tracking-[.14em] uppercase">Tamanho</p>
        {error && <p className="text-[.68rem] text-clay" role="alert">Selecione uma opção</p>}
      </div>
      <div className="mt-2 flex gap-2">
        {sizes.map((size) => <button key={size} className={`${compact ? "h-9 min-w-9 text-xs" : "h-11 min-w-11 text-sm"} border px-2 transition-colors ${selected === size ? "border-clay bg-clay text-white" : error ? "border-clay text-clay" : "border-border hover:border-clay hover:text-clay"}`} onClick={() => onSelect(size)} type="button" aria-pressed={selected === size} aria-label={`Selecionar tamanho ${size}`}>{size}</button>)}
      </div>
    </div>
  );
}
