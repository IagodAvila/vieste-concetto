import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";

export function NewArrivals() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-10 md:py-28" id="novidades" aria-labelledby="novidades-title">
      <div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-clay">Acabou de chegar</p><h2 id="novidades-title" className="mt-3 font-serif text-6xl md:text-7xl">Novidades</h2></div><Link href="/novidades" className="eyebrow link-underline hidden md:block">Ver tudo</Link></div>
      <Suspense>
        <ProductGrid className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4" />
      </Suspense>
      <div className="mt-12 text-center md:hidden"><Link href="/novidades" className="button-secondary eyebrow px-8 py-4">Ver tudo</Link></div>
    </section>
  );
}
