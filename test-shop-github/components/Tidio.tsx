import Script from "next/script";

// Carica la live chat Tidio solo se NEXT_PUBLIC_TIDIO_KEY è impostata.
// La chiave è la "Public key" di Tidio (Impostazioni > Installazione).
export function getTidioKey() {
  const key = process.env.NEXT_PUBLIC_TIDIO_KEY?.trim();
  // Accetta solo caratteri alfanumerici (evita di iniettare valori arbitrari nell'URL)
  return key && /^[a-z0-9]+$/i.test(key) ? key : null;
}

export default function Tidio() {
  const key = getTidioKey();
  if (!key) return null;
  return <Script src={`https://code.tidio.co/${key}.js`} strategy="lazyOnload" />;
}
