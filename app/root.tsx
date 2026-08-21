import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import { cn } from "@/lib/utils";
import RootProviders from "@/components/providers";
import "./styles/globals.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap"
        />
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
              parentOrganization: {
                "@type": "Organization",
                "@id": "https://graycup.in/#organization",
                name: "Gray Cup",
              },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://graycup.in/#organization",
              name: "Gray Cup",
              url: "https://graycup.in",
              logo: "https://graycup.in/logo.png",
              sameAs: [
                "https://www.instagram.com/thegraycup",
                "https://www.linkedin.com/company/gray-cup",
              ],
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9319508737367893"
          crossOrigin="anonymous"
        ></script>
        <Meta />
        <Links />
      </head>
      <body className={cn("min-h-screen bg-odisha-offwhite font-sans antialiased")}>
        <RootProviders>{children}</RootProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-bold text-odisha-black">Page not found</h1>
        <p className="text-odisha-black/70">
          The page you're looking for doesn't exist or has moved.
        </p>
        <a href="/" className="text-odisha-red underline">
          Back to home
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold text-odisha-black">Something went wrong</h1>
      <p className="text-odisha-black/70">Please try again, or head back to the homepage.</p>
      <a href="/" className="text-odisha-red underline">
        Back to home
      </a>
    </div>
  );
}
