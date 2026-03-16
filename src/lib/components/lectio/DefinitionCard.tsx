"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import type { DefinitionContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

export function DefinitionCard({ content }: { content: DefinitionContent }) {
  const [showFormal, setShowFormal] = useState(false);

  return (
    <Card className="border-l-4 border-l-fuchsia-500 bg-fuchsia-50/65">
      <CardHeader className="pb-3">
        <p className="eyebrow text-fuchsia-600">Define</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.term}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-foreground/85">
          {showFormal ? content.formal : content.plain}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFormal((current) => !current)}
          className="px-0 text-fuchsia-700 hover:bg-transparent hover:text-fuchsia-800"
        >
          {showFormal ? "Show plain language" : "Show formal definition"}
          <ChevronRight
            className={`h-4 w-4 transition-transform ${showFormal ? "rotate-90" : ""}`}
          />
        </Button>
        {content.etymology ? (
          <p className="text-sm italic text-muted-foreground">
            Etymology: {content.etymology}
          </p>
        ) : null}
        {content.examples?.length ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-700/80">
              Usage examples
            </p>
            <ul className="space-y-1">
              {content.examples.map((example) => {
                const cleanedExample = example.replace(/^"|"$/g, "");

                return (
                  <li key={example} className="text-sm italic text-muted-foreground">
                    &ldquo;{cleanedExample}&rdquo;
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        {content.related_terms?.length ? (
          <div className="flex flex-wrap gap-2">
            {content.related_terms.map((term) => (
              <Badge
                key={term}
                variant="outline"
                className="border-fuchsia-200 bg-white/80 text-fuchsia-700"
              >
                {term}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
