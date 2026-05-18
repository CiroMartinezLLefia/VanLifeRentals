"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError("Unable to register. Try a different email.");
      return;
    }

    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: true,
      callbackUrl: "/models",
    });
  }

  return (
    <div className="page auth-page">
      <section className="card auth-card">
        <p className="eyebrow">Account</p>
        <h1>Create account</h1>
        <p className="muted">Register to post comments on any model.</p>
        <form className="form" onSubmit={handleSubmit}>
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
          {error && <p className="form-note">{error}</p>}
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
