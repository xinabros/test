"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/shop", label: "Shop" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, loaded } = useCart();

  // Chiude il menu mobile quando si cambia pagina
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo">
          Test<span>Shop</span>
        </Link>

        <nav id="main-nav" className={`nav-links ${open ? "open" : ""}`} aria-label="Navigazione principale">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/cart" className="cart-link" aria-label={`Carrello, ${count} articoli`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            <span className="cart-label">Carrello</span>
            {loaded && count > 0 && <span className="badge">{count}</span>}
          </Link>
          <button
            className="hamburger"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
