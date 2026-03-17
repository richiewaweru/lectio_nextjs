"use client";

import { useState } from "react";

import type { TimelineContent, TimelineEvent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { cn } from "@/lib/utils";

type TimelineBlockMode = "static" | "timeline-scrubber";

function TimelineEventDetail({
  event,
  active
}: {
  event: TimelineEvent;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border bg-white/85 p-4 transition-colors",
        active ? "border-rose-300 shadow-[0_12px_30px_rgba(244,63,94,0.12)]" : "border-rose-100"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="border-rose-200 text-rose-700">
          {event.year}
        </Badge>
        {event.era ? (
          <Badge variant="outline" className="border-rose-200 text-rose-700">
            {event.era}
          </Badge>
        ) : null}
      </div>
      <h3 className="mt-3 font-[var(--font-display)] text-2xl text-primary">
        {event.title}
      </h3>
      <p className="mt-2 text-base leading-7 text-foreground/84">{event.summary}</p>
      {event.impact ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          <span className="font-semibold uppercase tracking-[0.16em] text-rose-700">
            Why it matters
          </span>{" "}
          {event.impact}
        </p>
      ) : null}
      {event.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} className="bg-rose-100 text-rose-800 hover:bg-rose-100">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function TimelineBlock({
  content,
  mode = "timeline-scrubber"
}: {
  content: TimelineContent;
  mode?: TimelineBlockMode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = content.events[activeIndex] ?? content.events[0];

  return (
    <Card className="border-rose-200 bg-rose-50/45">
      <CardHeader className="pb-3">
        <p className="eyebrow text-rose-700">Timeline</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.title}
        </CardTitle>
        {content.intro ? (
          <p className="text-sm leading-6 text-muted-foreground">{content.intro}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-5">
        {mode === "timeline-scrubber" ? (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {content.events.map((event, index) => (
                <Button
                  key={event.id}
                  variant={index === activeIndex ? "default" : "outline"}
                  className={cn(
                    "shrink-0 rounded-full",
                    index === activeIndex
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "border-rose-200 text-rose-700 hover:bg-rose-50"
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  {event.year}
                </Button>
              ))}
            </div>
            {activeEvent ? <TimelineEventDetail event={activeEvent} active /> : null}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={activeIndex >= content.events.length - 1}
                onClick={() =>
                  setActiveIndex((current) =>
                    Math.min(current + 1, content.events.length - 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {content.events.map((event) => (
              <TimelineEventDetail key={event.id} event={event} active={false} />
            ))}
          </div>
        )}
        {content.closing_takeaway ? (
          <div className="rounded-[1.15rem] bg-rose-100/70 p-4 text-sm leading-6 text-rose-950">
            <span className="mr-2 font-semibold uppercase tracking-[0.18em] text-rose-700">
              Takeaway
            </span>
            {content.closing_takeaway}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
