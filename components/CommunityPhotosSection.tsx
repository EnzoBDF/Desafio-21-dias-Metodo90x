"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CHECKOUT_URL } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";

const communityPhotos = [
  {
    id: 1,
    imageSrc: "/Comunidade/Comunidade1.jpeg",
    alt: "Comunidade Método 90X",
  },
  {
    id: 2,
    imageSrc: "/Comunidade/Comunidade2.jpeg",
    alt: "Comunidade Método 90X",
  },
  {
    id: 3,
    imageSrc: "/Comunidade/Comunidade3.jpeg",
    alt: "Comunidade Método 90X",
  },
  {
    id: 4,
    imageSrc: "/Comunidade/Comunidade4.jpeg",
    alt: "Comunidade Método 90X",
  },
];

export function CommunityPhotosSection() {
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
      gallery_id: "community",
      interaction_type: interactionType,
      item_count: communityPhotos.length,
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
      className="bg-warm-texture-reverse py-12 text-white md:py-20 lg:py-24"
      aria-labelledby="community-title"
    >
      <div className={sectionContainer}>
        <h2
          id="community-title"
          className={`${displayTitle} mx-auto flex max-w-[21rem] flex-col items-center text-center text-[clamp(2.1rem,8.5vw,3.25rem)] leading-[0.98] text-[#ff6418] md:max-w-[36rem] lg:text-[4.35rem]`}
        >
          <span className="text-white mb-0.5 leading-tight">FAÇA PARTE DA COMUNIDADE DO</span>
          <span>MÉTODO 90X</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[24rem] text-center text-[clamp(0.95rem,3.8vw,1.08rem)] font-semibold leading-[1.55] text-white/88 md:max-w-[34rem] lg:text-lg">
          Participe de uma comunidade com pessoas alinhadas a um objetivo em comum: Alcançar resultados incríveis, com constância e dedicação.
        </p>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-10 flex touch-pan-x gap-4 overflow-x-auto overscroll-x-contain px-6 pb-5 pt-4 md:mx-auto md:max-w-6xl md:cursor-grab md:gap-6 md:px-8 md:active:cursor-grabbing lg:mt-14 lg:px-10"
        aria-label="Fotos da comunidade Bumbum na Nuca"
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
        {communityPhotos.map((photo) => (
          <article
            data-slide
            className={`relative aspect-[4/5] w-[72vw] min-w-[16rem] max-w-[20rem] shrink-0 snap-center overflow-hidden rounded-xl bg-[#111] md:w-[20rem] ${glow.whiteCard}`}
            key={photo.id}
          >
            <Image
              className="object-cover"
              src={photo.imageSrc}
              alt={photo.alt}
              fill
              sizes="(max-width: 48rem) 72vw, 20rem"
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
            placement: "community",
            cta_id: "community_primary",
            intent: "purchase",
            destination: "checkout",
            offer_price: 99.9,
            currency: "BRL",
          }}
        >
          QUERO FAZER PARTE
        </TrackedLink>
      </div>
    </section>
  );
}
