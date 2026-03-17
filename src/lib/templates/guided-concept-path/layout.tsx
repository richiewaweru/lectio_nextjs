import type { SectionContent } from "@/lib/types";
import {
  DefinitionCard,
  DiagramBlock,
  ExplanationBlock,
  GlossaryRail,
  HookHero,
  PitfallAlert,
  PracticeStack,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function GuidedConceptPathLayout({
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
      {section.definition ? <DefinitionCard content={section.definition} /> : null}
      {section.diagram ? <DiagramBlock content={section.diagram} /> : null}
      {section.worked_example ? (
        <WorkedExampleCard content={section.worked_example} mode="step-reveal" />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="accordion" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
