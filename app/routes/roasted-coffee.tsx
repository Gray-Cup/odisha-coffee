import { Link } from "react-router";
import { products } from "@/data/products";
import { RoastedCatalog } from "@/components/products/roasted-catalog";
import { GrayCupShowcase } from "@/components/product-card";

export function meta() {
  return [
    { title: "Roasted Koraput Coffee: Dream Hill & Brown Valley Estates" },
    {
      name: "description",
      content:
        "Freshly roasted single-origin Koraput, Odisha coffee, led by Dream Hill and Brown Valley estates — washed, natural, honey and barrel-aged lots, roasted to order by Gray Cup.",
    },
       {
      property: "og:title",
      content: "Roasted Koraput Coffee: Dream Hill & Brown Valley",
    },
    {
      property: "og:description",
      content:
        "Small-batch roasted Koraput Arabica from Dream Hill and Brown Valley estates, plus barrel-aged and co-fermented lots.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://odishacoffee.com/roasted-coffee",
    },
    {
      property: "og:image",
      content: "https://odishacoffee.com/products/roasted-coffee-beans.webp",
    },
    { property: "og:image:alt", content: "Freshly roasted Koraput, Odisha coffee beans" },

    // Twitter/X sharing
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:image",
      content: "https://odishacoffee.com/products/roasted-coffee-beans.webp",
    },
    {
      name: "twitter:title",
      content: "Roasted Odisha Coffee & Koraput Coffee",
    },
    {
      name: "twitter:description",
      content:
        "Shop freshly roasted commercial and specialty coffee from Koraput and across Odisha.",
    },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/roasted-coffee" }];
}

const BASE_URL = "https://odishacoffee.com";
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

function schemaAvailability(a: string) {
  if (a === "in-stock") return "https://schema.org/InStock";
  if (a === "limited") return "https://schema.org/LimitedAvailability";
  return "https://schema.org/OutOfStock";
}

function buildSchema(product: (typeof products)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/roasted-coffee#${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image ? `${BASE_URL}/products/${product.image}` : `${BASE_URL}/og.webp`,
    url: `${BASE_URL}/roasted-coffee`,
    sku: `OC-${product.id.toUpperCase()}`,
    brand: { "@type": "Brand", name: "Odisha Coffee" },
    category: "Food, Beverages & Tobacco > Food Items > Beverages > Coffee",
    countryOfOrigin: { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.pricePerKg.toFixed(2),
      unitText: "per kg",
      availability: schemaAvailability(product.availability),
      url: `${BASE_URL}/roasted-coffee`,
      seller: { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "Odisha Coffee" },
      priceValidUntil: PRICE_VALID_UNTIL,
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "INR" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 7, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };
}

const FEATURED_FARMS = ["dream-hill-coffee", "brown-valley-coffee-estate"];

export default function RoastedCoffeePage() {
  const allRoasted = products.filter((p) => !p.isGreen && p.roastLevel !== "green");
  // Lead with Dream Hill and Brown Valley, then everything else.
  const roastedProducts = [...allRoasted].sort((a, b) => {
    const ra = FEATURED_FARMS.indexOf(a.farmId);
    const rb = FEATURED_FARMS.indexOf(b.farmId);
    return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);
  });
  const featured = allRoasted.filter((p) => FEATURED_FARMS.includes(p.farmId));
  const specialtyLots = allRoasted.filter((p) => p.availability === "limited" || p.availability === "seasonal");
  const schemas = roastedProducts.map(buildSchema);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div>
        {/* Hero */}
        <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <div className="flex items-center gap-3 mb-5">
              <Link to="/" className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <span className="text-xs text-white/60 uppercase tracking-widest">Roasted Coffee</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Roasted Koraput Coffee: Dream Hill &amp; Brown Valley
            </h1>
            <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
              Our roasted range is built around two Koraput estates: <strong className="text-white">Dream Hill</strong>,
              Odisha's highest-elevation specialty farm, and <strong className="text-white">Brown Valley</strong>,
              the estate running all three processing styles plus a barrel-ageing programme. Washed, natural,
              honey and barrel-aged lots, roasted to order by Gray Cup and rested 48 hours before dispatch.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { value: featured.length.toString(), label: "Dream Hill & Brown Valley Lots" },
                { value: roastedProducts.length.toString(), label: "Roasted Lots Total" },
                { value: specialtyLots.length.toString(), label: "Specialty / Seasonal" },
                { value: "48h", label: "Roast-to-Dispatch Rest" },
              ].map(({ value, label }) => (
                <div key={label} className="border-l-2 border-white/30 pl-4">
                  <div className="font-serif text-2xl font-bold text-white">{value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The two lead estates */}
        <section className="bg-white border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">Dream Hill Estate</h2>
              <p className="text-sm text-odisha-black/70 leading-relaxed mb-3">
                Saptagiri Plantation, Pottangi — the highest-elevation coffee in Odisha at 1,100–1,450 m.
                Arabica SLN 9 and Chandragiri, washed and honey processed, with a jasmine-and-citrus
                clarity that is rare in Indian coffee. Also the base for our whiskey and rum barrel lots.
              </p>
              <Link to="/farms/dream-hill-coffee" className="text-sm text-odisha-red underline">
                Dream Hill farm profile →
              </Link>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">Brown Valley Estate</h2>
              <p className="text-sm text-odisha-black/70 leading-relaxed mb-3">
                Boipariguda, 1,050–1,300 m. One of the few Koraput estates producing washed, natural
                and honey lots with micro-lot traceability, plus a rare wild-foraged civet coffee and
                a HSD barrel-ageing programme. Milk chocolate, hazelnut and stone-fruit character.
              </p>
              <Link to="/farms/brown-valley-coffee-estate" className="text-sm text-odisha-red underline">
                Brown Valley farm profile →
              </Link>
            </div>
          </div>
        </section>

        <RoastedCatalog roastedProducts={roastedProducts} specialtyLots={specialtyLots} />

        {/* Also roasted by Gray Cup, outbound dofollow links, not buyable here */}
        <section className="border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-2">
              Also roasted by Gray Cup
            </h2>
            <p className="text-sm text-odisha-black/60 mb-6 max-w-2xl">
              Gray Cup roasts our Koraput lots, plus South Indian and Northeast estates
              and traditional filter blends, and ships them freshly roasted across India.
              These are sold on graycup.in.
            </p>
            <GrayCupShowcase />
          </div>
        </section>

        {/* Green beans nudge */}
        <section className="bg-odisha-offwhite border-b-2 border-odisha-black">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-odisha-black text-lg">Looking for green beans?</h3>
              <p className="text-sm text-odisha-black/60 mt-1">
                AAA to B grade washed and natural lots available from all 24 partner estates.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/buy-green-beans"
                className="inline-block px-6 py-3 bg-odisha-green text-white text-sm font-semibold border-2 border-odisha-green hover:bg-odisha-black hover:border-odisha-black transition-colors whitespace-nowrap"
              >
                Green Beans →
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-transparent text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors whitespace-nowrap"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
