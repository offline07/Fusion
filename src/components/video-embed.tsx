"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { Video } from "@/data/course";
import { cn } from "@/lib/utils";

export function VideoEmbed({ video, className }: { video: Video; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <figure className={cn("overflow-hidden rounded-xl border bg-card", className)}>
      <div className="relative aspect-video w-full bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 grid place-items-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring"
            aria-label={`Play video: ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
              priority={false}
            />
            <span className="relative grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-1 size-7" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
        <div className="min-w-0">
          <p className="truncate font-medium">{video.title}</p>
          <p className="text-xs text-muted-foreground">
            {video.author} &middot; {video.minutes} min
          </p>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Open on YouTube <ExternalLink className="size-3" />
        </a>
      </figcaption>
    </figure>
  );
}
