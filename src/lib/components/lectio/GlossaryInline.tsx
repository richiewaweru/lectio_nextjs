"use client";

import type { GlossaryInlineProps } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/lib/components/ui/popover";

export function GlossaryInline({ term, definition }: GlossaryInlineProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Definition of ${term}`}
          className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-900 underline decoration-dotted underline-offset-4"
        >
          {term}
        </button>
      </PopoverTrigger>
      <PopoverContent className="text-sm leading-6 text-foreground/82">
        {definition}
      </PopoverContent>
    </Popover>
  );
}
