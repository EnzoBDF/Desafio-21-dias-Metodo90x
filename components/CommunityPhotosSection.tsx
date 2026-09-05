"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CHECKOUT_URL } from "@/lib/links";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";

const communityPhotos = [
  {
    id: 1,
    imageSrc: "",
    alt: "Comunidade Bumbum na Nuca",
    title: "Mesmo objetivo",
    description: "Mulheres treinando juntas por glúteos mais fortes e definidos.",
  },
  {
    id: 2,
    imageSrc: "",
    alt: "Comunidade Bumbum na Nuca",
    title: "Foco nos glúteos",
    description: "Trocas diárias para manter intensidade e constância.",
  },
  {
    id: 3,
    imageSrc: "",
    alt: "Comunidade Bumbum na Nuca",
    title: "Cada série conta",
    description: "Um passo por treino rumo a mais firmeza e volume.",
  },
  {
    id: 4,
    imageSrc: "",
    alt: "Comunidade Bumbum na Nuca",
    title: "Execução com direção",
    description: "Casa ou academia, o glúteo continua no centro da missão.",
  },
  {
    id: 5,
    imageSrc: "",
    alt: "Comunidade Bumbum na Nuca",
    title: "Evolução visível",
    description: "Treino, alimentação e suporte trabalhando pelo mesmo objetivo.",
  },
  {
    id: 6,
    imageSrc: "",
    alt: "Comunidade Bumbum na Nuca",
    title: "Suporte de verdade",
    description: "Você não precisa descobrir sozinha como treinar seus glúteos.",
  },
];

export function CommunityPhotosSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const sliderItems = useMemo(
    () => [...communityPhotos, ...communityPhotos.map((item) => ({ ...item }))],
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

    if (slides.length <= communityPhotos.length) {
      return;
    }

    let frame = 0;
    let previousTime = performance.now();
    let position = track.scrollLeft;
    const pixelsPerSecond = 14;
    const loopDistance =
      slides[communityPhotos.length].offsetLeft - slides[0].offsetLeft;

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
        onPointerDown={pauseSlideshow}
        onPointerCancel={resumeSlideshow}
        onPointerLeave={resumeSlideshow}
        onPointerUp={resumeSlideshow}
        onWheel={() => {
          pauseSlideshow();
          resumeSlideshow();
        }}
      >
        {sliderItems.map((photo, index) => (
          <article
            data-slide
            className={`relative aspect-[4/5] w-[72vw] min-w-[16rem] max-w-[20rem] shrink-0 snap-center overflow-hidden rounded-xl bg-[#111] md:w-[20rem] ${glow.whiteCard}`}
            key={`${photo.id}-${index}`}
          >
            {photo.imageSrc ? (
              <Image
                className="object-cover"
                src={photo.imageSrc}
                alt={photo.alt}
                fill
                sizes="(max-width: 48rem) 72vw, 20rem"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,100,24,0.16),transparent_36%),linear-gradient(135deg,#111_0%,#242424_52%,#090909_100%)]">
                <span
                  className={`${displayTitle} px-8 pb-20 text-center text-[clamp(1.35rem,6vw,1.95rem)] leading-none text-white/84`}
                >
                  COMUNIDADE MÉTODO 90X
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex min-h-32 flex-col justify-end bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.86)_58%,#050505_100%)] px-5 pb-5 pt-14 text-left">
              <h3
                className={`${displayTitle} text-[clamp(1.35rem,5.6vw,1.75rem)] leading-none text-[#ff6418]`}
              >
                {photo.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-[1.24] text-white/92">
                {photo.description}
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
          eventName="community_cta_clicked"
          eventProperties={{
            cta: "join_community",
            destination: "checkout",
          }}
        >
          QUERO FAZER PARTE
        </TrackedLink>
      </div>
    </section>
  );
}
