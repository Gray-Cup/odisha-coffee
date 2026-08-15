export interface BuyerCity {
  city: string;
  citySlug: string;
  state: string;
  stateSlug: string;
  buyerTypes: string[];
  cityContext: string;
  whyOdisha: string;
  nearbyAreas: string[];
  transitDays: string;
  coordinates: { lat: number; lng: number };
  faqs: { question: string; answer: string }[];
}

export const buyerCities: BuyerCity[] = [
  {
    city: "New Delhi",
    citySlug: "new-delhi",
    state: "Delhi NCR",
    stateSlug: "delhi-ncr",
    buyerTypes: ["Specialty Roasters", "Café Chains", "Importers & Traders", "Hotel F&B Buyers"],
    cityContext:
      "Delhi NCR is India's largest urban market for specialty coffee — with hundreds of specialty cafés, roasters, and hotel chains sourcing single-origin lots. Odisha Arabica's fruity, low-acid profile appeals to Delhi's discerning specialty buyers.",
    whyOdisha:
      "Koraput coffee is shade-grown at high elevations in the Eastern Ghats — offering jasmine, citrus, and caramel notes rare in Indian origins. Delhi roasters source it for single-origin pour-overs and espresso blends.",
    nearbyAreas: ["Gurgaon", "Noida", "Ghaziabad", "Faridabad"],
    transitDays: "3–4 days",
    coordinates: { lat: 28.6139, lng: 77.209 },
    faqs: [
      {
        question: "Can Delhi roasters buy Odisha green coffee in small lots?",
        answer:
          "Yes — specialty lots start from 10 kg with 200–500 g cupping samples available before any bulk order. We ship to Delhi NCR in 3–4 days.",
      },
      {
        question: "What export documentation is available for Odisha coffee sourced from Delhi?",
        answer:
          "All Gray Cup export lots come with APEDA registration, phytosanitary certificate, ICO stamp, and farm-level traceability documents. Ideal for Delhi-based importers and re-exporters.",
      },
    ],
  },
  {
    city: "Mumbai",
    citySlug: "mumbai",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    buyerTypes: ["Specialty Roasters", "Hotel F&B Buyers", "HORECA Distributors", "Export Traders"],
    cityContext:
      "Mumbai's premium café scene, five-star hotel chains, and active coffee trading community make it one of India's top green coffee sourcing markets. Koraput lots are increasingly sought after for their traceability and unique flavour profile.",
    whyOdisha:
      "Mumbai's specialty roasters prize single-origin transparency. Koraput coffee comes with farm-level documentation and altitude data — key differentiators for premium café menus and export-linked trading.",
    nearbyAreas: ["Thane", "Navi Mumbai", "Pune"],
    transitDays: "3–5 days",
    coordinates: { lat: 19.076, lng: 72.8777 },
    faqs: [
      {
        question: "Do you supply Odisha coffee to Mumbai's five-star hotels?",
        answer:
          "Yes — we supply export-grade Koraput Arabica to Mumbai's hospitality sector. Both commercial AA/AAA for high-volume use and specialty single-origin lots for premium menus.",
      },
      {
        question: "Can Mumbai-based coffee traders export Odisha green coffee?",
        answer:
          "Yes — Gray Cup provides complete export documentation (APEDA, phytosanitary, ICO) for traders re-exporting from Mumbai port. Contact us for FCL and LCL quantities.",
      },
    ],
  },
  {
    city: "Bengaluru",
    citySlug: "bengaluru",
    state: "Karnataka",
    stateSlug: "karnataka",
    buyerTypes: ["Specialty Roasters", "Micro-Roasteries", "Café Chains", "Tech Campus F&B"],
    cityContext:
      "Bengaluru is India's specialty coffee capital — home to the country's most active roasting and café community. Odisha Arabica from Koraput is emerging as a compelling alternative to Chikmagalur and Coorg lots for single-origin menus.",
    whyOdisha:
      "Bengaluru's roasters are always seeking novel origins. Koraput Arabica from the Eastern Ghats — shade-grown at 700–1,100m with tribal farming heritage — offers a distinctive story and flavour profile distinct from South Indian origins.",
    nearbyAreas: ["Mysuru", "Tumkur", "Mandya"],
    transitDays: "4–6 days",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    faqs: [
      {
        question: "How does Koraput coffee compare to Chikmagalur or Coorg for Bengaluru roasters?",
        answer:
          "Koraput Arabica is shade-grown in the Eastern Ghats at comparable elevations to Chikmagalur. The cup profile tends toward jasmine, stone fruit, and caramel — distinct from Coorg's chocolatey notes. Many Bengaluru roasters use it to expand their origin portfolio.",
      },
      {
        question: "Can I visit the Koraput farms as a Bengaluru-based buyer?",
        answer:
          "Yes — we arrange farm visits to Koraput for serious buyers. The region is accessible from Bhubaneswar or Visakhapatnam. Contact us to plan a visit.",
      },
    ],
  },
  {
    city: "Hyderabad",
    citySlug: "hyderabad",
    state: "Telangana",
    stateSlug: "telangana",
    buyerTypes: ["Specialty Roasters", "Café Chains", "Hotel F&B Buyers", "Corporate Campuses"],
    cityContext:
      "Hyderabad's tech corridor and growing specialty café scene create strong demand for traceable single-origin Indian coffee. Proximity to Odisha makes logistics straightforward for Hyderabad buyers.",
    whyOdisha:
      "Hyderabad's specialty buyers appreciate the tribal farming narrative and altitude-grown quality of Koraput coffee. It sits well on filter menus and pour-over stations in the city's growing specialty café segment.",
    nearbyAreas: ["Secunderabad", "Cyberabad", "Rangareddy"],
    transitDays: "3–5 days",
    coordinates: { lat: 17.385, lng: 78.4867 },
    faqs: [
      {
        question: "Can Hyderabad cafés get cupping samples of Odisha coffee before ordering?",
        answer:
          "Yes — we send 200–500 g cupping samples to Hyderabad buyers before any bulk commitment. Transit is 3–5 days. WhatsApp us to request samples.",
      },
    ],
  },
  {
    city: "Chennai",
    citySlug: "chennai",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    buyerTypes: ["Specialty Roasters", "Export Traders", "Hotel F&B Buyers", "Café Chains"],
    cityContext:
      "Chennai's deep coffee culture, port access for exports, and active specialty community make it a key buyer and transit hub for Odisha green coffee.",
    whyOdisha:
      "Chennai exporters use Odisha coffee to diversify beyond South Indian origins. The APEDA certification and phytosanitary documentation we provide make it ready for export through Chennai port.",
    nearbyAreas: ["Tambaram", "Perumbur", "Kancheepuram"],
    transitDays: "4–6 days",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    faqs: [
      {
        question: "Can Chennai exporters source Odisha coffee through Gray Cup?",
        answer:
          "Yes — we provide complete export documentation (APEDA, phytosanitary, ICO stamp) for Chennai-based traders. FOB pricing and FCL/LCL quantities available on request.",
      },
    ],
  },
  {
    city: "Pune",
    citySlug: "pune",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    buyerTypes: ["Specialty Roasters", "Micro-Roasteries", "Café Chains", "Tech Campus F&B"],
    cityContext:
      "Pune's booming café culture, large IT campus population, and active specialty roasting community make it a strong buyer for traceable single-origin Odisha coffee.",
    whyOdisha:
      "Pune's specialty roasters are expanding beyond standard South Indian origins. Koraput coffee from the Eastern Ghats — tribal-farmed, shade-grown, and fully traceable — makes for a compelling menu addition.",
    nearbyAreas: ["Pimpri-Chinchwad", "Hinjewadi", "Kothrud"],
    transitDays: "3–5 days",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    faqs: [
      {
        question: "Is Odisha coffee available in small trial quantities for Pune roasters?",
        answer:
          "Yes — specialty lots from 10 kg, with 200–500 g sample packs available before any bulk order. We ship to Pune in 3–5 days.",
      },
    ],
  },
  {
    city: "Kolkata",
    citySlug: "kolkata",
    state: "West Bengal",
    stateSlug: "west-bengal",
    buyerTypes: ["Specialty Roasters", "Café Chains", "Export Traders", "Wholesale Distributors"],
    cityContext:
      "Kolkata's port access and proximity to Odisha make it one of the most natural distribution and export hubs for Odisha green coffee. A growing specialty café scene adds local roaster demand.",
    whyOdisha:
      "Kolkata is the closest major port city to Koraput. Export traders and distributors in Kolkata can access Odisha coffee with some of the fastest transit times and most competitive logistics.",
    nearbyAreas: ["Howrah", "Salt Lake", "Durgapur"],
    transitDays: "2–3 days",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    faqs: [
      {
        question: "Can Kolkata traders export Odisha coffee through Kolkata port?",
        answer:
          "Yes — Kolkata port is one of the natural exit points for Odisha green coffee. We provide APEDA and phytosanitary documentation for export. Contact us for quantity and pricing.",
      },
    ],
  },
  {
    city: "Ahmedabad",
    citySlug: "ahmedabad",
    state: "Gujarat",
    stateSlug: "gujarat",
    buyerTypes: ["Specialty Roasters", "Hotel F&B Buyers", "Café Chains", "Corporate Offices"],
    cityContext:
      "Ahmedabad's thriving business community, growing specialty café scene, and large hotel sector create demand for quality single-origin Indian coffee. Koraput offers a novel origin story for Gujarat's premium buyers.",
    whyOdisha:
      "Gujarat's specialty buyers are looking beyond Karnataka and Tamil Nadu origins. Koraput Arabica's tribal farming story and Eastern Ghats terroir resonates well with Ahmedabad's values-driven consumers.",
    nearbyAreas: ["Gandhinagar", "Anand", "Surat"],
    transitDays: "4–6 days",
    coordinates: { lat: 23.0225, lng: 72.5714 },
    faqs: [
      {
        question: "Do you deliver Odisha green coffee to Ahmedabad roasters?",
        answer:
          "Yes — transit to Ahmedabad is 4–6 days via road freight. Specialty lots from 10 kg, commercial from 60 kg. WhatsApp for current stock and pricing.",
      },
    ],
  },
  {
    city: "Kochi",
    citySlug: "kochi",
    state: "Kerala",
    stateSlug: "kerala",
    buyerTypes: ["Export Traders", "Specialty Roasters", "Hotel F&B Buyers", "Importers"],
    cityContext:
      "Kochi is one of India's primary coffee export hubs. Traders and exporters here actively source from multiple Indian origins, and Odisha coffee adds a compelling tribal-origin narrative to export portfolios.",
    whyOdisha:
      "Kochi's export community values origin diversity. Koraput Arabica from the Eastern Ghats is certified, traceable, and in growing demand globally — adding Odisha to export portfolios broadens market reach.",
    nearbyAreas: ["Ernakulam", "Thrissur", "Alappuzha"],
    transitDays: "5–7 days",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    faqs: [
      {
        question: "Can Kochi-based exporters source Odisha coffee from Gray Cup?",
        answer:
          "Yes — we supply export-ready Koraput lots with APEDA registration, phytosanitary certificate, and ICO stamp. Contact us for FCL/LCL quantities and FOB pricing from Kochi.",
      },
    ],
  },
  {
    city: "Jaipur",
    citySlug: "jaipur",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    buyerTypes: ["Heritage Hotel F&B", "Specialty Cafés", "Tourism Hospitality", "Corporate Offices"],
    cityContext:
      "Jaipur's heritage tourism economy means palace hotels and premium cafés are key buyers. Single-origin Odisha coffee with a tribal farming story aligns well with Jaipur's premium hospitality narrative.",
    whyOdisha:
      "Jaipur's luxury hospitality sector values origin stories. Koraput Arabica — grown by tribal communities in the Eastern Ghats, shade-grown and fully traceable — makes a compelling menu feature for palace hotel restaurants.",
    nearbyAreas: ["Jodhpur", "Ajmer", "Alwar"],
    transitDays: "4–6 days",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    faqs: [
      {
        question: "Do Jaipur palace hotels source single-origin Indian coffee?",
        answer:
          "Increasingly yes — premium Koraput Arabica with traceability documents is a natural fit for luxury heritage F&B menus. We supply both commercial and specialty lots. Contact us for pricing.",
      },
    ],
  },
  {
    city: "Chandigarh",
    citySlug: "chandigarh",
    state: "Chandigarh",
    stateSlug: "chandigarh",
    buyerTypes: ["Specialty Roasters", "Boutique Cafés", "Hotels", "Corporate Offices"],
    cityContext:
      "Chandigarh Tricity's high per-capita income and discerning café culture make it a growing market for premium single-origin Indian coffee. Koraput lots are beginning to find a niche among Chandigarh's specialty buyers.",
    whyOdisha:
      "Chandigarh's specialty cafés are among India's most sophisticated. Koraput coffee — with its unusual Eastern Ghats terroir and tribal farming provenance — makes a distinctive addition to single-origin menus.",
    nearbyAreas: ["Mohali", "Panchkula", "Zirakpur"],
    transitDays: "4–6 days",
    coordinates: { lat: 30.7333, lng: 76.7794 },
    faqs: [
      {
        question: "Can Chandigarh cafés get small lots of Odisha specialty coffee?",
        answer:
          "Yes — specialty lots from 10 kg with sample packs before bulk orders. Transit to Chandigarh is 4–6 days. WhatsApp us for current stock.",
      },
    ],
  },
  {
    city: "Bhubaneswar",
    citySlug: "bhubaneswar",
    state: "Odisha",
    stateSlug: "odisha",
    buyerTypes: ["Specialty Roasters", "Café Chains", "IT Campus F&B", "Retail Brands"],
    cityContext:
      "Bhubaneswar is the nearest major city to Koraput coffee country. Local roasters have the unique opportunity to source directly and quickly from the Eastern Ghats farms with some of the fastest transit available.",
    whyOdisha:
      "Being in the same state as Koraput means Bhubaneswar roasters get the freshest post-harvest lots. Direct farm relationships are easiest from Bhubaneswar, and the city's growing café scene is increasingly embracing local origin coffee.",
    nearbyAreas: ["Cuttack", "Puri", "Khurda"],
    transitDays: "1–2 days",
    coordinates: { lat: 20.2961, lng: 85.8245 },
    faqs: [
      {
        question: "Can Bhubaneswar roasters visit the Koraput farms directly?",
        answer:
          "Yes — Bhubaneswar to Koraput is roughly 6–7 hours by road. We arrange farm visits for Bhubaneswar-based buyers during harvest season (November–February). Contact us to plan a trip.",
      },
      {
        question: "Is Bhubaneswar the best city in India to source Odisha coffee?",
        answer:
          "It's certainly the most proximate — you get the fastest delivery (1–2 days), easiest logistics, and the ability to build direct relationships with farms. Ideal for a Bhubaneswar roastery building an Odisha coffee brand.",
      },
    ],
  },
  {
    city: "Guwahati",
    citySlug: "guwahati",
    state: "Assam",
    stateSlug: "assam",
    buyerTypes: ["Specialty Roasters", "Hotel F&B Buyers", "Wholesale Distributors", "Café Chains"],
    cityContext:
      "Guwahati is Northeast India's commercial gateway with a rapidly growing café scene. Odisha coffee offers a compelling single-origin option for Northeast buyers who want Indian provenance with a different terroir than the familiar Assam or Darjeeling tea belt.",
    whyOdisha:
      "Guwahati's specialty market is young and curious. Koraput Arabica — a south Indian origin with tribal farming heritage — is an exciting contrast to the region's tea culture and resonates well with Northeast India's local-origin consciousness.",
    nearbyAreas: ["Dispur", "Kamrup", "Jorhat"],
    transitDays: "5–7 days",
    coordinates: { lat: 26.1445, lng: 91.7362 },
    faqs: [
      {
        question: "Can Guwahati cafés source Odisha coffee instead of South Indian brands?",
        answer:
          "Yes — Koraput Arabica is a great way for Northeast cafés to offer traceable Indian specialty coffee with a unique origin story. Lots from 10 kg, transit 5–7 days.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): BuyerCity | undefined {
  return buyerCities.find((c) => c.citySlug === slug);
}

export function getRelatedCities(slug: string): BuyerCity[] {
  return buyerCities.filter((c) => c.citySlug !== slug).slice(0, 4);
}
