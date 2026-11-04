import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const values = [
  { title: "Qualità", text: "Selezioniamo solo prodotti che useremmo noi stessi, ogni giorno." },
  { title: "Sostenibilità", text: "Materiali riciclati e imballaggi senza plastica, dove possibile." },
  { title: "Vicinanza", text: "Un team piccolo che risponde davvero alle tue domande." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Piccoli oggetti, grandi abitudini.</h1>
          <p>
            Test Shop è un negozio dimostrativo di oggetti per la casa e lo studio. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-light">
              Vai allo shop
            </Link>
            <Link href="/chi-siamo" className="btn btn-outline-light">
              Chi siamo
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2>I nostri valori</h2>
        <div className="grid grid-3">
          {values.map((v) => (
            <div key={v.title} className="card value-card">
              <h3>{v.title}</h3>
              <p className="muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>In evidenza</h2>
          <Link href="/shop" className="link">
            Vedi tutti i prodotti →
          </Link>
        </div>
        <div className="grid grid-3">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
