import { AlertCircle } from "lucide-react";

import type { SectionContent } from "@/lib/types";
import {
  DefinitionCard,
  ExplanationBlock,
  GlossaryRail,
  HookHero,
  PitfallAlert,
  PracticeStack,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { Badge } from "@/lib/components/ui/badge";
import { Card, CardContent } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import { validateSection } from "@/lib/validate";

export function GuidedConceptPathTemplate({
  section
}: {
  section: SectionContent;
}) {
  const warnings = validateSection(section);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="lesson-shell p-6 sm:p-8">
        <div className="relative z-10 space-y-6">
          <header className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{section.subject}</Badge>
              <Badge variant="outline">{section.grade_band}</Badge>
              <Badge variant="outline">{section.template_id}</Badge>
            </div>
            <div className="space-y-2">
              <h2 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
                {section.title}
              </h2>
              {section.subtitle ? (
                <p className="text-lg leading-7 text-muted-foreground">
                  {section.subtitle}
                </p>
              ) : null}
            </div>
          </header>

          {warnings.length > 0 ? (
            <Card className="border-amber-300 bg-amber-50/90">
              <CardContent className="flex gap-3 p-4">
                <AlertCircle className="mt-1 h-5 w-5 text-amber-700" />
                <div>
                  <p className="font-semibold text-amber-900">
                    Schema capacity warnings
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-amber-950/80">
                    {warnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : null}

          <HookHero content={section.hook} />
          <Separator />
          <ExplanationBlock content={section.explanation} />
          {section.definition ? (
            <>
              <Separator />
              <DefinitionCard content={section.definition} />
            </>
          ) : null}
          {section.worked_example ? (
            <>
              <Separator />
              <WorkedExampleCard content={section.worked_example} />
            </>
          ) : null}
          {section.pitfall ? (
            <>
              <Separator />
              <PitfallAlert content={section.pitfall} />
            </>
          ) : null}
          <Separator />
          <PracticeStack content={section.practice} />
          <Separator />
          <WhatNextBridge content={section.what_next} />
        </div>
      </div>

      {section.glossary ? (
        <div className="xl:sticky xl:top-8 xl:self-start">
          <GlossaryRail content={section.glossary} />
        </div>
      ) : null}
    </div>
  );
}
