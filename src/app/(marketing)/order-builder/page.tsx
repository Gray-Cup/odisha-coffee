"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { estateProducts } from "@/data/estate-products";
import { farms, getFarmBySlug } from "@/data/farms";
import {
  resolveCartProduct,
  tiersFor,
  pricePerKgFor,
  computeItemPrice,
  deliveryFeeForGrams,
  type ResolvedCartItem,
} from "@/lib/pricing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// URL-only order builder: the whole cart lives in the query string as
// short "productId:weight:farmId:qty" entries (farmId/qty omitted when not
// needed) - no database, no localStorage. Reloading, sharing, or bookmarking
// the URL reproduces the exact same cart. This page is intentionally only
// linked from the footer and isn't part of the normal browse/buy flow.

type BuilderItem = { productId: string; weight: string; farmId?: string; quantity: number };

const catalogue = [
  ...products.map((p) => ({ id: p.id, name: p.name, kind: "product" as const })),
  ...estateProducts.map((p) => ({ id: p.id, name: p.name, kind: "estate" as const })),
];

function encodeItem(it: BuilderItem): string {
  const parts = [it.productId, it.weight, it.farmId ?? "", it.quantity > 1 ? String(it.quantity) : ""];
  while (parts.length > 2 && parts[parts.length - 1] === "") parts.pop();
  return parts.join(":");
}

function decodeItems(param: string): BuilderItem[] {
  if (!param) return [];
  return param.split(",").flatMap((entry) => {
    const [productId, weight, farmId, qty] = entry.split(":");
    if (!productId || !weight) return [];
    const resolved = resolveCartProduct(productId, farmId || undefined);
    if (!resolved) return [];
    const tiers = tiersFor(resolved);
    const tier = tiers.find((t) => t.label === weight) ?? tiers[0];
    const quantity = qty ? Math.max(1, Math.floor(Number(qty)) || 1) : 1;
    return [{ productId, weight: tier.label, farmId: farmId || undefined, quantity }];
  });
}

