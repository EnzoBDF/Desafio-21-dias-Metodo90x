"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const scrollMilestones = [25, 50, 75, 90, 100] as const;

export function LandingAnalytics() {
  useEffect(() => {
    const startedAt = performance.now();
    const viewedSections = new Set<string>();
    const reachedMilestones = new Set<number>();
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main[data-section-reveal] > section",
      ),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          const sectionIndex = sections.indexOf(section);
          const sectionId =
            section.dataset.analyticsSection ??
            section.getAttribute("aria-labelledby") ??
            section.id ??
            "section_" + (sectionIndex + 1);

          if (viewedSections.has(sectionId)) {
            return;
          }

          viewedSections.add(sectionId);
          trackEvent("section_viewed", {
            section_id: sectionId,
            section_position: sectionIndex + 1,
            seconds_since_landing: Math.round(
              (performance.now() - startedAt) / 1000,
            ),
          });
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const captureScrollDepth = () => {
      frame = 0;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const depth =
        scrollableHeight > 0
          ? Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100))
          : 100;

      scrollMilestones.forEach((milestone) => {
        if (depth >= milestone && !reachedMilestones.has(milestone)) {
          reachedMilestones.add(milestone);
          trackEvent("scroll_depth_reached", {
            depth_percent: milestone,
            seconds_since_landing: Math.round(
              (performance.now() - startedAt) / 1000,
            ),
          });
        }
      });
    };

    const requestScrollCapture = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(captureScrollDepth);
      }
    };

    captureScrollDepth();
    window.addEventListener("scroll", requestScrollCapture, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestScrollCapture);
    };
  }, []);

  return null;
}
