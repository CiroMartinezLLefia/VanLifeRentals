import Link from "next/link";

const models = [
  {
    id: "aurora",
    name: "Aurora 4x4",
    summary: "All weather cabin with solar power and storage for boards.",
    price: "From 120/day",
    tags: ["Sleeps 4", "4x4", "Solar"],
  },
  {
    id: "drift",
    name: "Driftline Compact",
    summary: "Minimal build that parks anywhere and sets up fast.",
    price: "From 90/day",
    tags: ["Sleeps 2", "Auto", "Quick setup"],
  },
  {
    id: "summit",
    name: "Summit Family",
    summary: "Roomy interior with full galley and hot water system.",
    price: "From 140/day",
    tags: ["Sleeps 5", "Kitchen", "Hot water"],
  },
  {
    id: "dune",
    name: "Dune Explorer",
    summary: "Raised suspension with gear lockers for long routes.",
    price: "From 130/day",
    tags: ["Sleeps 3", "Manual", "Offroad"],
  },
  {
    id: "tidal",
    name: "Tidal Weekender",
    summary: "Twin beds, indoor shower, and quiet diesel heater.",
    price: "From 110/day",
    tags: ["Sleeps 2", "Heater", "Shower"],
  },
];

export default function ModelsPage() {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Models ready for the road</h1>
          <p>
            Browse the full fleet and open a model to see specs, pricing, and
            comments.
          </p>
        </div>
        <div className="tag-list">
          <span className="chip">Sleeps 2 to 5</span>
          <span className="chip">Manual or auto</span>
          <span className="chip">Solar ready</span>
        </div>
      </header>

      <section className="card-grid">
        {models.map((model) => (
          <article className="card" key={model.id}>
            <p className="badge">{model.price}</p>
            <h3 className="card-title">{model.name}</h3>
            <p className="card-subtitle">{model.summary}</p>
            <div className="tag-list">
              {model.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <Link className="link-inline" href={`/models/${model.id}`}>
              Open model
            </Link>
          </article>
        ))}
      </section>

      <section className="section callout">
        <div>
          <p className="eyebrow">Need help</p>
          <h2>Not sure which camper fits?</h2>
          <p>
            Tell us about your route and group size. We will suggest the best
            match.
          </p>
        </div>
        <Link className="btn btn-primary" href="/contact">
          Request advice
        </Link>
      </section>
    </div>
  );
}
