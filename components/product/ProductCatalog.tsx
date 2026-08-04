"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products } from "@/data/products";

type FilterKey = "categoria" | "cor" | "tamanho";

export function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))).sort(), []);
  const colors = useMemo(() => Array.from(new Set(products.map((product) => product.color))).sort(), []);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((product) => product.sizes))).sort(), []);

  const activeCategories = searchParams.get("categoria")?.split(",").filter(Boolean) ?? [];
  const activeColors = searchParams.get("cor")?.split(",").filter(Boolean) ?? [];
  const activeSizes = searchParams.get("tamanho")?.split(",").filter(Boolean) ?? [];
  const hasFilters = activeCategories.length + activeColors.length + activeSizes.length > 0;

  const filtered = products.filter((product) =>
    (activeCategories.length === 0 || activeCategories.includes(product.category))
    && (activeColors.length === 0 || activeColors.includes(product.color))
    && (activeSizes.length === 0 || product.sizes.some((size) => activeSizes.includes(size))));

  function toggleValue(key: FilterKey, value: string, current: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    if (next.length) params.set(key, next.join(",")); else params.delete(key);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoria");
    params.delete("cor");
    params.delete("tamanho");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="mt-10 flex flex-wrap items-start gap-x-10 gap-y-6 border-y border-border py-6">
        <FilterGroup active={activeCategories} label="Categoria" onToggle={(value) => toggleValue("categoria", value, activeCategories)} options={categories} />
        <FilterGroup active={activeColors} label="Cor" onToggle={(value) => toggleValue("cor", value, activeColors)} options={colors} />
        <FilterGroup active={activeSizes} label="Tamanho" onToggle={(value) => toggleValue("tamanho", value, activeSizes)} options={sizes} />
        {hasFilters && <button onClick={clearFilters} type="button" className="eyebrow self-center text-xs text-clay underline underline-offset-4">Limpar filtros</button>}
      </div>
      <p className="mt-6 text-xs text-muted-foreground" role="status">{filtered.length} {filtered.length === 1 ? "peça encontrada" : "peças encontradas"}</p>
      {filtered.length ? <ProductGrid className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4" items={filtered} /> : <p className="mt-16 text-center text-sm text-muted-foreground">Nenhuma peça encontrada com esses filtros.</p>}
    </div>
  );
}

function FilterGroup({ active, label, onToggle, options }: { active: string[]; label: string; onToggle: (value: string) => void; options: string[] }) {
  return (
    <div>
      <p className="eyebrow text-xs text-clay">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => <button key={option} onClick={() => onToggle(option)} type="button" aria-pressed={active.includes(option)} className={`h-9 border px-3 text-xs transition-colors ${active.includes(option) ? "border-clay bg-clay text-white" : "border-border hover:border-clay hover:text-clay"}`}>{option}</button>)}
      </div>
    </div>
  );
}
