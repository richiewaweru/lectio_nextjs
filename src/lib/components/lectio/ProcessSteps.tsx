"use client";

import { useState } from "react";

import type { ProcessContent } from "@/lib/types";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

type ProcessStepsMode = "static" | "step-reveal";

function ProcessStepCard({
  step
}: {
  step: ProcessContent["steps"][number];
}) {
  return (
    <div className="rounded-[1.25rem] border border-emerald-100 bg-white/82 p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
          {step.number}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {step.action}
          </p>
          <p className="text-base leading-7 text-foreground/84">{step.detail}</p>
          {(step.input || step.output) && (
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {step.input ? `Input: ${step.input}` : null}
              {step.input && step.output ? "  " : null}
              {step.output ? `Output: ${step.output}` : null}
            </p>
          )}
          {step.warning ? (
            <p className="text-sm italic leading-6 text-amber-800">
              Watch for: {step.warning}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProcessSteps({
  content,
  mode = "static"
}: {
  content: ProcessContent;
  mode?: ProcessStepsMode;
}) {
  const [visibleSteps, setVisibleSteps] = useState(
    mode === "step-reveal" ? Math.min(1, content.steps.length) : content.steps.length
  );
  const renderedSteps =
    mode === "step-reveal" ? content.steps.slice(0, visibleSteps) : content.steps;

  return (
    <Card className="border-emerald-200 bg-emerald-50/45">
      <CardHeader className="pb-3">
        <p className="eyebrow text-emerald-700">Process</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.title}
        </CardTitle>
        {content.intro ? (
          <p className="text-sm leading-6 text-muted-foreground">{content.intro}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {renderedSteps.map((step) => (
          <ProcessStepCard key={step.number} step={step} />
        ))}
        {mode === "step-reveal" && visibleSteps < content.steps.length ? (
          <Button variant="outline" onClick={() => setVisibleSteps((current) => current + 1)}>
            Show next step
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