function imageSrcFor(resolved: ResolvedCartItem): string | null {
  if (resolved.kind === "product") return resolved.product.image ? `/products/${resolved.product.image}` : null;
  return resolved.product.image ? `/${resolved.product.image}` : null;
}

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<BuilderItem[]>(() => decodeItems(searchParams.get("items") || ""));

  // Add-item form state
  const [productId, setProductId] = useState(catalogue[0]?.id ?? "");
  const [farmId, setFarmId] = useState(farms[0]?.id ?? "");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState(1);

  const resolved = resolveCartProduct(productId, farmId);
  const isEstate = resolved?.kind === "estate";
  const exclusiveFarmId = isEstate ? resolved.product.exclusiveFarmId : undefined;
  const effectiveFarmId = exclusiveFarmId ?? farmId;
  const tiers = resolved ? tiersFor(resolved) : [];

  // Reset weight to a valid tier whenever the selected product changes.
  useEffect(() => {
    if (tiers.length > 0 && !tiers.some((t) => t.label === weight)) {
      setWeight(tiers[0].label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, tiers.length]);

  // Keep the URL in sync with the cart - short, shareable, no storage.
  useEffect(() => {
    const qs = items.length > 0 ? `?items=${items.map(encodeItem).join(",")}` : "";
    router.replace(`/order-builder${qs}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const rows = useMemo(() => {
    return items.flatMap((it) => {
      const r = resolveCartProduct(it.productId, it.farmId);
      if (!r) return [];
      const t = tiersFor(r).find((x) => x.label === it.weight);
      if (!t) return [];
      const price = computeItemPrice(pricePerKgFor(r, t.grams), t.grams) * it.quantity;
      return [{ item: it, resolved: r, grams: t.grams, price }];
    });
  }, [items]);

  const subtotal = rows.reduce((s, r) => s + r.price, 0);
  const totalGrams = rows.reduce((s, r) => s + r.grams * r.item.quantity, 0);
  const deliveryFee = rows.length > 0 ? deliveryFeeForGrams(totalGrams) : 0;
  const total = subtotal + deliveryFee;

  function addItem() {
    if (!resolved || !weight) return;
    const newFarmId = isEstate ? effectiveFarmId : undefined;
    setItems((prev) => {
      const idx = prev.findIndex(
        (it) => it.productId === productId && it.weight === weight && it.farmId === newFarmId
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { productId, weight, farmId: newFarmId, quantity }];
    });
    setQuantity(1);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function proceedToCheckout() {
    if (rows.length === 0) return;
    const productsParam = items.map(encodeItem).join(",");
    router.push(`/checkout?products=${encodeURIComponent(productsParam)}&total=${total}`);
  }

  return (
    <div>
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">Order Builder</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">Order Builder</h1>
          <p className="text-white/70 text-sm mt-2 max-w-xl">
            Build a custom order across any of our products or estate lots. Your selection lives entirely in this
            page&apos;s URL — share or bookmark the link to save it, no account needed.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Add item form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="border-2 border-odisha-black bg-white p-5">
              <h2 className="font-serif font-bold text-odisha-black text-base mb-4 pb-3 border-b-2 border-odisha-black uppercase tracking-widest text-sm">
                Add an Item
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 block">Product</span>
                  <Select value={productId} onValueChange={setProductId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                      {estateProducts.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name} (Estate Lot)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {isEstate && !exclusiveFarmId && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 block">Farm</span>
                    <Select value={farmId} onValueChange={setFarmId}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {farms.map((f) => (
                          <SelectItem key={f.id} value={f.id}>{f.name} — {f.region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {isEstate && exclusiveFarmId && (
                  <p className="text-[10px] text-odisha-black/50">
                    Exclusively sourced from {getFarmBySlug(exclusiveFarmId)?.name ?? exclusiveFarmId}.
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 block">Weight</span>
                    <Select value={weight} onValueChange={setWeight}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiers.map((t) => (
                          <SelectItem key={t.label} value={t.label}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-odisha-black/50 block">Quantity</span>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.floor(Number(e.target.value)) || 1))}
                      className="w-full border-2 border-odisha-black bg-white px-3 py-2 text-xs font-medium text-odisha-black outline-none focus:border-odisha-red"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  disabled={!resolved || !weight}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-odisha-red text-white text-xs font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            </div>

            {/* Items list */}
            {rows.length > 0 && (
              <div className="border-2 border-odisha-black bg-white p-5">
                <h2 className="font-serif font-bold text-odisha-black text-base mb-4 pb-3 border-b-2 border-odisha-black uppercase tracking-widest text-sm">
                  Your Items ({rows.length})
                </h2>
                <div className="space-y-3">
                  {rows.map(({ item, resolved, price }, i) => {
                    const image = imageSrcFor(resolved);
                    return (
                      <div key={`${item.productId}:${item.weight}:${item.farmId ?? ""}`} className="flex items-center gap-3">
                        <div className="w-12 h-12 border-2 border-odisha-black shrink-0 overflow-hidden relative bg-odisha-offwhite">
                          {image && <Image src={image} alt={resolved.product.name} fill className="object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-odisha-black leading-snug truncate">{resolved.product.name}</p>
                          {resolved.kind === "estate" && (
                            <p className="text-[10px] text-odisha-black/50">From {resolved.farm.name}</p>
                          )}
                          <p className="text-[10px] text-odisha-black/50 mt-0.5">
                            {item.weight}{item.quantity > 1 ? ` × ${item.quantity}` : ""}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-odisha-black whitespace-nowrap">
                          ₹{price.toLocaleString("en-IN")}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="text-odisha-black/40 hover:text-odisha-red transition-colors cursor-pointer shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="border-2 border-odisha-black bg-white p-6 sticky top-24">
              <h2 className="font-serif font-bold text-odisha-black text-base mb-5 pb-3 border-b-2 border-odisha-black uppercase tracking-widest text-sm">
                Order Summary
              </h2>
              {rows.length === 0 ? (
                <p className="text-xs text-odisha-black/50">Add items to see your order total.</p>
              ) : (
                <div className="border-t-2 border-odisha-black pt-4 space-y-1.5 -mt-1">
                  <div className="flex justify-between text-xs text-odisha-black/60">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-odisha-black/60">
                    <span>Delivery</span>
                    <span>₹{deliveryFee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-odisha-black text-base pt-1.5 border-t border-odisha-black/10">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={proceedToCheckout}
                disabled={rows.length === 0}
                className="w-full mt-5 flex items-center justify-center gap-2 h-12 bg-odisha-red text-white font-semibold text-sm uppercase tracking-widest border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-odisha-black/40 mt-3 text-center">
                This cart isn&apos;t saved anywhere — bookmark or copy this page&apos;s URL to keep it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function OrderBuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-odisha-black/40">Loading…</div>}>
      <BuilderContent />
    </Suspense>
  );
}
