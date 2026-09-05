"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CHECKOUT_URL } from "@/lib/links";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";

const participants = [
  {
    id: 1,
    imageSrc: "",
    alt: "Participante do Bumbum na Nuca",
    title: "Mais firmeza",
    description: "Treinos direcionados para ativar e fortalecer os glúteos.",
  },
  {
    id: 2,
    imageSrc: "",
    alt: "Participante do Bumbum na Nuca",
    title: "Glúteos ativados",
    description: "Execução consciente para sentir o músculo trabalhar de verdade.",
  },
  {
    id: 3,
    imageSrc: "",
    alt: "Participante do Bumbum na Nuca",
    title: "Mais volume",
    description: "Progressão de treino para construir glúteos com estratégia.",
  },
  {
    id: 4,
    imageSrc: "",
    alt: "Participante do Bumbum na Nuca",
    title: "Treino sem improviso",
    description: "Uma rotina clara para casa ou academia.",
  },
  {
    id: 5,
    imageSrc: "",
    alt: "Participante do Bumbum na Nuca",
    title: "Formato em destaque",
    description: "Estímulos pensados para trabalhar os glúteos por completo.",
  },
  {
    id: 6,
    imageSrc: "",
    alt: "Participante do Bumbum na Nuca",
    title: "21 dias de glúteos",
    description: "Constância e acompanhamento para fazer cada treino contar.",
  },
];

export function SocialProofSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const sliderItems = useMemo(
    () => [...participants, ...participants.map((item) => ({ ...item }))],
    [],
  );

  const pauseSlideshow = () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }

    setIsInteracting(true);
  };

  const resumeSlideshow = () => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 2200);
  };

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const slides = track.querySelectorAll<HTMLElement>("[data-slide]");

    if (slides.length <= participants.length) {
      return;
    }

    let frame = 0;
    let previousTime = performance.now();
    let position = track.scrollLeft;
    const pixelsPerSecond = 14;
    const loopDistance =
      slides[participants.length].offsetLeft - slides[0].offsetLeft;

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;

      if (!isInteracting && track.scrollWidth > track.clientWidth) {
        position += (pixelsPerSecond * elapsed) / 1000;

        if (position >= loopDistance) {
          position -= loopDistance;
        }

        track.scrollLeft = position;
      } else {
        position = track.scrollLeft;
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isInteracting]);

  return (
    <section
      className="bg-page-texture py-12 text-white md:py-20 lg:py-24"
      aria-labelledby="social-proof-title"
    >
      <div className={sectionContainer}>
        <h2
          id="social-proof-title"
          className={`${displayTitle} mx-auto flex max-w-[20rem] flex-col items-center text-center text-[clamp(2.15rem,8.5vw,3.2rem)] leading-[0.98] text-[#ff6418] md:max-w-[34rem] lg:text-[4.2rem]`}
        >
          <span className="text-white">QUEM TREINA COM FOCO</span>
          <span>FAZ O GLÚTEO RESPONDER</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-10 flex touch-pan-x gap-4 overflow-x-auto overscroll-x-contain px-6 pb-5 pt-4 md:mx-auto md:max-w-6xl md:cursor-grab md:gap-6 md:px-8 md:active:cursor-grabbing lg:mt-14 lg:px-10"
        aria-label="Resultados de participantes do Bumbum na Nuca"
        onPointerDown={pauseSlideshow}
        onPointerCancel={resumeSlideshow}
        onPointerLeave={resumeSlideshow}
        onPointerUp={resumeSlideshow}
        onWheel={() => {
          pauseSlideshow();
          resumeSlideshow();
        }}
      >
        {sliderItems.map((participant, index) => (
          <article
            data-slide
            className={`relative aspect-[3/4] w-[68vw] min-w-[15rem] max-w-[18rem] shrink-0 snap-center overflow-hidden rounded-xl bg-[#111] md:w-[18rem] ${glow.whiteCard}`}
            key={`${participant.id}-${index}`}
          >
            {participant.imageSrc ? (
              <Image
                className="object-cover"
                src={participant.imageSrc}
                alt={participant.alt}
                fill
                sizes="(max-width: 48rem) 68vw, 18rem"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#111_0%,#202020_52%,#0b0b0b_100%)]">
                <span
                  className={`${displayTitle} px-8 pb-20 text-center text-[clamp(1.35rem,6vw,1.9rem)] leading-none text-white/82`}
                >
                  RESULTADO BUMBUM NA NUCA
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex min-h-28 flex-col justify-end bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.86)_62%,#050505_100%)] px-5 pb-5 pt-12 text-left">
              <h3
                className={`${displayTitle} text-[clamp(1.35rem,5.6vw,1.65rem)] leading-none text-[#ff6418]`}
              >
                {participant.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-[1.22] text-white/92">
                {participant.description}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ff6418]" />
          </article>
        ))}
      </div>

      <div className={`${sectionContainer} mt-7 flex justify-center md:mt-9`}>
        <TrackedLink
          className={`${primaryButton} max-w-[20rem]`}
          href={CHECKOUT_URL}
          eventName="results_cta_clicked"
          eventProperties={{
            cta: "get_my_result",
            destination: "checkout",
          }}
        >
          QUERO CONQUISTAR MEU RESULTADO
        </TrackedLink>
      </div>
    </section>
  );
}
