import { resolveCartProduct, tiersFor } from "@/lib/pricing";

// Shared "productId:weight:farmId:qty" encoding used by both the order
// builder (?items= query string) and the /o/[slug] share link (path segment).
// Self-describing - the slug/query IS the cart, so sharing a link needs no
// database or storage, just decoding it back into items on the other end.

export type ShareItem = { productId: string; weight: string; farmId?: string; quantity: number };

export function encodeShareItem(it: ShareItem): string {
  const parts = [it.productId, it.weight, it.farmId ?? "", it.quantity > 1 ? String(it.quantity) : ""];
  while (parts.length > 2 && parts[parts.length - 1] === "") parts.pop();
  return parts.join(":");
}

export function encodeShareItems(items: ShareItem[]): string {
  return items.map(encodeShareItem).join(",");
}

export function decodeShareItems(param: string): ShareItem[] {
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
