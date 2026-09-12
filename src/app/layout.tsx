import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { COURSE } from "@/data/course";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: COURSE.title,
    template: `%s | ${COURSE.title}`,
  },
  description: COURSE.subtitle,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col [--font-sans:var(--font-geist-sans)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Videos are embedded from their creators&apos; YouTube channels. Hands-on labs,
              checklists, and shop notes are original to this course.
            </p>
            <p>Progress is saved in this browser only.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
