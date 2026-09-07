"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { challenges } from "@/lib/challenges";
import { ChallengeCard } from "./ChallengeCard";
import { sectionContainer, sectionTitle } from "./styles";

export function ChallengeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const focusChallenge = useCallback((index: number, interaction: string) => {
    const challenge = challenges[index];

    setActiveIndex(index);
    trackEvent("challenge_card_selected", {
      challenge_id: challenge.id,
      challenge_title: challenge.title,
      interaction_type: interaction,
      placement: "challenge_selector",
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
            1 <b className="text-[#ff6418]">OBJETIVO</b>
          </span>
          <span className="text-white my-2">GLÚTEOS NO FOCO</span>
          <span>DO INÍCIO AO FIM</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mx-auto mt-8 flex w-full max-w-3xl items-center justify-center overflow-visible px-5 pb-5 pt-4 sm:px-6 md:px-8 lg:mt-12"
        aria-label="Conheça o desafio Bumbum na Nuca"
        onScroll={updateActiveCard}
      >
        {challenges.map((challenge, index) => (
          <div
            className="w-full max-w-[42rem] shrink-0"
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
