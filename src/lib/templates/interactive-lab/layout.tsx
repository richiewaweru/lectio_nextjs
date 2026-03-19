import type { SectionContent } from "@/lib/types";
import {
  DefinitionCard,
  ExplanationBlock,
  HookHero,
  PitfallAlert,
  PracticeStack,
  SimulationBlock,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function InteractiveLabLayout({
  section
}: {
  section: SectionContent;
}) {
  return (
    <TemplateShell section={section} singleColumn>
      <HookHero content={section.hook} />
      {section.simulation ? (
        <SimulationBlock content={section.simulation} />
      ) : null}
      <ExplanationBlock content={section.explanation} />
      {section.definition ? (
        <DefinitionCard content={section.definition} />
      ) : null}
      {section.worked_example ? (
        <WorkedExampleCard content={section.worked_example} />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="accordion" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
