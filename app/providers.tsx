"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { ReactNode } from "react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (typeof window !== "undefined" && posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageleave: true,
    capture_pageview: true,
    person_profiles: "identified_only",
  });
}

export function Providers({ children }: { children: ReactNode }) {
  if (!posthogKey) {
    return children;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
