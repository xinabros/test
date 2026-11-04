import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import ClearCart from "./ClearCart";
import { formatPrice } from "@/lib/products";

export const metadata: Metadata = { title: "Ordine confermato" };

async function getSession(sessionId?: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!sessionId || !key || !sessionId.startsWith("cs_")) return null;
  try {
    return await new Stripe(key).checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const session = await getSession(session_id);

  return (
    <div className="container section page success">
      <ClearCart />
      <div className="card success-card">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <h1>Grazie per il tuo ordine!</h1>
        <p>Il pagamento è andato a buon fine. Il carrello è stato svuotato.</p>
        {session && (
          <dl className="order-details">
            <dt>Numero ordine</dt>
            <dd>{session.id.slice(-10).toUpperCase()}</dd>
            {session.customer_details?.email && (
              <>
                <dt>Email</dt>
                <dd>{session.customer_details.email}</dd>
              </>
            )}
            {session.amount_total != null && (
              <>
                <dt>Totale pagato</dt>
                <dd>{formatPrice(session.amount_total)}</dd>
              </>
            )}
          </dl>
        )}
        <Link href="/shop" className="btn btn-primary">
          Continua lo shopping
        </Link>
      </div>
    </div>
  );
}
