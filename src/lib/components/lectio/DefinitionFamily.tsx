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
    <Card className="overflow-hidden border-fuchsia-200 bg-[linear-gradient(180deg,rgba(253,244,255,0.9),rgba(255,255,255,0.92))] shadow-[0_20px_48px_rgba(192,38,211,0.1)]">
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
        <Accordion
          type="single"
          collapsible
          defaultValue="definition-0"
          className="space-y-3"
        >
          {content.definitions.map((definition, index) => (
            <AccordionItem
              key={definition.term}
              value={`definition-${index}`}
              className="overflow-hidden rounded-[1.55rem] border border-fuchsia-200/70 bg-white/84 shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
            >
              <AccordionTrigger className="px-5">
                <div className="flex flex-col items-start gap-1 text-left">
                  <span className="font-semibold text-foreground/92">
                    {definition.term}
                  </span>
                  {definition.symbol ? (
                    <span className="text-sm text-fuchsia-700/78">
                      {definition.symbol}
                    </span>
                  ) : null}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(253,244,255,0.72),rgba(255,255,255,0.95))] p-1">
                  <DefinitionCard content={definition} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
