"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { farms, processingColors, processingLabels } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import type { EstateProduct } from "@/data/estate-products";
import { useCart } from "@/context/cart-context";
import { computeItemPrice, bulkDiscountForGrams } from "@/lib/pricing";

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
  const { add, isInCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setFarmId(defaultFarmId);
  }, [defaultFarmId]);

  const basePerKg = product.pricePerKg + product.shippingPerKg;
  const discount = bulkDiscountForGrams(selectedWeight.grams);
  const effectivePerKg = Math.round(basePerKg * (1 - discount));
  const totalPrice = computeItemPrice(effectivePerKg, selectedWeight.grams);
  const inCart = isInCart(product.id);

  const handleSelect = () => {
    add(product.id, selectedWeight.label, farmId);
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
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-odisha-black/50 ml-1">for {selectedWeight.label}</span>
          </div>
          {discount > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-odisha-green">
              -{Math.round(discount * 100)}%
            </span>
          )}
        </div>

        {/* Farm selector + select button */}
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
            onClick={inCart ? () => router.push("/cart") : handleSelect}
            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest border-2 transition-colors cursor-pointer ${
              inCart
                ? "bg-odisha-black border-odisha-black text-white hover:bg-odisha-red hover:border-odisha-red"
                : "bg-odisha-red border-odisha-red text-white hover:bg-odisha-black hover:border-odisha-black"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {inCart ? "In Cart — View" : "Select"}
          </button>
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
