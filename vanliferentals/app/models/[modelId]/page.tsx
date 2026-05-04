import Link from "next/link";

type ModelDetailPageProps = {
  params: {
    modelId: string;
  };
};

const modelData: Record<
  string,
  {
    name: string;
    summary: string;
    price: string;
    stats: string[];
    highlights: string[];
  }
> = {
  aurora: {
    name: "Aurora 4x4",
    summary:
      "All weather cabin with solar power, insulation, and quiet heating.",
    price: "120/day",
    stats: ["Sleeps 4", "4x4", "Solar kit"],
    highlights: [
      "Full insulation for cold nights",
      "Indoor and outdoor storage lockers",
      "Two burner kitchen and 50L fridge",
    ],
  },
  drift: {
    name: "Driftline Compact",
    summary: "Lightweight camper for quick city escapes and coastal trips.",
    price: "90/day",
    stats: ["Sleeps 2", "Auto", "Fast setup"],
    highlights: [
      "Low height for easy parking",
      "Instant pop top bed",
      "USB power and cool box",
    ],
  },
  summit: {
    name: "Summit Family",
    summary: "Roomy interior with full galley and hot water system.",
    price: "140/day",
    stats: ["Sleeps 5", "Kitchen", "Hot water"],
    highlights: [
      "Convertible lounge for kids",
      "Indoor shower and toilet",
      "Large awning and table",
    ],
  },
};

const comments = [
  {
    name: "Nora G.",
    date: "Apr 2026",
    text: "Easy pickup and the Aurora handled mountain roads well.",
  },
  {
    name: "Luis P.",
    date: "Mar 2026",
    text: "Clean interior and great storage for bikes.",
  },
];

export default function ModelDetailPage({
  params,
}: ModelDetailPageProps) {
  const model =
    modelData[params.modelId] ??
    ({
      name: "Custom Camper",
      summary: "Flexible layout with the essentials for a relaxed trip.",
      price: "100/day",
      stats: ["Sleeps 2", "Manual", "Kitchenette"],
      highlights: [
        "Simple storage and seating",
        "Compact power system",
        "Easy driving feel",
      ],
    } as const);

  return (
    <div className="page">
      <div className="breadcrumbs">
        <Link className="link-inline" href="/models">
          Back to catalog
        </Link>
      </div>

      <section className="detail-grid">
        <div className="detail-main">
          <p className="eyebrow">Model</p>
          <h1>{model.name}</h1>
          <p className="lead">{model.summary}</p>
          <div className="stat-grid">
            {model.stats.map((stat) => (
              <div className="stat" key={stat}>
                <p className="stat-value">{stat}</p>
                <p className="stat-label">Core spec</p>
              </div>
            ))}
          </div>
          <ul className="feature-list">
            {model.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <aside className="detail-aside card">
          <p className="badge">From {model.price}</p>
          <h3>Trip estimate</h3>
          <p className="muted">
            Share dates and pickup city to get exact pricing.
          </p>
          <div className="aside-actions">
            <Link className="btn btn-primary" href="/contact">
              Request info
            </Link>
            <Link className="btn btn-ghost" href="/auth/login">
              Login to comment
            </Link>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Community</p>
            <h2>Recent comments</h2>
            <p>Comments are visible to everyone. Login to add yours.</p>
          </div>
        </div>
        <div className="comment-list">
          {comments.map((comment) => (
            <article className="comment-card" key={comment.name}>
              <p className="comment-name">{comment.name}</p>
              <p className="comment-meta">{comment.date}</p>
              <p>{comment.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
