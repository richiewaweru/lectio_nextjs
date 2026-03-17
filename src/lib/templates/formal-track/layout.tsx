import type { SectionContent } from "@/lib/types";
import {
  DefinitionCard,
  ExplanationBlock,
  HookHero,
  PitfallAlert,
  PracticeStack,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function FormalTrackLayout({ section }: { section: SectionContent }) {
  return (
    <TemplateShell section={section} singleColumn>
      <HookHero content={section.hook} />
      <ExplanationBlock content={section.explanation} />
      {section.definition ? <DefinitionCard content={section.definition} /> : null}
      {section.worked_example ? (
        <WorkedExampleCard content={section.worked_example} mode="static" />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="flat-list" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
