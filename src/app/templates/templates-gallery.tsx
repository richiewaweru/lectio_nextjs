"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";

import type {
  InteractionLevel,
  LearnerFit,
  LessonIntent,
  TemplateContract,
  TemplateFamily
} from "@/lib/template-types";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

const familyLabels: Record<TemplateFamily, string> = {
  "guided-concept": "Guided Concept",
  "visual-exploration": "Visual Exploration",
  "compare-distinguish": "Compare and Distinguish",
  "narrative-timeline": "Narrative and Timeline",
  "process-procedure": "Process and Procedure",
  "focus-accommodation": "Focus and Accommodation"
};

const intentLabels: Record<LessonIntent, string> = {
  "introduce-concept": "New concept",
  "explain-visually": "Visual-first",
  "compare-ideas": "Comparison",
  "teach-sequence": "Narrative",
  "teach-procedure": "Procedure",
  "reduce-overload": "Support / SPED",
  "reinforce-learning": "Revision",
  "build-rigor": "Deep dive"
};

const learnerLabels: LearnerFit[] = [
  "general",
  "visual",
  "analytical",
  "narrative",
  "adhd-friendly",
  "dyslexia-sensitive",
  "scaffolded",
  "advanced"
];

const interactionLabels: InteractionLevel[] = ["none", "light", "medium", "high"];

function FilterRow<T extends string>({
  label,
  options,
  active,
  onToggle,
  renderLabel
}: {
  label: string;
  options: T[];
  active?: T;
  onToggle: (value: T) => void;
  renderLabel?: (value: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-primary">{label}</span>
      <Button
        variant={active === undefined ? "default" : "outline"}
        className="rounded-full"
        onClick={() => startTransition(() => onToggle("" as T))}
      >
        All
      </Button>
      {options.map((option) => (
        <Button
          key={option}
          variant={active === option ? "default" : "outline"}
          className="rounded-full"
          onClick={() => startTransition(() => onToggle(option))}
        >
          {renderLabel ? renderLabel(option) : option}
        </Button>
      ))}
    </div>
  );
}

export function TemplatesGallery({
  templates
}: {
  templates: TemplateContract[];
}) {
  const [family, setFamily] = useState<TemplateFamily | undefined>(undefined);
  const [intent, setIntent] = useState<LessonIntent | undefined>(undefined);
  const [learnerFit, setLearnerFit] = useState<LearnerFit | undefined>(undefined);
  const [interactionLevel, setInteractionLevel] = useState<InteractionLevel | undefined>(
    undefined
  );

  const deferredFilters = useDeferredValue({
    family,
    intent,
    learnerFit,
    interactionLevel
  });

  const filtered = templates.filter((template) => {
    if (deferredFilters.family && template.family !== deferredFilters.family) {
      return false;
    }

    if (deferredFilters.intent && template.intent !== deferredFilters.intent) {
      return false;
    }

    if (
      deferredFilters.learnerFit &&
      !template.learnerFit.includes(deferredFilters.learnerFit)
    ) {
      return false;
    }

    if (
      deferredFilters.interactionLevel &&
      template.interactionLevel !== deferredFilters.interactionLevel
    ) {
      return false;
    }

    return true;
  });

  const families = Object.keys(familyLabels) as TemplateFamily[];
  const visibleFamilies = families
    .map((familyKey) => ({
      family: familyKey,
      items: filtered.filter((template) => template.family === familyKey)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8">
      <div className="lesson-shell p-6 sm:p-8">
        <div className="relative z-10 space-y-5">
          <div className="space-y-3">
            <p className="eyebrow">Template gallery</p>
            <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
              Six teaching families. Filter to find your match.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Each template is a structural teaching strategy, not just a look. Filter by
              intent, learner fit, and interaction level to narrow the field.
            </p>
          </div>

          <div className="space-y-3">
            <FilterRow
              label="Intent"
              options={Object.keys(intentLabels) as LessonIntent[]}
              active={intent}
              onToggle={(value) => setIntent(value || undefined)}
              renderLabel={(value) => intentLabels[value]}
            />
            <FilterRow
              label="Learner"
              options={learnerLabels}
              active={learnerFit}
              onToggle={(value) => setLearnerFit(value || undefined)}
              renderLabel={(value) => value}
            />
            <FilterRow
              label="Interaction"
              options={interactionLabels}
              active={interactionLevel}
              onToggle={(value) => setInteractionLevel(value || undefined)}
              renderLabel={(value) => value}
            />
            <FilterRow
              label="Family"
              options={families}
              active={family}
              onToggle={(value) => setFamily(value || undefined)}
              renderLabel={(value) => familyLabels[value]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              Showing {filtered.length} templates
            </Badge>
            <span>across {visibleFamilies.length} families.</span>
            <span>All templates print cleanly regardless of interaction level.</span>
          </div>
        </div>
      </div>

      {visibleFamilies.length === 0 ? (
        <Card className="border-dashed bg-white/75">
          <CardContent className="p-8 text-center text-muted-foreground">
            No templates match these filters. Try broadening your selection.
          </CardContent>
        </Card>
      ) : null}

      {visibleFamilies.map((group) => (
        <section key={group.family} className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <p className="eyebrow">{familyLabels[group.family]}</p>
              <h2 className="font-[var(--font-display)] text-3xl text-primary">
                {group.items.length} template{group.items.length === 1 ? "" : "s"}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {group.items[0]?.whyThisTemplateExists}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((template) => (
              <Card key={template.id} className="border-white/60 bg-white/82">
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      {familyLabels[template.family]}
                    </Badge>
                    <Badge variant="outline">{template.interactionLevel}</Badge>
                    <Badge variant="outline">{template.readingStyle}</Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-7 text-muted-foreground">
                      {template.tagline}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.learnerFit.map((fit) => (
                      <Badge key={fit} variant="outline">
                        {fit}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.subjects.map((subject) => (
                      <Badge key={subject} className="bg-secondary text-secondary-foreground">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-dashed">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Flow: {template.lessonFlow.join(" -> ")}
                  </p>
                  <Button asChild className="w-full">
                    <Link href={`/templates/${template.id}`}>Use this template</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
