export interface IndiaState {
  name: string;
  slug: string;
}

export const INDIA_STATES: IndiaState[] = [
  { name: "Maharashtra", slug: "maharashtra" },
  { name: "Karnataka", slug: "karnataka" },
  { name: "Tamil Nadu", slug: "tamil-nadu" },
  { name: "Kerala", slug: "kerala" },
  { name: "Delhi NCR", slug: "delhi-ncr" },
  { name: "Telangana", slug: "telangana" },
  { name: "Gujarat", slug: "gujarat" },
  { name: "West Bengal", slug: "west-bengal" },
  { name: "Punjab", slug: "punjab" },
  { name: "Rajasthan", slug: "rajasthan" },
  { name: "Uttar Pradesh", slug: "uttar-pradesh" },
  { name: "Madhya Pradesh", slug: "madhya-pradesh" },
  { name: "Andhra Pradesh", slug: "andhra-pradesh" },
  { name: "Haryana", slug: "haryana" },
  { name: "Chandigarh", slug: "chandigarh" },
  { name: "Odisha", slug: "odisha" },
  { name: "Assam", slug: "assam" },
  { name: "Jharkhand", slug: "jharkhand" },
  { name: "Chhattisgarh", slug: "chhattisgarh" },
  { name: "Uttarakhand", slug: "uttarakhand" },
  { name: "Bihar", slug: "bihar" },
];

export function getStateBySlug(slug: string): IndiaState | undefined {
  return INDIA_STATES.find((s) => s.slug === slug);
}
