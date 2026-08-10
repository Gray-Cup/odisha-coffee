"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Zap, ShoppingCart, Check } from "lucide-react";
import type { Spice } from "@/data/spices";
import { useCart } from "@/context/cart-context";
import { computeItemPrice, deliveryFeeForGrams } from "@/lib/pricing";

const MAX_QUANTITY = 20;

function SpiceCard({ spice }: { spice: Spice }) {
  const [selectedWeight, setSelectedWeight] = useState(spice.weightOptions[2] ?? spice.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();
  const { add } = useCart();

  const unitPrice = computeItemPrice(spice.pricePerKg, selectedWeight.grams);
  const subtotal = unitPrice * quantity;
  const delivery = deliveryFeeForGrams(selectedWeight.grams * quantity);
  const total = subtotal + delivery;

  const handleAddToCart = () => {
    add(spice.id, selectedWeight.label);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    const params = new URLSearchParams({
      products: `${spice.id}:${selectedWeight.label}::${quantity}`,
      total: String(total),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="border-2 border-odisha-black bg-white flex flex-col">
      <div className="relative h-48 bg-odisha-offwhite border-b-2 border-odisha-black overflow-hidden">
        {spice.image ? (
          <Image src={`/${spice.image}`} alt={spice.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-odisha-black/20 text-xs">No image</div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-serif font-bold text-odisha-black text-lg leading-snug mb-2">
          {spice.name}
        </h2>
        <p className="text-sm text-odisha-black/60 leading-relaxed mb-4 flex-1">
          {spice.description}
        </p>

        <div className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-2">
          Weight
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {spice.weightOptions.map((opt) => {
            const active = selectedWeight.label === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedWeight(opt)}
                className={`flex items-center justify-center px-1 py-1.5 text-[11px] font-bold border-2 transition-colors cursor-pointer ${
                  active
                    ? "bg-odisha-red border-odisha-red text-white"
                    : "bg-white border-odisha-black/20 text-odisha-black hover:border-odisha-black"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

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

        <div className="flex items-baseline justify-between border-t border-odisha-black/10 pt-3 mb-4">
          <span className="font-serif text-xl font-bold text-odisha-black">
            ₹{total.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-odisha-black/50">incl. delivery</span>
        </div>

        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.94 }}
            className="flex-1 relative flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black bg-white hover:bg-odisha-black hover:text-white transition-colors cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-odisha-red text-white text-xs font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export function SpicesCatalog({ spices }: { spices: Spice[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {spices.map((spice) => (
        <SpiceCard key={spice.id} spice={spice} />
      ))}
    </div>
  );
}
