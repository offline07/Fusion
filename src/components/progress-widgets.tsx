"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { getAllLessons, getLesson, lessonHref } from "@/lib/course";
import type { Module } from "@/data/course";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function useCourseCounts() {
  const { state, hydrated } = useProgress();
  const all = getAllLessons();
  const done = hydrated ? all.filter((r) => state.completed[r.lesson.slug]).length : 0;
  return { done, total: all.length, hydrated, state };
}

export function OverallProgressPill() {
  const { done, total, hydrated } = useCourseCounts();
  if (!hydrated || done === 0) return null;
  return (
    <span className="ml-2 hidden items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs tabular-nums md:inline-flex">
      <CheckCircle2 className="size-3.5 text-primary" />
      {done}/{total} lessons
    </span>
  );
}

export function ModuleProgressBar({
  module,
  className,
}: {
  module: Module;
  className?: string;
}) {
  const { state, hydrated } = useProgress();
  const done = hydrated
    ? module.lessons.filter((l) => state.completed[l.slug]).length
    : 0;
  const pct = Math.round((done / module.lessons.length) * 100);
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Progress value={pct} aria-label={`${module.title} progress`} className="flex-1" />
      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
        {done}/{module.lessons.length}
      </span>
    </div>
  );
}

export function LessonStatusDot({ slug, className }: { slug: string; className?: string }) {
  const { state, hydrated } = useProgress();
  const complete = hydrated && !!state.completed[slug];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2.5 shrink-0 rounded-full border",
        complete ? "border-primary bg-primary" : "border-muted-foreground/40 bg-transparent",
        className,
      )}
    />
  );
}

export function ContinueCard() {
  const { state, hydrated, done, total } = useCourseCounts();
  if (!hydrated) {
    return <div className="h-28 animate-pulse rounded-xl bg-muted" aria-hidden />;
  }

  const all = getAllLessons();
  const firstIncomplete = all.find((r) => !state.completed[r.lesson.slug]);
  const last = state.lastVisited ? getLesson(state.lastVisited) : undefined;
  const target =
    last && !state.completed[last.lesson.slug] ? last : firstIncomplete ?? undefined;

  const pct = Math.round((done / total) * 100);

  if (!target) {
    return (
      <Card className="border-primary/30 bg-accent/40">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Course complete</p>
            <p className="mt-1 text-base font-medium">
              You finished every lesson. Build the keepsake box again with a new size and see what breaks.
            </p>
          </div>
          <Button variant="outline" nativeButton={false} render={<Link href="/reference" />}>
            Open the reference sheets
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isStart = done === 0;

  return (
    <Card className="border-primary/30 bg-accent/40">
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              {isStart ? "Start here" : "Continue where you left off"}
            </p>
            <p className="mt-1 truncate text-base font-medium">
              Module {target.module.number} &middot; {target.lesson.title}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {target.lesson.minutes} min &middot; {target.lesson.kind === "lab" ? "Hands-on lab" : "Video + hands-on"}
            </p>
          </div>
          <Button size="lg" nativeButton={false} render={<Link href={lessonHref(target.lesson.slug)} />}>
            {isStart ? <PlayCircle data-icon="inline-start" /> : null}
            {isStart ? "Begin lesson 1" : "Resume"}
            {!isStart ? <ArrowRight data-icon="inline-end" /> : null}
          </Button>
        </div>
        {!isStart ? (
          <Progress value={pct} aria-label="Overall course progress">
            <ProgressLabel className="text-xs text-muted-foreground">
              {done} of {total} lessons complete
            </ProgressLabel>
            <ProgressValue className="text-xs" />
          </Progress>
        ) : null}
      </CardContent>
    </Card>
  );
}
