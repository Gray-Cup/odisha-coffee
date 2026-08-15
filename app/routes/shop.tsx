import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EbayIcon, AmazonIcon, GrayCupIcon, EtsyIcon, MeeshoIcon, ShopsyIcon, TataCliqIcon } from "@/components/logos";
import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Shop Gray Cup Products") },
    {
      name: "description",
      content: generateDescription(
        "Shop Gray Cup products on your preferred platform. Find us on our official store, Amazon, Etsy, and eBay with international options for consumers and businesses."
      ),
    },
  ];
}



const stores = [
  {
    name: "Store",
    description: "Our official online store for consumers in India.",
    href: "https://graycup.in/",
    variant: "default" as const,
    icon: GrayCupIcon,
    inProgress: false,
  },
  {
    name: "Amazon",
    description: "Shop our products on Amazon.",
    href: "https://amazon.in/graycup",
    variant: "gray" as const,
    icon: AmazonIcon,
    inProgress: true,
  },
  {
    name: "Etsy",
    description: "Shop our products on Etsy.",
    href: "https://www.etsy.com/shop/graycup",
    variant: "gray" as const,
    icon: EtsyIcon,
    inProgress: false,
  },
  {
    name: "eBay",
    description: "Find our products on eBay.",
    href: "https://www.ebay.com/usr/graycup",
    variant: "gray" as const,
    icon: EbayIcon,
    inProgress: false,
  },
  {
    name: "Meesho",
    description: "Find our products on eBay.",
    href: "https://www.ebay.com/usr/graycup",
    variant: "gray" as const,
    icon: MeeshoIcon,
    inProgress: true,
  },
  {
    name: "Shopsy",
    description: "Find our products on eBay.",
    href: "https://www.ebay.com/usr/graycup",
    variant: "gray" as const,
    icon: ShopsyIcon,
    inProgress: true,
  },
  {
    name: "Tata Cliq",
    description: "Find our products on eBay.",
    href: "https://www.ebay.com/usr/graycup",
    variant: "gray" as const,
    icon: TataCliqIcon,
    inProgress: true,
  },
];

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Shop</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Find GrayCup products on your preferred platform.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        {stores.map((store) => (
          <div
            key={store.name}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {store.name}
                </h2>
                {store.inProgress && (
                  <Badge variant="secondary">In Process</Badge>
                )}
              </div>
              <p className="mt-2 text-gray-600">{store.description}</p>
              <div className="mt-4">
                {store.inProgress ? (
                  <Button variant={store.variant} size="sm" disabled>
                    Visit {store.name}
                  </Button>
                ) : (
                  <Link to={store.href} target="_blank" rel="noopener noreferrer">
                    <Button variant={store.variant} size="sm">
                      Visit {store.name}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="ml-4 text-gray-400">
              <store.icon />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Business & Wholesale</h2>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Looking to buy in bulk? Partner with us for wholesale pricing and business solutions.
          </p>
        </header>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3">
                <GrayCupIcon />
                <h3 className="text-xl font-semibold text-gray-900">GrayCup B2B</h3>
              </div>
              <p className="mt-3 max-w-lg text-gray-600">
                Access wholesale pricing, bulk orders, and dedicated support for businesses, retailers, and resellers.
              </p>
            </div>
            <Link to="https://b2b.graycup.in/" target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg">
                Visit B2B Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <div className="pt-10 pb-20 max-w-6xl mx-auto px-4 lg:px-6 md:pb-0 flex flex-col justify-center">
        <h2 className="text-2xl font-medium">
          Our products will be available soon at
        </h2>
        <div className="mt-5 mb-20 flex flex-wrap gap-8">
          <a href="https://amazon.in/" target="_blank">
            <Image
              src="/available/amazon.svg"
              alt="available on amazon"
              className="pt-0.5 max-w-full"
              height={100}
              width={100}
            />
          </a>
          <a href="https://www.flipkart.com/" target="_bank">
            <Image
              src="/available/flipkart.svg"
              alt="available on flipkart"
              className="pb-3.5 max-w-full"
              height={140}
              width={140}
            />
          </a>
          <a href="https://gem.gov.in/" target="_blank">
            <Image
              src="/available/gem.svg"
              alt="available on amazon"
              className=" pb-1.5 max-w-full"
              height={130}
              width={130}
            />
          </a>
          <a
            href="https://www.indiamart.com/gray-cup-enterprises/"
            target="_blank"
          >
            <Image
              src="/available/indiamart.svg"
              alt="available on amazon"
              className="pb-3.5 max-w-full"
              height={65}
              width={65}
            />
          </a>
          <a href="https://www.meesho.com/" target="_blank">
            <Image
              src="/available/meesho.svg"
              alt="available on meesho"
              className="pb-3.5 max-w-full"
              height={140}
              width={140}
            />
          </a>
          <a href="https://www.ondc.org/" target="_blank">
            <Image
              src="/available/ondc.svg"
              alt="available on ondc platformms"
              className="pb-2.5 max-w-full"
              height={110}
              width={110}
            />
          </a>
          <a href="https://www.vishalmegamart.com/" target="_blank">
            <Image
              src="/available/vishal-mart.svg"
              alt="available on amazon"
              className="pb-3 max-w-full"
              height={130}
              width={130}
            />
          </a>
          <a
            href="https://relianceretail.com/reliance-fresh.html/"
            target="_blank"
          >
            <Image
              src="/available/reliance-fresh.svg"
              alt="available at reliance fresh stores"
              className="pb-4 max-w-full"
              height={140}
              width={140}
            />
          </a>
          <a href="https://www.tradeindia.com/" target="_blank">
            <Image
              src="/available/trade-india.svg"
              alt="available on trade india"
              className="max-w-full"
              height={70}
              width={70}
            />
          </a>
          <a href="https://www.dmartindia.com/" target="_blank">
            <Image
              src="/available/d-mart.svg"
              alt="available at d mart stores"
              className=" max-w-full"
              height={100}
              width={100}
            />
          </a>
          <a href="https://www.jiomart.com/" target="_blank">
            <Image
              src="/available/jio-mart.svg"
              alt="available on jio mart"
              className=" max-w-full"
              height={50}
              width={50}
            />
          </a>
          <a href="https://www.industrybuying.com/" target="_blank">
            <Image
              src="/available/industrybuying.svg"
              alt="available on industrybuying"
              className=" max-w-full"
              height={150}
              width={150}
            />
          </a>
        </div>
      </div> */}
    </main>
  );
}
