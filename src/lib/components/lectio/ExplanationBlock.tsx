import type { ReactNode } from "react";
import { BookOpen, Info, Lightbulb } from "lucide-react";

import type { ExplanationContent } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { cn } from "@/lib/utils";

function highlightText(text: string, phrases: string[]) {
  if (phrases.length === 0) {
    return text;
  }

  const sortedPhrases = [...phrases].sort((left, right) => right.length - left.length);
  const expression = new RegExp(
    `(${sortedPhrases
      .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi"
  );
  const fragments = text.split(expression);

  return fragments.map((fragment, index): ReactNode => {
    const emphasized = sortedPhrases.some(
      (phrase) => phrase.toLowerCase() === fragment.toLowerCase()
    );

    if (!emphasized) {
      return <span key={`${fragment}-${index}`}>{fragment}</span>;
    }

    return (
      <strong
        key={`${fragment}-${index}`}
        className="rounded-sm bg-accent/12 px-1 text-primary"
      >
        {fragment}
      </strong>
    );
  });
}

export function ExplanationBlock({ content }: { content: ExplanationContent }) {
  const calloutConfig = {
    remember: {
      icon: BookOpen,
      className: "border border-sky-100 bg-sky-50 text-sky-900",
      iconClassName: "bg-sky-100 text-sky-700"
    },
    insight: {
      icon: Lightbulb,
      className: "border border-violet-100 bg-violet-50 text-violet-950",
      iconClassName: "bg-violet-100 text-violet-700"
    },
    sidenote: {
      icon: Info,
      className: "border border-slate-200 bg-slate-50 text-slate-900",
      iconClassName: "bg-slate-200 text-slate-700"
    }
  } as const;

  return (
    <Card className="border-l-4 border-l-sky-500 bg-white/85">
      <CardHeader className="pb-3">
        <p className="eyebrow">Explain</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Build the mental model
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-base leading-8 text-foreground/82">
          {highlightText(content.body, content.emphasis)}
        </div>
        {content.callouts?.length ? (
          <div className="grid gap-3">
            {content.callouts.map((callout) => {
              const config = calloutConfig[callout.type];
              const Icon = config.icon;

              return (
                <div
                  key={`${callout.type}-${callout.text}`}
                  className={cn("flex gap-3 rounded-[1.25rem] p-4", config.className)}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      config.iconClassName
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6">{callout.text}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
