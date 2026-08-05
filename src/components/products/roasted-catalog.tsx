"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Minus, Plus, Zap, X } from "lucide-react";
import { processingColors, processingLabels } from "@/data/farms";
import { roastLabels, availabilityColors, availabilityLabels, type Product } from "@/data/products";
import { useCart, ROASTED_TIERS } from "@/context/cart-context";
import { computeItemPrice, deliveryFeeForGrams } from "@/lib/pricing";

const MAX_QUANTITY = 20;

// Mirrors the "Select" quick-checkout flow on /buy-green-beans (see
// products-catalog.tsx) so both catalogues behave the same way: "Select"
// builds an ephemeral multi-product checkout line (never touching the
// persistent cart), "Add to Cart" adds straight to the cart. Roasted lots
// don't have a farm picker (each product is already tied to one roastery
// batch), so a line is keyed by product+weight only.
type SelectionLine = {
  key: string;
  productId: string;
  weight: string;
  grams: number;
  quantity: number;
  unitPrice: number;
};

function lineKey(productId: string, weight: string): string {
  return `${productId}::${weight}`;
}

const SELECTIONS_STORAGE_KEY = "odisha_roasted_selections";
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

// ── Individual product card with weight chips + Select/Add to Cart ─────────

function RoastedProductCard({
  product,
  hasSelection,
  onAddLine,
}: {
  product: Product;
  hasSelection: boolean;
  onAddLine: (line: SelectionLine) => void;
}) {
  const [selectedWeight, setSelectedWeight] = useState<(typeof ROASTED_TIERS)[number]>(ROASTED_TIERS[2] ?? ROASTED_TIERS[0]);
  const [justAdded, setJustAdded] = useState(false);
  const { add } = useCart();

  const unitPrice = computeItemPrice(product.pricePerKg, selectedWeight.grams);

  const handleSelect = () => {
    onAddLine({
      key: lineKey(product.id, selectedWeight.label),
      productId: product.id,
      weight: selectedWeight.label,
      grams: selectedWeight.grams,
      quantity: 1,
      unitPrice,
    });
  };

  const handleAddToCart = () => {
    add(product.id, selectedWeight.label);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className={`border-2 -ml-[2px] -mt-[2px] bg-white flex flex-col transition-colors ${hasSelection ? "border-odisha-red" : "border-odisha-black"}`}>
      <div className="relative h-40 bg-odisha-offwhite border-b-2 border-odisha-black overflow-hidden">
        {product.image ? (
          <Image src={`/products/${product.image}`} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-odisha-black/20 text-xs">No image</div>
        )}
        <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${availabilityColors[product.availability]}`}>
          {availabilityLabels[product.availability]}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-odisha-black text-sm leading-snug mb-2">{product.name}</h3>

        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
            {processingLabels[product.processing]}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 bg-odisha-offwhite border border-odisha-black/30 text-odisha-black">
            {roastLabels[product.roastLevel]}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3 flex-1">
          {product.flavorNotes.slice(0, 3).map((note) => (
            <span key={note} className="text-[10px] px-1.5 py-0.5 bg-odisha-offwhite border border-odisha-black/20 text-odisha-black/60">
              {note}
            </span>
          ))}
        </div>

        <div className="border-t-2 border-odisha-black pt-3 mt-auto space-y-2">
          {/* Weight chips */}
          <div className="grid grid-cols-4 gap-1.5">
            {ROASTED_TIERS.map((opt) => {
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
                </button>
              );
            })}
          </div>

          <div className="flex items-end justify-between">
            <span className="font-serif text-lg font-bold text-odisha-black">
              ₹{unitPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-odisha-black/40">for {selectedWeight.label}</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSelect}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black bg-white hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
            >
              Select
            </button>

            <motion.button
              type="button"
              onClick={handleAddToCart}
              whileTap={{ scale: 0.94 }}
              className="flex-1 relative flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-odisha-black bg-odisha-black text-white hover:bg-odisha-red hover:border-odisha-red transition-colors cursor-pointer overflow-hidden"
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
    </div>
  );
}

// ── Specialty & Seasonal card (larger, with farm link + brewing notes) ─────

function SpecialtyProductCard({
  product,
  hasSelection,
  onAddLine,
}: {
  product: Product;
  hasSelection: boolean;
  onAddLine: (line: SelectionLine) => void;
}) {
  const [selectedWeight, setSelectedWeight] = useState<(typeof ROASTED_TIERS)[number]>(ROASTED_TIERS[2] ?? ROASTED_TIERS[0]);
  const [justAdded, setJustAdded] = useState(false);
  const { add } = useCart();

  const unitPrice = computeItemPrice(product.pricePerKg, selectedWeight.grams);

  const handleSelect = () => {
    onAddLine({
      key: lineKey(product.id, selectedWeight.label),
      productId: product.id,
      weight: selectedWeight.label,
      grams: selectedWeight.grams,
      quantity: 1,
      unitPrice,
    });
  };

  const handleAddToCart = () => {
    add(product.id, selectedWeight.label);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className={`border-2 -ml-[2px] -mt-[2px] p-6 bg-odisha-offwhite transition-colors ${hasSelection ? "border-odisha-red" : "border-odisha-black"}`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h3 className="font-serif font-bold text-odisha-black text-lg">{product.name}</h3>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${availabilityColors[product.availability]}`}>
          {availabilityLabels[product.availability]}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 ${processingColors[product.processing]}`}>
          {processingLabels[product.processing]}
        </span>
      </div>

      <div className="text-xs text-odisha-black/60 space-y-1 mb-3">
        <p><span className="font-medium text-odisha-black/80">Farm:</span>{" "}
          <Link href={`/farms/${product.farmId}`} className="hover:text-odisha-red transition-colors">{product.farmName}</Link>
        </p>
        <p><span className="font-medium text-odisha-black/80">Variety:</span> {product.variety}</p>
        <p><span className="font-medium text-odisha-black/80">Roast:</span> {roastLabels[product.roastLevel]}</p>
      </div>

      <p className="text-xs text-odisha-black/60 leading-relaxed mb-3">{product.description}</p>

      <div className="border-t border-odisha-black/10 pt-3 mb-4">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-odisha-black/40 mb-1.5">Brewing Notes</div>
        <p className="text-xs text-odisha-black/55 leading-relaxed">{product.brewingNotes}</p>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-1.5">
          {ROASTED_TIERS.map((opt) => {
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
              </button>
            );
          })}
        </div>

        <div className="flex items-end justify-between">
          <span className="font-serif text-lg font-bold text-odisha-black">
            ₹{unitPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-odisha-black/40">for {selectedWeight.label}</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSelect}
            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-odisha-black text-odisha-black bg-white hover:bg-odisha-black hover:text-white transition-colors cursor-pointer"
          >
            Select
          </button>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.94 }}
            className="flex-1 relative flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-odisha-black bg-odisha-black text-white hover:bg-odisha-red hover:border-odisha-red transition-colors cursor-pointer overflow-hidden"
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

// ── Main interactive section: grids + floating selection bar + dialog ──────

export function RoastedCatalog({
  roastedProducts,
  specialtyLots,
}: {
  roastedProducts: Product[];
  specialtyLots: Product[];
}) {
  const [selections, setSelections] = useState<Record<string, SelectionLine>>({});
  const [itemsDialogOpen, setItemsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const restored = loadStoredSelections();
    if (Object.keys(restored).length > 0) setSelections(restored);
  }, []);

  useEffect(() => {
    if (Object.keys(selections).length === 0) {
      localStorage.removeItem(SELECTIONS_STORAGE_KEY);
      return;
    }
    localStorage.setItem(SELECTIONS_STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), selections }));
  }, [selections]);

  const selectionLines = Object.values(selections);
  const selectionCount = selectionLines.length;
  const selectionSubtotal = selectionLines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const selectionGrams = selectionLines.reduce((sum, l) => sum + l.grams * l.quantity, 0);
  const selectionDelivery = selectionCount > 0 ? deliveryFeeForGrams(selectionGrams) : 0;
  const selectionTotal = selectionSubtotal + selectionDelivery;

  const allProducts = [...roastedProducts, ...specialtyLots];

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
      .map((l) => `${l.productId}:${l.weight}::${l.quantity}`)
      .join(",");
    router.push(`/checkout?products=${encodeURIComponent(products)}&total=${selectionTotal}`);
  };

  return (
    <div>
      {/* Roasted grid */}
      <section className="bg-odisha-offwhite border-b-2 border-odisha-black pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-odisha-red" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black">Roasted Lots</h2>
              <p className="text-xs text-odisha-black/50 mt-0.5">Small-batch roasted, dispatched fresh within 48 hours of roast</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
            {roastedProducts.map((product) => (
              <RoastedProductCard
                key={product.id}
                product={product}
                hasSelection={selectionLines.some((l) => l.productId === product.id)}
                onAddLine={addLine}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Specialty & Seasonal */}
      {specialtyLots.length > 0 && (
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-odisha-yellow" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-odisha-black">Specialty & Seasonal Lots</h2>
                <p className="text-xs text-odisha-black/50 mt-0.5">Single-farm micro-lots, limited availability</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {specialtyLots.map((product) => (
                <SpecialtyProductCard
                  key={product.id}
                  product={product}
                  hasSelection={selectionLines.some((l) => l.productId === product.id)}
                  onAddLine={addLine}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Multi-select checkout bar */}
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

      {/* Items dialog */}
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
                      const product = allProducts.find((p) => p.id === line.productId);
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
                              <Image src={`/products/${product.image}`} alt={product.name} fill className="object-cover" />
                            )}
                          </div>

                          <p className="font-serif font-bold text-odisha-black text-xs leading-snug line-clamp-2 mb-0.5">
                            {product?.name ?? line.productId}
                          </p>
                          <p className="text-[10px] text-odisha-black/50 mb-2">{line.weight}</p>

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
