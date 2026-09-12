import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckSquare, Clock, FlaskConical, PlaySquare } from "lucide-react";
import { MODULES, TRACK_META } from "@/data/course";
import { formatHours, getModule, lessonHref, moduleHref } from "@/lib/course";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonStatusDot, ModuleProgressBar } from "@/components/progress-widgets";

export function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/modules/[module]">): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = getModule(slug);
  return { title: mod ? `Module ${mod.number}: ${mod.title}` : "Module" };
}

export default async function ModulePage({ params }: PageProps<"/modules/[module]">) {
  const { module: slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const track = TRACK_META[mod.track];
  const minutes = mod.lessons.reduce((s, l) => s + l.minutes, 0);
  const idx = MODULES.findIndex((m) => m.slug === mod.slug);
  const prev = MODULES[idx - 1];
  const next = MODULES[idx + 1];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <nav className="py-6 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All modules
        </Link>
      </nav>

      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Module {mod.number}</span>
          <Badge className={track.className}>{track.label}</Badge>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {mod.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">{mod.tagline}</p>
        <p className="mt-3 text-sm text-muted-foreground text-pretty">{mod.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {formatHours(minutes)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PlaySquare className="size-4" />{" "}
            {mod.lessons.filter((l) => l.video).length} videos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FlaskConical className="size-4" />{" "}
            {mod.lessons.filter((l) => l.kind === "lab").length} labs
          </span>
        </div>
        <ModuleProgressBar module={mod} className="mt-5 max-w-md" />
      </header>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ol className="grid gap-3">
          {mod.lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link href={lessonHref(lesson.slug)} className="group block">
                <Card size="sm" className="transition-colors group-hover:ring-primary/40">
                  <CardContent className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2 pt-1">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <LessonStatusDot slug={lesson.slug} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-medium group-hover:text-primary">{lesson.title}</h2>
                        <Badge variant="outline" className="capitalize">
                          {lesson.kind === "lab" ? "Hands-on lab" : "Video + lab"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground text-pretty">
                        {lesson.summary}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {lesson.minutes} min &middot; {lesson.steps.length} steps
                        {lesson.quiz ? ` · ${lesson.quiz.length} check questions` : ""}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ol>

        <aside>
          <Card className="border-primary/30 bg-accent/40">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Build project
              </p>
              <CardTitle className="text-lg">{mod.project.title}</CardTitle>
              <CardDescription className="text-pretty">
                {mod.project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Done when</p>
              <ul className="grid gap-2 text-sm">
                {mod.project.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <CheckSquare className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </section>

      <nav className="mt-12 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={moduleHref(prev.slug)}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            <span>
              <span className="block text-xs">Previous module</span>
              <span className="font-medium text-foreground group-hover:text-primary">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={moduleHref(next.slug)}
            className="group flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground sm:ml-auto"
          >
            <span>
              <span className="block text-xs">Next module</span>
              <span className="font-medium text-foreground group-hover:text-primary">
                {next.title}
              </span>
            </span>
            <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
