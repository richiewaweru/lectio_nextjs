import type { SectionContent } from "@/lib/types";
import {
  ExplanationBlock,
  HookHero,
  PitfallAlert,
  PracticeStack,
  ReflectionPrompt,
  TimelineBlock,
  WhatNextBridge
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function TimelineNarrativeLayout({
  section
}: {
  section: SectionContent;
}) {
  return (
    <TemplateShell section={section} singleColumn>
      <HookHero content={section.hook} />
      {section.timeline ? (
        <TimelineBlock content={section.timeline} mode="timeline-scrubber" />
      ) : null}
      <ExplanationBlock content={section.explanation} />
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      {section.reflection ? <ReflectionPrompt content={section.reflection} /> : null}
      <PracticeStack content={section.practice} mode="accordion" />
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
