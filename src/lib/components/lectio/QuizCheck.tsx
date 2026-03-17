"use client";

import { useState } from "react";

import type { QuizContent } from "@/lib/types";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/lib/components/ui/radio-group";

export function QuizCheck({ content }: { content: QuizContent }) {
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const selectedOption = content.options[Number(selected)];
  const isCorrect = Boolean(selectedOption?.correct);

  return (
    <Card className="border-primary/10 bg-white/85">
      <CardHeader className="pb-3">
        <p className="eyebrow">Quiz</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Quick concept check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-foreground/84">{content.question}</p>
        <RadioGroup value={selected} onValueChange={setSelected}>
          {content.options.map((option, index) => (
            <label
              key={option.text}
              className="flex cursor-pointer items-start gap-3 rounded-[1rem] border border-border/70 bg-white/80 p-4"
            >
              <RadioGroupItem value={String(index)} className="mt-1" />
              <span className="space-y-2">
                <span className="block text-sm font-semibold text-foreground/88">
                  {option.text}
                </span>
                {submitted && content.show_explanations !== false ? (
                  <span className="block text-sm leading-6 text-muted-foreground">
                    {option.explanation}
                  </span>
                ) : null}
              </span>
            </label>
          ))}
        </RadioGroup>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setSubmitted(true)} disabled={!selected}>
            Check answer
          </Button>
          {submitted ? (
            <Button variant="outline" onClick={() => {
              setSelected("");
              setSubmitted(false);
            }}>
              Reset
            </Button>
          ) : null}
        </div>
        {submitted && selectedOption ? (
          <div
            className={`rounded-[1rem] p-4 text-sm leading-6 ${
              isCorrect
                ? "bg-emerald-50 text-emerald-900"
                : "bg-amber-50 text-amber-900"
            }`}
          >
            {isCorrect ? content.feedback_correct : content.feedback_incorrect}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
