import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buyerCities, getCityBySlug, getRelatedCities } from "@/data/buyer-cities";
import { generateTitle, generateDescription } from "@/lib/seo";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return buyerCities.map((c) => ({ city: c.citySlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return { title: "Not Found" };
  return {
    title: generateTitle(`Buy Odisha Coffee in ${data.city}, ${data.state}`),
    description: generateDescription(
      `Source Koraput Arabica green coffee wholesale in ${data.city}. Traceable, tribal-farmed, Eastern Ghats single-origin — for roasters, cafés, hotels, and exporters. Gray Cup Enterprises.`
    ),
    alternates: { canonical: `/buy-in/${city}` },
    openGraph: {
      title: `Buy Odisha Coffee in ${data.city} | Koraput Arabica Wholesale`,
      description: `Wholesale Koraput green coffee for ${data.city} roasters, cafés, and exporters. Delivery in ${data.transitDays}.`,
      url: `https://odishacoffee.com/buy-in/${city}`,
      locale: "en_IN",
    },
  };
}

export default async function BuyInCityPage({ params }: Props) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const related = getRelatedCities(city);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://odishacoffee.com" },
      { "@type": "ListItem", position: 2, name: "Buy In Your City", item: "https://odishacoffee.com/buy-in" },
      { "@type": "ListItem", position: 3, name: data.city, item: `https://odishacoffee.com/buy-in/${city}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <Link href="/" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/buy-in" className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">Buy In Your City</Link>
            <span className="text-white/30">/</span>
            <span className="text-xs text-white uppercase tracking-widest">{data.city}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Buy Odisha Coffee in {data.city}, {data.state}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-base">
            Wholesale Koraput Arabica — traceable, tribal-farmed, Eastern Ghats single-origin.
            Delivery in {data.transitDays}.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="https://wa.me/918527914317"
              target="_blank"
              className="inline-block bg-white text-odisha-red font-semibold px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
            >
              WhatsApp for Samples
            </Link>
            <Link
              href="/products"
              className="inline-block border border-white text-white font-semibold px-5 py-2.5 text-sm hover:bg-white/10 transition-colors"
            >
              View Lots
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* City Context */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                Odisha Coffee Buyers in {data.city}
              </h2>
              <p className="text-odisha-black/80 leading-relaxed">{data.cityContext}</p>
            </section>

            {/* Why Odisha */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-odisha-black mb-4">
                Why {data.city} Buyers Choose Koraput Coffee
              </h2>
              <p className="text-odisha-black/80 leading-relaxed">{data.whyOdisha}</p>
            </section>

            {/* Buyer Types */}
            <section>
              <h2 className="font-serif text-xl font-bold text-odisha-black mb-4">
                Who Buys From Us in {data.city}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.buyerTypes.map((bt) => (
                  <div key={bt} className="border-2 border-odisha-black p-4 bg-white">
                    <span className="font-semibold text-odisha-black text-sm">{bt}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            {data.faqs.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="border-l-4 border-odisha-red pl-5">
                      <h3 className="font-semibold text-odisha-black mb-2">{faq.question}</h3>
                      <p className="text-odisha-black/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Logistics Card */}
            <div className="border-2 border-odisha-black bg-white p-5">
              <h3 className="font-serif font-bold text-odisha-black text-lg mb-4">
                Logistics to {data.city}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-odisha-black/10 pb-2">
                  <span className="text-odisha-black/60">Transit Time</span>
                  <span className="font-semibold text-odisha-black">{data.transitDays}</span>
                </div>
                <div className="flex justify-between border-b border-odisha-black/10 pb-2">
                  <span className="text-odisha-black/60">Min. Order (Specialty)</span>
                  <span className="font-semibold text-odisha-black">10 kg</span>
                </div>
                <div className="flex justify-between border-b border-odisha-black/10 pb-2">
                  <span className="text-odisha-black/60">Min. Order (Commercial)</span>
                  <span className="font-semibold text-odisha-black">60 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-odisha-black/60">Sample Pack</span>
                  <span className="font-semibold text-odisha-black">200–500 g</span>
                </div>
              </div>
              <Link
                href="https://wa.me/918527914317"
                target="_blank"
                className="mt-5 block bg-odisha-red text-white text-center font-semibold py-2.5 text-sm hover:opacity-90 transition-opacity"
              >
                Request a Sample
              </Link>
            </div>

            {/* Certifications */}
            <div className="border-2 border-odisha-black bg-white p-5">
              <h3 className="font-serif font-bold text-odisha-black text-lg mb-4">
                Certifications & Docs
              </h3>
              <ul className="space-y-2 text-sm text-odisha-black/80">
                {["APEDA Registration", "Phytosanitary Certificate", "FSSAI", "ICO Stamp", "Farm Traceability"].map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-odisha-green rounded-full shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby Areas */}
            {data.nearbyAreas.length > 0 && (
              <div className="border-2 border-odisha-black bg-white p-5">
                <h3 className="font-serif font-bold text-odisha-black text-lg mb-3">
                  Also Serving Nearby
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.nearbyAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs border border-odisha-black/20 text-odisha-black/60 px-2 py-1"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Cities */}
        {related.length > 0 && (
          <section className="mt-14 border-t-2 border-odisha-black pt-10">
            <h2 className="font-serif text-2xl font-bold text-odisha-black mb-6">
              Other Cities We Supply
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((rc) => (
                <Link
                  key={rc.citySlug}
                  href={`/buy-in/${rc.citySlug}`}
                  className="group block border-2 border-odisha-black bg-white hover:bg-odisha-offwhite transition-colors p-4"
                >
                  <h3 className="font-semibold text-odisha-black group-hover:text-odisha-red transition-colors">
                    {rc.city}
                  </h3>
                  <p className="text-xs text-odisha-black/50 mt-1">{rc.state} · {rc.transitDays}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
