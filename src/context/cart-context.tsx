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
//
// `id` identifies a distinct cart LINE (productId+weight+farmId combo), not
// just the product — so 1kg and 500g of the same product are two separate
// rows instead of one overwriting the other.
export type CartItem = { id: string; productId: string; weight: string; farmId?: string };

export function cartLineId(productId: string, weight: string, farmId?: string): string {
  return `${productId}::${weight}::${farmId ?? ""}`;
}

type CartCtx = {
  items: CartItem[];
  add: (productId: string, weight: string, farmId?: string) => void;
  remove: (id: string) => void;
  updateWeight: (id: string, weight: string) => void;
  isInCart: (productId: string) => boolean;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Guards the write effect below from firing with the initial (empty) state
  // before the read effect has loaded whatever was actually in storage -
  // without this, mount order between the two effects would overwrite a
  // saved cart with [] on every fresh page load.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("odisha_cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("odisha_cart", JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((productId: string, weight: string, farmId?: string) => {
    const id = cartLineId(productId, weight, farmId);
    setItems((prev) => (prev.some((i) => i.id === id) ? prev : [...prev, { id, productId, weight, farmId }]));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateWeight = useCallback((id: string, weight: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, weight, id: cartLineId(i.productId, weight, i.farmId) } : i))
    );
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
