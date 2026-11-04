import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="logo">
            Test<span>Shop</span>
          </p>
          <p className="muted">Negozio dimostrativo. Nessun prodotto reale è in vendita.</p>
        </div>
        <nav className="footer-links" aria-label="Link del footer">
          <Link href="/">Home</Link>
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/contatti">Contatti</Link>
        </nav>
        <p className="muted small">© {new Date().getFullYear()} Test Shop · Via Esempio 1, 00100 Roma</p>
      </div>
    </footer>
  );
}
