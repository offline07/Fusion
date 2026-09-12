import Link from "next/link";
import { Hexagon } from "lucide-react";
import { OverallProgressPill } from "@/components/progress-widgets";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Hexagon className="size-4" strokeWidth={2.4} />
          </span>
          <span className="hidden sm:inline">Fusion 360 for the Workshop</span>
          <span className="sm:hidden">Workshop</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Course
          </Link>
          <Link
            href="/reference"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Reference
          </Link>
          <OverallProgressPill />
        </nav>
      </div>
    </header>
  );
}
