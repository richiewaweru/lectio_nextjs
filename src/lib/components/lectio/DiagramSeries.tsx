"use client";

import { useState } from "react";

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
  const activeDiagram = content.diagrams[activeIndex];

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
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {content.diagrams.map((diagram, index) => (
            <Button
              key={`${diagram.step_label}-${index}`}
              size="sm"
              variant={index === activeIndex ? "default" : "outline"}
              onClick={() => setActiveIndex(index)}
            >
              {diagram.step_label}
            </Button>
          ))}
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
