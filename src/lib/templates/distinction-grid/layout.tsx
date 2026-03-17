import type { SectionContent } from "@/lib/types";
import {
  ComparisonGrid,
  DefinitionFamily,
  ExplanationBlock,
  HookHero,
  InsightStrip,
  PitfallAlert,
  PracticeStack,
  WhatNextBridge
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function DistinctionGridLayout({
  section
}: {
  section: SectionContent;
}) {
  return (
    <TemplateShell section={section} singleColumn>
      <HookHero content={section.hook} />
      <ExplanationBlock content={section.explanation} />
      {section.definition_family ? (
        <DefinitionFamily content={section.definition_family} />
      ) : null}
      {section.insight_strip ? <InsightStrip content={section.insight_strip} /> : null}
      {section.comparison_grid ? (
        <ComparisonGrid content={section.comparison_grid} />
      ) : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="flat-list" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
