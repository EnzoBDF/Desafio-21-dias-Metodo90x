"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { CHECKOUT_URL } from "@/lib/links";
import { challengeInclusions } from "@/lib/challengeOffer";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, glow, primaryButton, sectionContainer } from "./styles";

const features = challengeInclusions;

export function IncludedFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeIndex = Math.min(features.length - 1, Math.round(progress));
  const stackTop = 24 + (progress / (features.length - 1)) * 44;

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const traveledDistance = Math.min(
        Math.max(-rect.top, 0),
        scrollableDistance,
      );

      setProgress(
        scrollableDistance > 0
          ? Math.min(
              features.length - 1,
              (traveledDistance / scrollableDistance) * (features.length - 0.65),
            )
          : 0,
      );
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section
        className="bg-warm-texture-reverse py-16 text-white"
        aria-labelledby="included-title"
      >
        <div className={sectionContainer}>
          <IncludedTitle />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
          <p className="mt-7 text-center text-xs font-bold uppercase tracking-[0.24em] text-white/60">
            E muito mais
          </p>
          <div className="mt-8 flex justify-center">
            <IncludedFeaturesCta />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-no-section-reveal
      className="bg-warm-texture-reverse relative isolate h-[360svh] text-white"
      aria-labelledby="included-title"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden py-8 md:py-12">
        <div className={`${sectionContainer} shrink-0`}>
          <IncludedTitle />
          <p className="mt-3 text-center text-sm font-semibold text-white/65">
            Role para conhecer todos os itens
          </p>
        </div>

        <div
          className="relative mx-auto mt-5 min-h-0 w-full max-w-2xl flex-1 overflow-hidden px-6"
          aria-hidden="true"
        >
          {features.map((feature, index) => {
            const distance = Math.abs(index - progress);
            const offset = (index - progress) * 12.5;
            const scale = Math.max(0.78, 1 - distance * 0.11);
            const opacity = Math.max(0.08, 1 - distance * 0.52);

            return (
              <div
                className="absolute left-1/2 top-[var(--stack-top)] w-[calc(100%_-_3rem)] max-w-[24rem] md:top-1/2"
                key={feature.title}
                style={{
                  "--stack-top": `${stackTop}%`,
                  opacity,
                  transform: `translate(-50%, calc(-50% + ${offset}rem)) scale(${scale})`,
                  zIndex: features.length - Math.round(distance),
                } as CSSProperties}
              >
                <FeatureCard feature={feature} />
                {index === features.length - 1 ? (
                  <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.24em] text-white/60">
                    E muito mais
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={`${sectionContainer} shrink-0 text-center`}>
          <p className={`${displayTitle} text-xl text-white`} aria-live="polite">
            <span className="text-[#ff6418]">{activeIndex + 1}</span>
            <span className="text-white/45"> / {features.length}</span>
          </p>
          <div className="mx-auto mt-3 flex max-w-48 gap-1.5" aria-hidden="true">
            {features.map((feature, index) => (
              <span
                className={`h-1 flex-1 rounded-full ${
                  index <= activeIndex ? "bg-[#ff6418]" : "bg-white/18"
                }`}
                key={feature.title}
              />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <IncludedFeaturesCta />
          </div>
        </div>
      </div>

      <ul className="sr-only">
        {features.map((feature) => (
          <li key={feature.title}>
            {feature.title}: {feature.description}
          </li>
        ))}
      </ul>
    </section>
  );
}

function IncludedFeaturesCta() {
  return (
    <TrackedLink
      className={`${primaryButton} max-w-[20rem]`}
      href={CHECKOUT_URL}
      eventName="checkout_started"
      eventProperties={{
        placement: "included_features",
        cta_id: "included_features_primary",
        intent: "purchase",
        destination: "checkout",
        offer_price: 97,
        currency: "BRL",
      }}
    >
      QUERO MEU BUMBUM NA NUCA
    </TrackedLink>
  );
}

function IncludedTitle() {
  return (
    <h2
      id="included-title"
      className={`${displayTitle} mx-auto flex max-w-[17rem] flex-col items-center text-center text-[clamp(1.8rem,7.5vw,2.7rem)] leading-[1.1] text-[#ff6418] md:max-w-[28rem] md:text-[clamp(2.8rem,5.4vw,3.5rem)] lg:max-w-[34rem] lg:text-[4.1rem]`}
    >
      <span className="text-white">NO DESAFIO 30 DIAS - BUMBUM NA NUCA</span>
      <span>VOCÊ VAI RECEBER</span>
    </h2>
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  return (
    <article
      className={`bg-panel-texture relative grid min-h-40 w-full place-items-center rounded-xl border border-white/10 border-b-2 border-b-[#ff6418] px-5 pb-5 pt-9 text-center text-white ${glow.darkCard}`}
    >
      <span className="bg-panel-texture absolute left-1/2 top-0 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#ff6418]/60 text-[#ff6418]">
        <Icon name={feature.icon} className="size-7" />
      </span>
      <div>
        <h3 className={`${displayTitle} text-xl leading-[1.05] text-[#ff6418]`}>
          {feature.title}
        </h3>
        <p className="mx-auto mt-3 max-w-[20rem] text-sm font-semibold leading-[1.4] text-white/85">
          {feature.description}
        </p>
      </div>
    </article>
  );
}
