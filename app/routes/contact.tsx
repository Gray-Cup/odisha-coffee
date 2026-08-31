import { Link } from "react-router";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export function meta() {
  return [
    { title: "Contact Us - Odisha Coffee" },
    {
      name: "description",
      content:
        "Get in touch with Gray Cup Enterprises Private Limited, office address, phone, email and WhatsApp.",
    },
  ];
}

export function links() {
  return [{ rel: "canonical", href: "https://odishacoffee.com/contact" }];
}

export default function ContactPage() {
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
            <span className="text-xs text-white/80 uppercase tracking-widest">Contact</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            Have a question, want to source coffee, or list your farm? Reach
            us directly using any of the details below.
          </p>
        </div>
      </section>

      {/* Details + Map */}
      <section className="bg-odisha-offwhite pattachitra-pattern">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Details card */}
            <div className="border-2 border-odisha-black bg-white p-6 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 mt-0.5 text-odisha-red shrink-0" />
                <p className="font-serif font-semibold text-odisha-black">
                  Gray Cup Enterprises Private Limited
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-odisha-red shrink-0" />
                <p className="text-odisha-black/80 text-sm leading-relaxed">
                  Harsha Bhawan, 4th Floor, 13/29 E- Block, Connaught Place,
                  New Delhi-110001
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-odisha-red shrink-0" />
                <a
                  href="tel:+918527914317"
                  className="text-odisha-black/80 text-sm hover:text-odisha-red transition-colors"
                >
                  +91 8527914317
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-odisha-red shrink-0" />
                <div className="flex flex-col gap-1 text-sm">
                  <a
                    href="mailto:office@graycup.org"
                    className="text-odisha-black/80 hover:text-odisha-red transition-colors"
                  >
                    office@graycup.org
                  </a>
                  <a
                    href="mailto:arjun@graycup.in"
                    className="text-odisha-black/80 hover:text-odisha-red transition-colors"
                  >
                    arjun@graycup.in
                  </a>
                </div>
              </div>

              <a
                href="https://wa.me/918527914317"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 border-2 border-odisha-green bg-odisha-green px-5 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-odisha-black hover:border-odisha-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.394.53-.592.18-.198.24-.339.359-.567.12-.228.06-.427-.03-.599-.09-.171-.816-1.966-1.116-2.694-.298-.712-.599-.615-.822-.626-.216-.01-.463-.012-.71-.012-.247 0-.647.093-.885.462-.239.37-.912 1.09-.912 2.372 0 1.281.912 2.582 1.04 2.775.128.194 1.795 2.771 4.365 3.98 2.57 1.211 2.57.807 3.036.756.466-.05 1.507-.616 1.72-1.212.212-.596.212-1.107.148-1.213-.064-.106-.297-.169-.594-.318z" />
                  <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .105 5.365.103 11.955c0 2.096.548 4.14 1.588 5.945L0 24l6.304-1.654a11.94 11.94 0 0 0 5.734 1.464h.005c6.585 0 11.943-5.365 11.946-11.955a11.9 11.9 0 0 0-3.469-8.406zm-8.475 18.4h-.004a9.93 9.93 0 0 1-5.06-1.387l-.363-.216-3.741.981.998-3.648-.237-.375a9.917 9.917 0 0 1-1.522-5.256c.002-5.476 4.455-9.928 9.933-9.928 2.652 0 5.14 1.033 7.014 2.909a9.86 9.86 0 0 1 2.906 7.021c-.003 5.477-4.456 9.899-9.924 9.899z" />
                </svg>
                Send us a message on WhatsApp
              </a>
            </div>

            {/* Map */}
            <div className="border-2 border-odisha-black overflow-hidden">
              <iframe
                title="Gray Cup Enterprises office location"
                src="https://www.google.com/maps?q=Harsha+Bhawan,+13/29+E-Block,+Connaught+Place,+New+Delhi-110001&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  border: 0,
                  borderRadius: 0,
                  boxShadow: "none",
                  width: "100%",
                  height: "100%",
                  minHeight: 340,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
