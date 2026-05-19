import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
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
        <Header />
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
