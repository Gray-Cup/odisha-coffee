import Link from "next/link";
import { farms } from "@/data/farms";
import { estateProducts } from "@/data/estate-products";
import { ProductsCatalog } from "./products-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koraput, Odisha Green Coffee Beans — All Grades, All Farms",
  description:
    "Buy Koraput, Odisha green Arabica from all 24 partner estates. AAA, AA, A, B+ and B grade washed, natural and honey lots — select your farm, choose your grade, order direct. Gray Cup Enterprises.",
  alternates: { canonical: "/buy-green-beans" },
  openGraph: {
    title: "Koraput, Odisha Green Coffee Beans — All Grades, All Farms",
    description:
      "AAA to B grade washed, natural and honey green Arabica from 24 verified Koraput, Odisha estates. Select farm and grade, order direct from Gray Cup Enterprises.",
    url: "https://odishacoffee.com/buy-green-beans",
    locale: "en_IN",
  },
};

export default function BuyGreenBeansPage() {
  const exportReadyFarms = farms.filter((f) => f.exportReady);

  return (
    <div>
      {/* Hero */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs text-white/60 uppercase tracking-widest">Buy Green Beans</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Koraput, Odisha Green Coffee Beans
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed mb-8">
            {estateProducts.length} grade lots available from every one of our {farms.length} partner
            estates in Koraput. Select a grade, pick your farm from the dropdown on the card, and
            proceed to order — or use the farm switches to filter by estate first.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { value: estateProducts.length.toString(), label: "Grade Lots" },
              { value: farms.length.toString(), label: "Partner Farms" },
              { value: exportReadyFarms.length.toString(), label: "Export Ready" },
              { value: "₹690–₹1060", label: "Per kg (incl. ship)" },
            ].map(({ value, label }) => (
              <div key={label} className="border-l-2 border-white/30 pl-4">
                <div className="font-serif text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive catalog — client component */}
      <ProductsCatalog />
    </div>
  );
}
