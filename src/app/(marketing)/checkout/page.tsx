"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckoutForm } from "@/components/checkout-form";
import {
  resolveCartProduct,
  tiersFor,
  pricePerKgFor,
  computeItemPrice,
  deliveryFeeForGrams,
  type ResolvedCartItem,
} from "@/lib/pricing";

type CheckoutRow = { resolved: ResolvedCartItem; weight: string; price: number; grams: number; entry: string };

function imageSrcFor(resolved: ResolvedCartItem): string | null {
  if (resolved.kind === "product") return resolved.product.image ? `/products/${resolved.product.image}` : null;
  return resolved.product.image ? `/${resolved.product.image}` : null;
}

function CheckoutContent() {
  const params = useSearchParams();
  const productsParam = params.get("products") || "";

  const cartItems: CheckoutRow[] = useMemo(() => {
    if (!productsParam) return [];
    return productsParam.split(",").flatMap((entry) => {
      const [productId, weight, farmId] = entry.split(":");
      const resolved = resolveCartProduct(productId, farmId);
      if (!resolved) return [];
      const tiers = tiersFor(resolved);
      const tier  = tiers.find((t) => t.label === weight) ?? tiers[0];
      const price = computeItemPrice(pricePerKgFor(resolved, tier.grams), tier.grams);
      return [{ resolved, weight: tier.label, price, grams: tier.grams, entry }];
    });
  }, [productsParam]);

  const productStrings = cartItems.map((i) => i.entry);
  const subtotal = cartItems.reduce((s, i) => s + i.price, 0);
  const totalGrams = cartItems.reduce((s, i) => s + i.grams, 0);
  const deliveryFee = deliveryFeeForGrams(totalGrams);
  const total = subtotal + deliveryFee;

  return (
    <div>
      {/* Header */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/cart" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Cart</Link>
            <span className="text-white/20">/</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">Checkout</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">Checkout</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <CheckoutForm
              products={productStrings}
              totalAmount={total}
              onBack={() => window.history.back()}
            />
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="border-2 border-odisha-black bg-white p-6 sticky top-24">
              <h2 className="font-serif font-bold text-odisha-black text-base mb-5 pb-3 border-b-2 border-odisha-black uppercase tracking-widest text-sm">
                Your Order
              </h2>
              <div className="space-y-4 mb-5">
                {cartItems.map(({ resolved, weight, price }) => {
                  const product = resolved.product;
                  const image = imageSrcFor(resolved);
                  return (
                    <div key={`${product.id}:${weight}`} className="flex gap-3">
                      <div className="w-12 h-12 border-2 border-odisha-black shrink-0 overflow-hidden relative bg-odisha-offwhite">
                        {image && (
                          <Image src={image} alt={product.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-odisha-black leading-snug">{product.name}</p>
                        {resolved.kind === "estate" && (
                          <p className="text-[10px] text-odisha-black/50">From {resolved.farm.name}</p>
                        )}
                        <p className="text-[10px] text-odisha-black/50 mt-0.5">{weight}</p>
                      </div>
                      <p className="text-sm font-bold text-odisha-black whitespace-nowrap">
                        ₹{price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="border-t-2 border-odisha-black pt-4 space-y-1.5">
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
                <p className="text-[10px] text-odisha-black/40 mt-2">Secure payment via Cashfree</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-odisha-black/40">Loading…</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
