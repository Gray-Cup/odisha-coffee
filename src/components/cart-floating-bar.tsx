"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { resolveCartProduct, tiersFor, pricePerKgFor, computeItemPrice } from "@/lib/pricing";

export function CartFloatingBar() {
  const { items, count } = useCart();
  const router = useRouter();

  const total = items.reduce((sum, item) => {
    const resolved = resolveCartProduct(item.productId, item.farmId);
    if (!resolved) return sum;
    const tiers = tiersFor(resolved);
    const tier = tiers.find((t) => t.label === item.weight) ?? tiers[0];
    return sum + computeItemPrice(pricePerKgFor(resolved, tier.grams), tier.grams);
  }, 0);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="flex w-full items-center justify-between gap-3 border-t-2 border-odisha-black bg-odisha-black text-white px-4 py-3.5 shadow-2xl cursor-pointer transition-colors hover:bg-odisha-red
            sm:w-auto sm:min-w-[280px] sm:border-2 sm:rounded-none"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <ShoppingCart className="w-4 h-4 shrink-0" />
              {count} {count === 1 ? "item" : "items"} · ₹{total.toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest border-b-2 border-white/60">
              View Cart
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
