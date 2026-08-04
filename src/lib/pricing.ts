import { products, type Product } from "@/data/products";

// Single source of truth for pricing, shared by every cart/checkout client
// page AND the server (create-payment/route.ts). Prices are never trusted
// from the client - the server always recomputes the order total itself
// from `items` using this module before creating a Cashfree payment link.

export const ROASTED_TIERS = [
  { label: "100g", grams: 100 },
  { label: "250g", grams: 250 },
  { label: "500g", grams: 500 },
  { label: "1kg",  grams: 1000 },
] as const;

export const GREEN_TIERS = [
  { label: "250g", grams: 250 },
  { label: "1kg",  grams: 1000 },
  { label: "5kg",  grams: 5000 },
] as const;

export type RoastedTierLabel = (typeof ROASTED_TIERS)[number]["label"];
export type GreenTierLabel = (typeof GREEN_TIERS)[number]["label"];
export type WeightLabel = RoastedTierLabel | GreenTierLabel;

export function tiersForProduct(product: Pick<Product, "isGreen">) {
  return product.isGreen ? GREEN_TIERS : ROASTED_TIERS;
}

export function gramsForWeight(product: Pick<Product, "isGreen">, weight: string): number {
  return tiersForProduct(product).find((t) => t.label === weight)?.grams ?? 0;
}

export function computeItemPrice(pricePerKg: number, grams: number): number {
  return Math.ceil((pricePerKg / 1000) * grams);
}

/**
 * Delivery is charged once per order, on the order's total weight (not per
 * item): flat ₹80 at or under 500g; ₹100 for the first kg, plus ₹60 for
 * every kg after that.
 */
export function deliveryFeeForGrams(totalGrams: number): number {
  if (totalGrams <= 500) return 80;
  const kg = totalGrams / 1000;
  return Math.round(100 + 60 * (kg - 1));
}

export type OrderItem = { productId: string; weight: string };

/**
 * Recomputes the full order total (product prices + one order-level delivery
 * fee based on total weight) from raw items. Throws if any item is invalid so
 * the caller can reject the request outright.
 */
export function computeOrderTotal(items: OrderItem[]): number {
  if (items.length === 0) throw new Error("No items in order");

  let total = 0;
  let totalGrams = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Invalid product: ${item.productId}`);
    const grams = gramsForWeight(product, item.weight);
    if (!grams) throw new Error(`Invalid weight: ${item.weight} for ${item.productId}`);
    total += computeItemPrice(product.pricePerKg, grams);
    totalGrams += grams;
  }

  return total + deliveryFeeForGrams(totalGrams);
}
