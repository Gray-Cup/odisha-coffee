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

// A line picked with "Select" for the multi-product quick-checkout flow —
// kept entirely separate from the persistent cart. Keyed by product+weight+
// farm (see `lineKey`) so 1kg and 500g of the same product are two
// independent lines instead of one overwriting the other.
type SelectionLine = {
  key: string;
  productId: string;
  weight: string;
  grams: number;
  farmId: string;
  quantity: number;
  unitPrice: number;
};

function lineKey(productId: string, weight: string, farmId: string): string {
  return `${productId}::${weight}::${farmId}`;
}

// Selections (from "Select") are cached to the browser for 30 minutes, so a
// reload or an accidental tab close doesn't lose them — mirrors the cart's
// own localStorage persistence but with a hard expiry since these are meant
// to be a short-lived quick-checkout list, not a permanent cart.
const SELECTIONS_STORAGE_KEY = "odisha_selections";
const SELECTIONS_TTL_MS = 30 * 60 * 1000;

function loadStoredSelections(): Record<string, SelectionLine> {
  try {
    const raw = localStorage.getItem(SELECTIONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.savedAt !== "number" || !parsed.selections) return {};
    if (Date.now() - parsed.savedAt > SELECTIONS_TTL_MS) {
      localStorage.removeItem(SELECTIONS_STORAGE_KEY);
      return {};
    }
    return parsed.selections;
  } catch {
    return {};
  }
}

// ── Individual product card with its own farm dropdown ──────────────────────

function ProductCard({
  product,
  defaultFarmId,
  hasSelection,
  onAddLine,
}: {
  product: EstateProduct;
  defaultFarmId: string;
  hasSelection: boolean;
  onAddLine: (line: SelectionLine) => void;
}) {
  const [farmId, setFarmId] = useState(defaultFarmId);
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[2] ?? product.weightOptions[0]);
  const [justAdded, setJustAdded] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    setFarmId(defaultFarmId);
  }, [defaultFarmId]);

  const basePerKg = product.pricePerKg + product.shippingPerKg;
  const discount = bulkDiscountForGrams(selectedWeight.grams);
  const effectivePerKg = Math.round(basePerKg * (1 - discount));
  const unitPrice = computeItemPrice(effectivePerKg, selectedWeight.grams);

  const handleSelect = () => {
    onAddLine({
      key: lineKey(product.id, selectedWeight.label, farmId),
      productId: product.id,
      weight: selectedWeight.label,
      grams: selectedWeight.grams,
      farmId,
      quantity: 1,
      unitPrice,
    });
  };

  const handleAddToCart = () => {
    add(product.id, selectedWeight.label, farmId);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className={`relative border-2 bg-white flex flex-col transition-colors ${hasSelection ? "border-odisha-red" : "border-odisha-black"}`}>
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

        {/* Select (adds this weight/farm as its own line) + Add to Cart */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSelect}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black bg-white hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
          >
            Select
          </button>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.94 }}
            className="flex-1 relative flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-black bg-odisha-black text-white hover:bg-odisha-red hover:border-odisha-red transition-colors cursor-pointer overflow-hidden"
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
    </div>
  );
}

// ── Main catalog ─────────────────────────────────────────────────────────────

