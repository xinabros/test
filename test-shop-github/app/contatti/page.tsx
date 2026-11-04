import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contatti" };

export default function ContattiPage() {
  return (
    <div className="container section page">
      <h1>Contatti</h1>
      <div className="contact-grid">
        <section className="card contact-info">
          <h2>Scrivici o chiamaci</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:info@testshop.example">info@testshop.example</a>
          </p>
          <p>
            <strong>Telefono:</strong> <a href="tel:+390612345678">+39 06 1234 5678</a>
          </p>
          <p>
            <strong>Orari:</strong> lun–ven 9:00–18:00
          </p>
          <h3>Seguici</h3>
          <ul className="social">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          </ul>
        </section>
        <section className="card">
          <h2>Mandaci un messaggio</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
