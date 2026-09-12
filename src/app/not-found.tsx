import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-24">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">That lesson is not on the syllabus</h1>
      <p className="max-w-md text-muted-foreground">
        The page you asked for does not exist. Head back to the course overview to find your
        place.
      </p>
      <Button render={<Link href="/" />}>Back to the course</Button>
    </div>
  );
}
