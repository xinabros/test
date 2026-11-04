# Test Shop

E-commerce dimostrativo con Next.js 16 (App Router), carrello in localStorage, Stripe Checkout (modalità test), chatbot a parole chiave e Google Analytics 4 opzionale.

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # poi inserisci la tua STRIPE_SECRET_KEY di test
npm run dev                  # http://localhost:3000
```

Build di produzione: `npm run build && npm run start`.

## Variabili d'ambiente

| Nome | Obbligatoria | Descrizione |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Sì (per il checkout) | Chiave segreta Stripe di test (`sk_test_...`) |
| `NEXT_PUBLIC_SITE_URL` | No | URL pubblico usato per i redirect Stripe; se vuota viene ricavata dalla richiesta |
| `NEXT_PUBLIC_GA_ID` | No | ID GA4 (`G-XXXXXXX`); se vuota GA non viene caricato |
| `NEXT_PUBLIC_TIDIO_KEY` | No | Public key di Tidio; se impostata sostituisce il chatbot interno con la chat Tidio |

## Struttura

- `app/` – pagine (Home, Chi siamo, Shop, Contatti, Carrello, Success) e API `app/api/checkout/route.ts`
- `components/` – Navbar, Footer, carrello (`CartProvider`), card prodotto, chatbot, Analytics
- `lib/products.ts` – catalogo (i prezzi usati da Stripe sono letti da qui lato server)
- `lib/chatbot.ts` – regole a parole chiave del chatbot

## Pagamento di test

Carta `4242 4242 4242 4242`, qualsiasi data futura, qualsiasi CVC e CAP.
