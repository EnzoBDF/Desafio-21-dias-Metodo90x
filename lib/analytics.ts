"use client";

import posthog from "posthog-js";

type AnalyticsProperties = Record<
  string,
  boolean | number | string | null | undefined
>;

export function trackEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return;
  }

  posthog.capture(eventName, {
    source: "desafio_21_dias_landing",
    ...properties,
  });
}
