import type { ReactNode } from "react";

import { calculusExtendedSection } from "@/lib/dummy-content";
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
import { getStableComponents } from "@/lib/registry";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

const glossaryInlineTerm = calculusExtendedSection.glossary?.terms[0];

const showcaseRenderers: Record<string, ReactNode> = {
  SectionHeader: <SectionHeader content={calculusExtendedSection.header!} />,
  HookHero: <HookHero content={calculusExtendedSection.hook} />,
  ExplanationBlock: <ExplanationBlock content={calculusExtendedSection.explanation} />,
  PrerequisiteStrip: <PrerequisiteStrip content={calculusExtendedSection.prerequisites!} />,
  WhatNextBridge: <WhatNextBridge content={calculusExtendedSection.what_next} />,
  InterviewAnchor: <InterviewAnchor content={calculusExtendedSection.interview!} />,
  DefinitionCard: <DefinitionCard content={calculusExtendedSection.definition!} />,
  DefinitionFamily: <DefinitionFamily content={calculusExtendedSection.definition_family!} />,
  GlossaryRail: <GlossaryRail content={calculusExtendedSection.glossary!} className="h-full" />,
  GlossaryInline: glossaryInlineTerm ? (
    <p className="text-base leading-8 text-foreground/84">
      Inline preview:{" "}
      <GlossaryInline
        term={glossaryInlineTerm.term}
        definition={glossaryInlineTerm.definition}
      />{" "}
      keeps the definition nearby while the sentence continues.
    </p>
  ) : null,
  InsightStrip: <InsightStrip content={calculusExtendedSection.insight_strip!} />,
  WorkedExampleCard: <WorkedExampleCard content={calculusExtendedSection.worked_example!} />,
  ProcessSteps: <ProcessSteps content={calculusExtendedSection.process!} />,
  PracticeStack: <PracticeStack content={calculusExtendedSection.practice} />,
  QuizCheck: <QuizCheck content={calculusExtendedSection.quiz!} />,
  ReflectionPrompt: <ReflectionPrompt content={calculusExtendedSection.reflection!} />,
  PitfallAlert: <PitfallAlert content={calculusExtendedSection.pitfall!} />,
  DiagramBlock: <DiagramBlock content={calculusExtendedSection.diagram!} />,
  DiagramCompare: <DiagramCompare content={calculusExtendedSection.diagram_compare!} />,
  DiagramSeries: <DiagramSeries content={calculusExtendedSection.diagram_series!} />,
  SimulationBlock: <SimulationBlock content={calculusExtendedSection.simulation!} />
};

export default function ShowcasePage() {
  const components = getStableComponents();

  return (
    <main className="page-frame">
      <div className="mb-8 space-y-3">
        <p className="eyebrow">Component showcase</p>
        <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
          Educational components as teaching moves
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Each preview is driven by the shared registry metadata and rendered
          with the richer calculus lesson that exercises the complete-build
          surface area.
        </p>
      </div>

      <div className="grid gap-6">
        {components.map((component) => {
          const render = showcaseRenderers[component.name];

          if (!render) {
            return null;
          }

          return (
            <section
              key={component.name}
              className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <Card className="border-primary/10 bg-primary text-primary-foreground">
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
                      Group {component.group}
                    </Badge>
                    <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
                      {component.status}
                    </Badge>
                    <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
                      {component.cognitiveJob}
                    </Badge>
                  </div>
                  <CardTitle className="font-[var(--font-display)] text-3xl">
                    {component.name}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-primary-foreground/75">
                    {component.purpose}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-6 text-primary-foreground/88">
                  <div>
                    <p className="font-semibold">Behavior modes</p>
                    <p>{component.behaviourModes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Primitive</p>
                    <p>{component.shadcnPrimitive}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Print fallback</p>
                    <p>{component.printFallback}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Capacity</p>
                    <ul className="space-y-1">
                      {Object.entries(component.capacity).map(([label, value]) => (
                        <li key={label}>
                          {label}: {String(value)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <div className="lesson-shell p-5 sm:p-7">{render}</div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
