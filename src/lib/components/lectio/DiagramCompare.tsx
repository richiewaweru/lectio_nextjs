"use client";

import { useState } from "react";

import type { DiagramCompareContent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { Slider } from "@/lib/components/ui/slider";

export function DiagramCompare({
  content
}: {
  content: DiagramCompareContent;
}) {
  const [position, setPosition] = useState([50]);
  const percent = position[0] ?? 50;

  return (
    <Card className="border-primary/10 bg-white/88">
      <CardHeader className="pb-3">
        <p className="eyebrow">Compare</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Before and after
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>{content.before_label}</span>
          <span>{content.after_label}</span>
        </div>
        <div
          aria-label={content.alt_text}
          className="relative overflow-hidden rounded-[1.25rem] border border-border/70 bg-white"
        >
          <div
            className="[&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: content.before_svg }}
          />
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden [&_svg]:h-auto [&_svg]:w-full"
            style={{ width: `${percent}%` }}
            dangerouslySetInnerHTML={{ __html: content.after_svg }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary"
            style={{ left: `${percent}%` }}
          />
        </div>
        <Slider
          value={position}
          max={100}
          min={0}
          step={1}
          onValueChange={setPosition}
        />
        <p className="text-sm leading-6 text-muted-foreground">{content.caption}</p>
      </CardContent>
    </Card>
  );
}
