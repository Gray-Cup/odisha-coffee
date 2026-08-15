import { Link } from "react-router";
import { spices } from "@/data/spices";
import { SpicesCatalog } from "@/components/products/spices-catalog";

export function meta() {
  return [
    { title: "Spices from Koraput — Odisha Coffee" },
    { name: "description", content: "Shade-grown spices from Brown Valley Coffee Estate in Koraput, Odisha — black pepper at ₹850/kg and white pepper at ₹1,400/kg." },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/spices" }];
}

export default function SpicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-odisha-red pattachitra-pattern-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 md:py-18">
          <div className="flex items-center gap-3 mb-5">
            <Link
              to="/"
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
            Brown Valley Coffee Estate in Koraput also grows spices under the
            same shade canopy as its coffee. Available alongside our green
            and roasted coffee lots.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <SpicesCatalog spices={spices} />
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
            to="/buy-green-beans"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Buy Green Beans
          </Link>
        </div>
      </section>
    </div>
  );
}
