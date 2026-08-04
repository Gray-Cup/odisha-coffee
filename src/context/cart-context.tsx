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

// `weight` is a plain string (not the stricter WeightLabel union) because
// estate lots carry their own per-product weight tiers ("100 g", "2 kg", ...)
// that don't belong to the roasted/green tier sets WeightLabel enumerates.
// `farmId` is only set for estate (green bean) lots, which are farm-agnostic
// catalogue entries the buyer pairs with a chosen partner farm in the UI.
export type CartItem = { productId: string; weight: string; farmId?: string };

type CartCtx = {
  items: CartItem[];
  add: (productId: string, weight: string, farmId?: string) => void;
  remove: (productId: string) => void;
  updateWeight: (productId: string, weight: string) => void;
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

  const add = useCallback((productId: string, weight: string, farmId?: string) => {
    setItems((prev) =>
      prev.some((i) => i.productId === productId)
        ? prev.map((i) => (i.productId === productId ? { productId, weight, farmId } : i))
        : [...prev, { productId, weight, farmId }]
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateWeight = useCallback((productId: string, weight: string) => {
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
