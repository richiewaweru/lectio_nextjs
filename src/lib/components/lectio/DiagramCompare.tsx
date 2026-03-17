"use client";

import { useState } from "react";

import type { DiagramCompareContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { Slider } from "@/lib/components/ui/slider";
import { cn } from "@/lib/utils";

export function DiagramCompare({
  content
}: {
  content: DiagramCompareContent;
}) {
  const [position, setPosition] = useState([0]);
  const percent = position[0] ?? 0;
  const beforeDetails = content.before_details ?? [];
  const afterDetails = content.after_details ?? [];
  const visibleAfterCount =
    afterDetails.length === 0 || percent === 0
      ? 0
      : Math.min(
          afterDetails.length,
          Math.max(1, Math.ceil((percent / 100) * afterDetails.length))
        );
  const visibleAfterDetails = afterDetails.slice(0, visibleAfterCount);
  const beforeActive = percent < 50;
  const afterActive = percent > 0;

  return (
    <Card className="border-primary/10 bg-white/88">
      <CardHeader className="pb-3">
        <p className="eyebrow">Compare</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Before and after
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-[1.45rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))] p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Badge
              variant="outline"
              className={cn(
                "border-border/70 bg-white/80 text-foreground/78",
                beforeActive && "border-primary/20 bg-primary/5 text-primary"
              )}
            >
              {content.before_label}
            </Badge>
            <span className="text-[11px] tracking-[0.22em] text-muted-foreground/88">
              Reveal change
            </span>
            <Badge
              variant="outline"
              className={cn(
                "border-border/70 bg-white/80 text-foreground/78",
                afterActive && "border-amber-300 bg-amber-50 text-amber-900"
              )}
            >
              {content.after_label}
            </Badge>
          </div>
          <div
            aria-label={content.alt_text}
            className="relative overflow-hidden rounded-[1.25rem] border border-border/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          >
            <div
              className="[&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: content.after_svg }}
            />
            <div
              className="pointer-events-none absolute inset-0 [&_svg]:h-auto [&_svg]:w-full"
              style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
              dangerouslySetInnerHTML={{ __html: content.before_svg }}
            />
            {percent > 0 && percent < 100 ? (
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/95 shadow-[0_0_0_1px_rgba(15,23,42,0.12)]"
                style={{ left: `${percent}%` }}
              />
            ) : null}
          </div>
          <div className="mt-4 rounded-[1rem] border border-border/70 bg-white/82 p-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>Before focus</span>
              <span>{percent}% revealed</span>
              <span>After focus</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-sky-500 to-amber-500 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <Slider
              className="mt-4"
              value={position}
              max={100}
              min={0}
              step={1}
              onValueChange={setPosition}
              aria-label="Reveal the after state"
            />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Slide from the full {content.before_label.toLowerCase()} state
              toward the full {content.after_label.toLowerCase()} state.
            </p>
          </div>
        </div>
        {beforeDetails.length || afterDetails.length ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {beforeDetails.length ? (
              <div
                className={cn(
                  "rounded-[1.2rem] border p-4 transition-all",
                  beforeActive
                    ? "border-primary/18 bg-primary/5 shadow-sm"
                    : "border-border/70 bg-white/72 opacity-75"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/72">
                  {content.before_label} details
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/82">
                  {beforeDetails.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/65" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {afterDetails.length ? (
              <div
                className={cn(
                  "rounded-[1.2rem] border p-4 transition-all",
                  afterActive
                    ? "border-amber-300/70 bg-amber-50/72 shadow-sm"
                    : "border-border/70 bg-white/72"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800/75">
                  {content.after_label} details
                </p>
                {visibleAfterDetails.length ? (
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/82">
                    {visibleAfterDetails.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-600/70" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Move the slider to begin revealing what changes in the after
                    state.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        <p className="text-sm leading-6 text-muted-foreground">{content.caption}</p>
      </CardContent>
    </Card>
  );
}
