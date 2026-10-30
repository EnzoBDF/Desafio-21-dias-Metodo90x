"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { challengeFaq } from "@/lib/challengeOffer";
import { displayTitle, sectionContainer } from "./styles";

const questions = challengeFaq;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    const willOpen = openIndex !== index;

    setOpenIndex(willOpen ? index : null);
    trackEvent("faq_item_toggled", {
      question_id: `faq_${index + 1}`,
      question_position: index + 1,
      action: willOpen ? "opened" : "closed",
    });
  };

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
                id={`faq-question-${index}`}
                type="button"
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left md:min-h-20 md:px-7"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleQuestion(index)}
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
                role="region"
                aria-labelledby={`faq-question-${index}`}
                aria-hidden={openIndex !== index}
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
