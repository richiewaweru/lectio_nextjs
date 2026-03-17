import type { SectionContent } from "@/lib/types";
import {
  DiagramBlock,
  ExplanationBlock,
  GlossaryRail,
  HookHero,
  PitfallAlert,
  PracticeStack,
  ProcessSteps,
  WhatNextBridge
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function FigureFirstLayout({ section }: { section: SectionContent }) {
  return (
    <TemplateShell section={section} singleColumn>
      <HookHero content={section.hook} />
      {section.diagram ? <DiagramBlock content={section.diagram} /> : null}
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ExplanationBlock content={section.explanation} />
        {section.process ? (
          <ProcessSteps content={section.process} mode="step-reveal" />
        ) : null}
      </div>
      {section.glossary ? (
        <GlossaryRail content={section.glossary} mode="inline-strip" />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="accordion" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
