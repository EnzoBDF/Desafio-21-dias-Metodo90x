"use client";

import { useEffect } from "react";

export function SectionRevealController() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "main[data-section-reveal] > section:not([data-no-section-reveal])",
    );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("section-is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "-4% 0px -4% 0px",
      },
    );

    sections.forEach((section) => {
      section.classList.add("section-reveal");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
