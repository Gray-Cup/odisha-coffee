import { Link } from "react-router";
import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Our Sites") },
    { name: "description", content: generateDescription("Explore the informational websites owned and operated by Gray Cup, focused on bulk chai, CTC tea education, and loose-leaf tea knowledge.") },
  ];
}

export default function SitesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Sites</h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          GrayCup operates a group of informational websites focused on
          different aspects of tea — from bulk chai usage to CTC grading and
          loose-leaf tea education. All sites listed below are owned and
          operated by GrayCup.
        </p>
      </header>

      {/* Cards Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* BulkChai Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">BulkChai</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Informational platform on bulk chai usage across cafés, offices,
            canteens, and retail environments.
          </p>
          <Link
            to="https://bulkchai.com"
            className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit bulkchai.com →
          </Link>
        </div>

        {/* BulkCTC Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">BulkCTC</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Dedicated to explaining CTC tea — grades, particle size, colour
            output, and consistency in bulk chai preparation.
          </p>
          <Link
            to="https://bulkctc.com"
            className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit bulkctc.com →
          </Link>
        </div>

        {/* PureCha Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">PureCha</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Loose-leaf and orthodox tea education — purity, processing methods,
            and leaf quality explained.
          </p>
          <Link
            to="https://purecha.in"
            className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit purecha.in →
          </Link>
        </div>

        {/* GrayFarms Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Gray Farms</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            A public directory of tea and coffee farms, built to bring
            transparency to the supply chain and help growers get discovered.
          </p>
          <Link
            to="https://grayfarms.in"
            className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit grayfarms.in →
          </Link>
        </div>

        {/* Indian Green Coffee Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Indian Green Coffee</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Origin guide to India&apos;s green coffee — including Koraput,
            Odisha — with processing methods, grading, and a catalogue of
            current lots.
          </p>
          <Link
            to="https://indiangreencoffee.com"
            className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit indiangreencoffee.com →
          </Link>
        </div>

        {/* Indian Roasted Coffee Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Indian Roasted Coffee</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Single-origin Indian coffee, roasted to order and shipped within
            48 hours, sourced from Coorg, Chikmagalur, Wayanad, the Nilgiris,
            Koraput (Odisha), and other Indian growing regions.
          </p>
          <Link
            to="https://indianroastedcoffee.com"
            className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit indianroastedcoffee.com →
          </Link>
        </div>
      </section>

      {/* Ownership Note */}
      <section className="mt-16 max-w-3xl">
        <h3 className="text-xl font-semibold text-gray-900">
          Ownership & Transparency
        </h3>
        <p className="mt-3 text-gray-600">
          All websites listed on this page are owned and operated by GrayCup.
          Each platform serves a specific informational purpose while following
          the same standards of accuracy, clarity, and transparency.
        </p>
      </section>
    </main>
  );
}
