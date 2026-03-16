"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import type { HookHeroContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import { cn } from "@/lib/utils";

export function HookHero({ content }: { content: HookHeroContent }) {
  const [hiddenImages, setHiddenImages] = useState<Record<string, true>>({});

  const hasImage = Boolean(
    content.image && !hiddenImages[content.image.url]
  );

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-8 text-primary-foreground sm:px-8">
      <div className="absolute right-4 top-3 text-[7rem] font-black leading-none text-white/5 sm:text-[9rem]">
        ?
      </div>
      <div
        className={cn(
          "relative z-10 gap-6",
          hasImage
            ? "grid items-center lg:grid-cols-[minmax(0,1fr)_240px]"
            : "space-y-4"
        )}
      >
        <div className="space-y-4">
          <Badge className="w-fit bg-white/12 text-primary-foreground hover:bg-white/12">
            Curiosity hook
          </Badge>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">
            <Sparkles className="h-4 w-4" />
            Felt need
          </div>
          <h2 className="max-w-2xl font-[var(--font-display)] text-3xl leading-tight sm:text-4xl">
            {content.headline}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-primary-foreground/82">
            {content.body}
          </p>
          <p className="max-w-xl rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-primary-foreground/78">
            Anchor: {content.anchor}
          </p>
        </div>
        {hasImage && content.image ? (
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.image.url}
              alt={content.image.alt}
              className="h-full max-h-[220px] w-full object-cover"
              onError={() =>
                setHiddenImages((current) => ({
                  ...current,
                  [content.image!.url]: true
                }))
              }
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
