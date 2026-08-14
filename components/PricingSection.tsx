"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Icon } from "./Icon";
import {
  displayTitle,
  glow,
  primaryButton,
  sectionContainer,
  sectionTitle,
} from "./styles";
import { TrackedLink } from "./TrackedActions";

const items = [
  "Avaliação inicial",
  "Suporte pelo Whatsapp",
  "Casa ou academia",
  "Aplicativos de treino",
  "Lives e conteúdos",
  "Grupo exclusivo",
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function PricingSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const isLineComplete = progress >= 0.995;

  useEffect(() => {
    let frame = 0;
    let isComplete = false;

    const updateProgress = () => {
      if (isComplete) {
        return;
      }

      const line = lineRef.current;

      if (!line) {
        return;
      }

      const rect = line.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.98;
      const complete = viewportHeight * 0.38;
      const nextProgress = clamp((start - rect.top) / (start - complete));

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

  useEffect(() => {
    if (!isLineComplete) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowLogo(true);
      trackEvent("pricing_animation_completed", {
        location: "pricing_section",
      });
    }, 650);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isLineComplete]);

  return (
    <section
      id="pricing"
      className="bg-page-texture relative overflow-hidden py-12 text-white md:py-20"
      aria-labelledby="pricing-title"
    >
      <div
        className={`${sectionContainer} relative flex flex-col items-center text-center`}
      >
        <div className="relative flex w-full flex-col items-center">
          <div
            ref={lineRef}
            className="absolute left-1/2 z-0 w-0.5 -translate-x-1/2 overflow-hidden"
            style={{
              top: "-3rem",
              height: "calc(100% - 4.125rem + 3rem)",
            }}
            aria-hidden="true"
          >
            <span
              className={`block h-full origin-top bg-[#ff6418] ${glow.orangeLine} motion-reduce:scale-y-100`}
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          <h2
            id="pricing-title"
            className={`${sectionTitle} relative z-10 items-start text-left text-[clamp(2.24rem,9vw,4rem)] md:items-center md:text-center`}
          >
            <span className="text-white">SUA JORNADA</span>
            <span className="text-white">
              COMEÇA <b className="text-[#ff6418]">AQUI</b>
            </span>
          </h2>

          <div
            className={`relative z-10 mt-8 grid size-[8.25rem] place-items-center overflow-hidden rounded-full border-[0.1875rem] border-[#ff6418] bg-[#1f1f1f] text-white ${glow.orangeRing} transition-[opacity,transform] duration-300 ease-out motion-reduce:scale-100 motion-reduce:opacity-100`}
            style={{
              opacity: isLineComplete ? 1 : 0,
              transform: `scale(${isLineComplete ? 1 : 0.72})`,
            }}
            aria-hidden="true"
          >
            <Icon
              name="check"
              className={`absolute h-16 w-16 stroke-[2.4] transition-[opacity,transform] duration-300 ease-out ${
                showLogo ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <Image
              className={`object-contain p-3 transition-[opacity,transform] duration-300 ease-out ${
                showLogo ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              src="/images/Desafio21Logo.png"
              alt=""
              fill
              sizes="8.25rem"
            />
          </div>
        </div>

        <p
          className={`${displayTitle} mt-10 text-[clamp(1.8rem,8vw,2.2rem)] leading-none`}
        >
          DESAFIO <span className="text-[#ff6418]">21 DIAS</span>
        </p>

        <p
          className={`${displayTitle} mt-4 flex items-baseline justify-center text-white`}
          aria-label="Preço 99 reais e 90 centavos"
        >
          <span className="sr-only">R$</span>
          <span className="text-[clamp(4.4rem,20vw,5.25rem)] leading-none">
            99
          </span>
          <span className="ml-2 text-[clamp(2.15rem,9vw,2.65rem)] leading-none">
            ,90
          </span>
        </p>

        <ul
          className="mt-8 grid gap-3.5 text-left text-[clamp(0.95rem,3.8vw,1rem)] leading-none text-white/95"
          aria-label="Benefícios inclusos"
        >
          {items.map((item) => (
            <li className="flex items-center gap-3" key={item}>
              <Icon
                name="check"
                className="size-[1.125rem] stroke-[#ff6418] stroke-[2.5]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <TrackedLink
          className={`${primaryButton} mt-8 max-w-[18rem]`}
          href="#hero-title"
          eventName="pricing_cta_clicked"
          eventProperties={{
            cta: "choose_start",
            price: "99,90",
          }}
        >
          EU ESCOLHI COMEÇAR!
        </TrackedLink>
      </div>
    </section>
  );
}
