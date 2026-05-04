import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

const bodyFont = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VanLife Rentals",
  description: "Camper rental catalog with simple booking inquiries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="site">
        <header className="site-header">
          <div className="container header-inner">
            <Link className="logo" href="/">
              <span className="logo-mark" aria-hidden="true">
                <svg viewBox="0 0 36 36" role="img" aria-hidden="true">
                  <path
                    d="M6 26L14 16L20 22L28 12L32 26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="logo-text">
                <span>VanLife</span>
                <span>Rentals</span>
              </span>
            </Link>
            <nav className="nav">
              <Link className="nav-link is-active" href="/">
                Inici
              </Link>
              <Link className="nav-link" href="/models">
                Cataleg
              </Link>
              <Link className="nav-link" href="/#about">
                Sobre nosaltres
              </Link>
              <Link className="nav-link" href="/contact">
                Contacte
              </Link>
            </nav>
            <div className="nav-actions">
              <Link className="btn btn-primary btn-pill" href="/contact">
                Reserva ara
              </Link>
            </div>
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand">
              <p className="logo-small">VanLife Rentals</p>
              <p className="muted">
                Furgonetes camper premium per a escapades sense complicacions.
              </p>
            </div>
            <div className="footer-links">
              <Link href="/">Inici</Link>
              <Link href="/models">Cataleg</Link>
              <Link href="/contact">Contacte</Link>
            </div>
            <div className="footer-meta">
              <p className="muted">Suport local 24/7</p>
              <p className="muted">(c) 2026 VanLife Rentals</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
