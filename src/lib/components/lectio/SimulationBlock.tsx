"use client";

import { Maximize2 } from "lucide-react";

import type { SimulationContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import { Card, CardContent } from "@/lib/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";

export function SimulationBlock({
  content
}: {
  content: SimulationContent;
}) {
  const hasLiveContent = !!content.html_content;
  const typeLabel = content.spec.type.replace(/_/g, " ");

  return (
    <Card className="border-primary/10 bg-white/88">
      <CardContent className="space-y-4 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Simulation</p>
            <Badge variant="outline">{typeLabel}</Badge>
            {!hasLiveContent ? <Badge variant="secondary">Scaffold</Badge> : null}
          </div>
          <h3 className="font-[var(--font-display)] text-2xl font-semibold text-primary">
            Manipulate and discover
          </h3>
        </div>

        {content.explanation ? (
          <p className="text-base leading-7 text-foreground/84">
            {content.explanation}
          </p>
        ) : null}

        {hasLiveContent ? (
          /* Live simulation in sandboxed iframe */
          <div className="relative">
            <div className="absolute right-2 top-2 z-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/90 shadow-sm"
                  >
                    <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
                    Expand
                  </Button>
                </DialogTrigger>
                <DialogContent
                  surface="solid"
                  className="w-[min(92vw,64rem)] max-w-5xl p-0 overflow-hidden"
                >
                  <DialogHeader className="border-b border-border/40 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <DialogTitle className="text-sm">Simulation</DialogTitle>
                      <Badge variant="outline">{typeLabel}</Badge>
                    </div>
                  </DialogHeader>
                  <iframe
                    srcDoc={content.html_content}
                    sandbox="allow-scripts"
                    title={content.spec.goal}
                    className="w-full"
                    style={{ height: "min(80vh, 640px)" }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <iframe
              srcDoc={content.html_content}
              sandbox="allow-scripts"
              title={content.spec.goal}
              className="w-full rounded-[1.25rem] border border-border/60 bg-white"
              style={{ height: `${content.spec.dimensions.height}px` }}
            />
          </div>
        ) : content.fallback_diagram ? (
          /* Fallback diagram when no live content */
          <div className="space-y-3 rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Fallback diagram
            </p>
            <div
              role="img"
              aria-label={content.fallback_diagram.alt_text}
              className="overflow-hidden rounded-[1rem] border border-border/70 bg-white [&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{
                __html: content.fallback_diagram.svg_content
              }}
            />
            <p className="text-sm leading-6 text-muted-foreground">
              {content.fallback_diagram.caption}
            </p>
          </div>
        ) : (
          /* Scaffold placeholder */
          <div
            className="flex items-center justify-center rounded-[1.25rem] border border-dashed border-border/80 bg-secondary/35 p-6 text-center text-sm leading-6 text-muted-foreground"
            style={{ minHeight: `${content.spec.dimensions.height}px` }}
          >
            Interactive experience will mount here when the interaction pipeline
            is connected.
          </div>
        )}

        {/* Metadata panel */}
        <div className="grid gap-3 rounded-[1.25rem] bg-white/82 p-4 text-sm leading-6 text-foreground/82 md:grid-cols-2">
          <div>
            <p className="font-semibold text-primary">Type</p>
            <p>{typeLabel}</p>
          </div>
          <div>
            <p className="font-semibold text-primary">Goal</p>
            <p>{content.spec.goal}</p>
          </div>
          <div>
            <p className="font-semibold text-primary">Dimensions</p>
            <p>
              {content.spec.dimensions.width} &times;{" "}
              {content.spec.dimensions.height}px
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary">Print fallback</p>
            <p>{content.spec.print_translation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
