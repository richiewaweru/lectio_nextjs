"use client";

import { TriangleAlert } from "lucide-react";

import type { PitfallContent } from "@/lib/types";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/lib/components/ui/alert";
import { Button } from "@/lib/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/lib/components/ui/collapsible";

export function PitfallAlert({ content }: { content: PitfallContent }) {
  const displayExamples = content.examples ?? (content.example ? [content.example] : []);

  return (
    <Alert className="border-amber-300 bg-amber-50/92">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full bg-amber-100 p-2 text-amber-700">
          <TriangleAlert className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <AlertTitle className="text-amber-900">
            Common pitfall: {content.misconception}
          </AlertTitle>
          {content.why ? (
            <p className="mt-2 text-sm italic leading-6 text-amber-900/75">
              Why students think this: {content.why}
            </p>
          ) : null}
          <AlertDescription className="mt-2 text-amber-950/80">
            {content.correction}
          </AlertDescription>
          {displayExamples.length ? (
            <Collapsible className="mt-3">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-amber-800 hover:bg-transparent"
                >
                  {displayExamples.length > 1 ? "See examples" : "See example"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 rounded-[1rem] bg-white/80 p-4 text-sm leading-6 text-amber-950/75">
                <ul className="space-y-2">
                  {displayExamples.map((example) => (
                    <li key={example} className="list-none">
                      {example}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ) : null}
        </div>
      </div>
    </Alert>
  );
}
