import type { SectionContent } from "@/lib/types";
import {
  ExplanationBlock,
  HookHero,
  PitfallAlert,
  PracticeStack,
  ProcessSteps,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function ProcessTrainerLayout({ section }: { section: SectionContent }) {
  return (
    <TemplateShell section={section} singleColumn>
      <HookHero content={section.hook} />
      {section.process ? (
        <ProcessSteps content={section.process} mode="step-reveal" />
      ) : null}
      <ExplanationBlock content={section.explanation} />
      {section.worked_example ? (
        <WorkedExampleCard content={section.worked_example} mode="static" />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="flat-list" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
