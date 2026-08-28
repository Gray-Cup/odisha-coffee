import { getGuides } from "@/lib/guides";
import { Link } from "react-router";
import { generateTitle, generateDescription, SITE_URL } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Coffee Guides: Best Indian Coffee, Koraput & Green Beans") },
    {
      name: "description",
      content: generateDescription(
        "Buying guides and deep-dives on Indian coffee — best coffee brands in India, Koraput and Odisha single-origin, filter coffee, and green coffee beans for roasters."
      ),
    },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/guides` },
  ];
}

export default function GuidesIndexPage() {
  const guides = getGuides();
  const byCategory = new Map<string, typeof guides>();
  for (const g of guides) {
    const list = byCategory.get(g.category) ?? [];
    list.push(g);
    byCategory.set(g.category, list);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">Coffee Guides</h1>
        <p className="max-w-3xl text-muted-foreground md:text-lg">
          Honest buying guides on Indian coffee — from the best beans to drink to the green
          lots roasters source from Koraput, Odisha.
        </p>
      </div>

      {guides.length === 0 ? (
        <p className="text-muted-foreground">No guides published yet.</p>
      ) : (
        [...byCategory.entries()].map(([category, list]) => (
          <section key={category} className="mb-12">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {category}
            </h2>
            <div className="flex flex-col">
              {list.map((g) => (
                <article key={g.slug} className="border-b py-3">
                  <h3 className="text-lg font-semibold hover:text-blue-600 hover:underline">
                    <Link to={`/guides/${g.slug}`}>{g.title}</Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{g.description}</p>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
