import { calculusSection } from "@/lib/dummy-content";
import {
  DefinitionCard,
  ExplanationBlock,
  GlossaryRail,
  HookHero,
  PitfallAlert,
  PracticeStack,
  WhatNextBridge,
  WorkedExampleCard
} from "@/lib/components/lectio";
import { componentRegistry } from "@/lib/registry";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

const showcaseEntries = [
  {
    key: "HookHero",
    render: <HookHero content={calculusSection.hook} />
  },
  {
    key: "ExplanationBlock",
    render: <ExplanationBlock content={calculusSection.explanation} />
  },
  {
    key: "DefinitionCard",
    render: <DefinitionCard content={calculusSection.definition!} />
  },
  {
    key: "WorkedExampleCard",
    render: <WorkedExampleCard content={calculusSection.worked_example!} />
  },
  {
    key: "PracticeStack",
    render: <PracticeStack content={calculusSection.practice} />
  },
  {
    key: "PitfallAlert",
    render: <PitfallAlert content={calculusSection.pitfall!} />
  },
  {
    key: "GlossaryRail",
    render: <GlossaryRail content={calculusSection.glossary!} className="h-full" />
  },
  {
    key: "WhatNextBridge",
    render: <WhatNextBridge content={calculusSection.what_next} />
  }
];

export default function ShowcasePage() {
  return (
    <main className="page-frame">
      <div className="mb-8 space-y-3">
        <p className="eyebrow">Component showcase</p>
        <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
          Educational components as teaching moves
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Each component is previewed with calculus content and paired with the
          registry metadata that defines its instructional role.
        </p>
      </div>

      <div className="grid gap-6">
        {showcaseEntries.map((entry) => {
          const meta = componentRegistry[entry.key];

          return (
            <section
              key={entry.key}
              className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]"
            >
              <Card className="border-primary/10 bg-primary text-primary-foreground">
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
                      {meta.cognitiveJob}
                    </Badge>
                    <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
                      {meta.shadcnPrimitive}
                    </Badge>
                  </div>
                  <CardTitle className="font-[var(--font-display)] text-3xl">
                    {meta.name}
                  </CardTitle>
                  <CardDescription className="text-base leading-7 text-primary-foreground/75">
                    {meta.purpose}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-6 text-primary-foreground/88">
                  <div>
                    <p className="font-semibold">Behavior modes</p>
                    <p>{meta.behaviourModes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Print fallback</p>
                    <p>{meta.printFallback}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Capacity</p>
                    <ul className="space-y-1">
                      {Object.entries(meta.capacity).map(([label, value]) => (
                        <li key={label}>
                          {label}: {String(value)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <div className="lesson-shell p-5 sm:p-7">{entry.render}</div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
