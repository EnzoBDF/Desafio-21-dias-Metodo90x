"use client";

import posthog from "posthog-js";

export function trackEvent(
  event:
    | "checkout_link_clicked"
    | "whatsapp_group_link_clicked"
    | "section_viewed"
    | "faq_item_opened",
  properties: Record<string, string | number | boolean> = {},
) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || typeof window === "undefined")
    return;
  posthog.capture(event, {
    analytics_source: "projeto_verao_landing",
    product: "projeto_verao_magra_e_definida",
    landing_version: "summer_v1",
    page_path: window.location.pathname,
    viewport_category:
      window.innerWidth < 768
        ? "mobile"
        : window.innerWidth < 1024
          ? "tablet"
          : "desktop",
    ...properties,
  });
}
