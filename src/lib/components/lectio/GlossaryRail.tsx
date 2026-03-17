import type { GlossaryContent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function GlossaryRail({
  content,
  className
}: {
  content: GlossaryContent;
  className?: string;
}) {
  return (
    <Card className={cn("bg-primary text-primary-foreground", className)}>
      <CardHeader className="pb-3">
        <p className="eyebrow text-amber-300">Glossary</p>
        <CardTitle className="font-[var(--font-display)] text-2xl">
          Key terms nearby
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[18rem] pr-4 lg:h-[28rem]">
          <ul className="space-y-4">
            {content.terms.map((term) => (
              <li
                key={term.term}
                className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  {term.term}
                </p>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/82">
                  {term.definition}
                </p>
                {term.pronunciation ? (
                  <p className="mt-2 text-xs italic text-primary-foreground/62">
                    Pronunciation: {term.pronunciation}
                  </p>
                ) : null}
                {term.used_in ? (
                  <p className="mt-2 text-xs text-primary-foreground/62">
                    Used in: {term.used_in}
                  </p>
                ) : null}
                {term.related?.length ? (
                  <p className="mt-1 text-xs text-primary-foreground/62">
                    Related: {term.related.join(", ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
