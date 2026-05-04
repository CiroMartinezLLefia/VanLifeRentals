import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="page auth-page">
      <section className="card auth-card">
        <p className="eyebrow">Account</p>
        <h1>Create account</h1>
        <p className="muted">Register to post comments on any model.</p>
        <form className="form" action="#" method="post">
          <label className="field">
            <span>Name</span>
            <input className="input" name="name" type="text" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" name="email" type="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" name="password" type="password" required />
          </label>
          <button className="btn btn-primary" type="submit">
            Create account
          </button>
        </form>
        <div className="auth-actions">
          <p className="muted">Already have an account?</p>
          <Link className="link-inline" href="/auth/login">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}
