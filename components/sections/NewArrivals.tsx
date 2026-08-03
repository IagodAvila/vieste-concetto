import Image from "next/image";
import { PlusIcon, HeartIcon } from "@/components/ui/Icons";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

export function NewArrivals() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-10 md:py-28" id="novidades" aria-labelledby="novidades-title">
      <div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-clay">Acabou de chegar</p><h2 id="novidades-title" className="mt-3 font-serif text-3xl md:text-4xl">Novidades</h2></div><a href="#novidades" className="eyebrow link-underline hidden md:block">Ver tudo</a></div>
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
        {products.map((product) => <li key={product.name}><ProductCard product={product} /></li>)}
      </ul>
      <div className="mt-12 text-center md:hidden"><a href="#novidades" className="eyebrow border border-graphite px-8 py-4">Ver tudo</a></div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-secondary">
        <Image src={product.image} alt={`${product.name} — ${product.category}`} width={1000} height={1500} sizes="(min-width:1024px) 25vw, 50vw" className="aspect-2/3 w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.02] group-hover:opacity-0" />
        <Image src={product.secondaryImage} alt="" aria-hidden width={1000} height={1500} sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0 aspect-2/3 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100" />
        {product.badge && <span className="eyebrow absolute top-3 left-3 bg-background/90 px-2 py-1">{product.badge}</span>}
        <a className="absolute inset-0" href={`#produto-${product.slug}`} aria-label={`Ver ${product.name}`} />
        <button className="eyebrow pointer-events-none absolute bottom-3 left-3 hidden translate-y-2 items-center gap-2 bg-background/95 px-5 py-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:flex" type="button"><PlusIcon className="h-3.5 w-3.5" />Adicionar à sacola</button>
      </div>
      <button type="button" aria-label={`Favoritar ${product.name}`} className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center transition-colors hover:text-clay"><HeartIcon className="h-[18px] w-[18px]" /></button>
      <div className="mt-4 space-y-1"><h3 className="text-[.95rem] leading-snug font-medium"><a className="link-underline" href={`#produto-${product.slug}`}>{product.name}</a></h3><p className="text-xs tracking-wide text-muted-foreground">{product.category} · {product.color}</p><p className="pt-1 text-sm">{product.price}</p><p className="text-xs text-muted-foreground">{product.installments}</p></div>
    </article>
  );
}
