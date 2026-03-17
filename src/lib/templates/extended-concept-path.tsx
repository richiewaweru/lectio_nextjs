import { AlertCircle } from "lucide-react";

import type { SectionContent } from "@/lib/types";
import {
  getPitfallList,
  getSectionHeaderContent,
  getWorkedExamples
} from "@/lib/types";
import {
  DefinitionCard,
  DefinitionFamily,
  DiagramBlock,
  DiagramCompare,
  DiagramSeries,
  ExplanationBlock,
  GlossaryInline,
  GlossaryRail,
  HookHero,
  InsightStrip,
  InterviewAnchor,
  PitfallAlert,
  PracticeStack,
  PrerequisiteStrip,
  ProcessSteps,
  QuizCheck,
  ReflectionPrompt,
  SectionHeader,
  SimulationBlock,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { Card, CardContent } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import { validateSection } from "@/lib/validate";

export function ExtendedConceptPathTemplate({
  section
}: {
  section: SectionContent;
}) {
  const warnings = validateSection(section);
  const header = getSectionHeaderContent(section);
  const workedExamples = getWorkedExamples(section);
  const pitfalls = getPitfallList(section);
  const inlineTerm = section.glossary?.terms[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="lesson-shell p-6 sm:p-8">
        <div className="relative z-10 space-y-6">
          <SectionHeader content={header} />

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
          {section.prerequisites ? (
            <>
              <Separator />
              <PrerequisiteStrip content={section.prerequisites} />
            </>
          ) : null}
          <Separator />
          <ExplanationBlock content={section.explanation} />
          {inlineTerm ? (
            <p className="text-sm leading-6 text-muted-foreground">
              Inline term preview: <GlossaryInline term={inlineTerm.term} definition={inlineTerm.definition} /> can sit inside narrative text without pulling the learner away from the main explanation.
            </p>
          ) : null}
          {section.insight_strip ? (
            <>
              <Separator />
              <InsightStrip content={section.insight_strip} />
            </>
          ) : null}
          {section.definition ? (
            <>
              <Separator />
              <DefinitionCard content={section.definition} />
            </>
          ) : null}
          {section.definition_family ? (
            <>
              <Separator />
              <DefinitionFamily content={section.definition_family} />
            </>
          ) : null}
          {workedExamples.length ? (
            <>
              <Separator />
              <div className="space-y-5">
                {workedExamples.map((example, index) => (
                  <WorkedExampleCard
                    key={`${example.title}-${index}`}
                    content={example}
                    mode={index === 0 ? "step-reveal" : "accordion"}
                  />
                ))}
              </div>
            </>
          ) : null}
          {section.process ? (
            <>
              <Separator />
              <ProcessSteps content={section.process} />
            </>
          ) : null}
          {section.diagram ? (
            <>
              <Separator />
              <DiagramBlock content={section.diagram} />
            </>
          ) : null}
          {section.diagram_compare ? (
            <>
              <Separator />
              <DiagramCompare content={section.diagram_compare} />
            </>
          ) : null}
          {section.diagram_series ? (
            <>
              <Separator />
              <DiagramSeries content={section.diagram_series} />
            </>
          ) : null}
          {pitfalls.length ? (
            <>
              <Separator />
              <div className="space-y-4">
                {pitfalls.map((pitfall, index) => (
                  <PitfallAlert
                    key={`${pitfall.misconception}-${index}`}
                    content={pitfall}
                  />
                ))}
              </div>
            </>
          ) : null}
          {section.quiz ? (
            <>
              <Separator />
              <QuizCheck content={section.quiz} />
            </>
          ) : null}
          <Separator />
          <PracticeStack content={section.practice} />
          {section.reflection ? (
            <>
              <Separator />
              <ReflectionPrompt content={section.reflection} />
            </>
          ) : null}
          {section.simulation ? (
            <>
              <Separator />
              <SimulationBlock content={section.simulation} />
            </>
          ) : null}
          {section.interview ? (
            <>
              <Separator />
              <InterviewAnchor content={section.interview} />
            </>
          ) : null}
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
