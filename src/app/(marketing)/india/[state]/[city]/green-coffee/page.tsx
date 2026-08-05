import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { indiaCities, getIndiaCityBySlug, getRelatedIndiaCities } from "@/data/locations/india-cities";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "@/app/(marketing)/buy-green-beans/products-catalog";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ state: string; city: string }> };

export function generateStaticParams() {
  return indiaCities.map((c) => ({ state: c.stateSlug, city: c.citySlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const data = getIndiaCityBySlug(state, city);
  if (!data) return { title: "Not Found" };
  return {
    title: generateTitle(`Green Coffee Beans in ${data.city}, ${data.state}`),
    description: generateDescription(
      `Buy Koraput, Odisha green Arabica coffee beans in ${data.city}. Traceable, tribal-farmed, Eastern Ghats single-origin lots — select a grade and order online. Delivery in ${data.transitDays}.`
    ),
    alternates: { canonical: `/india/${state}/${city}/green-coffee` },
    openGraph: {
      title: `Green Coffee Beans in ${data.city} | Odisha Coffee`,
      description: `Wholesale Koraput green coffee for ${data.city} roasters, cafés, and exporters. Delivery in ${data.transitDays}.`,
      url: `${SITE_URL}/india/${state}/${city}/green-coffee`,
      locale: "en_IN",
    },
  };
}

export default async function CityGreenCoffeePage({ params }: Props) {
  const { state, city } = await params;
  const data = getIndiaCityBySlug(state, city);
  if (!data) notFound();

  const related = getRelatedIndiaCities(city, state);
  const exportReadyFarms = farms.filter((f) => f.exportReady);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: data.state, item: `${SITE_URL}/india/${state}/green-coffee` },
      { "@type": "ListItem", position: 3, name: data.city, item: `${SITE_URL}/india/${state}/${city}/green-coffee` },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Odisha Coffee — ${data.city}`,
    description: `Wholesale Koraput green coffee supplier serving ${data.city}, ${data.state}.`,
    geo: { "@type": "GeoCoordinates", latitude: data.coordinates.lat, longitude: data.coordinates.lng },
    areaServed: data.city,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <Link href="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href={`/india/${state}/green-coffee`} className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">{data.state}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">{data.city}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Green Coffee Beans in {data.city}, {data.state}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Koraput Arabica from the Eastern Ghats — traceable, tribal-farmed, and export-ready.
            Select a grade below, choose your farm, and order direct — delivery to {data.city} in {data.transitDays}.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: data.transitDays, label: `Transit to ${data.city}` },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context + sidebar */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                  Who Buys Koraput Coffee in {data.city}
                </h2>
                <p className="text-odisha-black/80 leading-relaxed mb-4">
                  {data.city} is home to a growing base of {data.industries.slice(0, 3).join(", ").toLowerCase()}{" "}
                  buyers sourcing traceable, single-origin Indian green coffee. Koraput Arabica — shade-grown
                  in the Eastern Ghats by tribal farming communities at 700–1,100m elevation — ships to{" "}
                  {data.city} in {data.transitDays}, with specialty lots from {data.moq}.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.industries.map((ind) => (
                    <div key={ind} className="border-2 border-odisha-black p-3 bg-odisha-offwhite">
                      <span className="font-semibold text-odisha-black text-sm">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="border-2 border-odisha-black bg-white p-5">
                <h3 className="font-serif font-bold text-odisha-black text-lg mb-4">
                  Logistics to {data.city}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-odisha-black/10 pb-2">
                    <span className="text-odisha-black/60">Transit Time</span>
                    <span className="font-semibold text-odisha-black">{data.transitDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-odisha-black/60">Minimum Order</span>
                    <span className="font-semibold text-odisha-black">{data.moq}</span>
                  </div>
                </div>
              </div>
              {data.nearbyAreas.length > 0 && (
                <div className="border-2 border-odisha-black bg-white p-5">
                  <h3 className="font-serif font-bold text-odisha-black text-lg mb-3">
                    Also Serving Nearby
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.nearbyAreas.map((area) => (
                      <span key={area} className="text-xs border border-odisha-black/20 text-odisha-black/60 px-2 py-1">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Interactive catalog */}
      <ProductsCatalog />

      {/* FAQ */}
      <section className="bg-white border-t-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                How fast can {data.city} roasters get Koraput green coffee?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Transit to {data.city} is {data.transitDays}. Select a grade and quantity above and
                proceed to checkout, or add it to your cart to order multiple grades together.
              </p>
            </div>
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                Is export documentation available for buyers sourcing from {data.city}?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Yes — every export-ready lot ships with APEDA registration, phytosanitary certificate,
                FSSAI, ICO stamp, and full farm-level traceability documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related cities */}
      {related.length > 0 && (
        <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Other Cities We Supply
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((rc) => (
                <Link
                  key={rc.citySlug}
                  href={`/india/${rc.stateSlug}/${rc.citySlug}/green-coffee`}
                  className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
                >
                  <h3 className="font-semibold text-odisha-black group-hover:text-odisha-red transition-colors">
                    {rc.city}
                  </h3>
                  <p className="text-xs text-odisha-black/50 mt-1">{rc.state} · {rc.transitDays}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
