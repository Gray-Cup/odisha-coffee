import { Metadata } from "next";
import { generateTitle, generateDescription } from "@/lib/seo";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: generateTitle("Contact Us"),
  description: generateDescription(
    "Get in touch with Gray Cup Enterprises Private Limited — office address, phone, email and WhatsApp."
  ),
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen py-10 lg:py-20 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-3">
        Contact Us
      </h1>
      <p className="text-md md:text-lg text-muted-foreground mb-10">
        Have a question or want to do business with Gray Cup? Reach out to us
        directly using any of the details below.
      </p>

      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 space-y-5">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 mt-0.5 text-neutral-500 shrink-0" />
          <p className="text-neutral-800">
            Gray Cup Enterprises Private Limited
          </p>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 mt-0.5 text-neutral-500 shrink-0" />
          <p className="text-neutral-800">
            Harsha Bhawan, 4th Floor, 13/29 E- Block, Connaught Place, New
            Delhi-110001
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 mt-0.5 text-neutral-500 shrink-0" />
          <a
            href="tel:+918527914317"
            className="text-neutral-800 hover:underline"
          >
            +91 8527914317
          </a>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 mt-0.5 text-neutral-500 shrink-0" />
          <div className="flex flex-col gap-1">
            <a
              href="mailto:office@graycup.org"
              className="text-neutral-800 hover:underline"
            >
              office@graycup.org
            </a>
            <a
              href="mailto:arjun@graycup.in"
              className="text-neutral-800 hover:underline"
            >
              arjun@graycup.in
            </a>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/918527914317"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#05aa6c] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.394.53-.592.18-.198.24-.339.359-.567.12-.228.06-.427-.03-.599-.09-.171-.816-1.966-1.116-2.694-.298-.712-.599-.615-.822-.626-.216-.01-.463-.012-.71-.012-.247 0-.647.093-.885.462-.239.37-.912 1.09-.912 2.372 0 1.281.912 2.582 1.04 2.775.128.194 1.795 2.771 4.365 3.98 2.57 1.211 2.57.807 3.036.756.466-.05 1.507-.616 1.72-1.212.212-.596.212-1.107.148-1.213-.064-.106-.297-.169-.594-.318z" />
          <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .105 5.365.103 11.955c0 2.096.548 4.14 1.588 5.945L0 24l6.304-1.654a11.94 11.94 0 0 0 5.734 1.464h.005c6.585 0 11.943-5.365 11.946-11.955a11.9 11.9 0 0 0-3.469-8.406zm-8.475 18.4h-.004a9.93 9.93 0 0 1-5.06-1.387l-.363-.216-3.741.981.998-3.648-.237-.375a9.917 9.917 0 0 1-1.522-5.256c.002-5.476 4.455-9.928 9.933-9.928 2.652 0 5.14 1.033 7.014 2.909a9.86 9.86 0 0 1 2.906 7.021c-.003 5.477-4.456 9.899-9.924 9.899z" />
        </svg>
        Send us a message on WhatsApp
      </a>

      <div className="mt-10 rounded-xl overflow-hidden border border-neutral-200">
        <iframe
          title="Gray Cup Enterprises office location"
          src="https://www.google.com/maps?q=Harsha+Bhawan,+13/29+E-Block,+Connaught+Place,+New+Delhi-110001&output=embed"
          width="100%"
          height="350"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}
