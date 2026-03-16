"use client";

import { useState } from "react";

import type { PracticeContent } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/lib/components/ui/accordion";
import { Badge } from "@/lib/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/lib/components/ui/collapsible";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

const difficultyConfig = {
  warm: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  cold: "bg-sky-50 text-sky-700 border-sky-200"
} as const;

export function PracticeStack({ content }: { content: PracticeContent }) {
  const [revealedHints, setRevealedHints] = useState<Record<number, number>>({});

  function revealNextHint(problemIndex: number, totalHints: number) {
    setRevealedHints((current) => ({
      ...current,
      [problemIndex]: Math.min((current[problemIndex] ?? 0) + 1, totalHints)
    }));
  }

  return (
    <Card className="bg-white/85">
      <CardHeader className="pb-3">
        <p className="eyebrow">Practice</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Calibrated problems
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-3">
          {content.problems.map((problem, index) => {
            const effectiveHints =
              problem.hints?.length ? problem.hints : [problem.hint];
            const revealedHintCount = revealedHints[index] ?? 0;
            const visibleHints = effectiveHints.slice(0, revealedHintCount);
            const hasMoreHints = revealedHintCount < effectiveHints.length;

            return (
              <AccordionItem key={index} value={`problem-${index}`} className="bg-white/80">
                <AccordionTrigger>
                  <div className="flex items-start gap-3 pr-4">
                    <Badge variant="outline" className={difficultyConfig[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                    <span className="leading-7 text-foreground/88">
                      {problem.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-3">
                    {visibleHints.map((hint, hintIndex) => (
                      <div
                        key={`${problem.question}-hint-${hintIndex}`}
                        className="rounded-[1rem] bg-secondary/70 p-4 text-sm leading-6 text-muted-foreground"
                      >
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
                          Hint {hintIndex + 1} of {effectiveHints.length}
                        </p>
                        <p>{hint}</p>
                      </div>
                    ))}
                    {hasMoreHints ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-0"
                        onClick={() => revealNextHint(index, effectiveHints.length)}
                      >
                        {revealedHintCount === 0 ? "Show hint" : "Show next hint"}
                      </Button>
                    ) : null}
                  </div>

                  {problem.answer ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="px-0">
                          Show answer
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="rounded-[1rem] bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                        {problem.answer}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : null}

                  {problem.solution ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="px-0">
                          Show worked solution
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="rounded-[1rem] bg-sky-50 p-4 text-sm leading-6 text-sky-950">
                        {problem.solution}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : null}

                  {problem.writein_lines ? (
                    <div className="space-y-3 rounded-[1rem] border border-dashed border-border/80 bg-background/70 p-4">
                      {Array.from({ length: problem.writein_lines }).map((_, lineIndex) => (
                        <div key={lineIndex} className="h-6 border-b border-border/70" />
                      ))}
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
