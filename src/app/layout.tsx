import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Public_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import RootProviders from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";
import { WhatsappWidget } from "@/components/whatsapp-widget";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontPublicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://odishacoffee.com"),
  title: {
    default: "Odisha Coffee — Wholesale, Export & Farm Sourcing",
    template: "%s | Odisha Coffee",
  },
  description:
    "Odisha Coffee — single-origin coffee from the Eastern Ghats of Koraput, Odisha. Wholesale green beans, export lots, and direct farm sourcing by Gray Cup Enterprises. Traceable Arabica & Robusta from 24 verified Odisha coffee farms.",
  keywords: [
    "Odisha coffee",
    "Odisha coffee wholesale",
    "Odisha coffee export",
    "buy Odisha coffee",
    "Koraput coffee",
    "Koraput Arabica",
    "Koraput Robusta",
    "Odisha coffee farms",
    "Indian single origin coffee",
    "Indian specialty coffee export",
    "Eastern Ghats coffee",
    "coffee wholesale India",
    "coffee export India",
  ],
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: "Odisha Coffee — Wholesale, Export & Farm Sourcing",
    description:
      "Odisha Coffee — single-origin coffee from Koraput's Eastern Ghats. Wholesale green beans, traceable export lots, 24 verified partner farms. Sourced by Gray Cup Enterprises.",
    images: [{ url: "https://odishacoffee.com/og.png", width: 1200, height: 630, alt: "Odisha Coffee — Koraput, Eastern Ghats" }],
    type: "website",
    locale: "en_IN",
    siteName: "Odisha Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odisha Coffee — Wholesale, Export & Farm Sourcing",
    description:
      "Odisha Coffee — single-origin coffee from the Eastern Ghats of Koraput. Wholesale, export, and direct farm sourcing.",
    images: ["https://odishacoffee.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-odisha-offwhite font-sans antialiased",
          fontSans.variable,
          fontPlayfair.variable,
          fontPublicSans.variable,
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://odishacoffee.com/#website",
              name: "Odisha Coffee",
              alternateName: "Odisha Coffee by Gray Cup",
              url: "https://odishacoffee.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://odishacoffee.com/#organization",
              name: "Odisha Coffee",
              alternateName: "Odisha Coffee",
              legalName: "Gray Cup Enterprises Pvt. Ltd.",
              url: "https://odishacoffee.com",
              logo: {
                "@type": "ImageObject",
                url: "https://odishacoffee.com/logo.png",
                width: 512,
                height: 512,
              },
              description:
                "Single-origin Odisha coffee from the Eastern Ghats of Koraput — wholesale green beans, export lots, and direct farm sourcing.",
              email: "office@graycup.org",
              foundingDate: "2019",
              sameAs: [
                "https://www.linkedin.com/company/gray-cup/",
                "https://www.instagram.com/thegraycup",
                "https://x.com/TheGrayCup",
                "https://www.indiamart.com/gray-cup-enterprises/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "office@graycup.org",
                contactType: "sales",
                areaServed: "Worldwide",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressRegion: "Odisha",
              },
              areaServed: "Worldwide",
              additionalType: "http://www.productontology.org/id/Wholesaler",
            }),
          }}
        />
        <Analytics />
        <RootProviders>{children}</RootProviders>
        <WhatsappWidget />
      </body>
    </html>
  );
}
