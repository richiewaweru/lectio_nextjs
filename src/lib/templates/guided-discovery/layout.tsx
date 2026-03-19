import type { SectionContent } from "@/lib/types";
import {
  DefinitionCard,
  DiagramBlock,
  ExplanationBlock,
  GlossaryRail,
  HookHero,
  PitfallAlert,
  PracticeStack,
  ReflectionPrompt,
  SimulationBlock,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function GuidedDiscoveryLayout({
  section
}: {
  section: SectionContent;
}) {
  return (
    <TemplateShell
      section={section}
      sidebar={
        section.glossary ? (
          <GlossaryRail content={section.glossary} mode="sticky" />
        ) : undefined
      }
    >
      <HookHero content={section.hook} />
      <ExplanationBlock content={section.explanation} />
      {section.definition ? (
        <DefinitionCard content={section.definition} />
      ) : null}
      {section.diagram ? <DiagramBlock content={section.diagram} /> : null}
      {section.simulation ? (
        <SimulationBlock content={section.simulation} />
      ) : null}
      {section.worked_example ? (
        <WorkedExampleCard content={section.worked_example} />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="accordion" />
      {section.reflection ? (
        <ReflectionPrompt content={section.reflection} />
      ) : null}
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
