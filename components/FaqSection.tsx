"use client";

import { useState } from "react";
import { displayTitle, sectionContainer } from "./styles";

const questions = [
  {
    question: "O que é o desafio Bumbum na Nuca?",
    answer:
      "É uma jornada de 21 dias com treinos direcionados para glúteos, estratégia alimentar e acompanhamento da equipe Método 90X. A proposta é tirar o improviso da rotina e colocar firmeza, volume e definição no centro do seu treino.",
  },
  {
    question: "Posso fazer os treinos em casa?",
    answer:
      "Sim. O desafio atende quem treina em casa ou na academia. Após a avaliação inicial, você recebe uma rotina compatível com sua realidade e com os recursos disponíveis.",
  },
  {
    question: "O desafio serve para iniciantes?",
    answer:
      "Sim. Iniciantes e mulheres que já treinam podem participar. A avaliação inicial ajuda a equipe a entender seu nível e orientar a execução e a intensidade dos exercícios.",
  },
  {
    question: "Quanto tempo preciso reservar para treinar?",
    answer:
      "O tempo varia conforme o treino e o seu nível. Todas as sessões ficam organizadas no aplicativo para você visualizar a sequência e encaixá-la na rotina com mais facilidade.",
  },
  {
    question: "Vou receber orientação alimentar?",
    answer:
      "Sim. O desafio inclui uma estratégia alimentar alinhada ao objetivo de desenvolver os glúteos e adaptada às informações compartilhadas na sua avaliação.",
  },
  {
    question: "Como funciona o acompanhamento?",
    answer:
      "Durante os 21 dias, você conta com suporte da equipe pelo WhatsApp, acesso ao grupo exclusivo e lives sobre treino, ativação, hipertrofia e recuperação dos glúteos.",
  },
  {
    question: "Quando recebo o acesso?",
    answer:
      "Depois da inscrição, você recebe as orientações para responder à avaliação inicial e acessar o aplicativo e os canais de suporte do Bumbum na Nuca.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="bg-warm-texture-reverse py-14 text-white md:py-20 lg:py-24"
      aria-labelledby="faq-title"
    >
      <div className={`${sectionContainer} max-w-4xl`}>
        <p
          className={`${displayTitle} text-center text-base tracking-[0.16em] text-[#ff6418] md:text-lg`}
        >
          TIRE SUAS DÚVIDAS
        </p>
        <h2
          id="faq-title"
          className={`${displayTitle} mx-auto mt-3 max-w-[22rem] text-center text-[clamp(2.35rem,9vw,3.65rem)] leading-[0.95] text-white md:max-w-[36rem] lg:text-[4.5rem]`}
        >
          PERGUNTAS <span className="text-[#ff6418]">FREQUENTES</span>
        </h2>

        <div className="mt-10 grid gap-3 md:mt-12 md:gap-4">
          {questions.map((item, index) => (
            <div
              className={`bg-panel-texture rounded-lg border ${
                openIndex === index
                  ? "border-[#ff6418]/70"
                  : "border-white/12"
              }`}
              key={item.question}
            >
              <button
                type="button"
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left md:min-h-20 md:px-7"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              >
                <span className={`${displayTitle} text-lg text-white md:text-xl`}>
                  {item.question}
                </span>
                <span
                  className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-[#ff6418]/60 text-2xl font-light leading-none text-[#ff6418]"
                  data-open={openIndex === index}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                data-open={openIndex === index}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-white/10 px-5 pb-5 pt-4 text-[0.95rem] font-medium leading-[1.7] text-white/85 md:px-7 md:pb-6 md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
