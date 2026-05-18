import Link from "next/link";
import { formatDailyPrice } from "@/lib/formatters";
import { prisma } from "@/lib/prisma";

export default async function ModelsPage() {
  const models = await prisma.vanModel.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="page">
      <section className="panel models-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Cataleg</p>
            <h1>Models de camper disponibles</h1>
            <p>Tria la teva furgoneta i consulta les dades clau.</p>
          </div>
          <Link className="text-link" href="/">
            Tornar a la home
          </Link>
        </div>
        <div className="models-grid">
          {models.map((model) => (
            <article className="model-card" key={model.id}>
              <img src={model.imageUrl} alt={model.name} loading="lazy" />
              <div className="model-body">
                <div className="model-header">
                  <h3>{model.name}</h3>
                  <span className="model-price">
                    {formatDailyPrice(model.pricePerDay, model.currency)}
                  </span>
                </div>
                <p>{model.description}</p>
                <div className="model-specs">
                  {model.features.map((spec) => (
                    <span className="model-spec" key={spec}>
                      {spec}
                    </span>
                  ))}
                </div>
                <Link className="link-inline" href={`/models/${model.slug}`}>
                  Veure detalls
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
