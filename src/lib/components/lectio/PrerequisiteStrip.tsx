"use client";

import type { PrerequisiteContent } from "@/lib/types";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/lib/components/ui/popover";

export function PrerequisiteStrip({
  content
}: {
  content: PrerequisiteContent;
}) {
  return (
    <Card className="border-sky-100 bg-sky-50/65">
      <CardHeader className="pb-3">
        <p className="eyebrow text-sky-700">Prerequisites</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.label ?? "Before we begin"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {content.items.map((item) =>
            item.refresher ? (
              <Popover key={item.concept}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Show refresher for ${item.concept}`}
                  >
                    {item.concept}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm leading-6 text-foreground/82">
                  {item.refresher}
                </PopoverContent>
              </Popover>
            ) : (
              <span
                key={item.concept}
                className="inline-flex items-center rounded-full border border-sky-200 bg-white/85 px-3 py-1 text-sm font-medium text-sky-800"
              >
                {item.concept}
              </span>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
