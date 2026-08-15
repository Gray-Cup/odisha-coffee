import { getNewsroomPosts } from "@/lib/mdx";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { generateTitle, generateDescription } from "@/lib/seo";

export function meta() {
  return [
    { title: generateTitle("Gray Cup Newsroom") },
    {
      name: "description",
      content: generateDescription(
        "Read updates, announcements and insights from Gray Cup about sourcing, exports and retail for coffee, tea and spices."
      ),
    },
  ];
}

export default function NewsroomPage() {
  const posts = getNewsroomPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-12">
      {/* Header */}
      <div className="text-start mb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Newsroom
        </h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl">
          Insights about Gray Cup and What we are committing to.
        </p>
      </div>

      {/* Newsroom Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No newsroom posts yet</h3>
          <p className="text-muted-foreground mb-6">
            We're working on some amazing content. Check back soon!
          </p>
          <Link to="/">
            <Button>
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col mx-auto max-w-4xl">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden border-b transition-all duration-300"
            >
              <div className="flex flex-row gap-5 items-center p-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-nowrap">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <h2 className="text-lg  font-semibold group-hover:text-primary hover:text-blue-600 hover:underline transition-colors line-clamp-2">
                  <Link to={`/newsroom/${post.slug}`}>{post.title}</Link>
                </h2>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
