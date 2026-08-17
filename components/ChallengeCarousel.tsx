"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { ChallengeCard } from "./ChallengeCard";
import { sectionContainer, sectionTitle } from "./styles";

const challenges = [
  {
    id: 1,
    title: "BUMBUM NA NUCA",
    subtitle: "Glúteos em destaque",
    description: "Para focar em firmeza, formato e evolução dos glúteos durante os 21 dias.",
    imageSrc: "/images/Bumbum.png",
    imageAlt: "Desafio Bumbum",
  },
  {
    id: 2,
    title: "PERNAS DE CAVALONA",
    subtitle: "Pernas mais densas e torneadas",
    description:
      "Para quem quer construir pernas e glúteos com treino direcionado e constância.",
    imageSrc: "/images/Cvalona.png",
    imageAlt: "Desafio Cavalona",
  },
  {
    id: 3,
    title: "ELA VOLTOU",
    subtitle: "O renascimento da mulher 30+",
    description:
      "Para voltar a se olhar com confiança e reencontrar sua melhor versão.",
    imageSrc: "/images/ela-voltou.webp",
    imageAlt: "Desafio Ela Voltou",
  },
];

export function ChallengeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const focusChallenge = useCallback((index: number, interaction: string) => {
    const challenge = challenges[index];

    setActiveIndex(index);
    trackEvent("challenge_card_focused", {
      challenge_id: challenge.id,
      challenge_title: challenge.title,
      interaction,
    });
  }, []);

  const updateActiveCard = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    const trackRect = track.getBoundingClientRect();
    const visibleLeft = Math.max(trackRect.left, 0);
    const visibleRight = Math.min(trackRect.right, window.innerWidth);
    const trackCenter = visibleLeft + (visibleRight - visibleLeft) / 2;

    const closestIndex = cards.reduce(
      (closest, card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        return distance < closest.distance ? { distance, index } : closest;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 },
    ).index;

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateActiveCard);

    window.addEventListener("resize", updateActiveCard);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, [updateActiveCard]);

  return (
    <section
      className="bg-page-texture py-12 text-white md:py-20 lg:py-24"
      aria-labelledby="challenges-title"
    >
      <div className={sectionContainer}>
        <h2
          id="challenges-title"
          className={`${sectionTitle} max-w-[16rem] text-[clamp(2.25rem,9vw,3.2rem)] leading-[1.02] md:max-w-[28rem] lg:max-w-[34rem] lg:text-[4.25rem]`}
        >
          <span className="text-white">
            3 <b className="text-[#ff6418]">DESAFIOS</b>
          </span>
          <span className="text-white">3 MOMENTOS</span>
          <span>DIFERENTES</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-8 flex items-center gap-4 overflow-x-auto px-6 pb-5 pt-4 md:mx-auto md:max-w-6xl md:justify-center md:overflow-visible md:px-8 lg:mt-12 lg:max-w-7xl lg:gap-8"
        aria-label="Escolha seu desafio"
        onScroll={updateActiveCard}
      >
        {challenges.map((challenge, index) => (
          <div
            data-card
            key={challenge.id}
            onFocus={() => focusChallenge(index, "focus")}
            onMouseEnter={() => setActiveIndex(index)}
            onPointerDown={() => focusChallenge(index, "pointer")}
          >
            <ChallengeCard {...challenge} isActive={activeIndex === index} />
          </div>
        ))}
      </div>
    </section>
  );
}
