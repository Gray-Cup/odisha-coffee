"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart, ROASTED_TIERS, GREEN_TIERS, computeItemPrice } from "@/context/cart-context";
import { deliveryFeeForGrams } from "@/lib/pricing";
import type { Product } from "@/data/products";

type Props = { product: Product };

export function ProductActions({ product }: Props) {
  const { add, remove, isInCart, items } = useCart();
  const router = useRouter();

  const tiers = product.isGreen ? GREEN_TIERS : ROASTED_TIERS;
  const inCart = isInCart(product.id);
  const cartItem = items.find((i) => i.productId === product.id);
  const currentTier = tiers.find((t) => t.label === cartItem?.weight) ?? tiers[0];
  const defaultWeight = tiers[0].label;

  const handleBuyNow = () => {
    const weight = cartItem?.weight ?? defaultWeight;
    const tier = tiers.find((t) => t.label === weight) ?? tiers[0];
    const price = computeItemPrice(product.pricePerKg, tier.grams) + deliveryFeeForGrams(tier.grams);
    const params = new URLSearchParams({
      products: `${product.id}:${weight}`,
      total: String(price),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="space-y-2 mt-3">
      {/* Price display */}
      <div className="text-xs text-odisha-black/50 font-medium">
        from{" "}
        <span className="text-odisha-black font-bold text-sm">
          ₹{computeItemPrice(product.pricePerKg, tiers[0].grams).toLocaleString("en-IN")}
        </span>
        <span className="text-odisha-black/40"> / {tiers[0].label}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => inCart ? remove(product.id) : add(product.id, defaultWeight)}
          className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest py-2 border-2 transition-colors cursor-pointer ${
            inCart
              ? "bg-odisha-black border-odisha-black text-white hover:bg-odisha-red hover:border-odisha-red"
              : "bg-transparent border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white"
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {inCart ? "In Cart" : "Add to Cart"}
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest py-2 bg-odisha-red text-white border-2 border-odisha-red hover:bg-odisha-red-dark transition-colors cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          Buy Now
        </button>
      </div>
    </div>
  );
}
