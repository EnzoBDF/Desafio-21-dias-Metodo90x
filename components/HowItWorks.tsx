"use client";

import { useEffect, useRef, useState } from "react";
import { displayTitle } from "./styles";
import { StepCard } from "./StepCard";

const steps = [
  {
    number: "01",
    title: "FAÇA SUA INSCRIÇÃO",
    description: "Finalize sua compra com segurança",
    align: "right" as const,
  },
  {
    number: "02",
    title: "RESPONDA À AVALIAÇÃO",
    description: "Preencha a anamnese e envie as fotos solicitadas",
    align: "left" as const,
  },
  {
    number: "03",
    title: "RECEBA SEUS ACESSOS",
    description: "Entre no aplicativo e nos canais de suporte",
    align: "right" as const,
  },
  {
    number: "04",
    title: "COMECE SUA MISSÃO",
    description: "Siga os treinos e conte com nosso suporte durante 21 dias",
    align: "left" as const,
  },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let isComplete = false;

    const updateProgress = () => {
      if (isComplete) {
        return;
      }

      const timeline = timelineRef.current;

      if (!timeline) {
        return;
      }

      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.98;
      const end = viewportHeight * 0.18;
      const nextProgress = clamp((start - rect.top) / (rect.height + start - end));

      if (nextProgress >= 1) {
        isComplete = true;
        setProgress(1);
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        return;
      }

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-[#421f15] pb-0 pt-6 text-white before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_10%_66%,rgba(31,31,31,0.9),transparent_42%),linear-gradient(180deg,#6a2711_0%,#4a2117_48%,#1f1f1f_100%)] md:py-10"
      aria-labelledby="how-title"
    >
      <div className="relative mx-auto w-full">
        <h2
          id="how-title"
          className={`${displayTitle} relative z-10 mx-auto flex max-w-[16rem] flex-col items-center px-6 text-center text-[clamp(2rem,8.8vw,2.85rem)] leading-[1.02] text-[#ff6418] md:max-w-[28rem] md:text-[clamp(3rem,5.5vw,3.7rem)]`}
        >
          <span>COMO FUNCIONA</span>
          <span className="text-white">O DESAFIO 21</span>
          <span className="text-white">DIAS?</span>
        </h2>

        <div
          ref={timelineRef}
          className="relative mx-auto mt-14 flex min-h-[calc(100svh-11rem)] w-full flex-col justify-between gap-8 pb-0 pt-4 md:max-w-[54rem]"
        >
          <div
            className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="block h-full origin-top bg-[#ff6418] shadow-[0_0_0.875rem_rgba(255,100,24,0.9)] motion-reduce:scale-y-100"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              {...step}
              lineProgress={progress}
              progressStart={(index + 0.12) / steps.length}
              progressEnd={(index + 0.4) / steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
