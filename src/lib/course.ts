import { MODULES, type Lesson, type Module } from "@/data/course";

export interface LessonRef {
  lesson: Lesson;
  module: Module;
  index: number;
}

const ALL_LESSONS: LessonRef[] = MODULES.flatMap((module) =>
  module.lessons.map((lesson, index) => ({ lesson, module, index })),
);

export function getAllLessons(): LessonRef[] {
  return ALL_LESSONS;
}

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getLesson(slug: string): LessonRef | undefined {
  return ALL_LESSONS.find((ref) => ref.lesson.slug === slug);
}

export function getAdjacentLessons(slug: string): {
  prev?: LessonRef;
  next?: LessonRef;
} {
  const i = ALL_LESSONS.findIndex((ref) => ref.lesson.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? ALL_LESSONS[i - 1] : undefined,
    next: i < ALL_LESSONS.length - 1 ? ALL_LESSONS[i + 1] : undefined,
  };
}

export function lessonHref(slug: string) {
  return `/lessons/${slug}`;
}

export function moduleHref(slug: string) {
  return `/modules/${slug}`;
}

export const COURSE_STATS = (() => {
  const lessons = ALL_LESSONS.length;
  const minutes = ALL_LESSONS.reduce((sum, r) => sum + r.lesson.minutes, 0);
  const videos = ALL_LESSONS.reduce(
    (sum, r) => sum + (r.lesson.video ? 1 : 0) + (r.lesson.alsoWatch?.length ?? 0),
    0,
  );
  const labs = ALL_LESSONS.filter((r) => r.lesson.kind === "lab").length;
  return { modules: MODULES.length, lessons, minutes, videos, labs, projects: MODULES.length };
})();

export function formatHours(minutes: number) {
  const h = minutes / 60;
  return h >= 10 ? `${Math.round(h)} h` : `${h.toFixed(1).replace(/\.0$/, "")} h`;
}
