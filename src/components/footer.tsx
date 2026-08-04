import Link from "next/link";
import { farms } from "@/data/farms";

const quickLinks = [
  { href: "/farms", label: "Partner Farms" },
  { href: "/buy-green-beans", label: "Buy Green Beans" },
  { href: "/roasted-coffee", label: "Roasted Coffee" },
  { href: "/spices", label: "Spices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact & Export" },
];

const infoLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/refunds", label: "Refunds & Cancellations" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-odisha-black bg-white text-odisha-black">
      {/* Top bar */}
      <div className="bg-odisha-red border-b-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-white text-sm font-medium">
            Sourcing exceptional Odisha coffee from the Eastern Ghats — export &amp; wholesale available worldwide.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Bulk Orders
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand block */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="text-lg font-serif font-bold text-odisha-black tracking-wide mb-1">
                ODISHA COFFEE
              </div>
              <div className="text-xs uppercase tracking-widest text-odisha-black/50 mb-3">
                Gray Cup Enterprises Pvt. Ltd.
              </div>
              <p className="text-xs text-odisha-black/60 leading-relaxed">
                We source and export single-origin coffee from verified farms across Koraput and Odisha's Eastern Ghats — connecting India's finest highland coffee with buyers worldwide.
              </p>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <div className="h-2 w-2 bg-odisha-green rounded-full" />
              <span className="text-xs text-odisha-black/50">Export Ready</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50 mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-odisha-black/70 hover:text-odisha-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner farms */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50 mb-4">
              Partner Farms
            </h3>
            <ul className="space-y-1.5 columns-2">
              {farms.map((f) => (
                <li key={f.id} className="break-inside-avoid">
                  <Link
                    href={`/farms/${f.id}`}
                    className="text-xs text-odisha-black/60 hover:text-odisha-red transition-colors leading-relaxed"
                  >
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-odisha-black/50 mb-4">
              Legal &amp; Info
            </h3>
            <ul className="space-y-2 mb-6">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-odisha-black/70 hover:text-odisha-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-xs text-odisha-black/50 space-y-1">
              <p>Koraput, Odisha — India</p>
              <p>CIN: U47211DL2025PTC457808</p>
              <p>IEC: AAMCG4985H</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-odisha-black/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-odisha-black/40">
          <p>© {new Date().getFullYear()} Gray Cup Enterprises Private Limited. All rights reserved.</p>
          <p>
            Koraput Arabica &amp; Robusta — Eastern Ghats, Odisha, India &nbsp;·&nbsp; FSSAI Licensed &nbsp;·&nbsp; APEDA Registered &nbsp;·&nbsp; IEC Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
