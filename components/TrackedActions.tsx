"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";
import { trackEvent } from "@/lib/analytics";

type EventProperties = Record<
  string,
  boolean | number | string | null | undefined
>;

type TrackedActionProps = {
  eventName: string;
  eventProperties?: EventProperties;
  children: ReactNode;
};

type TrackedLinkProps = TrackedActionProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type TrackedButtonProps = TrackedActionProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

function captureClick(
  eventName: string,
  eventProperties: EventProperties | undefined,
) {
  trackEvent(eventName, eventProperties);
}

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        captureClick(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

export function TrackedButton({
  eventName,
  eventProperties,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  return (
    <button
      {...props}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        captureClick(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
