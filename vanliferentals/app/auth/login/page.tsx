"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/models",
    });

    if (result?.error) {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="page auth-page">
      <section className="card auth-card">
        <p className="eyebrow">Account</p>
        <h1>Login</h1>
        <p className="muted">Sign in to comment on models.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input className="input" name="email" type="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" name="password" type="password" required />
          </label>
          {error && <p className="form-note">{error}</p>}
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
