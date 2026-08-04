"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  ROASTED_TIERS,
  GREEN_TIERS,
  computeItemPrice,
  type WeightLabel,
} from "@/lib/pricing";

// Single source of truth for tiers/pricing lives in lib/pricing.ts -
// re-exported here so existing imports keep working.
export { ROASTED_TIERS, GREEN_TIERS, computeItemPrice };
export type { WeightLabel };

export type CartItem = { productId: string; weight: WeightLabel };

type CartCtx = {
  items: CartItem[];
  add: (productId: string, weight: WeightLabel) => void;
  remove: (productId: string) => void;
  updateWeight: (productId: string, weight: WeightLabel) => void;
  isInCart: (productId: string) => boolean;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("odisha_cart");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("odisha_cart", JSON.stringify(items));
  }, [items]);

  const add = useCallback((productId: string, weight: WeightLabel) => {
    setItems((prev) =>
      prev.some((i) => i.productId === productId) ? prev : [...prev, { productId, weight }]
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateWeight = useCallback((productId: string, weight: WeightLabel) => {
    setItems((prev) => prev.map((i) => i.productId === productId ? { ...i, weight } : i));
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  const clear = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, add, remove, updateWeight, isInCart, clear, count: items.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
