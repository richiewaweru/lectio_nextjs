import type { SectionContent } from "@/lib/types";
import {
  DefinitionCard,
  ExplanationBlock,
  GlossaryInline,
  HookHero,
  PitfallAlert,
  PracticeStack,
  ReflectionPrompt,
  WhatNextBridge
} from "@/lib/components/lectio";
import { TemplateShell } from "@/lib/templates/shared";

export function FocusFlowLayout({ section }: { section: SectionContent }) {
  const inlineTerm = section.glossary?.terms[0];

  return (
    <TemplateShell section={section} singleColumn contentClassName="space-y-8">
      <HookHero content={section.hook} />
      <ExplanationBlock content={section.explanation} />
      {inlineTerm ? (
        <div className="rounded-[1.25rem] border border-border/70 bg-white/88 p-4 text-sm leading-7 text-foreground/84">
          Focus cue: if you forget the term{" "}
          <GlossaryInline term={inlineTerm.term} definition={inlineTerm.definition} />, open it
          in place and keep reading.
        </div>
      ) : null}
      {section.definition ? <DefinitionCard content={section.definition} /> : null}
      {section.pitfall ? <PitfallAlert content={section.pitfall} /> : null}
      <PracticeStack content={section.practice} mode="flat-list" />
      {section.reflection ? <ReflectionPrompt content={section.reflection} /> : null}
      <WhatNextBridge content={section.what_next} />
    </TemplateShell>
  );
}
