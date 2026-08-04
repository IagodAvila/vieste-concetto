"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

const STORAGE_KEY = "vieste-shop";
const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

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

  const value = useMemo<ShopContextValue>(() => ({
    favoriteSlugs,
    cart,
    favoriteCount: favoriteSlugs.length,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    isFavorite: (slug) => favoriteSlugs.includes(slug),
    toggleFavorite: (slug) => setFavoriteSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]),
    addToCart: (slug, size) => setCart((current) => {
      const line = current.find((item) => item.slug === slug && item.size === size);
      return line ? current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { slug, size, quantity: 1 }];
    }),
    clearCart: () => setCart([]),
    removeFromCart: (slug, size) => setCart((current) => current.filter((item) => item.slug !== slug || item.size !== size)),
    updateQuantity: (slug, size, quantity) => setCart((current) => quantity <= 0 ? current.filter((item) => item.slug !== slug || item.size !== size) : current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity } : item)),
  }), [cart, favoriteSlugs]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return context;
}
