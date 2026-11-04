"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/products";

export type CartItem = { id: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  loaded: boolean;
  count: number;
  total: number;
  addItem: (id: string, qty?: number) => void;
  setQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "test-shop-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Carica il carrello da localStorage al primo render lato client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed.filter((i) => getProduct(i.id) && i.quantity > 0));
      }
    } catch {
      /* localStorage non disponibile: carrello solo in memoria */
    }
    setLoaded(true);
  }, []);

  // Salva ad ogni modifica (solo dopo il caricamento iniziale)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignora */
    }
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + (getProduct(i.id)?.price ?? 0) * i.quantity, 0);
    return {
      items,
      loaded,
      count,
      total,
      addItem: (id, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((i) => i.id === id);
          if (found) return prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(99, i.quantity + qty) } : i));
          return [...prev, { id, quantity: qty }];
        }),
      setQuantity: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(99, qty) } : i))
        ),
      removeItem: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      clear: () => setItems([]),
    };
  }, [items, loaded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve essere usato dentro <CartProvider>");
  return ctx;
}
