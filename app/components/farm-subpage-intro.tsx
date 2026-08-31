import { Link } from "react-router";
import type { Farm } from "@/data/farms";

// Farm-specific context block for the /farms/:slug/{green-coffee,products,
// roasted-coffee} subpages, so each renders substantial unique content
// (description, story, terroir, varietal + processing detail) rather than
// just a shared product grid with a name swapped in.
export function FarmSubpageIntro({
  farm,
  kind,
}: {
  farm: Farm;
  kind: "green" | "roasted" | "products";
}) {
  const lede =
    kind === "green"
      ? `${farm.name} supplies green (unroasted) Arabica from ${farm.region}, in the ${farm.district} district of Koraput, Odisha. The estate sits at ${farm.elevation} and was established in ${farm.established}, working ${farm.area} under ${farm.processing.map((p) => p).join(", ")} processing.`
      : kind === "roasted"
        ? `Roasted coffee traceable to ${farm.name} in ${farm.region}, ${farm.district} district, Koraput. Grown at ${farm.elevation} and roasted in small batches by Gray Cup, rested 48 hours before dispatch.`
        : `Every coffee lot — green and roasted — traceable to ${farm.name}, ${farm.region}, at ${farm.elevation} in Koraput's Eastern Ghats.`;

  return (
    <section className="bg-white border-b-2 border-odisha-black">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        <p className="text-odisha-black/80 leading-relaxed">{lede}</p>

        <h2 className="font-serif text-xl font-bold text-odisha-black mt-8 mb-3">
          About {farm.name}
        </h2>
        <p className="text-sm text-odisha-black/70 leading-relaxed">{farm.description}</p>
        <p className="text-sm text-odisha-black/70 leading-relaxed mt-3">{farm.story}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Elevation", value: farm.elevation },
            { label: "Area", value: farm.area },
            { label: "Established", value: String(farm.established) },
            { label: "Harvest", value: farm.harvestSeason },
          ].map((s) => (
            <div key={s.label} className="border-l-2 border-odisha-red pl-3">
              <div className="text-[10px] uppercase tracking-widest text-odisha-black/40">{s.label}</div>
              <div className="text-sm font-medium text-odisha-black">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-2">Varieties</h3>
            <p className="text-sm text-odisha-black/70">{farm.varieties.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-odisha-black/40 mb-2">
              {kind === "green" ? "Cup character (unroasted potential)" : "Cup notes"}
            </h3>
            <p className="text-sm text-odisha-black/70">{farm.flavorNotes.join(", ")}</p>
          </div>
        </div>

        {farm.certifications.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {farm.certifications.map((c) => (
              <span
                key={c}
                className="text-[10px] font-bold uppercase tracking-widest border border-odisha-green text-odisha-green px-2 py-0.5"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4 text-xs">
          <Link to={`/farms/${farm.id}`} className="text-odisha-red underline">
            Full {farm.name} profile
          </Link>
          {kind !== "green" && (
            <Link to={`/farms/${farm.id}/green-coffee`} className="text-odisha-red underline">
              Green coffee from this estate
            </Link>
          )}
          {kind !== "roasted" && (
            <Link to={`/farms/${farm.id}/roasted-coffee`} className="text-odisha-red underline">
              Roasted coffee from this estate
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
