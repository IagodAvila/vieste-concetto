"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, HeartIcon, PlusIcon } from "@/components/ui/Icons";
import { useShop } from "@/components/providers/ShopProvider";
import { products } from "@/data/products";
import { BLUR_DATA_URL } from "@/lib/image";
import type { Product } from "@/types/product";

export function ProductGrid({ items = products, className = "grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4" }: { items?: Product[]; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("produto");
  const selectedProduct = productSlug ? (items.find((product) => product.slug === productSlug) ?? products.find((product) => product.slug === productSlug) ?? null) : null;

  function openProduct(product: Product) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("produto", product.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function closeProduct() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("produto");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <>
      <ul className={className}>
        {items.map((product) => <li key={product.slug}><ProductCard product={product} onOpen={() => openProduct(product)} /></li>)}
      </ul>
      {selectedProduct && <ProductDetails key={selectedProduct.slug} product={selectedProduct} onClose={closeProduct} />}
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
        <Image src={product.image} alt={`${product.name} — ${product.category}`} width={1000} height={1500} sizes="(min-width:1024px) 25vw, 50vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="aspect-2/3 w-full object-cover" />
        {product.badge && <span className="eyebrow pointer-events-none absolute top-3 left-3 z-20 bg-background/90 px-2 py-1">{product.badge}</span>}
        <button className="absolute inset-0 z-10 cursor-zoom-in" onClick={onOpen} type="button" aria-label={`Ampliar fotos e ver detalhes de ${product.name}`} />
        <button onClick={addSelectedSize} className="button-light eyebrow absolute bottom-3 left-3 z-20 hidden translate-y-2 gap-2 px-5 py-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:flex" type="button"><PlusIcon className="h-3.5 w-3.5" />{sizeError ? "Escolha o tamanho" : quantity ? `Na sacola · ${quantity}` : "Adicionar à sacola"}</button>
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
  const touchGesture = useRef({ pointerId: -1, startX: 0, startY: 0, moved: false });
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

  function selectImage(image: string) {
    setActiveImage(image);
    setZoomed(false);
    setTouchZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }

  function moveImage(direction: -1 | 1) {
    const currentIndex = gallery.indexOf(activeImage);
    const nextIndex = Math.min(gallery.length - 1, Math.max(0, currentIndex + direction));
    if (nextIndex !== currentIndex) selectImage(gallery[nextIndex]);
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
        <button onClick={onClose} className="eyebrow absolute top-3 left-3 z-40 bg-background/90 px-2.5 py-1.5 text-base md:hidden" type="button">← Voltar</button>
        <button onClick={onClose} className="absolute top-4 right-4 z-40 hidden h-11 w-11 place-items-center rounded-full bg-background/90 shadow-sm md:grid" type="button" aria-label="Fechar detalhes do produto"><CloseIcon className="h-5 w-5" /></button>

        <div className="bg-secondary md:p-6">
          <div
            className={`relative aspect-2/3 min-w-0 overflow-hidden bg-background md:aspect-square md:cursor-zoom-in md:touch-auto ${touchZoomed ? "touch-none" : "touch-pan-y"}`}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={(event) => updateZoomPosition(event.currentTarget, event.clientX, event.clientY)}
            onPointerDown={(event) => {
              if (event.pointerType !== "touch") return;
              event.currentTarget.setPointerCapture(event.pointerId);
              touchGesture.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
              if (touchZoomed) updateZoomPosition(event.currentTarget, event.clientX, event.clientY);
            }}
            onPointerMove={(event) => {
              if (event.pointerType !== "touch" || touchGesture.current.pointerId !== event.pointerId) return;
              if (Math.hypot(event.clientX - touchGesture.current.startX, event.clientY - touchGesture.current.startY) > 6) touchGesture.current.moved = true;
              if (touchZoomed) updateZoomPosition(event.currentTarget, event.clientX, event.clientY);
            }}
            onPointerUp={(event) => {
              if (event.pointerType !== "touch" || touchGesture.current.pointerId !== event.pointerId) return;
              const distanceX = event.clientX - touchGesture.current.startX;
              const distanceY = event.clientY - touchGesture.current.startY;
              if (!touchGesture.current.moved) {
                updateZoomPosition(event.currentTarget, event.clientX, event.clientY);
                setTouchZoomed((current) => !current);
              } else if (!touchZoomed && Math.abs(distanceX) >= 48 && Math.abs(distanceX) > Math.abs(distanceY)) {
                moveImage(distanceX < 0 ? 1 : -1);
              }
              touchGesture.current.pointerId = -1;
            }}
            onPointerCancel={(event) => { if (event.pointerType === "touch") touchGesture.current.pointerId = -1; }}
          >
            <Image
              src={activeImage}
              alt={`${product.name} — foto ampliada`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="pointer-events-none object-cover md:object-contain"
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
                <Image src={activeImage} alt="" fill sizes="250vw" className="object-cover" />
              </div>
            </div>
            <span className={`pointer-events-none absolute hidden border border-white/90 bg-white/65 shadow-md transition-opacity duration-200 md:block ${zoomed ? "opacity-100" : "opacity-0"}`} style={{ width: "40%", height: "40%", left: `${zoomPosition.x - 20}%`, top: `${zoomPosition.y - 20}%` }} />
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-2 md:hidden" role="group" aria-label="Fotos do produto">
              {gallery.map((image, index) => <button key={`${image}-${index}`} onClick={(event) => { event.stopPropagation(); selectImage(image); }} onPointerDown={(event) => event.stopPropagation()} type="button" aria-label={`Ver foto ${index + 1} de ${product.name}`} aria-pressed={activeImage === image} className="flex h-8 items-center"><span className={`block h-0.5 shadow-sm transition-[width,background-color] duration-300 ${activeImage === image ? "w-12 bg-graphite" : "w-8 bg-graphite/35"}`} /></button>)}
            </div>
          </div>
          <div className="mt-3 hidden justify-center gap-3 md:flex" role="group" aria-label="Fotos do produto">
            {gallery.map((image, index) => <button key={`${image}-${index}`} onClick={() => selectImage(image)} onFocus={() => selectImage(image)} onMouseEnter={() => selectImage(image)} type="button" aria-label={`Ver foto ${index + 1} de ${product.name}`} aria-pressed={activeImage === image} className={`w-[4.5rem] overflow-hidden border-2 bg-background ${activeImage === image ? "border-clay" : "border-transparent"}`}><Image src={image} alt="" width={120} height={180} className="aspect-2/3 object-cover" /></button>)}
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
