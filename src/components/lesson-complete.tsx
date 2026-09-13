"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { lessonHref, type LessonRef } from "@/lib/course";
import { Button } from "@/components/ui/button";

export function LessonCompleteBar({
  slug,
  stepCount,
  next,
}: {
  slug: string;
  stepCount: number;
  next?: LessonRef;
}) {
  const { state, hydrated, setLessonComplete, markVisited } = useProgress();
  const complete = hydrated && !!state.completed[slug];
  const stepsDone = hydrated ? (state.steps[slug] ?? []).length : 0;

  useEffect(() => {
    markVisited(slug);
  }, [slug, markVisited]);

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm">
        {complete ? (
          <p className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-5 text-primary" /> Lesson complete
          </p>
        ) : (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Circle className="size-5" />
            {stepsDone < stepCount
              ? `${stepCount - stepsDone} hands-on step${stepCount - stepsDone === 1 ? "" : "s"} left`
              : "All steps checked. Mark it done."}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={complete ? "outline" : "default"}
          onClick={() => setLessonComplete(slug, !complete)}
        >
          {complete ? "Mark as not done" : "Mark lesson complete"}
        </Button>
        {complete && next ? (
          <Button variant="secondary" nativeButton={false} render={<Link href={lessonHref(next.lesson.slug)} />}>
            Next lesson <ArrowRight data-icon="inline-end" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
