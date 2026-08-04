import { products, type Product } from "@/data/products";
import { estateProducts, type EstateProduct } from "@/data/estate-products";
import { farms, getFarmBySlug, type Farm } from "@/data/farms";

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

// ─── Estate (per-farm green bean) lots ───────────────────────────────────
// Estate lots (data/estate-products.ts) are farm-agnostic catalogue entries
// that the buyer pairs with a chosen partner farm in the UI. To let them
// share the cart/checkout pipeline with the regular `products` catalogue,
// every cart/checkout/payment touchpoint resolves a productId against BOTH
// catalogues via `resolveCartProduct` below instead of indexing `products`
// directly. An estate lot's cart-facing "pricePerKg" folds in its own
// shippingPerKg (see `pricePerKgFor`) so the rest of the pipeline can treat
// it exactly like a normal product and only ever add the one order-level
// delivery fee on top.

export type ResolvedCartItem =
  | { kind: "product"; product: Product }
  | { kind: "estate"; product: EstateProduct; farm: Farm };

export function resolveCartProduct(productId: string, farmId?: string): ResolvedCartItem | null {
  const product = products.find((p) => p.id === productId);
  if (product) return { kind: "product", product };

  const estate = estateProducts.find((p) => p.id === productId);
  if (estate) {
    const farm = (farmId && getFarmBySlug(farmId)) || farms[0];
    return { kind: "estate", product: estate, farm };
  }

  return null;
}

export function tiersFor(resolved: ResolvedCartItem): Array<{ label: string; grams: number }> {
  return resolved.kind === "estate" ? resolved.product.weightOptions : [...tiersForProduct(resolved.product)];
}

export function pricePerKgFor(resolved: ResolvedCartItem): number {
  return resolved.kind === "estate"
    ? resolved.product.pricePerKg + resolved.product.shippingPerKg
    : resolved.product.pricePerKg;
}

export function gramsForResolved(resolved: ResolvedCartItem, weight: string): number {
  return tiersFor(resolved).find((t) => t.label === weight)?.grams ?? 0;
}

export type OrderItem = { productId: string; weight: string; farmId?: string };

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
    const resolved = resolveCartProduct(item.productId, item.farmId);
    if (!resolved) throw new Error(`Invalid product: ${item.productId}`);
    const grams = gramsForResolved(resolved, item.weight);
    if (!grams) throw new Error(`Invalid weight: ${item.weight} for ${item.productId}`);
    total += computeItemPrice(pricePerKgFor(resolved), grams);
    totalGrams += grams;
  }

  return total + deliveryFeeForGrams(totalGrams);
}
