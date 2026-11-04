import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="container section page">
      <h1>Shop</h1>
      <p className="muted lead">Tutti i nostri prodotti. Spedizione gratuita sopra i 50 €.</p>
      <div className="grid grid-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
