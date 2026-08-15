import { Link } from "react-router";

export function meta() {
  return [
    { title: "Social Responsibility | Gray Cup" },
    {
      name: "description",
      content:
        "Gray Cup's commitment to transparency, fair sourcing, and supporting the farms behind your tea and coffee.",
    },
  ];
}

export default function SocialResponsibilityPage() {
  return (
    <div className="mx-auto px-4 lg:px-6 my-10">
      <div className="max-w-5xl mx-auto pt-10 pb-20 px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-medium uppercase text-neutral-400 tracking-widest">
            Social Responsibility
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-medium text-black">
            What we stand for.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            What goes in your cup should be traceable, fair, and transparent —
            from the farm to your hands.
          </p>
        </div>

        {/* Farm Transparency / Gray Farms */}
        <div className="px-6 py-12 bg-neutral-50">
          <span className="text-xs font-medium uppercase text-neutral-400 tracking-widest">
            Farm Transparency
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-medium text-neutral-900 max-w-2xl leading-snug">
            Know where your tea and coffee comes from.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            Coffee and tea farms have long operated in the background — but we
            think they deserve to be seen. That's why we built{" "}
            <span className="font-medium text-neutral-700">Gray Farms</span>, a
            public directory of tea and coffee farms so growers can be found,
            verified, and trusted.
          </p>
          <div className="mt-8">
            <Link
              to="https://grayfarms.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              Visit Gray Farms
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
