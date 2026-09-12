"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface ProgressState {
  completed: Record<string, true>;
  steps: Record<string, number[]>;
  quiz: Record<string, Record<number, number>>;
  lastVisited?: string;
  updatedAt?: number;
}

const STORAGE_KEY = "fusion-workshop-progress-v1";
const EMPTY: ProgressState = { completed: {}, steps: {}, quiz: {} };

let cached: ProgressState | null = null;
const listeners = new Set<() => void>();

function read(): ProgressState {
  if (cached) return cached;
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cached = raw ? { ...EMPTY, ...(JSON.parse(raw) as ProgressState) } : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
}

function write(next: ProgressState) {
  cached = { ...next, updatedAt: Date.now() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // Storage may be unavailable (private mode, quota). Progress stays in memory.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cached = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  const state = useSyncExternalStore(subscribe, read, () => EMPTY);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const setLessonComplete = useCallback((slug: string, value: boolean) => {
    const s = read();
    const completed = { ...s.completed };
    if (value) completed[slug] = true;
    else delete completed[slug];
    write({ ...s, completed });
  }, []);

  const toggleStep = useCallback((slug: string, index: number) => {
    const s = read();
    const current = new Set(s.steps[slug] ?? []);
    if (current.has(index)) current.delete(index);
    else current.add(index);
    write({ ...s, steps: { ...s.steps, [slug]: [...current].sort((a, b) => a - b) } });
  }, []);

  const resetSteps = useCallback((slug: string) => {
    const s = read();
    const steps = { ...s.steps };
    delete steps[slug];
    write({ ...s, steps });
  }, []);

  const answerQuiz = useCallback((slug: string, qIndex: number, choice: number) => {
    const s = read();
    write({
      ...s,
      quiz: { ...s.quiz, [slug]: { ...(s.quiz[slug] ?? {}), [qIndex]: choice } },
    });
  }, []);

  const resetQuiz = useCallback((slug: string) => {
    const s = read();
    const quiz = { ...s.quiz };
    delete quiz[slug];
    write({ ...s, quiz });
  }, []);

  const markVisited = useCallback((slug: string) => {
    const s = read();
    if (s.lastVisited === slug) return;
    write({ ...s, lastVisited: slug });
  }, []);

  const resetAll = useCallback(() => write(EMPTY), []);

  return {
    state,
    hydrated,
    setLessonComplete,
    toggleStep,
    resetSteps,
    answerQuiz,
    resetQuiz,
    markVisited,
    resetAll,
  };
}
