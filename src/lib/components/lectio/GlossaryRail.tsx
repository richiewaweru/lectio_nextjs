"use client";

import type { GlossaryContent } from "@/lib/types";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/lib/components/ui/collapsible";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type GlossaryRailMode = "sticky" | "drawer" | "inline-strip";

function GlossaryTerms({ content }: { content: GlossaryContent }) {
  return (
    <ul className="space-y-4">
      {content.terms.map((term) => (
        <li
          key={term.term}
          className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
            {term.term}
          </p>
          <p className="mt-2 text-sm leading-6 text-primary-foreground/82">
            {term.definition}
          </p>
          {term.pronunciation ? (
            <p className="mt-2 text-xs italic text-primary-foreground/62">
              Pronunciation: {term.pronunciation}
            </p>
          ) : null}
          {term.used_in ? (
            <p className="mt-2 text-xs text-primary-foreground/62">
              Used in: {term.used_in}
            </p>
          ) : null}
          {term.related?.length ? (
            <p className="mt-1 text-xs text-primary-foreground/62">
              Related: {term.related.join(", ")}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function GlossaryRail({
  content,
  className,
  mode = "sticky"
}: {
  content: GlossaryContent;
  className?: string;
  mode?: GlossaryRailMode;
}) {
  if (mode === "inline-strip") {
    return (
      <Card className={cn("bg-primary text-primary-foreground", className)}>
        <CardHeader className="pb-3">
          <p className="eyebrow text-amber-300">Glossary strip</p>
          <CardTitle className="font-[var(--font-display)] text-2xl">
            Key terms in-line
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {content.terms.map((term) => (
            <div
              key={term.term}
              className="min-w-[11rem] rounded-[1.1rem] border border-white/10 bg-white/8 px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                {term.term}
              </p>
              <p className="mt-1 text-sm leading-6 text-primary-foreground/82">
                {term.definition}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (mode === "drawer") {
    return (
      <Card className={cn("bg-primary text-primary-foreground", className)}>
        <CardHeader className="pb-3">
          <p className="eyebrow text-amber-300">Glossary drawer</p>
          <CardTitle className="font-[var(--font-display)] text-2xl">
            Open the key terms when needed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="secondary"
                className="mb-4 bg-white/12 text-primary-foreground hover:bg-white/18"
              >
                Show key terms
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ScrollArea className="h-[18rem] pr-4">
                <GlossaryTerms content={content} />
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-primary text-primary-foreground", className)}>
      <CardHeader className="pb-3">
        <p className="eyebrow text-amber-300">Glossary</p>
        <CardTitle className="font-[var(--font-display)] text-2xl">
          Key terms nearby
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[18rem] pr-4 lg:h-[28rem]">
          <GlossaryTerms content={content} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
