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
      "Shade-grown black pepper from the same Koraput estates that grow our coffee — pepper vines are traditionally intercropped with silver oak and jackfruit shade trees across the region. Sun-dried, hand-sorted, and sold by the kilogram.",
  },
];

export function getSpiceById(id: string): Spice | undefined {
  return spices.find((s) => s.id === id);
}
