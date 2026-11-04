"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice, getProduct } from "@/lib/products";

export default function CartView() {
  const { items, loaded, total, setQuantity, removeItem, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Errore durante il checkout.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante il checkout.");
      setLoading(false);
    }
  }

  if (!loaded) return <p className="muted">Caricamento carrello…</p>;

  if (items.length === 0) {
    return (
      <div className="card empty">
        <p>Il carrello è vuoto.</p>
        <Link href="/shop" className="btn btn-primary">
          Vai allo shop
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <ul className="cart-list">
        {items.map((item) => {
          const p = getProduct(item.id);
          if (!p) return null;
          return (
            <li key={item.id} className="card cart-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} width={120} height={90} />
              <div className="cart-item-info">
                <h3>{p.name}</h3>
                <p className="muted small">{formatPrice(p.price)} cad.</p>
              </div>
              <div className="qty" role="group" aria-label={`Quantità di ${p.name}`}>
                <button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label="Diminuisci">
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={item.quantity}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (!Number.isNaN(n)) setQuantity(item.id, Math.max(1, n));
                  }}
                  aria-label="Quantità"
                />
                <button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label="Aumenta">
                  +
                </button>
              </div>
              <strong className="cart-item-total">{formatPrice(p.price * item.quantity)}</strong>
              <button className="link-btn" onClick={() => removeItem(item.id)}>
                Rimuovi
              </button>
            </li>
          );
        })}
      </ul>

      <aside className="card cart-summary">
        <h2>Riepilogo</h2>
        <div className="summary-row">
          <span>Totale</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <p className="muted small">IVA inclusa. Pagamento sicuro con Stripe (modalità test).</p>
        <button className="btn btn-primary btn-block" onClick={checkout} disabled={loading}>
          {loading ? "Reindirizzamento…" : "Procedi al pagamento"}
        </button>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="link-btn" onClick={clear}>
          Svuota carrello
        </button>
      </aside>
    </div>
  );
}
