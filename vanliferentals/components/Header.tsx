"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header(): React.ReactElement {
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) => {
    if (href === "/#about") return pathname === "/"; // anchor on home
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
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
          <Link className={`nav-link ${isActive("/") ? "is-active" : ""}`} href="/">
            Inici
          </Link>
          <Link
            className={`nav-link ${isActive("/models") ? "is-active" : ""}`} 
            href="/models"
          >
            Cataleg
          </Link>
          <Link className={`nav-link ${isActive("/contact") ? "is-active" : ""}`} href="/contact">
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
  );
}
