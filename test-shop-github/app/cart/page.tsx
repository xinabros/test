import type { Metadata } from "next";
import CartView from "./CartView";

export const metadata: Metadata = { title: "Carrello" };

export default async function CartPage({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {
  const { canceled } = await searchParams;
  return (
    <div className="container section page">
      <h1>Il tuo carrello</h1>
      {canceled && (
        <div className="alert alert-warning" role="status">
          Pagamento annullato. I prodotti sono ancora nel carrello, puoi riprovare quando vuoi.
        </div>
      )}
      <CartView />
    </div>
  );
}
