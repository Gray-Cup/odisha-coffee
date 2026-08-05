"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Zap } from "lucide-react";
import type { EstateProduct } from "@/data/estate-products";
import type { Farm } from "@/data/farms";
import { pricePerKgFor, computeItemPrice, deliveryFeeForGrams } from "@/lib/pricing";

const MAX_QUANTITY = 10;

export function ExclusiveOrderPanel({ product, farm }: { product: EstateProduct; farm: Farm }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[2] ?? product.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const resolved = { kind: "estate" as const, product, farm };
  const unitPerKg = pricePerKgFor(resolved, selectedWeight.grams);
  const unitPrice = computeItemPrice(unitPerKg, selectedWeight.grams);
  const subtotal = unitPrice * quantity;
  const delivery = deliveryFeeForGrams(selectedWeight.grams * quantity);
  const total = subtotal + delivery;

  const handleBuy = () => {
    const params = new URLSearchParams({
      products: `${product.id}:${selectedWeight.label}:${farm.id}:${quantity}`,
      total: String(total),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="p-5">
      <div className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-3">
        Price by Quantity — Select One
      </div>
      <div className="space-y-1.5 mb-4">
        {product.weightOptions.map((opt) => {
          const perKg = pricePerKgFor(resolved, opt.grams);
          const optTotal = computeItemPrice(perKg, opt.grams);
          const active = selectedWeight.label === opt.label;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSelectedWeight(opt)}
              className={`flex items-center justify-between w-full text-sm border-2 px-3 py-2 transition-colors cursor-pointer ${
                active
                  ? "bg-odisha-red border-odisha-red text-white"
                  : "bg-white border-odisha-black/20 text-odisha-black hover:border-odisha-black"
              }`}
            >
              <span className="font-semibold">{opt.label}</span>
              <span className={active ? "text-white/80 text-xs" : "text-odisha-black/50 text-xs"}>
                ₹{perKg.toLocaleString("en-IN")}/kg
              </span>
              <span className="font-bold">₹{optTotal.toLocaleString("en-IN")}</span>
            </button>
          );
        })}
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between border-2 border-odisha-black bg-odisha-offwhite px-3 py-2 mb-4">
        <span className="text-[10px] uppercase tracking-widest text-odisha-black/50">
          Quantity ({selectedWeight.label} each)
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-7 h-7 flex items-center justify-center border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="font-bold text-odisha-black text-sm w-5 text-center tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            disabled={quantity >= MAX_QUANTITY}
            className="w-7 h-7 flex items-center justify-center border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="border-2 border-odisha-black bg-odisha-offwhite p-4 space-y-1.5 mb-4">
        <div className="flex justify-between text-xs text-odisha-black/60">
          <span>Subtotal ({quantity} × {selectedWeight.label})</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-xs text-odisha-black/60">
          <span>Delivery</span>
          <span>₹{delivery.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between font-bold text-odisha-black text-base pt-1.5 border-t border-odisha-black/20">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBuy}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-odisha-red text-white text-sm font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer"
      >
        <Zap className="w-4 h-4" />
        Buy Now
      </button>
      <p className="text-[10px] text-odisha-black/40 text-center mt-3 leading-relaxed">
        Exclusively sourced from {farm.name}.{" "}
        <a href="/contact" className="underline hover:text-odisha-red">
          Need 50+ kg? Enquire here
        </a>
        .
      </p>
    </div>
  );
}
