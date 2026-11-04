import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

type Body = { items?: { id: string; quantity: number }[] };

function getOrigin(req: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY non configurata sul server. Vedi .env.example." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  // Prezzi e nomi presi SEMPRE dal catalogo lato server, mai dal client
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of body.items ?? []) {
    const product = getProduct(item.id);
    const quantity = Math.floor(Number(item.quantity));
    if (!product || !Number.isFinite(quantity) || quantity < 1 || quantity > 99) continue;
    lineItems.push({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.price,
        product_data: { name: product.name, description: product.description, images: [product.image] },
      },
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Il carrello è vuoto." }, { status: 400 });
  }

  try {
    const stripe = new Stripe(secretKey);
    const origin = getOrigin(req);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: `Impossibile avviare il pagamento: ${message}` }, { status: 500 });
  }
}
