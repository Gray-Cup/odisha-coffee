import type { ProcessingMethod } from "./farms";

export type RoastLevel = "green" | "light" | "medium" | "medium-dark" | "dark";

export type Product = {
  id: string;
  name: string;
  farmId: string;
  farmName: string;
  region: string;
  processing: ProcessingMethod;
  variety: string;
  roastLevel: RoastLevel;
  flavorNotes: string[];
  description: string;
  brewingNotes: string;
  availability: "in-stock" | "limited" | "seasonal";
  weightOptions: string[];
  exportAvailable: boolean;
  minOrderExport?: string;
  pricePerKg: number; // INR
  isGreen?: boolean;  // green/unroasted bean
  image?: string;     // path under /products/
};

export const products: Product[] = [
  // ── NEW PRODUCTS ─────────────────────────────────────────────────────────

  {
    id: "koraput-hsd-washed",
    name: "Koraput HSD Washed",
    farmId: "koraput-a1-coffee",
    farmName: "Multiple Gray Cup Partner Farms",
    region: "Koraput District",
    processing: "washed",
    variety: "Arabica HSD (Hibrido de Timor)",
    roastLevel: "green",
    flavorNotes: ["Citrus", "Green Apple", "Clean", "Bright Acidity"],
    description:
      "Export-grade HSD Arabica green beans, washed-processed from Koraput's high-altitude estates. Screen 15+ sorted, moisture 10–12%, lot-tested. Ideal for specialty roasters seeking traceable Indian-origin Arabica with consistent cup clarity and bright character.",
    brewingNotes:
      "Roasters: recommend medium-light profile, first crack +20s. HSD responds well to a gentle development phase — highlight the citrus and clean acidity.",
    availability: "in-stock",
    weightOptions: ["250g", "1kg", "5kg"],
    exportAvailable: true,
    minOrderExport: "100kg green beans",
    pricePerKg: 1600,
    isGreen: true,
    image: "koraput-green.png",
  },
  {
    id: "koraput-naturals",
    name: "Koraput Naturals",
    farmId: "koraput-a1-coffee",
    farmName: "Multiple Gray Cup Partner Farms",
    region: "Koraput District",
    processing: "natural",
    variety: "Arabica S795 & Chandragiri",
    roastLevel: "green",
    flavorNotes: ["Dark Fruit", "Chocolate", "Earthy", "Full Body"],
    description:
      "Natural-processed green bean lots from Koraput — cherries sun-dried whole for 25–30 days on raised beds. Fruit-integrated and complex, these lots are excellent for espresso blends, natural roast profiles, and buyers seeking Indian naturals with depth.",
    brewingNotes:
      "Roasters: medium to medium-dark roast profiles work best. Allow longer development time (DTR 22–25%) to unlock the fruit-chocolate complexity. Blends beautifully with washed Arabica.",
    availability: "in-stock",
    weightOptions: ["250g", "1kg", "5kg"],
    exportAvailable: true,
    minOrderExport: "200kg green beans",
    pricePerKg: 1800,
    isGreen: true,
    image: "koraput-green.png",
  },
  {
    id: "hsd-roasted",
    name: "HSD Roasted",
    farmId: "koraput-a1-coffee",
    farmName: "Gray Cup Roastery",
    region: "Koraput District",
    processing: "washed",
    variety: "Arabica HSD",
    roastLevel: "light",
    flavorNotes: ["Citrus Blossom", "Peach", "Honey", "Clean Finish"],
    description:
      "Our washed HSD Arabica from Koraput, roasted light to preserve the variety's natural brightness. Slow-roasted in small batches, rested 48 hours before dispatch. A remarkably clean, floral cup that showcases what Eastern Ghats Arabica can offer at its best.",
    brewingNotes:
      "Ideal for pour-over, V60, or Chemex. Water at 90–92°C, 1:16 ratio. Grind medium-fine. The light roast rewards slow extraction — allow full 3–4 minute brew time.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 2800,
    image: "koraput-coffee.png",
  },
  {
    id: "naturals-roasted",
    name: "Naturals Roasted",
    farmId: "koraput-a1-coffee",
    farmName: "Gray Cup Roastery",
    region: "Koraput District",
    processing: "natural",
    variety: "Arabica S795 & Chandragiri",
    roastLevel: "medium",
    flavorNotes: ["Dark Cherry", "Dark Chocolate", "Dried Fruit", "Syrupy Body"],
    description:
      "Natural-processed Koraput coffee roasted to medium, where the fruit-integration of the drying process reaches its peak. Rich, syrupy, and deeply satisfying — this is an exceptional everyday filter coffee or a crowd-pleasing espresso base.",
    brewingNotes:
      "Excellent as filter or espresso. Pour-over at 93°C, 1:15 ratio. As espresso: 25–28 second extraction. The natural sweetness pairs brilliantly with milk-based drinks.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 3200,
    image: "koraput-coffee.png",
  },
  {
    id: "strawberry-roasted",
    name: "Strawberry Roasted",
    farmId: "oak-winds-farm",
    farmName: "Oak Winds Farm × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "natural",
    variety: "Arabica SLN 9",
    roastLevel: "light",
    flavorNotes: ["Fresh Strawberry", "Rose Hip", "Hibiscus", "Tropical Sweetness"],
    description:
      "A rare anaerobic natural lot from Oak Winds Farm, processed with extended cherry fermentation that produces vivid strawberry and floral notes. Roasted light to let the process-driven character sing. Each batch is limited — when it's gone, it's gone until next season.",
    brewingNotes:
      "Best as pour-over or AeroPress at 88–90°C (lower temp amplifies the strawberry). 1:15 ratio, medium grind. Try as a cold brew for a stunning no-heat-needed strawberry sweetness.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 4200,
    image: "koraput-coffee.png",
  },
  {
    id: "whiskey-rum-roasted",
    name: "Whiskey Rum Roasted",
    farmId: "dream-hill-coffee",
    farmName: "Dream Hill Coffee × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "natural",
    variety: "Chandragiri",
    roastLevel: "medium-dark",
    flavorNotes: ["Toasted Oak", "Molasses", "Vanilla", "Dark Fruit", "Spirit Warmth"],
    description:
      "Honey-processed Catuai aged in reclaimed whiskey and rum barrels from Odisha distilleries. The 30-day barrel rest imparts layers of vanilla, oak, and spirit warmth onto the coffee's natural sweetness. A conversation piece roast — complex, bold, and absolutely unmistakable.",
    brewingNotes:
      "Moka pot or espresso for the full barrel intensity. French press at 94°C, 4-minute steep — the oils and body come through beautifully. Pairs exceptionally with a drop of cream.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 5200,
    image: "koraput-coffee.png",
  },
  {
    id: "espresso-8020",
    name: "Espresso Blend",
    farmId: "koraput-a1-coffee",
    farmName: "Gray Cup Roastery",
    region: "Koraput District",
    processing: "washed",
    variety: "80% Arabica S795 + 20% Arabica Chandragiri",
    roastLevel: "medium-dark",
    flavorNotes: ["Dark Chocolate", "Caramel", "Hazelnut", "Thick Crema", "Low Acidity"],
    description:
      "Our house 100% Arabica espresso blend — 80% washed S795 for sweetness and structure, 20% Chandragiri for body and crema. Roasted medium-dark for a balanced, forgiving shot that works beautifully across all espresso machines and milk ratios.",
    brewingNotes:
      "Dial to 9 bars, 93°C, 25–28 seconds, 1:2 ratio. For milk drinks, pull slightly longer (30s) for extra sweetness. Forgiving on dose — ±2g from recipe still yields a good shot.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 2400,
    image: "koraput-coffee.png",
  },
  {
    id: "espresso-100-arabica",
    name: "Espresso 100 Arabica",
    farmId: "annapurna-coffee-estate",
    farmName: "Gray Cup Roastery",
    region: "Koraput District",
    processing: "washed",
    variety: "100% Arabica S795",
    roastLevel: "medium",
    flavorNotes: ["Milk Chocolate", "Brown Sugar", "Almond", "Smooth Finish"],
    description:
      "A single-origin 100% Arabica espresso from Koraput's Sunabeda plateau. Roasted medium to preserve the variety's natural sweetness while building espresso body. Clean, smooth, and approachable — a perfect gateway to Indian specialty espresso.",
    brewingNotes:
      "Best at 93°C, 9 bars, 27–30 seconds, 1:2.2 ratio. The all-Arabica character shines brightest as a straight espresso or flat white. Avoid over-extraction — the sweetness lives in the first half of the shot.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 3000,
    image: "koraput-coffee.png",
  },

  // ── EXISTING PRODUCTS (with pricing added) ────────────────────────────────

  {
    id: "oak-winds-washed-arabica",
    name: "Oak Winds Washed Arabica",
    farmId: "oak-winds-farm",
    farmName: "Oak Winds Farm",
    region: "Pottangi, Koraput",
    processing: "washed",
    variety: "Arabica SLN 9",
    roastLevel: "light",
    flavorNotes: ["Bergamot", "Peach Tea", "Honey Crisp", "Bright Acidity"],
    description:
      "One of Odisha's highest-grown washed Arabicas, from Oak Winds Farm at 1150–1450m elevation in Pottangi. Extended wet fermentation (36 hours) followed by slow shade drying on raised beds yields a cup of exceptional brightness and floral complexity. Limited lots available per season.",
    brewingNotes:
      "Best as pour-over or V60. Use water at 90–92°C. Ratio 1:16. Allow 3–4 minutes total brew time. The light roast expresses the citrus and floral character most fully.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: true,
    minOrderExport: "50kg green beans",
    pricePerKg: 4500,
    image: "koraput-coffee.png",
  },
  {
    id: "dream-hill-honey-arabica",
    name: "Dream Hill Honey Arabica",
    farmId: "dream-hill-coffee",
    farmName: "Dream Hill Coffee — Saptagiri Plantation",
    region: "Pottangi, Koraput",
    processing: "honey",
    variety: "Chandragiri",
    roastLevel: "medium",
    flavorNotes: ["Jasmine", "Golden Raisin", "Orange Blossom", "Caramel Finish"],
    description:
      "Honey-processed Catuai from the Saptagiri Plantation's highest blocks. The 72-hour mucilage drying on raised beds in Koraput's dry-season sun concentrates natural fruit sugars, delivering a sweet, complex cup that balances floral aromatics with honeyed texture.",
    brewingNotes:
      "Excellent as Chemex or AeroPress. Water at 93°C. The honey process creates a syrupy body that shines with longer extraction. Try also as a cold brew for a deeply sweet, low-acidity experience.",
    availability: "seasonal",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "100kg green beans",
    pricePerKg: 5000,
    image: "koraput-coffee.png",
  },
  {
    id: "annapurna-washed-arabica",
    name: "Annapurna Washed Arabica",
    farmId: "annapurna-coffee-estate",
    farmName: "Annapurna Coffee Estate",
    region: "Sunabeda, Koraput",
    processing: "washed",
    variety: "Chandragiri",
    roastLevel: "light",
    flavorNotes: ["Floral", "Peach", "Light Caramel", "Delicate"],
    description:
      "Grown on the Sunabeda plateau at over 1000m, this washed Catuai from Annapurna Estate expresses the cool-climate character of Odisha's highlands. Clean fermentation, thorough washing, and extended raised-bed drying produce a cup with remarkable clarity.",
    brewingNotes:
      "Pour-over or Kalita Wave. Grind medium-fine. Water at 91°C. The delicate floral notes reward lower water temperature and careful extraction control.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "100kg green beans",
    pricePerKg: 3800,
    image: "koraput-coffee.png",
  },
  {
    id: "koraput-organic-natural",
    name: "Koraput Organic Natural",
    farmId: "koraput-organic",
    farmName: "Koraput Organic",
    region: "Semiliguda, Koraput",
    processing: "natural",
    variety: "Arabica S795",
    roastLevel: "medium",
    flavorNotes: ["Green Apple", "Floral", "Clean Sweetness", "Bright"],
    description:
      "Certified organic Arabica S795 from Koraput Organic estate, grown without synthetic inputs under natural forest canopy. The natural processing brings out the variety's inherent sweetness while maintaining the clean, transparent character of the estate's high-altitude terroir.",
    brewingNotes:
      "Excellent across multiple brew methods. Particularly beautiful as a cold brew or AeroPress. The organic character and clean terroir translate well to any extraction style.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "200kg green beans",
    pricePerKg: 4000,
    image: "koraput-coffee.png",
  },
  {
    id: "brown-valley-honey-blend",
    name: "Brown Valley Honey Blend",
    farmId: "brown-valley-coffee-estate",
    farmName: "Brown Valley Coffee Estate",
    region: "Boipariguda, Koraput",
    processing: "honey",
    variety: "Arabica S795 & Arabica Chandragiri",
    roastLevel: "medium",
    flavorNotes: ["Milk Chocolate", "Hazelnut", "Stone Fruit", "Smooth"],
    description:
      "A carefully constructed honey-processed blend from Brown Valley Estate combining S795 and Chandragiri varieties. The blend balances S795's chocolate depth with Chandragiri's stone-fruit brightness, processed together on shared drying beds to create an integrated, harmonious cup.",
    brewingNotes:
      "Versatile across espresso and filter. As espresso: water at 93°C, 25-second shot. As filter: V60 or Chemex at 93°C, medium grind for a smooth, satisfying cup.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "300kg green beans",
    pricePerKg: 3500,
    image: "koraput-coffee.png",
  },
  {
    id: "panigrahi-washed-s795",
    name: "Panigrahi Foundation Washed S795",
    farmId: "panigrahi-agro-foundation",
    farmName: "Panigrahi Agro Foundation",
    region: "Semiliguda, Koraput",
    processing: "washed",
    variety: "Arabica S795",
    roastLevel: "medium",
    flavorNotes: ["Dark Cherry", "Walnut", "Caramel", "Balanced"],
    description:
      "Lot-separated washed S795 from Panigrahi Agro Foundation, processed through their state-of-the-art wet mill with careful fermentation control monitored via pH testing. This is Odisha washed coffee at its most refined — structured, balanced, and deeply expressive of the Semiliguda terroir.",
    brewingNotes:
      "Ideal for pour-over or filter coffee. Medium-light roast recommended. Water at 92°C, medium grind. The balanced acidity and caramel sweetness make this an excellent all-day filter coffee.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "150kg green beans",
    pricePerKg: 3800,
    image: "koraput-coffee.png",
  },
  {
    id: "maa-mangala-honey-arabica",
    name: "Maa Mangala Honey Arabica",
    farmId: "maa-mangala-coffee-plantation",
    farmName: "Maa Mangala Coffee Plantation",
    region: "Jeypore, Koraput",
    processing: "honey",
    variety: "Arabica S795",
    roastLevel: "medium",
    flavorNotes: ["Mango", "Honey", "Soft Spice", "Tropical Sweetness"],
    description:
      "Honey-processed S795 from the Maa Mangala estate in Jeypore. The tropical microclimate of this valley imparts distinctive mango-like sweetness to the cherry, amplified by the honey processing method. A standout Odisha coffee for buyers seeking unusual, origin-expressive lots.",
    brewingNotes:
      "Best as AeroPress or Chemex. Water at 92°C. The honey processing creates a thick, syrupy body. Experiment with finer grind settings to unlock the full tropical sweetness.",
    availability: "seasonal",
    weightOptions: ["100g", "250g"],
    exportAvailable: false,
    pricePerKg: 5500,
    image: "koraput-coffee.png",
  },
  {
    id: "odisha-export-grade-green-arabica",
    name: "Odisha Export Grade — Green Arabica",
    farmId: "koraput-a1-coffee",
    farmName: "Multiple Gray Cup Partner Farms",
    region: "Koraput District",
    processing: "washed",
    variety: "Arabica S795",
    roastLevel: "green",
    flavorNotes: ["Clean", "Mild Acidity", "Chocolate", "Consistent"],
    description:
      "Traceable export-grade washed Arabica S795 sourced from verified Gray Cup partner farms across Koraput. Phytosanitary certified, ICO registered, and available with full lot documentation. Supplied as screened green beans (Screen 15+), ideal for specialty importers and roasters sourcing Indian-origin Arabica.",
    brewingNotes:
      "For roasters: well-suited to medium and medium-light roast profiles. The S795 variety develops excellent chocolate and mild-fruit character when roasted carefully to first crack +30 seconds.",
    availability: "in-stock",
    weightOptions: ["1kg", "5kg", "25kg"],
    exportAvailable: true,
    minOrderExport: "500kg green beans",
    pricePerKg: 1800,
    isGreen: true,
    image: "koraput-green.png",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const roastLabels: Record<RoastLevel, string> = {
  green: "Green (Unroasted)",
  light: "Light Roast",
  medium: "Medium Roast",
  "medium-dark": "Medium-Dark Roast",
  dark: "Dark Roast",
};

export const availabilityLabels: Record<Product["availability"], string> = {
  "in-stock": "In Stock",
  limited: "Limited",
  seasonal: "Seasonal",
};

export const availabilityColors: Record<Product["availability"], string> = {
  "in-stock": "bg-[#3A7D44] text-white",
  limited: "bg-[#E3A008] text-black",
  seasonal: "bg-[#1E3A8A] text-white",
};
