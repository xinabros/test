"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false });
  const [sent, setSent] = useState(false);

  const nameError = name.trim() === "" ? "Il nome è obbligatorio." : "";
  const emailError =
    email.trim() === "" ? "La mail è obbligatoria." : !EMAIL_RE.test(email.trim()) ? "Inserisci una mail valida." : "";
  const isValid = !nameError && !emailError;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!isValid) return;
    // Nessun invio reale: mostriamo solo la conferma
    setSent(true);
  }

  if (sent) {
    return (
      <div className="alert alert-success" role="status">
        <strong>Grazie, {name.trim()}!</strong> Abbiamo ricevuto il tuo messaggio e ti risponderemo a{" "}
        <em>{email.trim()}</em> il prima possibile.
        <div>
          <button
            className="btn btn-outline"
            onClick={() => {
              setName("");
              setEmail("");
              setMessage("");
              setTouched({ name: false, email: false });
              setSent(false);
            }}
          >
            Invia un altro messaggio
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Nome *</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={touched.name && !!nameError}
          aria-describedby="name-error"
        />
        {touched.name && nameError && (
          <span id="name-error" className="error">
            {nameError}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">La tua mail *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={touched.email && !!emailError}
          aria-describedby="email-error"
        />
        {touched.email && emailError && (
          <span id="email-error" className="error">
            {emailError}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">Messaggio (facoltativo)</label>
        <textarea id="message" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Invia messaggio
      </button>
      {!isValid && <p className="muted small">Compila nome e una mail valida per abilitare l&apos;invio.</p>}
    </form>
  );
}
