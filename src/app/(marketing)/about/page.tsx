import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { farms } from "@/data/farms";
import { FaGithub, FaLinkedin, FaGlobeAsia, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

export const metadata: Metadata = {
  title: "About Us — Odisha Coffee",
  description:
    "Odisha Coffee lists every partner coffee farm in Koraput, giving these Eastern Ghats estates visibility and helping them sell faster to buyers around the world. Run by Gray Cup Enterprises.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
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
            <span className="text-xs text-white/80 uppercase tracking-widest">About</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            About Odisha Coffee
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            A directory and marketplace for every coffee estate in Koraput —
            built to put Odisha&apos;s coffee on the map and get it into more
            hands, faster.
          </p>
        </div>
      </section>

      {/* What is Odisha Coffee */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-odisha-black mb-4">
            What Odisha Coffee Is
          </h2>
          <p className="text-odisha-black/70 leading-relaxed mb-4">
            Odisha Coffee (odishacoffee.com) is where we&apos;ve listed all{" "}
            {farms.length} coffee farms of Koraput, Odisha — one place to see
            every estate in the region, its elevation, processing methods,
            and the lots it has available. Koraput&apos;s Eastern Ghats have
            been growing exceptional Arabica for decades, but very few buyers
            outside India know these farms even exist. This site exists to
            fix that.
          </p>
          <p className="text-odisha-black/70 leading-relaxed mb-4">
            We work closely with each partner farm — visiting the estates,
            documenting their processing and harvest data, and representing
            them directly to buyers. In turn, that gives Koraput coffee real
            visibility, and helps these farms sell faster to roasters,
            importers, and coffee businesses around the world instead of
            depending only on local traders.
          </p>
          <p className="text-odisha-black/70 leading-relaxed">
            Odisha Coffee is run by{" "}
            <span className="font-semibold text-odisha-black">
              Gray Cup Enterprises Private Limited
            </span>{" "}
            (
            <a
              href="https://graycup.org/"
              target="_blank"
              rel="noopener dofollow"
              className="text-odisha-black hover:text-odisha-red transition-colors underline"
            >
              graycup.org
            </a>
            ), which handles sourcing, export, and logistics on behalf of the
            farms listed here.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/farms"
              className="inline-block px-6 py-3 bg-odisha-red text-white text-sm font-semibold border-2 border-odisha-red hover:bg-odisha-black hover:border-odisha-black transition-colors"
            >
              Browse All Farms
            </Link>
            <Link
              href="/buy-green-beans"
              className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-offwhite transition-colors"
            >
              Buy Green Beans
            </Link>
          </div>
        </div>
      </section>

      {/* Other sites */}
      <section className="bg-white border-t-2 border-odisha-black">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-odisha-black mb-6">
            Other Sites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border-2 border-odisha-black p-5">
              <p className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                Company Website
              </p>
              <a
                href="https://graycup.org/"
                target="_blank"
                rel="noopener dofollow"
                className="font-serif font-semibold text-odisha-black hover:text-odisha-red transition-colors"
              >
                graycup.org
              </a>
            </div>
            <div className="border-2 border-odisha-black p-5">
              <p className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                Online Store for Consumers
              </p>
              <a
                href="https://graycup.in/"
                target="_blank"
                rel="noopener dofollow"
                className="font-serif font-semibold text-odisha-black hover:text-odisha-red transition-colors"
              >
                graycup.in
              </a>
              <p className="text-xs text-odisha-black/50 mt-1">India Only</p>
            </div>
            <div className="border-2 border-odisha-black p-5">
              <p className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                Online Store for Businesses
              </p>
              <a
                href="https://b2b.graycup.in/"
                target="_blank"
                rel="noopener dofollow"
                className="font-serif font-semibold text-odisha-black hover:text-odisha-red transition-colors"
              >
                b2b.graycup.in
              </a>
              <p className="text-xs text-odisha-black/50 mt-1">Worldwide</p>
            </div>
            <div className="border-2 border-odisha-black p-5">
              <p className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                Bulk Green Coffee
              </p>
              <a
                href="https://bulkgreencoffee.com/"
                target="_blank"
                rel="noopener dofollow"
                className="font-serif font-semibold text-odisha-black hover:text-odisha-red transition-colors"
              >
                bulkgreencoffee.com
              </a>
              <p className="text-xs text-odisha-black/50 mt-1">Worldwide</p>
            </div>
            <div className="border-2 border-odisha-black p-5">
              <p className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                Origin Guide — Green Coffee
              </p>
              <a
                href="https://indiangreencoffee.com/"
                target="_blank"
                rel="noopener dofollow"
                className="font-serif font-semibold text-odisha-black hover:text-odisha-red transition-colors"
              >
                indiangreencoffee.com
              </a>
            </div>
            <div className="border-2 border-odisha-black p-5">
              <p className="text-[10px] uppercase tracking-widest text-odisha-black/50 mb-1">
                Roasted Coffee, Shipped to Order
              </p>
              <a
                href="https://indianroastedcoffee.com/"
                target="_blank"
                rel="noopener dofollow"
                className="font-serif font-semibold text-odisha-black hover:text-odisha-red transition-colors"
              >
                indianroastedcoffee.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Notable people */}
      <section className="bg-odisha-offwhite pattachitra-pattern border-t-2 border-odisha-black">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-14">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-odisha-black mb-6">
            Notable People
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col border-2 border-odisha-black bg-white p-5">
              <Image
                src="/arjun.png"
                alt="Arjun Aditya profile photo"
                height={200}
                width={200}
              />
              <p className="font-serif text-base font-semibold text-odisha-black mt-4">
                Arjun Aditya (Director)
              </p>
              <p className="text-xs text-odisha-black/50 mt-1 mb-4">
                A Homo Sapien who loves nature, code and design.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  className="text-odisha-black/60 hover:text-odisha-red transition-colors"
                  target="_blank"
                  href="https://arjunaditya.xyz"
                >
                  <FaGlobeAsia size={18} />
                </Link>
                <Link
                  className="text-odisha-black/60 hover:text-odisha-red transition-colors"
                  target="_blank"
                  href="https://github.com/nermalcat69"
                >
                  <FaGithub size={18} />
                </Link>
                <Link
                  className="text-odisha-black/60 hover:text-odisha-red transition-colors"
                  target="_blank"
                  href="https://www.linkedin.com/in/nermalcat69/"
                >
                  <FaLinkedin size={18} />
                </Link>
                <Link
                  className="text-odisha-black/60 hover:text-odisha-red transition-colors"
                  target="_blank"
                  href="https://x.com/arjunaditya_"
                >
                  <FaXTwitter size={18} />
                </Link>
                <Link
                  className="text-odisha-black/60 hover:text-odisha-red transition-colors"
                  target="_blank"
                  href="https://instagram.com/arjun_sustains"
                >
                  <FaInstagram size={18} />
                </Link>
                <Link
                  className="text-odisha-black/60 hover:text-odisha-red transition-colors"
                  target="_blank"
                  href="mailto:arjunaditya@icloud.com"
                >
                  <IoIosMail size={20} />
                </Link>
              </div>
              <a
                className="mt-4"
                href="https://cal.com/arjunaditya/30min?user=arjunaditya"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-widest border-2 border-odisha-black text-odisha-black hover:bg-odisha-black hover:text-white transition-colors">
                  Schedule Call
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-odisha-red border-t-2 border-odisha-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-white text-lg">
              Are you a coffee farm in Koraput?
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Get listed on Odisha Coffee and reach buyers around the world.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-odisha-black text-sm font-semibold border-2 border-white hover:bg-odisha-yellow hover:border-odisha-yellow transition-colors whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
