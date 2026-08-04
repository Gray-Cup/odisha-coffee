"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import type { EstateProduct } from "@/data/estate-products";
import { useCart } from "@/context/cart-context";
import { computeItemPrice, deliveryFeeForGrams } from "@/lib/pricing";

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
  const [weightDrawerOpen, setWeightDrawerOpen] = useState(false);
  const { add, isInCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setFarmId(defaultFarmId);
  }, [defaultFarmId]);

  const farm = farms.find((f) => f.id === farmId) ?? farms[0];
  const totalPerKg = product.pricePerKg + product.shippingPerKg;
  const totalPrice = computeItemPrice(totalPerKg, selectedWeight.grams);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    add(product.id, selectedWeight.label, farmId);
    setWeightDrawerOpen(false);
  };

  const handleCheckout = () => {
    // Mirrors the roasted-coffee "Buy Now" flow: checkout is driven entirely
    // by the URL params below, not the persisted cart, so this is a one-off
    // purchase that skips adding the item to the cart.
    const price = totalPrice + deliveryFeeForGrams(selectedWeight.grams);
    const params = new URLSearchParams({
      products: `${product.id}:${selectedWeight.label}:${farmId}`,
      total: String(price),
    });
    setWeightDrawerOpen(false);
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="border-2 border-odisha-black bg-white flex flex-col">
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

        <div className="flex-1" />

        {/* Price */}
        <div className="mb-3 border-t border-odisha-black/10 pt-3">
          <span className="font-serif text-xl font-bold text-odisha-black">
            ₹{totalPerKg.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-odisha-black/50 ml-1">/ kg</span>
        </div>

        {/* Farm selector + quantity + cart actions */}
        <div className="space-y-2">
          <label className="block">
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

          <button
            type="button"
            onClick={() => setWeightDrawerOpen(true)}
            className="flex items-center justify-between gap-2 w-full px-3 py-2.5 bg-white text-odisha-black text-xs font-semibold border-2 border-odisha-black hover:border-odisha-red transition-colors cursor-pointer"
          >
            <span>Select Quantity — {selectedWeight.label}</span>
            <svg className="w-3.5 h-3.5 text-odisha-black/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={inCart ? () => router.push("/cart") : handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest py-2.5 border-2 transition-colors cursor-pointer ${
                inCart
                  ? "bg-odisha-black border-odisha-black text-white hover:bg-odisha-red hover:border-odisha-red"
                  : "bg-transparent border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest py-2.5 bg-odisha-red text-white border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Quantity bottom drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          weightDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setWeightDrawerOpen(false)} />
        <div
          className={`absolute bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-lg
          max-h-[80vh] overflow-y-auto rounded-t-2xl border-2 border-odisha-black bg-white p-6 pb-8 shadow-2xl
          transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${weightDrawerOpen ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"}`}
        >
          {/* Drag handle */}
          <div className="w-10 h-1.5 bg-odisha-black/15 rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif font-bold text-odisha-black text-base leading-snug pr-4">
              {product.name}
            </h3>
            <button
              className="p-1 border-2 border-odisha-black hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors shrink-0 cursor-pointer"
              onClick={() => setWeightDrawerOpen(false)}
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <span className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-2 block">
            Select Quantity
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {product.weightOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSelectedWeight(opt)}
                className={`px-3 py-3 text-sm font-semibold border-2 transition-colors cursor-pointer ${
                  selectedWeight.label === opt.label
                    ? "bg-odisha-red border-odisha-red text-white"
                    : "bg-white border-odisha-black text-odisha-black hover:bg-odisha-offwhite"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-5 border-2 border-odisha-black bg-odisha-offwhite p-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-odisha-black uppercase tracking-widest text-xs">
              Total for {selectedWeight.label}
            </span>
            <span className="font-serif text-2xl font-bold text-odisha-black">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-odisha-black text-sm font-bold uppercase tracking-widest border-2 border-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-odisha-red text-white text-sm font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              Checkout
            </button>
          </div>
        </div>
      </div>
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
