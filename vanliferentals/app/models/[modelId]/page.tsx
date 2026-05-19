import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { formatDailyPrice } from "@/lib/formatters";
import { prisma } from "@/lib/prisma";

type ModelDetailPageProps = {
  params: Promise<{
    modelId: string;
  }>;
};

export default async function ModelDetailPage({
  params,
}: ModelDetailPageProps) {
  const { modelId } = await params;

  if (!modelId) {
    notFound();
  }

  const model = await prisma.vanModel.findUnique({
    where: { slug: modelId },
  });

  if (model === null) {
    notFound();
  }

  const currentModel = model;

  const comments = await prisma.comment.findMany({
    where: { modelId: currentModel.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  async function submitComment(formData: FormData) {
    "use server";

    const content = String(formData.get("content") ?? "").trim();

    if (!content) {
      return;
    }

    await prisma.comment.create({
      data: {
        modelId: currentModel.id,
        userId: "TEMP_USER_ID",
        content,
      },
    });

    revalidatePath(`/models/${currentModel.slug}`);
  }

  const stats = [
    currentModel.seats ? `${currentModel.seats} places` : null,
    currentModel.beds ? `${currentModel.beds} llits` : null,
    currentModel.transmission ? `Canvi ${currentModel.transmission}` : null,
    currentModel.fuel ? `Combustible ${currentModel.fuel}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="page">
      <div className="breadcrumbs">
        <Link className="link-inline" href="/models">
          Tornar al cataleg
        </Link>
      </div>

      <section className="detail-grid">
        <div className="detail-main">
          <p className="eyebrow">Model</p>

          <h1>{model.name}</h1>

          <p className="lead">{currentModel.description}</p>

          {stats.length > 0 && (
            <div className="stat-grid">
              {stats.map((stat) => (
                <div className="stat" key={stat}>
                  <p className="stat-value">{stat}</p>
                  <p className="stat-label">Dades clau</p>
                </div>
              ))}
            </div>
          )}

          <ul className="feature-list">
            {currentModel.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="detail-aside card">
          <p className="badge">
            {formatDailyPrice(currentModel.pricePerDay, currentModel.currency)}
          </p>

          <h3>Reserva la teva ruta</h3>

          <p className="muted">
            Demana informacio sobre dates i lloc de recollida.
          </p>

          <div className="aside-actions">
            <Link className="btn btn-primary" href="/contact">
              Sol-licitar info
            </Link>

            <Link className="btn btn-ghost" href="/auth/login">
              Inicia sessio per comentar
            </Link>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Comunitat</p>

            <h2>Comentaris recents</h2>

            <p>Els comentaris son visibles per a tothom.</p>
          </div>
        </div>

        <form className="card form" action={submitComment}>
          <label className="field">
            <span>Comparteix la teva experiencia</span>

            <textarea
              className="textarea"
              name="content"
              rows={4}
              required
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Publicar comentari
          </button>
        </form>

        <div className="comment-list">
          {comments.length === 0 ? (
            <article className="comment-card">
              <p className="comment-name">
                Encara no hi ha comentaris
              </p>

              <p className="comment-meta">
                Sigues el primer a escriure.
              </p>
            </article>
          ) : (
            comments.map((comment) => (
              <article className="comment-card" key={comment.id}>
                <p className="comment-name">
                  {comment.user?.name ?? "Usuari"}
                </p>

                <p className="comment-meta">
                  {comment.createdAt.toLocaleDateString("ca-ES")}
                </p>

                <p>{comment.content}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}