import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { countryDestinations, getCountryBySlug, getRelatedCountries } from "@/data/locations/countries";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "@/app/(marketing)/buy-green-beans/products-catalog";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return countryDestinations.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const data = getCountryBySlug(country);
  if (!data) return { title: "Not Found" };
  return {
    title: generateTitle(`Green Coffee Exporter to ${data.name}`),
    description: generateDescription(
      `Export-ready Koraput, Odisha green Arabica coffee for roasters and importers in ${data.name}. Traceable, tribal-farmed, Eastern Ghats single-origin lots — select a grade and order online.`
    ),
    alternates: { canonical: `/${country}/green-coffee` },
    openGraph: {
      title: `Green Coffee Exporter to ${data.name} ${data.flag} | Odisha Coffee`,
      description: `Wholesale Koraput green coffee exported to ${data.name}. APEDA, phytosanitary, and ICO documentation included.`,
      url: `${SITE_URL}/${country}/green-coffee`,
      locale: "en_IN",
    },
  };
}

export default async function CountryGreenCoffeePage({ params }: Props) {
  const { country } = await params;
  const data = getCountryBySlug(country);
  if (!data) notFound();

  const related = getRelatedCountries(country);
  const exportReadyFarms = farms.filter((f) => f.exportReady);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: data.name, item: `${SITE_URL}/${country}/green-coffee` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-2 mb-5 text-xs flex-wrap">
            <Link href="/" className="text-white/60 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white uppercase tracking-widest">{data.flag} {data.name}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Green Coffee Exporter to {data.name} {data.flag}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Koraput Arabica from the Eastern Ghats — traceable, tribal-farmed, and export-ready.
            Select a grade below, choose your farm, and order direct for shipment to {data.name}.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: data.currency, label: "Settled In INR, Quoted For " + data.currency + " Buyers" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export context */}
      <section className="bg-white border-b-2 border-odisha-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
          <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
            Exporting Koraput Green Coffee to {data.name}
          </h2>
          <p className="text-odisha-black/80 leading-relaxed">
            Gray Cup Enterprises exports Koraput, Odisha green Arabica directly from our {farms.length}{" "}
            partner estates in the Eastern Ghats to roasters, importers, and traders in {data.name}. Every
            export-ready lot ships with APEDA registration, a phytosanitary certificate, FSSAI documentation,
            an ICO stamp, and full farm-level traceability — grown by tribal farming communities at 700–1,100m
            elevation.
          </p>
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
                Can roasters in {data.name} order Koraput green coffee directly online?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Yes — select a grade and farm above, choose your quantity, and either add it to your cart
                or proceed straight to checkout. For larger export quantities, contact us for FOB pricing
                and FCL/LCL options.
              </p>
            </div>
            <div className="border-l-4 border-odisha-red pl-5">
              <h3 className="font-semibold text-odisha-black mb-2">
                What certification comes with green coffee exported to {data.name}?
              </h3>
              <p className="text-odisha-black/70 leading-relaxed">
                Every export-ready lot ships with APEDA registration, phytosanitary certificate, FSSAI,
                ICO stamp, and full farm-level traceability documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related countries */}
      {related.length > 0 && (
        <section className="border-t-2 border-odisha-black bg-odisha-offwhite">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Other Countries We Export To
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/green-coffee`}
                  className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
                >
                  <h3 className="font-semibold text-odisha-black group-hover:text-odisha-red transition-colors">
                    {c.flag} {c.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
