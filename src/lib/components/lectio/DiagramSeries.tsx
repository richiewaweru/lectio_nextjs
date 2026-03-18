"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { DiagramSeriesContent } from "@/lib/types";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

export function DiagramSeries({
  content
}: {
  content: DiagramSeriesContent;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex =
    content.diagrams.length === 0
      ? 0
      : Math.min(activeIndex, content.diagrams.length - 1);
  const activeDiagram = content.diagrams[currentIndex] ?? content.diagrams[0];
  const progressPercent =
    !activeDiagram || content.diagrams.length <= 1
      ? 100
      : ((currentIndex + 1) / content.diagrams.length) * 100;

  if (!activeDiagram) {
    return null;
  }

  return (
    <Card className="border-primary/10 bg-white/88">
      <CardHeader className="pb-3">
        <p className="eyebrow">Series</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3 rounded-[1.2rem] border border-border/70 bg-white/78 p-4">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>
              Step {currentIndex + 1} of {content.diagrams.length}
            </span>
            <span>{activeDiagram.step_label}</span>
          </div>
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${content.diagrams.length}, minmax(0, 1fr))`
            }}
          >
            {content.diagrams.map((diagram, index) => (
              <button
                key={`${diagram.step_label}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-current={index === currentIndex ? "step" : undefined}
              >
                <span className="sr-only">{diagram.step_label}</span>
                <span
                  className={`block h-2 rounded-full transition-all ${
                    index <= currentIndex
                      ? "bg-primary"
                      : "bg-secondary group-hover:bg-secondary/80"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <p className="text-sm font-medium text-foreground/80">
              {activeDiagram.step_label}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setActiveIndex((current) =>
                  Math.min(content.diagrams.length - 1, current + 1)
                )
              }
              disabled={currentIndex === content.diagrams.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-white [&_svg]:h-auto [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: activeDiagram.svg_content }}
        />
        <p className="text-sm leading-6 text-muted-foreground">
          {activeDiagram.caption}
        </p>
      </CardContent>
    </Card>
  );
}
