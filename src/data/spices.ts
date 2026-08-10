export type Spice = {
  id: string;
  name: string;
  pricePerKg: number;
  description: string;
  image?: string;
};

export const spices: Spice[] = [
  {
    id: "black-pepper",
    name: "Black Pepper",
    pricePerKg: 850,
    description:
      "Shade-grown black pepper from Brown Valley Coffee Estate in Koraput, Odisha — pepper vines are traditionally intercropped with silver oak and jackfruit shade trees across the estate. Sun-dried, hand-sorted, and sold by the kilogram.",
  },
  {
    id: "white-pepper",
    name: "White Pepper",
    pricePerKg: 1400,
    description:
      "Shade-grown white pepper from Brown Valley Coffee Estate in Koraput, Odisha — ripe berries are soaked and hulled to remove the outer skin, yielding a milder, cleaner heat than black pepper. Sun-dried, hand-sorted, and sold by the kilogram.",
  },
];

export function getSpiceById(id: string): Spice | undefined {
  return spices.find((s) => s.id === id);
}
