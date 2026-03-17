"use client";

import type { DefinitionFamilyContent } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/lib/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { DefinitionCard } from "@/lib/components/lectio/DefinitionCard";

export function DefinitionFamily({
  content
}: {
  content: DefinitionFamilyContent;
}) {
  return (
    <Card className="border-fuchsia-200 bg-fuchsia-50/55">
      <CardHeader className="pb-3">
        <p className="eyebrow text-fuchsia-600">Definition family</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.family_title}
        </CardTitle>
        {content.family_intro ? (
          <p className="text-sm leading-6 text-muted-foreground">
            {content.family_intro}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-3">
          {content.definitions.map((definition, index) => (
            <AccordionItem key={definition.term} value={`definition-${index}`} className="bg-white/80">
              <AccordionTrigger>{definition.term}</AccordionTrigger>
              <AccordionContent>
                <DefinitionCard content={definition} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
