"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Minus, Plus, Zap, X } from "lucide-react";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import type { EstateProduct } from "@/data/estate-products";
import { useCart } from "@/context/cart-context";
import { computeItemPrice, bulkDiscountForGrams, deliveryFeeForGrams } from "@/lib/pricing";

const MAX_QUANTITY = 20;

// ── Individual product card with its own farm dropdown ──────────────────────

function ProductCard({
  product,
  defaultFarmId,
}: {
  product: EstateProduct;
  defaultFarmId: string;
}) {
  const [farmId, setFarmId] = useState(defaultFarmId);
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[2] ?? product.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { add } = useCart();
  const router = useRouter();

  useEffect(() => {
    setFarmId(defaultFarmId);
  }, [defaultFarmId]);

  // Reset the quantity stepper whenever the drawer is reopened.
  useEffect(() => {
    if (drawerOpen) setQuantity(1);
  }, [drawerOpen]);

  const basePerKg = product.pricePerKg + product.shippingPerKg;
  const discount = bulkDiscountForGrams(selectedWeight.grams);
  const effectivePerKg = Math.round(basePerKg * (1 - discount));
  const unitPrice = computeItemPrice(effectivePerKg, selectedWeight.grams);
  const drawerSubtotal = unitPrice * quantity;
  const drawerDelivery = deliveryFeeForGrams(selectedWeight.grams * quantity);
  const drawerTotal = drawerSubtotal + drawerDelivery;

  const handleAddToCart = () => {
    add(product.id, selectedWeight.label, farmId);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const handleCheckout = () => {
    const params = new URLSearchParams({
      products: `${product.id}:${selectedWeight.label}:${farmId}:${quantity}`,
      total: String(drawerTotal),
    });
    setDrawerOpen(false);
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="relative border-2 border-odisha-black bg-white flex flex-col">
      {/* Image */}
      <div className="relative h-44 border-b-2 border-odisha-black overflow-hidden bg-odisha-offwhite">
        {product.image ? (
          <Image
            src={`/${product.image}`}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-odisha-black/20 text-xs">
            No image
          </div>
        )}
        {/* Overlay badges */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <span
            className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${processingColors[product.processing]}`}
          >
            {processingLabels[product.processing]}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 bg-odisha-green text-white">
            Green Bean
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span
            className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${
              product.availability === "in-stock"
                ? "bg-odisha-green text-white"
                : product.availability === "limited"
                ? "bg-odisha-yellow text-black"
                : "bg-[#1E3A8A] text-white"
            }`}
          >
            {product.availability === "in-stock"
              ? "In Stock"
              : product.availability === "limited"
              ? "Limited"
              : "Seasonal"}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-serif font-bold text-odisha-black text-base leading-snug mb-2">
          {product.name}
        </h3>

        {/* Weight chips — each shows its own discounted ₹/kg rate */}
        <div className="mb-3">
          <span className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1.5 block">
            Select Weight
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {product.weightOptions.map((opt) => {
              const optDiscount = bulkDiscountForGrams(opt.grams);
              const optPerKg = Math.round(basePerKg * (1 - optDiscount));
              const active = selectedWeight.label === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedWeight(opt)}
                  className={`flex flex-col items-center justify-center gap-0.5 px-1 py-1.5 border-2 transition-colors cursor-pointer ${
                    active
                      ? "bg-odisha-red border-odisha-red text-white"
                      : "bg-white border-odisha-black/20 text-odisha-black hover:border-odisha-black"
                  }`}
                >
                  <span className="text-[11px] font-bold leading-none">{opt.label}</span>
                  <span className={`text-[9px] leading-none ${active ? "text-white/80" : "text-odisha-black/50"}`}>
                    ₹{optPerKg.toLocaleString("en-IN")}/kg
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1" />

        {/* Price for selected weight */}
        <div className="mb-3 border-t border-odisha-black/10 pt-3 flex items-end justify-between">
          <div>
            <span className="font-serif text-xl font-bold text-odisha-black">
              ₹{unitPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-odisha-black/50 ml-1">for {selectedWeight.label}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-odisha-black/40">
            ₹{effectivePerKg.toLocaleString("en-IN")}/kg
          </span>
        </div>

        {/* Farm selector */}
        <label className="block mb-2">
          <span className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1 block">
            Select Farm
          </span>
          <select
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            className="w-full border-2 border-odisha-black bg-white px-3 py-2 text-xs font-medium text-odisha-black focus:outline-none focus:border-odisha-red cursor-pointer"
          >
            {farms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} — {f.region}
              </option>
            ))}
          </select>
        </label>

        {/* Select (multi-quantity, skip-cart checkout) + Add to Cart */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black bg-white hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
          >
            Select
          </button>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.94 }}
            className="flex-1 relative flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-red bg-odisha-red text-white hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer overflow-hidden"
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
        </div>
      </div>

      {/* Quantity drawer — pick qty, see total, checkout directly (skips cart) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-md
              max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border-2 border-odisha-black bg-white p-6 pb-8 shadow-2xl z-50"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "110%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="w-10 h-1.5 bg-odisha-black/15 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif font-bold text-odisha-black text-base leading-snug pr-4">
                  {product.name}
                </h3>
                <button
                  className="p-1 border-2 border-odisha-black hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors shrink-0 cursor-pointer"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-2 block">
                Select Weight
              </span>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedWeight(opt)}
                    className={`px-2 py-2.5 text-sm font-semibold border-2 transition-colors cursor-pointer ${
                      selectedWeight.label === opt.label
                        ? "bg-odisha-red border-odisha-red text-white"
                        : "bg-white border-odisha-black text-odisha-black hover:bg-odisha-offwhite"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <span className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-2 block">
                Quantity
              </span>
              <div className="flex items-center gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-serif text-2xl font-bold text-odisha-black w-12 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={quantity >= MAX_QUANTITY}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-xs text-odisha-black/50 ml-1">
                  × {selectedWeight.label} = {((selectedWeight.grams * quantity) / 1000).toFixed(quantity * selectedWeight.grams % 1000 === 0 ? 0 : 2)} kg
                </span>
              </div>

              <div className="border-2 border-odisha-black bg-odisha-offwhite p-4 space-y-1.5 mb-4">
                <div className="flex justify-between text-xs text-odisha-black/60">
                  <span>Subtotal ({quantity} × {selectedWeight.label})</span>
                  <span>₹{drawerSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-odisha-black/60">
                  <span>Delivery</span>
                  <span>₹{drawerDelivery.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-odisha-black text-base pt-1.5 border-t border-odisha-black/20">
                  <span>Total</span>
                  <span>₹{drawerTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-odisha-red text-white text-sm font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Proceed to Checkout
              </button>
              <p className="text-[10px] text-odisha-black/40 text-center mt-3">
                This buys directly — it won&apos;t be added to your cart.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main catalog ─────────────────────────────────────────────────────────────

export function ProductsCatalog() {
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  const selectedFarm = selectedFarmId
    ? (farms.find((f) => f.id === selectedFarmId) ?? null)
    : null;

  const defaultFarmId = selectedFarm?.id ?? farms[0].id;

  return (
    <div>
      {/* Farm filter switches */}
      <div className="bg-white border-b-2 border-odisha-black sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* ALL button */}
            <button
              onClick={() => setSelectedFarmId(null)}
              className={`shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest border-2 transition-colors whitespace-nowrap cursor-pointer ${
                selectedFarmId === null
                  ? "bg-odisha-black text-white border-odisha-black"
                  : "bg-white text-odisha-black border-odisha-black hover:bg-odisha-offwhite"
              }`}
            >
              All
            </button>

            {/* One button per farm */}
            {farms.map((farm) => (
              <button
                key={farm.id}
                onClick={() => setSelectedFarmId(farm.id)}
                className={`shrink-0 px-3 py-1.5 text-[11px] font-medium border-2 transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFarmId === farm.id
                    ? "bg-odisha-red text-white border-odisha-red"
                    : "bg-white text-odisha-black border-odisha-black/25 hover:border-odisha-black"
                }`}
              >
                {farm.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected farm context banner */}
      {selectedFarm && (
        <div className="bg-odisha-red/5 border-b-2 border-odisha-red/20">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-odisha-red font-bold mb-0.5">
                Showing products from
              </div>
              <div className="font-serif font-bold text-odisha-black text-base leading-tight">
                {selectedFarm.name}
              </div>
              <div className="text-xs text-odisha-black/50">
                {selectedFarm.region}, {selectedFarm.district} · {selectedFarm.elevation}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link
                href={`/farms/${selectedFarm.id}`}
                className="text-xs text-odisha-black/50 hover:text-odisha-red transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Farm Profile →
              </Link>
              <button
                onClick={() => setSelectedFarmId(null)}
                className="text-[10px] text-odisha-black/40 hover:text-odisha-black transition-colors uppercase tracking-widest whitespace-nowrap cursor-pointer"
              >
                × Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product grid */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-odisha-black/60">
              {estateProducts.length} products · available from all {farms.length} partner farms
            </p>
            {selectedFarm && (
              <span className="text-xs font-medium text-odisha-red border border-odisha-red px-2 py-0.5">
                {selectedFarm.name} selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {estateProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                defaultFarmId={defaultFarmId}
              />
            ))}
          </div>

          {/* Roasted coffee nudge */}
          <div className="mt-12 border-2 border-odisha-black p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-1">
                Looking for
              </div>
              <h3 className="font-serif font-bold text-odisha-black text-lg">
                Roasted Coffee?
              </h3>
              <p className="text-sm text-odisha-black/60 mt-1">
                Specialty roasted lots, espresso blends, and seasonal micro-lots from the Gray Cup Roastery.
              </p>
            </div>
            <Link
              href="/roasted-coffee"
              className="shrink-0 inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
            >
              Roasted Coffee →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
