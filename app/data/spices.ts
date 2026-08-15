export type Spice = {
  id: string;
  name: string;
  pricePerKg: number;
  description: string;
  image?: string; // filename relative to /public/ — used as the card/thumbnail image
  images?: string[]; // optional extra gallery shots (paths relative to /public/)
  weightOptions: Array<{ label: string; grams: number }>;
};

const SPICE_WEIGHT_OPTIONS: Spice["weightOptions"] = [
  { label: "100g", grams: 100 },
  { label: "250g", grams: 250 },
  { label: "500g", grams: 500 },
  { label: "1kg",  grams: 1000 },
];

export const spices: Spice[] = [
  {
    id: "black-pepper",
    name: "Black Pepper",
    pricePerKg: 850,
    description:
      "Shade-grown black pepper from Brown Valley Coffee Estate in Koraput, Odisha — pepper vines are traditionally intercropped with silver oak and jackfruit shade trees across the estate. Sun-dried, hand-sorted, and sold by the kilogram.",
    image: "black-pepper/black-pepper-1.webp",
    images: ["black-pepper/black-pepper-1.webp", "black-pepper/black-pepper-2.webp"],
    weightOptions: SPICE_WEIGHT_OPTIONS,
  },
  {
    id: "white-pepper",
    name: "White Pepper",
    pricePerKg: 1400,
    description:
      "Shade-grown white pepper from Brown Valley Coffee Estate in Koraput, Odisha — ripe berries are soaked and hulled to remove the outer skin, yielding a milder, cleaner heat than black pepper. Sun-dried, hand-sorted, and sold by the kilogram.",
    image: "white-pepper/white-pepper-1.webp",
    weightOptions: SPICE_WEIGHT_OPTIONS,
  },
];

export function getSpiceById(id: string): Spice | undefined {
  return spices.find((s) => s.id === id);
}
