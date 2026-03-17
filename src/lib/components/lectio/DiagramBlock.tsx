"use client";

import { Expand } from "lucide-react";

import type { DiagramContent } from "@/lib/types";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/lib/components/ui/popover";
import { cn } from "@/lib/utils";

function SvgStage({
  svg,
  alt,
  className,
  svgClassName
}: {
  svg: string;
  alt: string;
  className?: string;
  svgClassName?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] border border-border/70 bg-white",
        className
      )}
    >
      <div
        className={cn(
          "relative z-10 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full",
          svgClassName
        )}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export function DiagramBlock({ content }: { content: DiagramContent }) {
  return (
    <Card className="border-primary/10 bg-white/88">
      <CardHeader className="pb-3">
        <p className="eyebrow">Diagram</p>
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
            See the structure
          </CardTitle>
          {content.figure_number ? (
            <span className="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/75">
              Figure {content.figure_number}
            </span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <SvgStage
            svg={content.svg_content}
            alt={content.alt_text}
            svgClassName="[&_svg]:h-auto [&_svg]:w-full"
          />
          {content.callouts?.map((callout) => (
            <Popover key={callout.id}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-primary text-xs font-semibold text-primary-foreground shadow-sm"
                  style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                >
                  {callout.label}
                </button>
              </PopoverTrigger>
              <PopoverContent className="text-sm leading-6 text-foreground/82">
                {callout.explanation}
              </PopoverContent>
            </Popover>
          ))}
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{content.caption}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              {content.zoom_label ?? "Zoom in"}
              <Expand className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent
            surface="solid"
            className="max-h-[min(88vh,56rem)] overflow-y-auto"
          >
            <div className="relative z-10 space-y-5">
              <DialogHeader>
                <DialogTitle>Diagram detail</DialogTitle>
                <DialogDescription>{content.alt_text}</DialogDescription>
              </DialogHeader>
              <SvgStage
                svg={content.svg_content}
                alt={content.alt_text}
                className="border border-border/70 bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
                svgClassName="[&_svg]:h-auto [&_svg]:w-full"
              />
              <p className="text-sm leading-6 text-muted-foreground">{content.caption}</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
