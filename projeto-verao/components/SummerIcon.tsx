import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "sun"
  | "arrow"
  | "wave"
  | "heart"
  | "strength"
  | "leaf"
  | "spark"
  | "check"
  | "image"
  | "whatsapp"
  | "chat";

export function SummerIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
      </>
    ),
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    wave: (
      <>
        <path d="M2 8c3-5 5 5 8 0s5 5 8 0 3-1 4 0M2 15c3-5 5 5 8 0s5 5 8 0 3-1 4 0" />
      </>
    ),
    heart: (
      <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    strength: (
      <>
        <path d="m5 5 14 14M3 8l5-5m8 18 5-5M2 5l3-3m14 20 3-3M3 10l7-7m4 18 7-7" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C8 1 2 9 6 17c8 4 16-2 14-14Z" />
        <path d="M3 21 15 9" />
      </>
    ),
    spark: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8" cy="8" r="1.5" />
        <path d="m3 17 5-5 4 4 4-6 5 7" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z" />
        <path d="M8 10h8m-8 4h5" />
      </>
    ),
    whatsapp: (
      <>
        <path
          d="M16.04 4.5c-6.27 0-11.38 5.02-11.38 11.2 0 1.98.54 3.9 1.55 5.58L4.5 27.5l6.45-1.63a11.6 11.6 0 0 0 5.09 1.18c6.28 0 11.39-5.02 11.39-11.2S22.32 4.5 16.04 4.5Z"
          fill="currentColor"
        />
        <path
          d="M22.57 19.25c-.27.75-1.35 1.39-1.92 1.48-.51.08-1.16.12-1.88-.12-.43-.14-.99-.32-1.7-.62-2.99-1.27-4.94-4.19-5.09-4.38-.15-.19-1.22-1.6-1.22-3.05 0-1.45.78-2.16 1.05-2.46.27-.29.59-.37.79-.37h.57c.18.01.43-.07.67.51.26.62.88 2.13.96 2.29.08.15.13.34.03.54-.1.19-.15.31-.3.48-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.29.79 1.29 1.7 2.09 1.17 1.03 2.16 1.35 2.47 1.5.31.15.49.13.67-.08.18-.2.77-.89.98-1.19.2-.29.41-.25.69-.15.29.1 1.83.85 2.14 1 .31.15.52.23.59.36.08.13.08.78-.19 1.53Z"
          fill="var(--whatsapp)"
        />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
