"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GREETING, SUGGESTIONS, getBotReply } from "@/lib/chatbot";

type Message = { from: "bot" | "user"; text: string; contactLink?: boolean };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: GREETING }]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    const reply = getBotReply(clean);
    setMessages((m) => [
      ...m,
      { from: "user", text: clean },
      { from: "bot", text: reply.text, contactLink: reply.showContactLink },
    ]);
    setInput("");
  }

  return (
    <div className="chatbot">
      {open && (
        <div className="chat-window" role="dialog" aria-label="Assistente Test Shop">
          <div className="chat-header">
            <strong>Assistente Test Shop</strong>
            <button onClick={() => setOpen(false)} aria-label="Chiudi chat">
              ×
            </button>
          </div>
          <div className="chat-messages" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.text}
                {m.contactLink && (
                  <>
                    {" "}
                    <Link href="/contatti" onClick={() => setOpen(false)}>
                      Vai a Contatti →
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi una domanda…"
              aria-label="Messaggio per l'assistente"
            />
            <button type="submit" disabled={!input.trim()}>
              Invia
            </button>
          </form>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen((o) => !o)} aria-label={open ? "Chiudi chat" : "Apri chat"} aria-expanded={open}>
        {open ? (
          <span aria-hidden="true">×</span>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
