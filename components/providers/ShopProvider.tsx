"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";

type CartLine = {
  slug: string;
  size: string;
  quantity: number;
};

type ShopContextValue = {
  favoriteSlugs: string[];
  cart: CartLine[];
  favoriteCount: number;
  cartCount: number;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  addToCart: (slug: string, size: string) => void;
  clearCart: () => void;
  removeFromCart: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
};

type ShopNotice = {
  title: string;
  message: string;
  tone: "added" | "removed";
};

const STORAGE_KEY = "vieste-shop";
const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState<ShopNotice | null>(null);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const noticeTimers = useRef<number[]>([]);

  const showNotice = useCallback((nextNotice: ShopNotice) => {
    noticeTimers.current.forEach((timer) => window.clearTimeout(timer));
    noticeTimers.current = [];
    setNotice(nextNotice);
    setNoticeVisible(false);
    window.requestAnimationFrame(() => setNoticeVisible(true));
    noticeTimers.current.push(window.setTimeout(() => setNoticeVisible(false), 2400));
    noticeTimers.current.push(window.setTimeout(() => setNotice(null), 2700));
  }, []);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored) as { favoriteSlugs?: string[]; cart?: CartLine[] };
          setFavoriteSlugs(data.favoriteSlugs ?? []);
          setCart((data.cart ?? []).map((line) => ({ ...line, size: line.size ?? "M" })));
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ favoriteSlugs, cart }));
  }, [cart, favoriteSlugs, hydrated]);

  useEffect(() => () => {
    noticeTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const value = useMemo<ShopContextValue>(() => ({
    favoriteSlugs,
    cart,
    favoriteCount: favoriteSlugs.length,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    isFavorite: (slug) => favoriteSlugs.includes(slug),
    toggleFavorite: (slug) => {
      const removing = favoriteSlugs.includes(slug);
      setFavoriteSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
      showNotice({
        title: "Favoritos atualizados",
        message: removing ? `Removemos ${getProductName(slug)} dos seus favoritos.` : `Guardamos ${getProductName(slug)} nos seus favoritos.`,
        tone: removing ? "removed" : "added",
      });
    },
    addToCart: (slug, size) => {
      setCart((current) => {
        const line = current.find((item) => item.slug === slug && item.size === size);
        return line ? current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { slug, size, quantity: 1 }];
      });
      showNotice({ title: "Sacola atualizada", message: `Adicionamos ${getProductName(slug)} · tamanho ${size} à sua sacola.`, tone: "added" });
    },
    clearCart: () => setCart([]),
    removeFromCart: (slug, size) => {
      setCart((current) => current.filter((item) => item.slug !== slug || item.size !== size));
      showNotice({ title: "Sacola atualizada", message: `Removemos ${getProductName(slug)} · tamanho ${size} da sua sacola.`, tone: "removed" });
    },
    updateQuantity: (slug, size, quantity) => {
      setCart((current) => quantity <= 0 ? current.filter((item) => item.slug !== slug || item.size !== size) : current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity } : item));
      if (quantity <= 0) showNotice({ title: "Sacola atualizada", message: `Removemos ${getProductName(slug)} · tamanho ${size} da sua sacola.`, tone: "removed" });
    },
  }), [cart, favoriteSlugs, showNotice]);

  return (
    <ShopContext.Provider value={value}>
      {children}
      {notice && <div className={`pointer-events-none fixed right-4 bottom-4 left-4 z-[100] flex justify-center transition-[opacity,transform] duration-300 md:right-8 md:bottom-8 md:left-auto ${noticeVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} role="status" aria-live="polite" aria-atomic="true"><div className="flex w-full max-w-sm overflow-hidden border border-border bg-background shadow-[0_18px_50px_rgba(64,64,64,.18)]"><span className={`w-1.5 shrink-0 ${notice.tone === "added" ? "bg-clay" : "bg-graphite"}`} aria-hidden /><div className="px-4 py-3"><p className="eyebrow text-base text-clay">{notice.title}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{notice.message}</p></div></div></div>}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return context;
}

function getProductName(slug: string) {
  return products.find((product) => product.slug === slug)?.name ?? "a peça";
}
