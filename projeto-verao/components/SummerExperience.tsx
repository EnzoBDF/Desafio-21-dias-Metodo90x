"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../lib/analytics";

export function SummerExperience() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "section[data-section]",
    );
    const viewed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target as HTMLElement;
          section.classList.add("is-revealed");
          const name = section.dataset.section;
          if (name && !viewed.has(name)) {
            viewed.add(name);
            trackEvent("section_viewed", { section: name });
          }
        });
      },
      { threshold: 0.18 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return null;
}

const faq = [
  [
    "O que é o Projeto Verão?",
    "É a proposta Magra e Definida: um convite para colocar o movimento e o bem-estar na sua rotina, com foco nos seus objetivos. Fale com a equipe para conhecer o programa em detalhes.",
  ],
  [
    "Preciso estar em forma para começar?",
    "Você não precisa esperar um momento perfeito para conversar sobre seus objetivos. Conte à equipe seu nível atual e sua rotina para entender se a proposta é adequada para você.",
  ],
  [
    "Posso fazer os treinos em casa?",
    "Converse com a equipe sobre onde você pretende treinar, os equipamentos disponíveis e as opções de treino do Projeto Verão antes de participar.",
  ],
  [
    "Em quanto tempo vou ver resultados?",
    "Cada pessoa tem um ponto de partida, uma rotina e uma resposta diferente. Não há garantia de resultado ou prazo fixo. Consistência, alimentação e orientação adequada fazem parte do processo.",
  ],
  [
    "Qual é o valor e como faço para participar?",
    "Os botões de inscrição levam ao checkout do Projeto Verão, onde você pode conferir o valor e as condições da oferta antes de concluir a compra. O botão flutuante com o símbolo do WhatsApp abre o convite para o grupo.",
  ],
];

export function SummerFAQ() {
  return (
    <div className="faq-list">
      {faq.map(([question, answer], index) => (
        <details
          key={question}
          onToggle={(event) => {
            if (event.currentTarget.open)
              trackEvent("faq_item_opened", {
                question,
                question_index: index + 1,
              });
          }}
        >
          <summary>
            <span>{question}</span>
            <span className="faq-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function SummerNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="menu-toggle"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="main-navigation"
        className={open ? "navigation navigation--open" : "navigation"}
        aria-label="Menu principal"
      >
        <a href="#proposta" onClick={() => setOpen(false)}>
          O projeto
        </a>
        <a href="#participar" onClick={() => setOpen(false)}>
          Oferta
        </a>
        <a href="#historias" onClick={() => setOpen(false)}>
          Histórias reais
        </a>
        <a href="#duvidas" onClick={() => setOpen(false)}>
          Dúvidas
        </a>
      </nav>
    </>
  );
}
