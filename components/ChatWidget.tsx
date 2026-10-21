"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { SUGGESTED_QUESTIONS } from "@/lib/attendant";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const bodyRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <>
      <button
        className={`chat-fab${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar atendimento" : "Falar com o Taverneiro"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Pergaminho
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 12h-5" />
            <path d="M15 8h-5" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
          </svg>
        )}
      </button>

      {open && (
        <section className="chat-panel" aria-label="Atendimento da Taverna">
          <header className="chat-header">
            <div className="chat-avatar">🧙</div>
            <div>
              <h2 className="font-heading">O Taverneiro</h2>
              <p>Atendente virtual · tira dúvidas e sugere pratos</p>
            </div>
          </header>

          <div className="chat-body" ref={bodyRef}>
            <div className="chat-msg assistant">
              Saudações, viajante! 🍗 Sou o Taverneiro. Pergunte sobre o cardápio ou peça uma
              sugestão para o seu banquete.
            </div>

            {messages.map((message) => (
              <div key={message.id} className={`chat-msg ${message.role}`}>
                {message.parts.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null,
                )}
              </div>
            ))}

            {status === "submitted" && <div className="chat-msg assistant typing">Consultando o Oráculo…</div>}

            {error && (
              <div className="chat-error">
                O Taverneiro se perdeu nas Minas de Moria. Tente novamente em instantes.
              </div>
            )}

            {messages.length === 0 && (
              <div className="chat-suggestions">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button key={question} onClick={() => send(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua dúvida..."
              aria-label="Mensagem para o atendente"
              maxLength={500}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Enviar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </>
  );
}
