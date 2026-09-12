"use client";

import { RotateCcw } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StepChecklist({ slug, steps }: { slug: string; steps: string[] }) {
  const { state, hydrated, toggleStep, resetSteps } = useProgress();
  const checked = new Set(hydrated ? state.steps[slug] ?? [] : []);
  const done = checked.size;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground tabular-nums">
          {done} of {steps.length} steps done
        </p>
        {done > 0 ? (
          <Button variant="ghost" size="xs" onClick={() => resetSteps(slug)}>
            <RotateCcw data-icon="inline-start" /> Reset
          </Button>
        ) : null}
      </div>
      <ol className="grid gap-1">
        {steps.map((step, i) => {
          const id = `${slug}-step-${i}`;
          const isChecked = checked.has(i);
          return (
            <li key={id}>
              <label
                htmlFor={id}
                className={cn(
                  "group/field flex cursor-pointer gap-3 rounded-lg border border-transparent p-3 transition-colors hover:bg-muted/60",
                  isChecked && "bg-muted/40",
                )}
              >
                <span className="flex flex-col items-center gap-1 pt-0.5">
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={() => toggleStep(slug, i)}
                  />
                </span>
                <span className="flex-1 text-sm leading-relaxed">
                  <span className="mr-2 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn(isChecked && "text-muted-foreground line-through")}>
                    {step}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
