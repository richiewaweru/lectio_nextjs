"use client";

import { useState } from "react";
import { BarChart3, CircleHelp, Quote, Sparkles } from "lucide-react";

import type { HookHeroContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import { cn } from "@/lib/utils";

export function HookHero({ content }: { content: HookHeroContent }) {
  const [hiddenImages, setHiddenImages] = useState<Record<string, true>>({});
  const hookType = content.type ?? "prose";
  const hasImage = Boolean(content.image && !hiddenImages[content.image.url]);

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-primary px-6 py-8 text-primary-foreground sm:px-8">
      <div className="absolute right-4 top-3 text-[7rem] font-black leading-none text-white/5 sm:text-[9rem]">
        ?
      </div>
      <div
        className={cn(
          "relative z-10 gap-6",
          hasImage
            ? "grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(250px,300px)]"
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
          {hookType === "quote" ? (
            <div className="space-y-3 rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/68">
                <Quote className="h-4 w-4" />
                Quoted hook
              </div>
              <blockquote className="max-w-2xl text-lg leading-8 text-primary-foreground/90">
                &ldquo;{content.body}&rdquo;
              </blockquote>
              {content.quote_attribution ? (
                <p className="text-sm text-primary-foreground/70">
                  {content.quote_attribution}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="max-w-2xl text-base leading-7 text-primary-foreground/82">
              {content.body}
            </p>
          )}
          {hookType === "question" && content.question_options?.length ? (
            <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/68">
                <CircleHelp className="h-4 w-4" />
                Hold the tension
              </div>
              <div className="flex flex-wrap gap-2">
                {content.question_options.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-sm text-primary-foreground/85"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {hookType === "data-point" && content.data_point ? (
            <div className="grid gap-3 rounded-[1.35rem] border border-white/12 bg-white/8 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="flex items-center gap-3 text-primary-foreground">
                <BarChart3 className="h-5 w-5" />
                <span className="font-[var(--font-display)] text-3xl">
                  {content.data_point.value}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                  {content.data_point.label}
                </p>
                {content.data_point.source ? (
                  <p className="text-sm text-primary-foreground/68">
                    Source: {content.data_point.source}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
          <p className="max-w-xl rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-primary-foreground/78">
            Anchor: {content.anchor}
          </p>
        </div>
        {hasImage && content.image ? (
          <div className="glass-panel rounded-[1.5rem] p-3 text-primary">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/65">
                Visual intuition
              </p>
              <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/72">
                Attached visual
              </span>
            </div>
            <div className="overflow-hidden rounded-[1.25rem] bg-white/70 p-3 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.image.url}
                alt={content.image.alt}
                className="aspect-[5/4] max-h-[260px] w-full object-contain"
                onError={() =>
                  setHiddenImages((current) => ({
                    ...current,
                    [content.image!.url]: true
                  }))
                }
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-primary/72">
              A quick visual anchor that previews the idea before the formal
              explanation begins.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
