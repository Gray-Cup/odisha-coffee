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
};

export const estateProducts: EstateProduct[] = [
  {
    id: "aaa-arabica-washed",
    name: "AAA Green Arabica Washed",
    variety: "Arabica S795",
    processing: "washed",
    roastLevel: "green",
    pricePerKg: 900,
    shippingPerKg: 60,
    description:
      "Estate-sourced AAA-grade washed Arabica green beans from Koraput's Eastern Ghats. Fully washed and parchment-dried on raised beds for 14–18 days. Screen 17+ sorted, moisture-tested at 10–12%. This lot is ideal for specialty roasters and importers seeking a consistent, traceable Indian Arabica with clean cup character and documented origin.",
    flavorNotes: ["Clean", "Mild Citrus", "Chocolate", "Brown Sugar"],
    availability: "in-stock",
    weightOptions: [
      { label: "1 kg", grams: 1000 },
      { label: "5 kg", grams: 5000 },
      { label: "25 kg", grams: 25000 },
      { label: "60 kg", grams: 60000 },
    ],
    minOrder: "1 kg",
    grade: "AAA — Screen 17+",
    moisture: "10–12%",
    screenSize: "Screen 17+",
    brewingNotes:
      "Recommended roast: medium-light to medium. First crack +20–30s development. The washed process transparency rewards a careful ramp — expect clean citrus on light roasts, chocolate and brown sugar on medium.",
  },
  {
    id: "b-plus-arabica-naturals",
    name: "B+ Green Arabica Naturals",
    variety: "Arabica S795 & Robusta Blend",
    processing: "natural",
    roastLevel: "green",
    pricePerKg: 750,
    shippingPerKg: 60,
    description:
      "B+ grade natural-processed green beans sun-dried whole on raised beds for 25–30 days. Cherries are dried with the fruit intact, allowing the bean to absorb natural sugars and develop a rich, fruit-integrated profile. Screen 15+ sorted, moisture-tested at 11–13%. A practical entry-point lot for roasters seeking Koraput naturals with character, depth, and honest traceability.",
    flavorNotes: ["Dark Fruit", "Chocolate", "Earthy", "Full Body"],
    availability: "in-stock",
    weightOptions: [
      { label: "1 kg", grams: 1000 },
      { label: "5 kg", grams: 5000 },
      { label: "25 kg", grams: 25000 },
      { label: "60 kg", grams: 60000 },
    ],
    minOrder: "1 kg",
    grade: "B+ — Screen 15+",
    moisture: "11–13%",
    screenSize: "Screen 15+",
    brewingNotes:
      "Recommended roast: medium to medium-dark. Allow extended development (DTR 22–25%) to fully unlock the fruit-chocolate complexity. Blends well with washed Arabica for espresso. As a single origin, excellent on French press or moka pot.",
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
