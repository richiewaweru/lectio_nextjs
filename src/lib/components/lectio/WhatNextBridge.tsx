import { ArrowRight } from "lucide-react";

import type { WhatNextContent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

export function WhatNextBridge({ content }: { content: WhatNextContent }) {
  return (
    <Card className="border-l-4 border-l-amber-500 bg-amber-50/65">
      <CardHeader className="pb-3">
        <p className="eyebrow text-amber-700">What next</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Bridge forward
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-foreground/82">{content.body}</p>
        {content.prerequisites?.length ? (
          <div className="rounded-[1rem] bg-white/70 p-3 text-sm leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground/75">
              Prerequisites:
            </span>{" "}
            {content.prerequisites.join(", ")}
          </div>
        ) : null}
        {content.preview ? (
          <div className="rounded-[1rem] bg-white/80 p-3 text-sm leading-6 text-amber-950/82">
            Preview: {content.preview}
          </div>
        ) : null}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
          {content.next}
          <ArrowRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
