import Link from "next/link";
import { ArrowRight, Clock, FlaskConical, Hammer, PlaySquare } from "lucide-react";
import { COURSE, MODULES, TRACK_META } from "@/data/course";
import { COURSE_STATS, formatHours, moduleHref } from "@/lib/course";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContinueCard, ModuleProgressBar } from "@/components/progress-widgets";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <section className="grid gap-8 py-10 md:grid-cols-[1.4fr_1fr] md:items-end md:py-14">
        <div>
          <p className="text-sm font-medium text-primary">Video lessons + hands-on labs</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {COURSE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            {COURSE.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{COURSE.audience}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <Stat icon={PlaySquare} label="Curated videos" value={String(COURSE_STATS.videos)} />
          <Stat icon={FlaskConical} label="Hands-on labs" value={String(COURSE_STATS.labs)} />
          <Stat icon={Hammer} label="Build projects" value={String(COURSE_STATS.projects)} />
          <Stat icon={Clock} label="Total time" value={formatHours(COURSE_STATS.minutes)} />
        </dl>
      </section>

      <ContinueCard />

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Curriculum</h2>
            <p className="text-sm text-muted-foreground">
              {COURSE_STATS.modules} modules &middot; {COURSE_STATS.lessons} lessons
            </p>
          </div>
          <ol className="mt-4 grid gap-4">
            {MODULES.map((module) => {
              const track = TRACK_META[module.track];
              const minutes = module.lessons.reduce((s, l) => s + l.minutes, 0);
              return (
                <li key={module.slug}>
                  <Link href={moduleHref(module.slug)} className="group block">
                    <Card className="transition-colors group-hover:ring-primary/40">
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            Module {module.number}
                          </span>
                          <Badge className={track.className}>{track.label}</Badge>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {module.lessons.length} lessons &middot; {formatHours(minutes)}
                          </span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary">
                          {module.title}
                        </CardTitle>
                        <CardDescription>{module.tagline}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3">
                        <ul className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                          {module.lessons.map((l) => (
                            <li key={l.slug} className="truncate">
                              <span className="mr-1.5 text-muted-foreground/60">
                                {l.kind === "lab" ? "Lab" : "Video"}
                              </span>
                              {l.title}
                            </li>
                          ))}
                        </ul>
                        <ModuleProgressBar module={module} />
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>What you will be able to do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2.5 text-sm">
                {COURSE.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How each lesson works</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Watch.</strong> A curated video from a
                creator who teaches this topic well, with objectives so you know what to look for.
              </p>
              <p>
                <strong className="text-foreground">Do.</strong> A step-by-step checklist that
                goes beyond the video and produces a real part, toolpath, or print.
              </p>
              <p>
                <strong className="text-foreground">Check.</strong> Shop notes from experienced
                CNC and printing users, plus a short knowledge check.
              </p>
              <p>
                Progress, checked steps, and quiz answers are saved in your browser. Nothing to
                sign up for.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What you need</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-1.5 text-sm text-muted-foreground">
                <li>Fusion 360 with a Personal Use license (free)</li>
                <li>A hobby CNC router and a 1/4 in and 1/8 in end mill, a 1/8 in ball nose, and a 60&deg; V-bit</li>
                <li>An FDM printer with a 0.4 mm nozzle and a slicer</li>
                <li>Digital calipers</li>
                <li>Scrap plywood or MDF, one hardwood blank for the tray</li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
