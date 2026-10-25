"use client";

import { useSyncExternalStore } from "react";
import { QUIZ_STORAGE_KEY, parseQuizAnswers } from "./quiz";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("summer-quiz-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("summer-quiz-updated", callback);
  };
}

function getSnapshot() {
  try { return window.sessionStorage.getItem(QUIZ_STORAGE_KEY); }
  catch { return null; }
}

function getServerSnapshot(): undefined { return undefined; }

export function useQuizAnswers() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { answers: parseQuizAnswers(raw ?? null), ready: raw !== undefined };
}
