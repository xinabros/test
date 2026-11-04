import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chi siamo" };

export default function ChiSiamoPage() {
  return (
    <div className="container section page">
      <h1>Chi siamo</h1>

      <section className="prose">
        <h2>La nostra storia</h2>
        <p>
          Test Shop nasce nel 2020 in un piccolo laboratorio di quartiere. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Da allora siamo
          cresciuti, ma l&apos;idea è rimasta la stessa: pochi prodotti, fatti bene.
        </p>

        <h2>La nostra mission</h2>
        <p>
          Rendere gli oggetti di tutti i giorni più belli, durevoli e rispettosi dell&apos;ambiente. Donec ullamcorper
          nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.
        </p>

        <h2>I nostri valori</h2>
        <ul>
          <li>
            <strong>Qualità:</strong> materiali scelti con cura e testati a lungo.
          </li>
          <li>
            <strong>Sostenibilità:</strong> filiera corta e imballaggi riciclabili.
          </li>
          <li>
            <strong>Trasparenza:</strong> prezzi chiari, nessun costo nascosto.
          </li>
          <li>
            <strong>Persone:</strong> un servizio clienti fatto da persone vere.
          </li>
        </ul>
      </section>
    </div>
  );
}
