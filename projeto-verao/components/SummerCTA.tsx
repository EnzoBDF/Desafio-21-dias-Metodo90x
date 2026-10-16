"use client";

import type { ReactNode } from "react";
import { CHECKOUT_URL, WHATSAPP_GROUP_URL } from "../lib/links";
import { trackEvent } from "../lib/analytics";
import { SummerIcon } from "./SummerIcon";

export function SummerCTA({
  children,
  placement,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  placement: string;
  variant?: "primary" | "light" | "dark" | "floating";
  className?: string;
}) {
  const isFloating = variant === "floating";

  return (
    <a
      className={`cta cta--${variant} ${className}`}
      href={isFloating ? WHATSAPP_GROUP_URL : CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        isFloating
          ? "Entrar no grupo do WhatsApp (abre em nova aba)"
          : undefined
      }
      title={isFloating ? "Entrar no grupo do WhatsApp" : undefined}
      onClick={() =>
        trackEvent(
          isFloating ? "whatsapp_group_link_clicked" : "checkout_link_clicked",
          {
            placement,
            destination: isFloating ? "whatsapp_group" : "greenn_checkout",
            intent: isFloating ? "group_invitation" : "enrollment",
          },
        )
      }
    >
      {isFloating ? (
        <SummerIcon name="whatsapp" viewBox="0 0 32 32" stroke="none" />
      ) : (
        <>
          <span>{children}</span>
          <SummerIcon name="arrow" />
        </>
      )}
    </a>
  );
}
