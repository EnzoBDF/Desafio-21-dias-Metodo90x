"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
  VideoHTMLAttributes,
} from "react";
import { useRef } from "react";
import {
  type AnalyticsEventName,
  type AnalyticsProperties,
  trackEvent,
} from "@/lib/analytics";

type TrackedActionProps = {
  eventName: AnalyticsEventName;
  eventProperties?: AnalyticsProperties;
  children: ReactNode;
};

type TrackedLinkProps = TrackedActionProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type TrackedButtonProps = TrackedActionProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type TrackedVideoProps = Omit<TrackedActionProps, "children"> &
  VideoHTMLAttributes<HTMLVideoElement>;

function captureClick(
  eventName: AnalyticsEventName,
  eventProperties: AnalyticsProperties | undefined,
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

export function TrackedVideo({
  eventName,
  eventProperties,
  onPlay,
  onTimeUpdate,
  onEnded,
  ...props
}: TrackedVideoProps) {
  const hasStartedRef = useRef(false);
  const milestonesRef = useRef(new Set<number>());
  const lastPlaybackTimeRef = useRef(0);
  const watchedSecondsRef = useRef(0);

  return (
    <video
      {...props}
      onPlay={(event: SyntheticEvent<HTMLVideoElement>) => {
        if (!hasStartedRef.current) {
          hasStartedRef.current = true;
          captureClick(eventName, eventProperties);
        }
        lastPlaybackTimeRef.current = event.currentTarget.currentTime;
        onPlay?.(event);
      }}
      onTimeUpdate={(event: SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;

        if (Number.isFinite(video.duration) && video.duration > 0) {
          const elapsedPlayback = video.currentTime - lastPlaybackTimeRef.current;

          if (elapsedPlayback > 0 && elapsedPlayback < 2) {
            watchedSecondsRef.current += elapsedPlayback;
          }

          lastPlaybackTimeRef.current = video.currentTime;
          const watchedPercent = Math.min(
            100,
            (watchedSecondsRef.current / video.duration) * 100,
          );

          [25, 50, 75, 90].forEach((milestone) => {
            if (
              watchedPercent >= milestone &&
              !milestonesRef.current.has(milestone)
            ) {
              milestonesRef.current.add(milestone);
              trackEvent("video_progress_reached", {
                ...eventProperties,
                progress_percent: milestone,
                watched_seconds: Math.round(watchedSecondsRef.current),
                current_time_seconds: Math.round(video.currentTime),
                duration_seconds: Math.round(video.duration),
              });
            }
          });
        }

        onTimeUpdate?.(event);
      }}
      onEnded={(event: SyntheticEvent<HTMLVideoElement>) => {
        if (!milestonesRef.current.has(100)) {
          milestonesRef.current.add(100);
          trackEvent("video_completed", {
            ...eventProperties,
            progress_percent: 100,
            duration_seconds: Math.round(event.currentTarget.duration),
            watched_seconds: Math.round(watchedSecondsRef.current),
            watched_percent: Math.min(
              100,
              Math.round(
                (watchedSecondsRef.current / event.currentTarget.duration) * 100,
              ),
            ),
          });
        }
        onEnded?.(event);
      }}
    />
  );
}
