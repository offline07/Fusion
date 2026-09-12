"use client";

import Link from "next/link";
import { ListTree } from "lucide-react";
import { MODULES } from "@/data/course";
import { lessonHref, moduleHref } from "@/lib/course";
import { LessonStatusDot } from "@/components/progress-widgets";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function OutlineList({ currentSlug }: { currentSlug: string }) {
  return (
    <nav aria-label="Course outline" className="text-sm">
      <ol className="grid gap-4">
        {MODULES.map((module) => {
          const active = module.lessons.some((l) => l.slug === currentSlug);
          return (
            <li key={module.slug}>
              <Link
                href={moduleHref(module.slug)}
                className={cn(
                  "block text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {module.number}. {module.title}
              </Link>
              <ol className="mt-1.5 grid gap-0.5 border-l pl-3">
                {module.lessons.map((lesson) => {
                  const isCurrent = lesson.slug === currentSlug;
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={lessonHref(lesson.slug)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
                          isCurrent && "bg-accent font-medium text-foreground",
                        )}
                      >
                        <LessonStatusDot slug={lesson.slug} />
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function CourseOutlineSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
        <OutlineList currentSlug={currentSlug} />
      </div>
    </aside>
  );
}

export function CourseOutlineSheet({ currentSlug }: { currentSlug: string }) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden" />}>
        <ListTree data-icon="inline-start" /> Outline
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto p-4">
        <SheetHeader className="p-0">
          <SheetTitle>Course outline</SheetTitle>
        </SheetHeader>
        <OutlineList currentSlug={currentSlug} />
      </SheetContent>
    </Sheet>
  );
}
