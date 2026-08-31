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
      "Roasters: recommend medium-light profile, first crack +20s. HSD responds well to a gentle development phase, highlight the citrus and clean acidity.",
    availability: "in-stock",
    weightOptions: ["250g", "1kg", "5kg"],
    exportAvailable: true,
    minOrderExport: "100kg green beans",
    pricePerKg: 1600,
    isGreen: true,
    image: "koraput-green.webp",
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
      "Natural-processed green bean lots from Koraput, cherries sun-dried whole for 25–30 days on raised beds. Fruit-integrated and complex, these lots are excellent for espresso blends, natural roast profiles, and buyers seeking Indian naturals with depth.",
    brewingNotes:
      "Roasters: medium to medium-dark roast profiles work best. Allow longer development time (DTR 22–25%) to unlock the fruit-chocolate complexity. Blends beautifully with washed Arabica.",
    availability: "in-stock",
    weightOptions: ["250g", "1kg", "5kg"],
    exportAvailable: true,
    minOrderExport: "200kg green beans",
    pricePerKg: 1800,
    isGreen: true,
    image: "koraput-green.webp",
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
      "Ideal for pour-over, V60, or Chemex. Water at 90–92°C, 1:16 ratio. Grind medium-fine. The light roast rewards slow extraction, allow full 3–4 minute brew time.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 1372,
    image: "koraput-coffee.webp",
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
      "Natural-processed Koraput coffee roasted to medium, where the fruit-integration of the drying process reaches its peak. Rich, syrupy, and deeply satisfying, this is an exceptional everyday filter coffee or a crowd-pleasing espresso base.",
    brewingNotes:
      "Excellent as filter or espresso. Pour-over at 93°C, 1:15 ratio. As espresso: 25–28 second extraction. The natural sweetness pairs brilliantly with milk-based drinks.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 1568,
    image: "koraput-coffee.webp",
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
      "A rare anaerobic natural lot from Oak Winds Farm, processed with extended cherry fermentation that produces vivid strawberry and floral notes. Roasted light to let the process-driven character sing. Each batch is limited, when it's gone, it's gone until next season.",
    brewingNotes:
      "Best as pour-over or AeroPress at 88–90°C (lower temp amplifies the strawberry). 1:15 ratio, medium grind. Try as a cold brew for a stunning no-heat-needed strawberry sweetness.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 2058,
    image: "koraput-coffee.webp",
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
      "Honey-processed Catuai aged in reclaimed whiskey and rum barrels from Odisha distilleries. The 30-day barrel rest imparts layers of vanilla, oak, and spirit warmth onto the coffee's natural sweetness. A conversation piece roast, complex, bold, and absolutely unmistakable.",
    brewingNotes:
      "Moka pot or espresso for the full barrel intensity. French press at 94°C, 4-minute steep, the oils and body come through beautifully. Pairs exceptionally with a drop of cream.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2548,
    image: "koraput-coffee.webp",
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
      "Our house 100% Arabica espresso blend, 80% washed S795 for sweetness and structure, 20% Chandragiri for body and crema. Roasted medium-dark for a balanced, forgiving shot that works beautifully across all espresso machines and milk ratios.",
    brewingNotes:
      "Dial to 9 bars, 93°C, 25–28 seconds, 1:2 ratio. For milk drinks, pull slightly longer (30s) for extra sweetness. Forgiving on dose, ±2g from recipe still yields a good shot.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 1176,
    image: "koraput-coffee.webp",
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
      "A single-origin 100% Arabica espresso from Koraput's Sunabeda plateau. Roasted medium to preserve the variety's natural sweetness while building espresso body. Clean, smooth, and approachable, a perfect gateway to Indian specialty espresso.",
    brewingNotes:
      "Best at 93°C, 9 bars, 27–30 seconds, 1:2.2 ratio. The all-Arabica character shines brightest as a straight espresso or flat white. Avoid over-extraction, the sweetness lives in the first half of the shot.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: false,
    pricePerKg: 1470,
    image: "koraput-coffee.webp",
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
    pricePerKg: 2205,
    image: "koraput-coffee.webp",
  },
  {
    id: "dream-hill-honey-arabica",
    name: "Dream Hill Honey Arabica",
    farmId: "dream-hill-coffee",
    farmName: "Dream Hill Coffee - Saptagiri Plantation",
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
    pricePerKg: 2450,
    image: "koraput-coffee.webp",
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
    pricePerKg: 1862,
    image: "koraput-coffee.webp",
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
    pricePerKg: 1960,
    image: "koraput-coffee.webp",
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
    pricePerKg: 1715,
    image: "koraput-coffee.webp",
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
      "Lot-separated washed S795 from Panigrahi Agro Foundation, processed through their state-of-the-art wet mill with careful fermentation control monitored via pH testing. This is Odisha washed coffee at its most refined, structured, balanced, and deeply expressive of the Semiliguda terroir.",
    brewingNotes:
      "Ideal for pour-over or filter coffee. Medium-light roast recommended. Water at 92°C, medium grind. The balanced acidity and caramel sweetness make this an excellent all-day filter coffee.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "150kg green beans",
    pricePerKg: 1862,
    image: "koraput-coffee.webp",
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
    pricePerKg: 2695,
    image: "koraput-coffee.webp",
  },
  {
    id: "odisha-export-grade-green-arabica",
    name: "Odisha Export Grade - Green Arabica",
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
    image: "koraput-green.webp",
  },

  // ── NEW ROASTED LOTS ─────────────────────────────────────────────────────

  {
    id: "brown-valley-wild-civet-roasted",
    name: "Brown Valley Wild Civet Coffee (Roasted)",
    farmId: "brown-valley-coffee-estate",
    farmName: "Brown Valley Coffee Estate × Gray Cup Roastery",
    region: "Boipariguda, Koraput",
    processing: "washed",
    variety: "Arabica Chandragiri",
    roastLevel: "medium",
    flavorNotes: ["Chocolate", "Earthy", "Creamy", "Low Bitterness"],
    description:
      "Wild-foraged civet coffee (Kopi Luwak) from Brown Valley Coffee Estate, roasted. Coffee cherries pass through the digestive tract of the wild Asian palm civet, ferment naturally, and are hand-collected, cleaned and sun-dried, then roasted medium to keep the smooth, low-bitter cup the washed processing produces. Wild-foraged, never caged; seasonal and available only in small quantities.",
    brewingNotes:
      "Pour-over or French press at 92–94°C, medium grind, 1:15 ratio. The chocolate and creamy, dairy-like sweetness need room, avoid over-extraction. Excellent as a slow cold brew.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 4800,
    image: "civet-cat/kopi-luwak-brown-valley.webp",
  },
  {
    id: "dream-hill-aaa-washed-roasted",
    name: "Dream Hill AAA Washed (Roasted)",
    farmId: "dream-hill-coffee",
    farmName: "Dream Hill Coffee - Saptagiri Plantation × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "washed",
    variety: "Arabica SLN 9 & Chandragiri",
    roastLevel: "medium",
    flavorNotes: ["Jasmine", "Citrus Zest", "Golden Raisin", "Clean Finish"],
    description:
      "AAA-grade (screen 17+) washed Arabica from Dream Hill, positioned at the highest elevations in Odisha's coffee belt at over 1100m. Clean fermentation and extended raised-bed drying, roasted medium to balance the estate's bright acidity with a rounded, sweet body. The benchmark washed lot from Odisha's most refined high-altitude estate.",
    brewingNotes:
      "Pour-over, V60 or Chemex at 92–93°C, medium-fine grind, 1:16 ratio. Full 3–4 minute brew time rewards the floral aromatics and citrus clarity. Also excellent as a bright, clean cold brew.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "100kg green beans",
    pricePerKg: 2600,
    image: "koraput-coffee.webp",
  },
  {
    id: "brown-valley-hsd-roasted",
    name: "Brown Valley HSD (Roasted)",
    farmId: "brown-valley-coffee-estate",
    farmName: "Brown Valley Coffee Estate × Gray Cup Roastery",
    region: "Boipariguda, Koraput",
    processing: "honey",
    variety: "Arabica HSD (Hibrido de Timor)",
    roastLevel: "medium",
    flavorNotes: ["Milk Chocolate", "Stone Fruit", "Honey", "Smooth Body"],
    description:
      "HSD (honey/semi-dry) processed Arabica from Brown Valley Estate, one of the few Odisha farms running all three processing styles with micro-lot traceability. The HSD process strikes a balance between the brightness of washed and the fruitiness of natural, a cup with balanced sweetness and a smooth, rounded body. Roasted medium; great for filter and cold brew.",
    brewingNotes:
      "Versatile across filter and espresso. Filter: V60 or Chemex at 93°C, medium grind. Espresso: 93°C, 25–28 second shot. The honey process gives a syrupy body that holds up well with milk.",
    availability: "in-stock",
    weightOptions: ["100g", "250g", "500g", "1kg"],
    exportAvailable: true,
    minOrderExport: "100kg green beans",
    pricePerKg: 2600,
    image: "koraput-coffee.webp",
  },

  // ── BARREL-AGED & CO-FERMENTED ROASTS (Gray Cup barrel program) ───────────
  // Small barrel and co-fermentation lots — limited, seasonal, priced at a
  // premium. Each pairs a spirit/flavour barrel or co-ferment with a specific
  // Koraput processing base.
  {
    id: "whiskey-old-monk-rum-natural",
    name: "Whiskey Old Monk Rum × Natural",
    farmId: "dream-hill-coffee",
    farmName: "Dream Hill Coffee × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "natural",
    variety: "Chandragiri",
    roastLevel: "medium-dark",
    flavorNotes: ["Molasses", "Toasted Oak", "Raisin", "Dark Rum", "Spirit Warmth"],
    description:
      "Natural-process Chandragiri rested in barrels seasoned with whiskey and Old Monk rum. The natural's dark-fruit sweetness meets molasses, oak and a warm spirit finish. A limited barrel lot — bold, rounded and unmistakable.",
    brewingNotes:
      "Best as espresso or moka pot for full barrel intensity. French press at 94°C, 4-minute steep. A drop of cream rounds the spirit warmth.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2695,
    image: "koraput-coffee.webp",
  },
  {
    id: "teachers-whiskey-hsd",
    name: "Teacher's Whiskey × HSD",
    farmId: "brown-valley-coffee-estate",
    farmName: "Brown Valley Coffee Estate × Gray Cup Roastery",
    region: "Boipariguda, Koraput",
    processing: "honey",
    variety: "Arabica HSD (Hibrido de Timor)",
    roastLevel: "medium",
    flavorNotes: ["Honey", "Barley", "Vanilla Oak", "Stone Fruit", "Smooth Malt"],
    description:
      "HSD honey lot from Brown Valley rested in Teacher's blended-Scotch barrels. The semi-dry sweetness of the HSD base carries malt, vanilla-oak and a clean stone-fruit lift. Balanced rather than boozy.",
    brewingNotes:
      "Filter (V60 or Chemex) at 93°C, medium grind, to keep it clean; espresso at 93°C, 26–28 seconds for a richer, maltier shot.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2645,
    image: "koraput-coffee.webp",
  },
  {
    id: "strawberry-whiskey-anaerobic-natural",
    name: "Strawberry Whiskey × Anaerobic Natural",
    farmId: "oak-winds-farm",
    farmName: "Oak Winds Farm × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "natural",
    variety: "Arabica SLN 9",
    roastLevel: "light",
    flavorNotes: ["Fresh Strawberry", "Whiskey Oak", "Rose", "Candied Fruit", "Syrupy"],
    description:
      "Anaerobic-natural SLN 9 from Oak Winds, co-conditioned with strawberry and rested in whiskey oak. Sealed-tank fermentation drives vivid strawberry and floral notes; the barrel adds a soft oak frame. Roasted light to keep the fruit forward.",
    brewingNotes:
      "Pour-over or AeroPress at 88–90°C amplifies the strawberry. 1:15 ratio, medium grind. Outstanding as cold brew.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2895,
    image: "koraput-coffee.webp",
  },
  {
    id: "rum-natural",
    name: "Rum × Natural",
    farmId: "koraput-organic",
    farmName: "Koraput Organic × Gray Cup Roastery",
    region: "Semiliguda, Koraput",
    processing: "natural",
    variety: "Arabica S795",
    roastLevel: "medium-dark",
    flavorNotes: ["Dark Rum", "Brown Sugar", "Cocoa", "Dried Fig", "Warm Spice"],
    description:
      "Certified-organic S795 natural rested in dark-rum barrels. The clean organic terroir keeps it from turning heavy; expect brown sugar, cocoa and a mellow rum warmth. The most approachable of the barrel series.",
    brewingNotes:
      "Espresso at 93°C, 25–28 seconds, or French press at 94°C. Holds up well with milk for a rum-tinged cortado.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2545,
    image: "koraput-coffee.webp",
  },
  {
    id: "cacao-rum-hsd",
    name: "Cacao Rum × HSD",
    farmId: "brown-valley-coffee-estate",
    farmName: "Brown Valley Coffee Estate × Gray Cup Roastery",
    region: "Boipariguda, Koraput",
    processing: "honey",
    variety: "Arabica HSD (Hibrido de Timor)",
    roastLevel: "medium-dark",
    flavorNotes: ["Dark Chocolate", "Cacao Nib", "Rum", "Toasted Hazelnut", "Syrupy"],
    description:
      "HSD honey lot co-fermented with cacao husk and finished in rum barrels. Deep dark-chocolate and cacao-nib notes over the HSD's rounded sweetness, with a rum-soaked edge. A dessert in a cup.",
    brewingNotes:
      "Espresso or moka pot for maximum chocolate intensity. As filter, brew slightly stronger (1:14) at 94°C.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2745,
    image: "koraput-coffee.webp",
  },
  {
    id: "vanilla-whiskey-washed",
    name: "Vanilla Whiskey × Washed",
    farmId: "panigrahi-agro-foundation",
    farmName: "Panigrahi Foundation × Gray Cup Roastery",
    region: "Koraput District",
    processing: "washed",
    variety: "Arabica S795",
    roastLevel: "medium",
    flavorNotes: ["Bourbon Vanilla", "Whiskey Oak", "Caramel", "Clean Citrus", "Silky"],
    description:
      "Washed S795 rested with vanilla pods in whiskey oak. The clean washed base stays transparent, letting bourbon vanilla and soft oak sit alongside caramel and a citrus lift. The most delicate of the barrel lots.",
    brewingNotes:
      "Pour-over at 92–93°C, medium-fine grind, 1:16 ratio. The vanilla reads sweetest black; also lovely as a flat white.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2625,
    image: "koraput-coffee.webp",
  },
  {
    id: "cherry-whiskey-natural",
    name: "Cherry Whiskey × Natural",
    farmId: "dream-hill-coffee",
    farmName: "Dream Hill Coffee × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "natural",
    variety: "Chandragiri",
    roastLevel: "medium",
    flavorNotes: ["Black Cherry", "Whiskey", "Almond", "Dark Chocolate", "Jammy"],
    description:
      "Natural Chandragiri co-conditioned with cherry and rested in whiskey barrels. The natural's inherent dark-cherry note is amplified into a jammy, almost liqueur-like cup, with almond and dark chocolate underneath.",
    brewingNotes:
      "French press or moka pot at 94°C for the fullest body. As espresso, a 1:2 ratio keeps the cherry bright without turning sour.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2695,
    image: "koraput-coffee.webp",
  },
  {
    id: "orange-rum-natural",
    name: "Orange Rum × Natural",
    farmId: "koraput-a1-coffee",
    farmName: "Koraput A-1 Coffee × Gray Cup Roastery",
    region: "Koraput District",
    processing: "natural",
    variety: "Arabica S795",
    roastLevel: "medium",
    flavorNotes: ["Candied Orange", "Rum", "Cocoa", "Marmalade", "Warm Spice"],
    description:
      "S795 natural co-fermented with orange peel and finished in rum barrels. Bright candied-orange and marmalade notes lift the natural's cocoa base, with a rum warmth on the finish. Christmas in a cup.",
    brewingNotes:
      "Pour-over at 92°C keeps the orange zesty; espresso at 93°C, 27 seconds brings out the rum and cocoa. Excellent cold brew.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2625,
    image: "koraput-coffee.webp",
  },
  {
    id: "strawberry-cacao-anaerobic-natural",
    name: "Strawberry Cacao × Anaerobic Natural",
    farmId: "oak-winds-farm",
    farmName: "Oak Winds Farm × Gray Cup Roastery",
    region: "Pottangi, Koraput",
    processing: "natural",
    variety: "Arabica SLN 9",
    roastLevel: "light",
    flavorNotes: ["Strawberry", "Cacao Nib", "Hibiscus", "Red Berry", "Tropical Sweetness"],
    description:
      "Anaerobic-natural SLN 9 from Oak Winds co-fermented with strawberry and cacao husk. Sealed-tank fermentation locks in intense red-berry and strawberry, with cacao nib grounding the sweetness. No barrel — pure co-ferment. Roasted light.",
    brewingNotes:
      "Pour-over or AeroPress at 88–90°C, 1:15 ratio, medium grind. Cold brew for a naturally sweet, fruit-forward cup with no additives.",
    availability: "limited",
    weightOptions: ["100g", "250g", "500g"],
    exportAvailable: false,
    pricePerKg: 2895,
    image: "koraput-coffee.webp",
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
