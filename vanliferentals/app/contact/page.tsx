import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Tell us about your trip</h1>
          <p>
            Use the form to ask for availability, pricing, or special pickup
            times.
          </p>
        </div>
      </header>

      <section className="contact-grid">
        <form className="card form" action="/api/contact" method="post">
          <label className="field">
            <span>Name</span>
            <input className="input" name="name" type="text" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" name="email" type="email" required />
          </label>
          <label className="field">
            <span>Travel dates</span>
            <input className="input" name="dates" type="text" />
          </label>
          <label className="field">
            <span>Group size</span>
            <input className="input" name="group" type="number" min={1} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea className="textarea" name="message" rows={6} />
          </label>
          <button className="btn btn-primary" type="submit">
            Send request
          </button>
          <p className="form-note">Demo form, no data is stored yet.</p>
        </form>

        <aside className="card info-card">
          <h3>What happens next</h3>
          <ul className="feature-list">
            <li>We reply within 24 hours</li>
            <li>Suggested pickup points near your route</li>
            <li>Optional gear add-ons if needed</li>
          </ul>
          <div className="info-block">
            <p className="muted">Email</p>
            <p>hello@vanlife.test</p>
          </div>
          <div className="info-block">
            <p className="muted">Phone</p>
            <p>+34 600 123 456</p>
          </div>
          <Link className="btn btn-ghost" href="/models">
            Browse models
          </Link>
        </aside>
      </section>
    </div>
  );
}
