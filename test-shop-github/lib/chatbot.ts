type Rule = { topic: string; keywords: string[]; answer: string };

const rules: Rule[] = [
  {
    topic: "orari",
    keywords: ["orari", "orario", "aperti", "apertura", "chiusura", "ore", "orari"],
    answer: "Il nostro servizio clienti è attivo dal lunedì al venerdì, dalle 9:00 alle 18:00. Il negozio online è sempre aperto, 24 ore su 24!",
  },
  {
    topic: "spedizioni",
    keywords: ["spedizione", "spedizioni", "spedite", "consegna", "corriere", "tracking", "arriva", "spedire"],
    answer: "Spediamo in tutta Italia in 2–4 giorni lavorativi. La spedizione costa 4,90 € ed è gratuita per ordini sopra i 50 €.",
  },
  {
    topic: "resi",
    keywords: ["reso", "resi", "rimborso", "restituire", "restituzione", "cambio", "recesso"],
    answer: "Puoi restituire i prodotti entro 30 giorni dalla consegna. Scrivici dalla pagina Contatti e ti invieremo l'etichetta di reso gratuita.",
  },
  {
    topic: "prodotti",
    keywords: ["prodotto", "prodotti", "catalogo", "tazza", "borsa", "quaderno", "candela", "prezzo", "prezzi", "disponibile", "comprare"],
    answer: "Abbiamo 4 prodotti: Tazza Classica, Borsa in Tela, Quaderno A5 e Candela Profumata. Li trovi tutti nella pagina Shop.",
  },
  {
    topic: "contatti",
    keywords: ["contatto", "contatti", "email", "mail", "telefono", "chiamare", "scrivere", "assistenza", "aiuto"],
    answer: "Puoi scriverci a info@testshop.example o chiamarci al +39 06 1234 5678. Trovi anche un form nella pagina Contatti.",
  },
];

export const FALLBACK =
  "Mi dispiace, non ho capito la domanda. Prova a chiedermi di orari, spedizioni, resi, prodotti o contatti, oppure scrivici dalla pagina Contatti: ti risponderemo al più presto!";

export const GREETING =
  "Ciao! Sono l'assistente di Test Shop. Posso aiutarti con orari, spedizioni, resi, prodotti e contatti.";

export const SUGGESTIONS = ["Orari", "Spedizioni", "Resi", "Prodotti", "Contatti"];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // rimuove gli accenti
    .replace(/[^a-z0-9\s]/g, " ");
}

export function getBotReply(message: string): { text: string; showContactLink: boolean } {
  const words = normalize(message).split(/\s+/).filter(Boolean);
  let best: Rule | null = null;
  let bestScore = 0;
  for (const rule of rules) {
    const score = words.filter((w) => rule.keywords.some((k) => w === k || (k.length > 4 && w.startsWith(k.slice(0, -1))))).length;
    if (score > bestScore) {
      best = rule;
      bestScore = score;
    }
  }
  if (!best) return { text: FALLBACK, showContactLink: true };
  return { text: best.answer, showContactLink: best.topic === "contatti" || best.topic === "resi" };
}
