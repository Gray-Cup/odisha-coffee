import Link from "next/link";
import type { Metadata } from "next";
import { spices } from "@/data/spices";

export const metadata: Metadata = {
  title: "Spices from Koraput — Odisha Coffee",
  description:
    "Shade-grown spices from Gray Cup's partner coffee estates in Koraput, Odisha — starting with black pepper at ₹850/kg.",
  alternates: { canonical: "/spices" },
};

export default function SpicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 md:py-18">
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/"
              className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-xs text-white/80 uppercase tracking-widest">Spices</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Spices from Koraput
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            Our partner coffee estates in the Eastern Ghats also grow spices
            under the same shade canopy as their coffee. Available alongside
            our green and roasted coffee lots.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spices.map((spice) => (
              <div
                key={spice.id}
                className="border-2 border-odisha-black bg-white flex flex-col"
              >
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-serif font-bold text-odisha-black text-lg leading-snug mb-2">
                    {spice.name}
                  </h2>
                  <p className="text-sm text-odisha-black/60 leading-relaxed mb-4 flex-1">
                    {spice.description}
                  </p>
                  <div className="flex items-baseline justify-between border-t border-odisha-black/10 pt-3 mb-4">
                    <span className="font-serif text-xl font-bold text-odisha-black">
                      ₹{spice.pricePerKg.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-odisha-black/50">/ kg</span>
                  </div>
                  <a
                    href={`https://wa.me/918527914317?text=${encodeURIComponent(
                      `Hi, I'd like to order ${spice.name} (₹${spice.pricePerKg}/kg).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-odisha-red text-white text-xs font-bold uppercase tracking-widest border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">Looking for coffee instead?</h3>
            <p className="text-white/60 text-sm mt-1">Browse green beans and roasted lots from our Koraput partner farms.</p>
          </div>
          <Link
            href="/buy-green-beans"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Buy Green Beans
          </Link>
        </div>
      </section>
    </div>
  );
}
