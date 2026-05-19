import Link from "next/link";
import { formatDailyPrice } from "@/lib/formatters";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const featureHighlights = [
  {
    title: "Furgonetes totalment equipades",
    subtitle: "Cuina, llits i WC inclosos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 13l2-6h10l3 6v5h-2v-2H5v2H3v-5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="16" r="1.5" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Recull i retorna sense complicacions",
    subtitle: "Punts flexibles i rapidesa",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s6-6.2 6-10a6 6 0 10-12 0c0 3.8 6 10 6 10z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="11" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Asseguranca i assistencia 24/7",
    subtitle: "Cobertura completa al viatge",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12.5l1.6 1.6 3.4-3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Millor preu garantit",
    subtitle: "Tarifes clares i transparents",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 11l5-5 5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 6v12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Jordi P.",
    quote:
      "Experiencia increible. La furgoneta estava impecable i el viatge per Noruega va ser espectacular.",
  },
  {
    name: "Laura M.",
    quote:
      "Molt bon servei i atencio al client. Repetirem segur!",
  },
  {
    name: "Marc G.",
    quote:
      "Fa 2 setmanes que vam fer el viatge i tot perfecte. Recomanable!",
  },
];

const trustItems = [
  {
    label: "Pagament 100% segur",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 11h14v8H5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 11V8a4 4 0 018 0v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Sense comissions amagades",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 6h12v12H6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 12l2 2 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Cancelacio flexible",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 5v4l3-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M5 13a7 7 0 101.6-4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Suport local 24/7",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 20v-4a2 2 0 012-2h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const starIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 3z"
      fill="currentColor"
    />
  </svg>
);

type HomeModel = {
  id: string;
  name: string;
  pricePerDay: number;
  currency: string;
  features: string[];
  imageUrl: string;
};

export default async function HomePage() {
  const featuredModels = (await prisma.vanModel.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })) as HomeModel[];

  const modelsToShow =
    featuredModels.length > 0
      ? featuredModels
      : ((await prisma.vanModel.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
        })) as HomeModel[]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">VanLife Rentals</p>
          <h1 className="hero-title">
            La teva aventura <span>comenca aqui</span>
          </h1>
          <p className="lead">
            Furgonetes camper totalment equipades per viure experiencies
            inoblidables.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/models">
              Descobreix els models
            </Link>
            <button className="btn btn-outline" type="button">
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M10 8l6 4-6 4V8z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Veure video
            </button>
          </div>
          <div className="hero-rating">
            <span className="rating-label">Excel-lent</span>
            <div className="rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <span className="rating-star" key={index}>
                  {starIcon}
                </span>
              ))}
            </div>
            <span className="rating-score">4.8/5 a Trustpilot</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              className="hero-image"
              src="https://www.shutterstock.com/shutterstock/videos/3900667843/thumb/1.jpg?ip=x480"
              alt="Furgoneta camper davant d'un paisatge de muntanya"
            />
            <div className="hero-image-overlay" />
          </div>
          <div className="hero-device-card">
            <img
              className="hero-device-image"
              src="https://wallpapers.com/images/hd/4k-ultra-hd-landscape-wallpaper-sa8ffsciekildmug.jpg"
              alt="Vista d'una ruta panoramica"
            />
            <div className="hero-device-content">
              <p className="hero-device-title">Viu mes. Preocupa't de menys.</p>
              <p className="hero-device-text">
                Tot el que necessites per al teu viatge esta dins de la nostra
                furgoneta.
              </p>
              <div className="hero-device-actions">
                <button className="btn btn-primary btn-sm" type="button">
                  Reserva la teva aventura
                </button>
                <div className="hero-device-meta">
                  <span className="hero-device-pill">Kilometres il-limitats</span>
                  <span className="hero-device-pill">Asseguranca inclosa</span>
                  <span className="hero-device-pill">Atencio 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        {featureHighlights.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <span className="feature-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <div>
              <p className="feature-title">{feature.title}</p>
              <p className="feature-subtitle">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard" id="about">
        <div className="panel models-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Models destacats</p>
              <h2>Tria la teva aventura</h2>
            </div>
            <Link className="text-link" href="/models">
              Veure tots els models
            </Link>
          </div>
          <div className="models-grid">
            {modelsToShow.map((model) => (
              <article className="model-card" key={model.id}>
                <img src={model.imageUrl} alt={model.name} loading="lazy" />
                <div className="model-body">
                  <div className="model-header">
                    <h3>{model.name}</h3>
                    <span className="model-price">
                      {formatDailyPrice(model.pricePerDay, model.currency)}
                    </span>
                  </div>
                  <div className="model-specs">
                    {model.features.map((spec) => (
                      <span className="model-spec" key={spec}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel reviews-panel" id="reviews">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Clients</p>
              <h2>El que diuen els nostres clients</h2>
            </div>
          </div>
          <div className="reviews-list">
            {testimonials.map((testimonial) => (
              <article className="review-card" key={testimonial.name}>
                <div className="review-avatar" aria-hidden="true">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="review-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span className="review-star" key={index}>
                        {starIcon}
                      </span>
                    ))}
                  </div>
                  <p className="review-quote">{testimonial.quote}</p>
                  <p className="review-name">{testimonial.name}</p>
                </div>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/#reviews">
            Veure mes opinions
          </Link>
        </div>

        <div className="panel booking-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Reserva</p>
              <h2>Reserva la teva furgoneta</h2>
            </div>
          </div>
          <form className="booking-form">
            <label className="field">
              <span>Recollida</span>
              <input className="input" type="date" name="pickup" />
            </label>
            <label className="field">
              <span>Retorn</span>
              <input className="input" type="date" name="return" />
            </label>
            <label className="field">
              <span>Lloc de recollida</span>
              <select className="input" name="pickupLocation">
                <option>Tria una ubicacio</option>
                <option>Barcelona</option>
                <option>Girona</option>
                <option>Tarragona</option>
              </select>
            </label>
            <label className="field">
              <span>Lloc de retorn</span>
              <select className="input" name="dropoffLocation">
                <option>Tria una ubicacio</option>
                <option>Barcelona</option>
                <option>Girona</option>
                <option>Tarragona</option>
              </select>
            </label>
            <button className="btn btn-primary btn-block" type="button">
              Comprovar disponibilitat
            </button>
          </form>
        </div>
      </section>

      <section className="trust-bar">
        <h2>Confianca, seguretat i llibertat per al teu viatge</h2>
        <div className="trust-items">
          {trustItems.map((item) => (
            <div className="trust-item" key={item.label}>
              <span className="trust-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