export function ProductsCatalog() {
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, SelectionLine>>({});
  const [itemsDialogOpen, setItemsDialogOpen] = useState(false);
  const router = useRouter();

  // Restore any not-yet-expired selections after mount (avoids a
  // server/client hydration mismatch from reading localStorage during render).
  useEffect(() => {
    const restored = loadStoredSelections();
    if (Object.keys(restored).length > 0) setSelections(restored);
  }, []);

  // Re-cache on every change, refreshing the 30-minute expiry window.
  useEffect(() => {
    if (Object.keys(selections).length === 0) {
      localStorage.removeItem(SELECTIONS_STORAGE_KEY);
      return;
    }
    localStorage.setItem(SELECTIONS_STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), selections }));
  }, [selections]);

  const selectedFarm = selectedFarmId
    ? (farms.find((f) => f.id === selectedFarmId) ?? null)
    : null;

  const defaultFarmId = selectedFarm?.id ?? farms[0].id;

  const selectionLines = Object.values(selections);
  const selectionCount = selectionLines.length;
  const selectionSubtotal = selectionLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const selectionGrams = selectionLines.reduce((sum, l) => sum + l.grams * l.quantity, 0);
  const selectionDelivery = selectionCount > 0 ? deliveryFeeForGrams(selectionGrams) : 0;
  const selectionTotal = selectionSubtotal + selectionDelivery;

  const addLine = (line: SelectionLine) => {
    setSelections((prev) => {
      const existing = prev[line.key];
      if (existing) {
        return {
          ...prev,
          [line.key]: { ...existing, quantity: Math.min(MAX_QUANTITY, existing.quantity + 1) },
        };
      }
      return { ...prev, [line.key]: line };
    });
  };

  const removeLine = (key: string) => {
    setSelections((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const changeLineQuantity = (key: string, delta: number) => {
    setSelections((prev) => {
      const existing = prev[key];
      if (!existing) return prev;
      const quantity = Math.min(MAX_QUANTITY, Math.max(1, existing.quantity + delta));
      return { ...prev, [key]: { ...existing, quantity } };
    });
  };

  const handleProceedToCheckout = () => {
    const products = selectionLines
      .map((l) => `${l.productId}:${l.weight}:${l.farmId}:${l.quantity}`)
      .join(",");
    router.push(`/checkout?products=${encodeURIComponent(products)}&total=${selectionTotal}`);
  };

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
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 pb-28">
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
                hasSelection={selectionLines.some((l) => l.productId === product.id)}
                onAddLine={addLine}
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

      {/* Multi-select checkout bar — everything picked with "Select" across
          any number of cards (and any number of weights per card), checked
          out together, never touching the cart. */}
      <AnimatePresence>
        {selectionCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-odisha-black bg-white shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center justify-between sm:justify-start sm:gap-4 flex-1">
                <span className="text-sm font-semibold text-odisha-black">
                  {selectionCount} {selectionCount === 1 ? "line" : "lines"} selected
                </span>
                <span className="font-serif text-lg font-bold text-odisha-black">
                  ₹{selectionTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelections({})}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setItemsDialogOpen(true)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
                >
                  Show Items
                </button>
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-odisha-red text-white text-xs font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big dialog listing every selected line, with its own quantity/remove controls */}
      <AnimatePresence>
        {itemsDialogOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemsDialogOpen(false)}
            />
            <motion.div
              className="fixed inset-2 sm:inset-x-auto sm:inset-y-0 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
              sm:w-full sm:max-w-3xl sm:h-[94vh] h-[98vh] rounded-2xl border-2 border-odisha-black bg-white shadow-2xl z-[60] flex flex-col"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-center justify-between border-b-2 border-odisha-black px-4 py-2.5 shrink-0">
                <h2 className="font-serif text-base font-bold text-odisha-black">
                  Selected Items <span className="text-odisha-black/40 font-normal text-sm">({selectionCount})</span>
                </h2>
                <button
                  className="p-1 border-2 border-odisha-black hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors cursor-pointer"
                  onClick={() => setItemsDialogOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {selectionLines.length === 0 ? (
                  <p className="text-sm text-odisha-black/50 text-center py-8">No items selected.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectionLines.map((line) => {
                      const product = estateProducts.find((p) => p.id === line.productId);
                      const farm = farms.find((f) => f.id === line.farmId);
                      return (
                        <div
                          key={line.key}
                          className="relative flex flex-col border-2 border-odisha-black p-2.5"
                        >
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center bg-white border-2 border-odisha-black text-odisha-black/50 hover:text-odisha-red transition-colors cursor-pointer z-10"
                            aria-label="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>

                          <div className="relative w-full aspect-square border-2 border-odisha-black overflow-hidden bg-odisha-offwhite mb-2">
                            {product?.image && (
                              <Image src={`/${product.image}`} alt={product.name} fill className="object-cover" />
                            )}
                          </div>

                          <p className="font-serif font-bold text-odisha-black text-xs leading-snug line-clamp-2 mb-0.5">
                            {product?.name ?? line.productId}
                          </p>
                          <p className="text-[10px] text-odisha-black/50 mb-2">
                            {line.weight} · {farm?.name.split(/\s+/).slice(0, 2).join(" ") ?? "Unknown farm"}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => changeLineQuantity(line.key, -1)}
                                disabled={line.quantity <= 1}
                                className="w-5 h-5 flex items-center justify-center border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-bold text-odisha-black text-xs w-4 text-center tabular-nums">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => changeLineQuantity(line.key, 1)}
                                disabled={line.quantity >= MAX_QUANTITY}
                                className="w-5 h-5 flex items-center justify-center border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                            <span className="font-serif font-bold text-odisha-black text-xs">
                              ₹{(line.unitPrice * line.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectionLines.length > 0 && (
                <div className="border-t-2 border-odisha-black px-4 py-2.5 shrink-0 flex items-center gap-3">
                  <span className="font-bold text-odisha-black text-sm whitespace-nowrap">
                    Total ₹{selectionTotal.toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-odisha-red text-white text-[11px] font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
