export type EstateProduct = {
  id: string;
  name: string;
  variety: string;
  processing: "washed" | "natural" | "honey" | "pulped-natural";
  roastLevel: "green";
  pricePerKg: number;
  shippingPerKg: number;
  description: string;
  flavorNotes: string[];
  availability: "in-stock" | "limited" | "seasonal";
  weightOptions: Array<{ label: string; grams: number }>;
  minOrder: string;
  grade: string;
  moisture: string;
  screenSize: string;
  brewingNotes: string;
  image?: string; // filename relative to /public/
};

const WEIGHT_OPTIONS: EstateProduct["weightOptions"] = [
  { label: "100 g", grams: 100   },
  { label: "500 g", grams: 500   },
  { label: "1 kg",  grams: 1000  },
  { label: "2 kg",  grams: 2000  },
  { label: "5 kg",  grams: 5000  },
  { label: "10 kg", grams: 10000 },
  { label: "20 kg", grams: 20000 },
];

export const estateProducts: EstateProduct[] = [
  {
    id: "aaa-arabica-washed",
    name: "AAA Green Arabica Washed",
    variety: "Arabica S795",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 900,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "The finest grade from Koraput's Eastern Ghats — AAA-grade washed Arabica, screen 17+ sorted, moisture-tested at 10–12%. Fully washed and parchment-dried on raised beds for 14–18 days. Ideal for specialty roasters and importers seeking a consistent, traceable Indian Arabica with clean cup character.",
    flavorNotes: ["Clean", "Mild Citrus", "Chocolate", "Brown Sugar"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "AAA — Screen 17+",
    moisture: "10–12%",
    screenSize: "Screen 17+",
    brewingNotes:
      "Recommended roast: medium-light to medium. First crack +20–30s development. The washed process transparency rewards a careful ramp — expect clean citrus on light roasts, chocolate and brown sugar on medium.",
  },
  {
    id: "aa-arabica-washed",
    name: "AA Green Arabica Washed",
    variety: "Arabica S795",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 830,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "AA-grade washed Arabica from verified Koraput estates. Screen 16+ sorted, moisture 10–12%, fully washed and raised-bed dried. A reliable workhorse lot for roasters seeking solid cup quality and honest traceability at a practical price point.",
    flavorNotes: ["Chocolate", "Mild Citrus", "Clean", "Medium Body"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "AA — Screen 16+",
    moisture: "10–12%",
    screenSize: "Screen 16+",
    brewingNotes:
      "Recommended roast: medium-light to medium-dark. Versatile across filter, espresso, and blend use. Well-suited to blend components where consistent body and low defect count matter more than peak complexity.",
  },
  {
    id: "a-arabica-washed",
    name: "A Green Arabica Washed",
    variety: "Arabica S795 & Chandragiri",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 765,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "A-grade washed Arabica from Koraput partner estates. Screen 15+ sorted, moisture 10–12%. A good-value entry into Odisha washed Arabica — clean, approachable, and well-suited to medium roast profiles and espresso blending.",
    flavorNotes: ["Chocolate", "Mild Spice", "Nutty", "Clean Finish"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "A — Screen 15+",
    moisture: "10–12%",
    screenSize: "Screen 15+",
    brewingNotes:
      "Recommended roast: medium to medium-dark. Works well as an espresso base or blend anchor. The Chandragiri component adds structure; roast to first crack +30s for best balance.",
  },
  {
    id: "b-plus-arabica-washed",
    name: "B+ Green Arabica Washed",
    variety: "Arabica S795 & Chandragiri",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 755,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "B+ grade washed green beans — screen 15+, moisture 10–13%. A 100% Arabica lot combining S795 and Chandragiri from Koraput estates, fully washed and sun-dried. Suited for commodity blenders, large-volume roasters, and buyers seeking consistent Indian green beans at scale.",
    flavorNotes: ["Cocoa", "Earthy", "Full Body", "Low Acidity"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "B+ — Screen 15+",
    moisture: "10–13%",
    screenSize: "Screen 15+",
    brewingNotes:
      "Recommended roast: medium-dark to dark. Full-bodied and low-acid straight out of the washed process — well-suited to espresso blends and commercial roast profiles.",
  },
  {
    id: "b-arabica-washed",
    name: "B Green Arabica Washed",
    variety: "Arabica S795 & Chandragiri",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 690,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "B-grade washed green beans from Koraput — screen 13+ sorted, moisture 11–13%. A practical commodity lot for high-volume buyers, instant coffee producers, and blend manufacturers. Traceable origin with FSSAI documentation.",
    flavorNotes: ["Earthy", "Cocoa", "Woody", "Neutral"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "5 kg",
    grade: "B — Screen 13+",
    moisture: "11–13%",
    screenSize: "Screen 13+",
    brewingNotes:
      "Recommended roast: medium-dark to dark. Suitable for espresso blends, instant production, and commercial dark roasts. The natural earthiness of Koraput terroir is retained even at darker roast levels.",
  },
  {
    id: "bb-arabica-washed",
    name: "BB Green Arabica Washed",
    variety: "Arabica S795 & Chandragiri",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 630,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "BB-grade washed green beans from Koraput — screen 12+ sorted, moisture 11–13%. Our lowest-grade washed commodity lot, priced for the most price-sensitive high-volume buyers, instant coffee producers, and blend manufacturers. Traceable origin with FSSAI documentation.",
    flavorNotes: ["Earthy", "Woody", "Neutral", "Full Body"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "5 kg",
    grade: "BB — Screen 12+",
    moisture: "11–13%",
    screenSize: "Screen 12+",
    brewingNotes:
      "Recommended roast: dark. Best suited to instant production and value commercial dark roasts, where cost per kg matters more than cup complexity.",
  },
  {
    id: "b-plus-arabica-naturals",
    name: "B+ Green Arabica Naturals",
    variety: "Arabica S795 & Chandragiri",
    processing: "natural",
    roastLevel: "green",
    pricePerKg: 750,
    shippingPerKg: 60,
    image: "koraput-naturals.jpg",
    description:
      "B+ grade natural-processed green beans sun-dried whole on raised beds for 25–30 days. Cherries are dried with the fruit intact, developing a rich, fruit-integrated profile. Screen 15+ sorted, moisture 11–13%. A practical entry-point lot for roasters seeking Koraput naturals with character and honest traceability.",
    flavorNotes: ["Dark Fruit", "Chocolate", "Earthy", "Full Body"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "B+ — Screen 15+",
    moisture: "11–13%",
    screenSize: "Screen 15+",
    brewingNotes:
      "Recommended roast: medium to medium-dark. Allow extended development (DTR 22–25%) to fully unlock the fruit-chocolate complexity. Blends well with washed Arabica for espresso. As a single origin, excellent on French press or moka pot.",
  },
  {
    id: "hsd-commercial",
    name: "Arabica HSD Commercial",
    variety: "Arabica HSD (Hibrido de Timor)",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 650,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "Commercial-grade HSD (Hibrido de Timor) Arabica, washed and raised-bed dried at Koraput estates. Screen 14+ sorted, moisture 11–13%. A dependable, disease-resistant varietal lot priced for volume buyers, blenders, and instant coffee producers who need consistent Indian-origin green beans.",
    flavorNotes: ["Nutty", "Mild Citrus", "Cocoa", "Medium Body"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "5 kg",
    grade: "Commercial — Screen 14+",
    moisture: "11–13%",
    screenSize: "Screen 14+",
    brewingNotes:
      "Recommended roast: medium-dark to dark. Well-suited to espresso blends and commercial roast programmes where consistency and price matter more than peak complexity.",
  },
  {
    id: "hsd-specialty",
    name: "Arabica HSD Specialty",
    variety: "Arabica HSD (Hibrido de Timor)",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 950,
    shippingPerKg: 60,
    image: "koraput-washed.jpg",
    description:
      "Specialty-grade HSD Arabica, hand-picked at peak ripeness, fully washed and dried on raised beds for 14–18 days. Screen 17+ sorted, moisture 10–12%, lot-tested for cup quality. Selected for specialty roasters seeking a traceable, high-scoring Koraput lot with bright, clean character.",
    flavorNotes: ["Bright Citrus", "Floral", "Brown Sugar", "Clean Finish"],
    availability: "limited",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "Specialty — Screen 17+",
    moisture: "10–12%",
    screenSize: "Screen 17+",
    brewingNotes:
      "Recommended roast: light to medium-light. First crack +15–20s development to preserve the varietal's bright acidity and floral aromatics. Excellent on pour-over and filter brewers.",
  },
  {
    id: "naturals-commercial",
    name: "AA Arabica Naturals",
    variety: "Arabica S795",
    processing: "natural",
    roastLevel: "green",
    pricePerKg: 864,
    shippingPerKg: 60,
    image: "koraput-naturals.jpg",
    description:
      "AA-grade natural-processed 100% Arabica green beans from Koraput, Odisha, whole-cherry dried on raised beds for 25–30 days. Screen 14+ sorted, moisture 11–13%. A value-focused naturals lot for high-volume roasters and blenders who want fruit-forward character without specialty pricing.",
    flavorNotes: ["Dried Fruit", "Earthy", "Cocoa", "Full Body"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "5 kg",
    grade: "AA — Screen 14+",
    moisture: "11–13%",
    screenSize: "Screen 14+",
    brewingNotes:
      "Recommended roast: medium-dark to dark. The whole-cherry drying builds body and sweetness on its own; suited to commercial espresso blends and dark roast programmes.",
  },
  {
    id: "aa-honey-sundried-commercial",
    name: "AA Honey Sundried Commercial",
    variety: "Arabica S795",
    processing: "honey",
    roastLevel: "green",
    pricePerKg: 897,
    shippingPerKg: 60,
    image: "koraput-naturals.jpg",
    description:
      "AA-grade honey-processed green beans from Koraput, Odisha. Pulp is removed but mucilage is retained on the parchment through sun-drying on raised beds, producing a sweeter cup than washed lots at a commercial-friendly price. Screen 14+ sorted, moisture 11–13%.",
    flavorNotes: ["Honey Sweetness", "Caramel", "Stone Fruit", "Medium Body"],
    availability: "in-stock",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "5 kg",
    grade: "AA — Screen 14+",
    moisture: "11–13%",
    screenSize: "Screen 14+",
    brewingNotes:
      "Recommended roast: medium to medium-dark. The retained mucilage sweetness holds up well through darker roasts; a solid espresso-blend component or commercial filter lot.",
  },
  {
    id: "naturals-specialty",
    name: "Naturals Specialty",
    variety: "Arabica S795",
    processing: "natural",
    roastLevel: "green",
    pricePerKg: 1000,
    shippingPerKg: 60,
    image: "koraput-naturals.jpg",
    description:
      "Specialty-grade natural Arabica, selectively hand-picked at full ripeness and dried whole on raised beds for 28–35 days with daily turning. Screen 16+ sorted, moisture 10–12%, cupped and lot-tested. Odisha's dry-season sun produces a dense, wine-like naturals lot for specialty roasters.",
    flavorNotes: ["Ripe Berry", "Red Wine", "Dark Chocolate", "Syrupy Body"],
    availability: "limited",
    weightOptions: WEIGHT_OPTIONS,
    minOrder: "1 kg",
    grade: "Specialty — Screen 16+",
    moisture: "10–12%",
    screenSize: "Screen 16+",
    brewingNotes:
      "Recommended roast: medium, extended development (DTR 22–26%) to fully resolve fruit sugars without ferment-y sharpness. Outstanding on French press or moka pot; also excellent as a single-origin espresso.",
  },
];

export function getEstateProductById(id: string): EstateProduct | undefined {
  return estateProducts.find((p) => p.id === id);
}

export function computeEstateProductTotal(
  pricePerKg: number,
  shippingPerKg: number,
  grams: number
): { product: number; shipping: number; total: number } {
  const kg = grams / 1000;
  const product = Math.ceil(pricePerKg * kg);
  const shipping = Math.ceil(shippingPerKg * kg);
  return { product, shipping, total: product + shipping };
}
