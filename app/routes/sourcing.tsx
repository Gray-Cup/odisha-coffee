import { generateTitle, generateDescription } from "@/lib/seo";
import { Link } from "react-router";

export function meta() {
  return [
    { title: generateTitle("Sourcing & White Label") },
    { name: "description", content: generateDescription("Source premium teas, coffees, and spices through Gray Cup. We offer raw material sourcing and white label products — packaging is not included.") },
  ];
}

export default function SourcingPage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
        Sourcing &amp; White Label
      </h1>
      <p className="text-md md:text-lg text-muted-foreground mb-10">
        Partner with Gray Cup to source high-quality teas, coffees, and spices
        — under your brand or ours.
      </p>

      <div className="prose prose-neutral space-y-10">

        {/* What we offer */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            What We Offer
          </h2>
          <p className="mb-4">
            We supply premium, traceable teas, coffees, and spices sourced
            directly from estates and farms across India. Whether you need raw
            materials for your own production or finished white-label products
            under your brand name, we can help.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Sourcing:</strong> Bulk raw materials — whole-leaf teas,
              green/roasted coffee beans, whole or ground spices.
            </li>
            <li>
              <strong>White Label:</strong> Finished products with your brand
              name, label design, and specifications.
            </li>
          </ul>
        </section>

        {/* What we do NOT offer */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            Packaging — We Don&apos;t Do That
          </h2>
          <p className="mb-4">
            We do <strong>not</strong> offer packaging services. If you are
            sourcing from us you will receive the product unpackaged (or in
            plain bulk packaging), and packaging is entirely your
            responsibility.
          </p>
          <p className="mb-4">
            If you need packaging — pouches, canisters, sachets, or custom
            printed bags — we recommend reaching out to{" "}
            <strong>Swiss Pac</strong>, a specialist flexible packaging
            supplier that many of our partners work with:
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
            <p className="font-semibold text-neutral-800 mb-1">Swiss Pac</p>
            <p className="text-sm text-muted-foreground mb-3">
              Custom flexible packaging — pouches, zipper bags, stand-up packs,
              and more.
            </p>
            <a
              href="https://www.swisspac.in/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-blue-700 underline underline-offset-2"
            >
              Contact Swiss Pac →
            </a>
          </div>
        </section>

        {/* How to get started */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            Get Started
          </h2>
          <p className="mb-4">
            Ready to source or explore a white-label arrangement? Reach out to
            us and we&apos;ll share our product catalogue, MOQs, and pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="inline-block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="https://b2b.graycup.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              Visit B2B Store
            </a>
          </div>
        </section>

      </div>

      <p className="text-sm text-muted-foreground mt-14">
        Gray Cup Enterprises Private Limited | CIN: U47211DL2025PTC457808 | GST: 06AAMCG4985H1Z4
      </p>
    </div>
  );
}
