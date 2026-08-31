// India-specific SEO copy for /buy-green-coffee/:location and
// /buy-roasted-coffee/:location. Every state and city page gets a distinct
// title + description built from real data (city industries, transit, MOQ,
// nearby areas) plus a short per-state note, so the ~74 domestic location
// pages stop reading as one template with a name swapped in.
import type { IndiaCity } from "./india-cities";
import { getCitiesByState } from "./india-cities";

interface StateSeo {
  region: string; // North / South / West / East / Northeast / Central India
  note: string;   // one sentence of coffee-market context for the state
}

export const STATE_SEO: Record<string, StateSeo> = {
  maharashtra: { region: "Western India", note: "Maharashtra has India's densest specialty-café and hotel market, led by Mumbai and Pune, and a fast-growing base of independent roasters." },
  karnataka: { region: "Southern India", note: "Karnataka is India's coffee heartland: buyers in Bengaluru and Mangaluru know origin coffee well and cup Koraput lots against the Western Ghats estates on their doorstep." },
  "tamil-nadu": { region: "Southern India", note: "Tamil Nadu pairs a deep filter-coffee tradition with a young specialty scene in Chennai and Coimbatore that is exploring single-origin Indian Arabica." },
  kerala: { region: "Southern India", note: "Kerala's café culture in Kochi and the state's own coffee-growing history make it an informed market for traceable single origins." },
  "delhi-ncr": { region: "Northern India", note: "Delhi NCR is the largest specialty market in the north, with roasters and cloud-kitchen coffee brands across New Delhi, Gurgaon and Noida sourcing green coffee directly." },
  telangana: { region: "Southern India", note: "Hyderabad has one of India's quickest-growing café scenes and a rising number of micro-roasters buying green coffee by the sack." },
  gujarat: { region: "Western India", note: "Gujarat's coffee demand is led by Ahmedabad and Surat's hospitality and corporate sectors, with specialty roasting taking hold in Ahmedabad." },
  "west-bengal": { region: "Eastern India", note: "Kolkata's historic coffee-house culture is being rediscovered by a new wave of specialty roasters looking for Indian-origin beans close to home." },
  punjab: { region: "Northern India", note: "Punjab's café growth in Amritsar and Ludhiana is driven by hospitality and a young urban crowd moving from instant to filter and pour-over." },
  rajasthan: { region: "Northern India", note: "Rajasthan's tourism economy in Jaipur and Udaipur supports a hotel and boutique-café coffee market that values a documented origin story." },
  "uttar-pradesh": { region: "Northern India", note: "Uttar Pradesh's large urban centres (Lucknow, Kanpur, Varanasi, Agra) have a rapidly expanding café segment sourcing better coffee." },
  "madhya-pradesh": { region: "Central India", note: "Indore and Bhopal anchor a Central India café market that is shifting toward specialty and single-origin coffee." },
  "andhra-pradesh": { region: "Southern India", note: "Andhra Pradesh sits next to Koraput's growing region; Visakhapatnam and Vijayawada buyers get some of the shortest transit times in the country." },
  haryana: { region: "Northern India", note: "Gurugram and Faridabad's corporate and QSR density makes Haryana a high-volume market for office and food-service coffee alongside specialty." },
  chandigarh: { region: "Northern India", note: "Chandigarh has one of India's most design-forward café scenes for its size and a discerning specialty crowd." },
  odisha: { region: "Eastern India", note: "Odisha is the origin state itself: Bhubaneswar and Cuttack buyers get Koraput coffee with the shortest possible supply chain and the strongest local story." },
  assam: { region: "Northeast India", note: "Guwahati is the gateway to the Northeast, a tea region now developing its own coffee culture and interested in Indian-grown Arabica." },
  jharkhand: { region: "Eastern India", note: "Ranchi's café scene is young but growing, with easy overland transit from Odisha." },
  chhattisgarh: { region: "Central India", note: "Raipur's hospitality and corporate sectors are the main coffee buyers, with short transit from neighbouring Odisha." },
  uttarakhand: { region: "Northern India", note: "Dehradun's education and tourism economy supports a compact but quality-minded café market." },
  bihar: { region: "Eastern India", note: "Patna's café market is at an early stage and expanding quickly, with straightforward overland delivery from Odisha." },
};

const DEFAULT_STATE: StateSeo = {
  region: "India",
  note: "This market has a growing base of cafés, roasters and hospitality buyers sourcing traceable Indian single-origin green coffee.",
};

export function getStateSeo(slug: string): StateSeo {
  return STATE_SEO[slug] ?? DEFAULT_STATE;
}

// ── Title / description builders ────────────────────────────────────────

export function greenCityTitle(c: IndiaCity) {
  return `Wholesale Green Coffee Beans in ${c.city}: Koraput, Odisha Arabica`;
}
export function greenCityDescription(c: IndiaCity) {
  const inds = c.industries.slice(0, 2).join(" and ").toLowerCase();
  const near = c.nearbyAreas.slice(0, 2).join(", ");
  return `Buy Koraput, Odisha green Arabica in ${c.city} for ${inds}, traceable Eastern Ghats single-origin lots, delivered in ${c.transitDays}, from ${c.moq}${near ? `. Also serving ${near}` : ""}.`;
}

export function greenStateTitle(name: string) {
  return `Wholesale Green Coffee Beans in ${name}, India: Koraput Arabica`;
}
export function greenStateDescription(slug: string, name: string) {
  const cities = getCitiesByState(slug).map((c) => c.city);
  const seo = getStateSeo(slug);
  const cityStr = cities.length ? ` including ${cities.slice(0, 4).join(", ")}` : "";
  return `Buy Koraput, Odisha green coffee beans across ${name}${cityStr}. ${seo.note} Traceable single-origin Arabica for roasters and cafés, delivered India-wide.`;
}

export function roastedCityTitle(c: IndiaCity) {
  return `Buy Freshly Roasted Koraput Coffee in ${c.city}, ${c.state}`;
}
export function roastedCityDescription(c: IndiaCity) {
  const inds = c.industries.slice(0, 2).join(" and ").toLowerCase();
  return `Small-batch roasted Koraput, Odisha Arabica for ${c.city} ${inds}, roasted to order, rested 48h, delivered in ${c.transitDays}. Single-origin lots, espresso and filter blends.`;
}

export function roastedStateTitle(name: string) {
  return `Buy Freshly Roasted Koraput, Odisha Coffee in ${name}, India`;
}
export function roastedStateDescription(slug: string, name: string) {
  const cities = getCitiesByState(slug).map((c) => c.city);
  const seo = getStateSeo(slug);
  const cityStr = cities.length ? ` including ${cities.slice(0, 4).join(", ")}` : "";
  return `Freshly roasted single-origin Koraput Arabica delivered across ${name}${cityStr}. ${seo.note} Roasted to order and dispatched India-wide.`;
}
