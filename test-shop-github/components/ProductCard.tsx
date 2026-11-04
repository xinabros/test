"use client";

import { useState } from "react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="card product-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image} alt={product.name} width={600} height={450} loading="lazy" />
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="product-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <button className="btn btn-primary" onClick={handleAdd} aria-live="polite">
            {added ? "Aggiunto ✓" : "Aggiungi al carrello"}
          </button>
        </div>
      </div>
    </article>
  );
}
