import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="page auth-page">
      <section className="card auth-card">
        <p className="eyebrow">Account</p>
        <h1>Login</h1>
        <p className="muted">Sign in to comment on models.</p>
        <form className="form" action="#" method="post">
          <label className="field">
            <span>Email</span>
            <input className="input" name="email" type="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" name="password" type="password" required />
          </label>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        <div className="auth-actions">
          <p className="muted">No account yet?</p>
          <Link className="link-inline" href="/auth/register">
            Create one
          </Link>
        </div>
      </section>
    </div>
  );
}
