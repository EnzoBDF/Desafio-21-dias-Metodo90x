"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CHECKOUT_URL } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";

const participants = [
  {
    id: 1,
    imageSrc: "/SocialProof/SocialpProof1.jpeg",
    alt: "Registro de participante do Método 90X",
  },
  {
    id: 2,
    imageSrc: "/SocialProof/SocialProof2.png",
    alt: "Registro de participante do Método 90X",
  },
  {
    id: 3,
    imageSrc: "/SocialProof/SocialProof3.png",
    alt: "Registro de participante do Método 90X",
  },
];

export function SocialProofSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const trackedInteractionsRef = useRef(new Set<string>());
  const [isInteracting, setIsInteracting] = useState(false);

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

  const trackInteraction = (interactionType: "drag" | "wheel") => {
    if (trackedInteractionsRef.current.has(interactionType)) {
      return;
    }

    trackedInteractionsRef.current.add(interactionType);
    trackEvent("gallery_interacted", {
      gallery_id: "social_proof",
      interaction_type: interactionType,
      item_count: participants.length,
    });
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

    if (slides.length < 2) {
      return;
    }

    let frame = 0;
    let previousTime = performance.now();
    let position = track.scrollLeft;
    let velocity = 0;
    const pixelsPerSecond = 10;
    let direction = position >= track.scrollWidth - track.clientWidth - 1 ? -1 : 1;

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;

      if (!isInteracting && track.scrollWidth > track.clientWidth) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const targetVelocity = direction * pixelsPerSecond;
        const easing = 1 - Math.exp(-elapsed / 520);

        velocity += (targetVelocity - velocity) * easing;
        position += (velocity * elapsed) / 1000;

        if (position >= maxScroll) {
          position = maxScroll;
          direction = -1;
        } else if (position <= 0) {
          position = 0;
          direction = 1;
        }

        track.scrollLeft = position;
      } else {
        position = track.scrollLeft;
        velocity = 0;
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
          <span className="text-white">VEJA A EVOLUÇÃO DE QUEM</span>
          <span>JÁ TREINOU COM O MÉTODO 90X</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-[1.8] text-white/85">Por trás de cada resultado, existe uma mulher que começou de um ponto diferente, seguiu um plano e construiu sua evolução.</p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-[1.8] text-white/60">Experiências individuais com o Método 90X. Os registros não comprovam resultados em 30 dias nem garantem uma evolução igual para todas.</p>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-10 flex touch-pan-x gap-4 overflow-x-auto overscroll-x-contain px-6 pb-5 pt-4 md:mx-auto md:max-w-6xl md:cursor-grab md:gap-6 md:px-8 md:active:cursor-grabbing lg:mt-14 lg:px-10"
        aria-label="Registros de participantes do Método 90X"
        onPointerDown={() => {
          trackInteraction("drag");
          pauseSlideshow();
        }}
        onPointerCancel={resumeSlideshow}
        onPointerLeave={resumeSlideshow}
        onPointerUp={resumeSlideshow}
        onWheel={() => {
          trackInteraction("wheel");
          pauseSlideshow();
          resumeSlideshow();
        }}
      >
        {participants.map((participant) => (
          <article
            data-slide
            className={`relative aspect-[3/4] w-[68vw] min-w-[15rem] max-w-[18rem] shrink-0 snap-center overflow-hidden rounded-xl bg-[#111] md:w-[18rem] ${glow.whiteCard}`}
            key={participant.id}
          >
            <Image
              className="object-contain"
              src={participant.imageSrc}
              alt={participant.alt}
              fill
              sizes="(max-width: 48rem) 68vw, 18rem"
            />
          </article>
        ))}
      </div>

      <div className={`${sectionContainer} mt-7 flex justify-center md:mt-9`}>
        <TrackedLink
          className={`${primaryButton} max-w-[20rem]`}
          href={CHECKOUT_URL}
          eventName="checkout_started"
          eventProperties={{
            placement: "social_proof",
            cta_id: "social_proof_primary",
            intent: "purchase",
            destination: "checkout",
            offer_price: 97,
            currency: "BRL",
          }}
        >
          QUERO TER BUMBUM NA NUCA
        </TrackedLink>
      </div>
    </section>
  );
}
