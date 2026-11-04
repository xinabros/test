import Script from "next/script";

// Carica GA4 solo se NEXT_PUBLIC_GA_ID è impostata
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  // Accetta solo ID nel formato G-XXXXXXX (evita di iniettare valori arbitrari nello script)
  if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
