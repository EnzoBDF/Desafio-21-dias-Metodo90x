"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { EvidencePhoto } from "../lib/media";
import { SummerIcon } from "./SummerIcon";

const AUTOPLAY_DELAY = 5000;
const INTERACTION_DELAY = 7000;
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotionPreference(callback: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionPreference() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionPreference() {
  return true;
}

export function SummerEvidenceSlider({ photos }: { photos: EvidencePhoto[] }) {
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const directionRef = useRef(1);
  const touchingRef = useRef(false);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const visibleRef = useRef(false);
  const resumeAfterRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
  const playing = autoplayEnabled && !reducedMotion;

  const postponeAutoplay = () => {
    resumeAfterRef.current = Date.now() + INTERACTION_DELAY;
  };

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track || photos.length === 0) return;

    const nextIndex = (index + photos.length) % photos.length;
    track.scrollTo({
      left: nextIndex * track.clientWidth,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    activeRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, [photos.length, reducedMotion]);

  const navigate = (index: number) => {
    postponeAutoplay();
    goTo(index);
  };

  const syncActiveSlide = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const index = Math.max(0, Math.min(
      photos.length - 1,
      Math.round(track.scrollLeft / track.clientWidth),
    ));
    activeRef.current = index;
    setActiveIndex(index);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) {
      visibleRef.current = true;
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.25;
    }, { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || photos.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.hidden || !visibleRef.current || touchingRef.current ||
          hoveredRef.current || focusedRef.current || Date.now() < resumeAfterRef.current) {
        return;
      }
      // Bounce at the ends: no duplicated photos or abrupt multi-slide rewind.
      if (activeRef.current >= photos.length - 1) directionRef.current = -1;
      if (activeRef.current <= 0) directionRef.current = 1;
      goTo(activeRef.current + directionRef.current);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [goTo, photos.length, playing]);

  return (
    <div
      ref={rootRef}
      className="evidence-slider"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Registros reais"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hoveredRef.current = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") hoveredRef.current = false;
      }}
      onFocusCapture={() => { focusedRef.current = true; }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focusedRef.current = false;
          postponeAutoplay();
        }
      }}
    >
      <div
        id={trackId}
        ref={trackRef}
        className="evidence-slider-track"
        tabIndex={0}
        aria-label="Fotos: deslize para os lados ou use as setas do teclado"
        onScroll={syncActiveSlide}
        onTouchStart={() => { touchingRef.current = true; postponeAutoplay(); }}
        onTouchEnd={() => { touchingRef.current = false; postponeAutoplay(); }}
        onTouchCancel={() => { touchingRef.current = false; postponeAutoplay(); }}
        onWheel={postponeAutoplay}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(activeRef.current + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        {photos.map((photo, index) => (
          <figure
            className="evidence-photo"
            key={photo.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Registro ${index + 1} de ${photos.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              draggable={false}
              sizes="(max-width: 600px) calc(100vw - 40px), 560px"
            />
          </figure>
        ))}
      </div>
      <div className="evidence-slider-controls">
        <button type="button" className="slider-arrow slider-arrow--previous"
          aria-label="Ver registro anterior" aria-controls={trackId}
          onClick={() => navigate(activeRef.current - 1)}>
          <SummerIcon name="arrow" />
        </button>
        <div className="slider-dots" aria-label="Escolher registro">
          {photos.map((photo, index) => (
            <button type="button" key={photo.src}
              aria-label={`Ver registro ${index + 1} de ${photos.length}`}
              aria-current={activeIndex === index ? "true" : undefined}
              aria-controls={trackId} onClick={() => navigate(index)}>
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button type="button" className="slider-arrow"
          aria-label="Ver próximo registro" aria-controls={trackId}
          onClick={() => navigate(activeRef.current + 1)}>
          <SummerIcon name="arrow" />
        </button>
      </div>
      <div className="evidence-slider-meta">
        <p>Deslize para os lados <span aria-hidden="true">·</span> {activeIndex + 1}/{photos.length}</p>
        <button type="button" className="slider-autoplay" disabled={reducedMotion}
          aria-label={playing ? "Pausar avanço automático" : "Ativar avanço automático"}
          onClick={() => {
            focusedRef.current = false;
            postponeAutoplay();
            setAutoplayEnabled((enabled) => !enabled);
          }}>
          {reducedMotion ? "Sem animação" : playing ? "Pausar" : "Reproduzir"}
        </button>
      </div>
    </div>
  );
}
