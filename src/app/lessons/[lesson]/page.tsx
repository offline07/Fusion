import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  ExternalLink,
  Lightbulb,
  Package,
  Target,
} from "lucide-react";
import { TRACK_META } from "@/data/course";
import { getAdjacentLessons, getAllLessons, getLesson, lessonHref, moduleHref } from "@/lib/course";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VideoEmbed } from "@/components/video-embed";
import { StepChecklist } from "@/components/step-checklist";
import { Quiz } from "@/components/quiz";
import { LessonCompleteBar } from "@/components/lesson-complete";
import { CourseOutlineSheet, CourseOutlineSidebar } from "@/components/course-outline";

export function generateStaticParams() {
  return getAllLessons().map((r) => ({ lesson: r.lesson.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lessons/[lesson]">): Promise<Metadata> {
  const { lesson: slug } = await params;
  const ref = getLesson(slug);
  return {
    title: ref ? ref.lesson.title : "Lesson",
    description: ref?.lesson.summary,
  };
}

export default async function LessonPage({ params }: PageProps<"/lessons/[lesson]">) {
  const { lesson: slug } = await params;
  const ref = getLesson(slug);
  if (!ref) notFound();

  const { lesson, module, index } = ref;
  const { prev, next } = getAdjacentLessons(slug);
  const track = TRACK_META[module.track];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <div className="flex items-center justify-between gap-3 py-5 text-sm">
        <Link
          href={moduleHref(module.slug)}
          className="inline-flex min-w-0 items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4 shrink-0" />
          <span className="truncate">
            Module {module.number}: {module.title}
          </span>
        </Link>
        <CourseOutlineSheet currentSlug={slug} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <CourseOutlineSidebar currentSlug={slug} />

        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                Lesson {module.number}.{index + 1}
              </span>
              <Badge className={track.className}>{track.label}</Badge>
              <Badge variant="outline">
                {lesson.kind === "lab" ? "Hands-on lab" : "Video + hands-on"}
              </Badge>
              <span className="text-xs text-muted-foreground">{lesson.minutes} min</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              {lesson.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground text-pretty">{lesson.summary}</p>
          </header>

          <section className="mt-8">
            <SectionTitle icon={Target}>What you will learn</SectionTitle>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {lesson.objectives.map((o) => (
                <li key={o} className="flex gap-2 rounded-lg border bg-card px-3 py-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          {lesson.video ? (
            <section className="mt-10">
              <SectionTitle icon={BookOpen}>Watch</SectionTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Watch once straight through, then keep it open while you work the steps below.
              </p>
              <VideoEmbed video={lesson.video} className="mt-4" />
              {lesson.alsoWatch?.length ? (
                <div className="mt-6">
                  <p className="text-sm font-medium">Also worth watching</p>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {lesson.alsoWatch.map((v) => (
                      <VideoEmbed key={v.youtubeId} video={v} />
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ) : (
            <section className="mt-10 rounded-xl border border-dashed bg-muted/40 p-5 text-sm">
              <p className="font-medium">This is a hands-on lab</p>
              <p className="mt-1 text-muted-foreground text-pretty">
                There is no video to follow along with. You already have every tool you need from
                earlier lessons. Work the steps in order, and use the linked references if you get
                stuck.
              </p>
            </section>
          )}

          <section className="mt-10">
            <SectionTitle icon={ClipboardCheck}>Do it in Fusion</SectionTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Check each step off as you complete it. Your checklist is saved in this browser.
            </p>
            <div className="mt-4">
              <StepChecklist slug={lesson.slug} steps={lesson.steps} />
            </div>
            {lesson.deliverable ? (
              <div className="mt-4 flex gap-3 rounded-xl border border-primary/30 bg-accent/40 p-4 text-sm">
                <Package className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Deliverable</p>
                  <p className="mt-0.5 text-muted-foreground text-pretty">{lesson.deliverable}</p>
                </div>
              </div>
            ) : null}
          </section>

          {lesson.shopNotes?.length ? (
            <section className="mt-10">
              <SectionTitle icon={Lightbulb}>Shop notes</SectionTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Practical advice from people who cut wood and print parts every week.
              </p>
              <ul className="mt-4 grid gap-3">
                {lesson.shopNotes.map((note) => (
                  <li
                    key={note}
                    className="rounded-xl border-l-4 border-primary/70 bg-card px-4 py-3 text-sm leading-relaxed text-pretty ring-1 ring-foreground/10"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {lesson.quiz?.length ? (
            <section className="mt-10">
              <SectionTitle icon={ClipboardCheck}>Knowledge check</SectionTitle>
              <div className="mt-4">
                <Quiz slug={lesson.slug} questions={lesson.quiz} />
              </div>
            </section>
          ) : null}

          {lesson.resources?.length ? (
            <section className="mt-10">
              <SectionTitle icon={ExternalLink}>References</SectionTitle>
              <ul className="mt-3 grid gap-2 text-sm">
                {lesson.resources.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
                    >
                      {r.label} <ExternalLink className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <Separator className="my-10" />

          <LessonCompleteBar slug={lesson.slug} stepCount={lesson.steps.length} next={next} />

          <nav className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={lessonHref(prev.lesson.slug)}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                <span>
                  <span className="block text-xs">Previous</span>
                  <span className="font-medium text-foreground group-hover:text-primary">
                    {prev.lesson.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={lessonHref(next.lesson.slug)}
                className="group flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground sm:ml-auto"
              >
                <span>
                  <span className="block text-xs">Next</span>
                  <span className="font-medium text-foreground group-hover:text-primary">
                    {next.lesson.title}
                  </span>
                </span>
                <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link
                href="/"
                className="group flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground sm:ml-auto"
              >
                <span>
                  <span className="block text-xs">You reached the end</span>
                  <span className="font-medium text-foreground group-hover:text-primary">
                    Back to the course overview
                  </span>
                </span>
                <ArrowRight className="size-4" />
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Target;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
      <Icon className="size-4 text-primary" />
      {children}
    </h2>
  );
}
