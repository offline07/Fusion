"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/data/course";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Quiz({ slug, questions }: { slug: string; questions: QuizQuestion[] }) {
  const { state, hydrated, answerQuiz, resetQuiz } = useProgress();
  const answers = hydrated ? state.quiz[slug] ?? {} : {};
  const answered = Object.keys(answers).length;
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground tabular-nums">
          {answered === questions.length
            ? `${correct} of ${questions.length} correct`
            : `${answered} of ${questions.length} answered`}
        </p>
        {answered > 0 ? (
          <Button variant="ghost" size="xs" onClick={() => resetQuiz(slug)}>
            <RotateCcw data-icon="inline-start" /> Retake
          </Button>
        ) : null}
      </div>
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const isAnswered = chosen !== undefined;
        return (
          <fieldset key={qi} className="rounded-xl border p-4">
            <legend className="px-1 text-sm font-medium">
              <span className="mr-2 font-mono text-xs text-muted-foreground">Q{qi + 1}</span>
              {q.question}
            </legend>
            <div className="mt-2 grid gap-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = q.answer === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => answerQuiz(slug, qi, oi)}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                      !isAnswered && "hover:border-primary/50 hover:bg-muted/60",
                      isAnswered && isCorrect && "border-emerald-500/60 bg-emerald-500/10",
                      isAnswered && isChosen && !isCorrect && "border-destructive/60 bg-destructive/10",
                      isAnswered && !isChosen && !isCorrect && "opacity-60",
                    )}
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border text-[11px] font-medium">
                      {isAnswered && isCorrect ? (
                        <CheckCircle2 className="size-5 text-emerald-600" />
                      ) : isAnswered && isChosen ? (
                        <XCircle className="size-5 text-destructive" />
                      ) : (
                        String.fromCharCode(65 + oi)
                      )}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            {isAnswered ? (
              <p
                className={cn(
                  "mt-3 rounded-lg px-3 py-2 text-sm",
                  chosen === q.answer
                    ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                    : "bg-muted text-foreground",
                )}
              >
                <strong className="font-medium">
                  {chosen === q.answer ? "Correct. " : "Not quite. "}
                </strong>
                {q.explanation}
              </p>
            ) : null}
          </fieldset>
        );
      })}
    </div>
  );
}
