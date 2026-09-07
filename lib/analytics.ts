"use client";

import posthog from "posthog-js";

export type AnalyticsProperties = Record<
  string,
  boolean | number | string | null | undefined
>;

export type AnalyticsEventName =
  | "challenge_card_selected"
  | "checkout_started"
  | "content_navigation_clicked"
  | "faq_item_toggled"
  | "gallery_interacted"
  | "section_viewed"
  | "scroll_depth_reached"
  | "support_contact_started"
  | "video_completed"
  | "video_progress_reached"
  | "video_started";

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return;
  }

  const viewportWidth = window.innerWidth;

  posthog.capture(eventName, {
    analytics_source: "desafio_21_dias_landing",
    analytics_schema_version: 2,
    landing_version: "bumbum_na_nuca_v2",
    product: "bumbum_na_nuca",
    page_path: window.location.pathname,
    viewport_category:
      viewportWidth < 768
        ? "mobile"
        : viewportWidth < 1024
          ? "tablet"
          : "desktop",
    ...properties,
  });
}
