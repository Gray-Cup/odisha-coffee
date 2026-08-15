"use client";

import { Link, useNavigate } from "react-router";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart, type CartItem } from "@/context/cart-context";
import {
  resolveCartProduct,
  tiersFor,
  pricePerKgFor,
  computeItemPrice,
  deliveryFeeForGrams,
  type ResolvedCartItem,
} from "@/lib/pricing";
import { availabilityColors, availabilityLabels } from "@/data/products";

type CartRow = {
  resolved: ResolvedCartItem;
  item: CartItem;
  tiers: Array<{ label: string; grams: number }>;
  tier: { label: string; grams: number };
  itemPrice: number;
};

function imageSrcFor(resolved: ResolvedCartItem): string | null {
  if (resolved.kind === "product") return resolved.product.image ? `/products/${resolved.product.image}` : null;
  return resolved.product.image ? `/${resolved.product.image}` : null;
}

export default function CartPage() {
  const { items, remove, updateWeight, count } = useCart();
  const navigate = useNavigate();

  const cartProducts: CartRow[] = items.flatMap((item) => {
    const resolved = resolveCartProduct(item.productId, item.farmId);
    if (!resolved) return [];
    const tiers = tiersFor(resolved);
    const tier = tiers.find((t) => t.label === item.weight) ?? tiers[0];
    const itemPrice = computeItemPrice(pricePerKgFor(resolved, tier.grams), tier.grams);
    return [{ resolved, item, tiers, tier, itemPrice }];
  });

  const subtotal = cartProducts.reduce((s, { itemPrice }) => s + itemPrice, 0);
  const totalGrams = cartProducts.reduce((s, { tier }) => s + tier.grams, 0);
  const delivery = deliveryFeeForGrams(totalGrams);
  const total    = subtotal + delivery;

  if (count === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-24 text-center">
        <ShoppingCart className="w-12 h-12 mx-auto text-odisha-black/20 mb-4" />
        <h1 className="font-serif text-2xl font-bold text-odisha-black mb-2">Your cart is empty</h1>
        <p className="text-odisha-black/50 text-sm mb-8">Add some coffee to get started.</p>
        <Link
          to="/buy-green-beans"
          className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors cursor-pointer"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <Link to="/" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/buy-green-beans" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Products</Link>
            <span className="text-white/20">/</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">Cart</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Your Cart <span className="text-white/50 font-normal">({count} {count === 1 ? "item" : "items"})</span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-0">
            {cartProducts.map(({ resolved, item, tiers, tier, itemPrice }) => {
              const product = resolved.product;
              const image = imageSrcFor(resolved);
              return (
                <div key={item.id} className="border-2 border-odisha-black -mt-[2px] bg-white p-5">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 border-2 border-odisha-black shrink-0 overflow-hidden relative bg-odisha-offwhite">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-odisha-black/20 text-xs">No image</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-serif font-bold text-odisha-black text-sm leading-snug">{product.name}</h3>
                          {resolved.kind === "estate" && (
                            <p className="text-[10px] text-odisha-black/50 mt-0.5">From {resolved.farm.name}</p>
                          )}
                          {resolved.kind !== "spice" && (
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 mt-1 inline-block ${availabilityColors[resolved.product.availability]}`}>
                              {availabilityLabels[resolved.product.availability]}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="p-1 text-odisha-black/30 hover:text-odisha-red transition-colors shrink-0 cursor-pointer"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Weight selector */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {tiers.map((t) => (
                          <button
                            key={t.label}
                            onClick={() => updateWeight(item.id, t.label)}
                            className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 border-2 transition-colors cursor-pointer ${
                              item.weight === t.label
                                ? "bg-odisha-red border-odisha-red text-white"
                                : "border-odisha-black/30 text-odisha-black/60 hover:border-odisha-black"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-end">
                        <span className="font-bold text-odisha-black text-base">
                          ₹{itemPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4">
              <Link
                to="/buy-green-beans"
                className="text-sm text-odisha-black/50 hover:text-odisha-red transition-colors underline underline-offset-2"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border-2 border-odisha-black bg-white p-6 sticky top-24">
              <h2 className="font-serif font-bold text-odisha-black text-lg mb-5 pb-3 border-b-2 border-odisha-black">
                Order Summary
              </h2>

              <div className="space-y-2 mb-5">
                {cartProducts.map(({ resolved, item, itemPrice }) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-odisha-black/60 truncate mr-2">
                      {resolved.product.name.split(" ").slice(0, 3).join(" ")} ({item.weight})
                    </span>
                    <span className="font-medium text-odisha-black whitespace-nowrap">
                      ₹{itemPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-odisha-black/10 pt-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm text-odisha-black/60">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-odisha-black/60">
                  <span>Delivery</span>
                  <span>₹{delivery.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-odisha-black text-base border-t-2 border-odisha-black pt-3 mt-3">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const params = new URLSearchParams({
                    products: items.map((i) => `${i.productId}:${i.weight}${i.farmId ? `:${i.farmId}` : ""}`).join(","),
                    total: String(total),
                  });
                  navigate(`/checkout?${params.toString()}`);
                }}
                className="w-full py-3 bg-odisha-red text-white font-semibold text-sm uppercase tracking-widest border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>

              <p className="text-[10px] text-odisha-black/40 text-center mt-3">
                Secure payment via Cashfree
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
