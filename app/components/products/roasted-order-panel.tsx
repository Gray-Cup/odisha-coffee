"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { ROASTED_TIERS, computeItemPrice, deliveryFeeForGrams } from "@/lib/pricing";

const MAX_QUANTITY = 10;

export function RoastedOrderPanel({ product }: { product: Product }) {
  const tiers = ROASTED_TIERS.filter((t) => product.weightOptions.includes(t.label));
  const [weight, setWeight] = useState(tiers[1] ?? tiers[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { add } = useCart();

  const unit = computeItemPrice(product.pricePerKg, weight.grams);
  const subtotal = unit * qty;
  const delivery = deliveryFeeForGrams(weight.grams * qty);

  const buyNow = () => {
    const params = new URLSearchParams({
      products: `${product.id}:${weight.label}::${qty}`,
      total: String(subtotal + delivery),
    });
    navigate(`/checkout?${params.toString()}`);
  };

  const addToCart = () => {
    add(product.id, weight.label);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="border-2 border-odisha-black bg-white p-5">
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1.5 block">Weight</span>
        <div className="flex flex-wrap gap-2">
          {tiers.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setWeight(t)}
              className={`text-xs font-semibold px-3 py-1.5 border-2 transition-colors ${
                weight.label === t.label
                  ? "border-odisha-red bg-odisha-red text-white"
                  : "border-odisha-black text-odisha-black hover:bg-odisha-offwhite"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1.5 block">Quantity</span>
        <div className="inline-flex items-center border-2 border-odisha-black">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-odisha-offwhite" aria-label="Decrease">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(MAX_QUANTITY, q + 1))} className="p-2 hover:bg-odisha-offwhite" aria-label="Increase">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="border-t-2 border-odisha-black/10 pt-3 mb-4 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-odisha-black/60">Subtotal</span>
          <span className="font-semibold text-odisha-black">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-odisha-black/60">Delivery</span>
          <span className="text-odisha-black/60">₹{delivery.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={buyNow} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-odisha-red text-white text-sm font-semibold px-4 py-3 border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors">
          <Zap className="h-4 w-4" /> Buy Now
        </button>
        <button type="button" onClick={addToCart} className="inline-flex items-center justify-center gap-1.5 text-odisha-black text-sm font-semibold px-4 py-3 border-2 border-odisha-black hover:bg-odisha-offwhite transition-colors">
          <ShoppingCart className="h-4 w-4" /> {added ? "Added" : "Cart"}
        </button>
      </div>
    </div>
  );
}
