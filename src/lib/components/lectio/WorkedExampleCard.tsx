"use client";

import { useMemo, useState } from "react";

import type { WorkedExampleContent } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/lib/components/ui/accordion";
import { Button } from "@/lib/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/lib/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { cn } from "@/lib/utils";

type WorkedExampleMode = "static" | "step-reveal" | "accordion";

export function WorkedExampleCard({
  content,
  mode = "step-reveal"
}: {
  content: WorkedExampleContent;
  mode?: WorkedExampleMode;
}) {
  const [revealedSteps, setRevealedSteps] = useState(
    mode === "static" ? content.steps.length : 1
  );
  const visibleSteps = useMemo(
    () => content.steps.slice(0, revealedSteps),
    [content.steps, revealedSteps]
  );
  const isComplete = mode !== "step-reveal" || revealedSteps >= content.steps.length;

  return (
    <Card className="border-l-4 border-l-violet-500 bg-violet-50/45">
      <CardHeader className="pb-3">
        <p className="eyebrow text-violet-600">Example</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.title}
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">{content.setup}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        {mode === "accordion" ? (
          <Accordion type="single" collapsible className="space-y-3">
            {content.steps.map((step, index) => (
              <AccordionItem key={step.label} value={`step-${index}`} className="bg-white/70">
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {index + 1}
                    </span>
                    {step.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 text-foreground/85">{step.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="space-y-4">
            {visibleSteps.map((step, index) => (
              <div key={step.label} className="flex gap-4">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                    "bg-violet-100 text-violet-700"
                  )}
                >
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
                    {step.label}
                  </p>
                  <p className="text-base leading-7 text-foreground/85">
                    {step.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {mode === "step-reveal" && revealedSteps < content.steps.length ? (
          <Button variant="outline" onClick={() => setRevealedSteps((current) => current + 1)}>
            Show next step
          </Button>
        ) : null}

        <div className="rounded-[1.25rem] bg-white/85 p-4 text-sm font-semibold leading-7 text-primary">
          {content.conclusion}
        </div>
        {isComplete && content.answer ? (
          <div className="rounded-[1.25rem] bg-violet-100 p-4 text-sm leading-7 text-violet-950">
            <span className="mr-2 font-semibold uppercase tracking-[0.18em] text-violet-700">
              Answer:
            </span>
            {content.answer}
          </div>
        ) : null}
        {isComplete && content.alternatives?.length ? (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="px-0 text-violet-700 hover:bg-transparent hover:text-violet-800"
              >
                Other approaches
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="rounded-[1.25rem] bg-white/80 p-4 text-sm leading-6 text-foreground/82">
              <ul className="list-disc space-y-2 pl-5">
                {content.alternatives.map((alternative) => (
                  <li key={alternative}>{alternative}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ) : null}
      </CardContent>
    </Card>
  );
}
