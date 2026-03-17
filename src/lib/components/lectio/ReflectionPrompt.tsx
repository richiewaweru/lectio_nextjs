import type { ReflectionContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

export function ReflectionPrompt({
  content
}: {
  content: ReflectionContent;
}) {
  const supportText =
    content.type === "sentence-stem"
      ? content.sentence_stem
      : content.type === "pair-share"
        ? content.pair_instruction
        : content.type === "timed" && content.time_minutes
          ? `${content.time_minutes} minute timer`
          : undefined;

  return (
    <Card className="border-rose-200 bg-rose-50/45">
      <CardHeader className="pb-3">
        <p className="eyebrow text-rose-700">Reflection</p>
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
            Pause and consolidate
          </CardTitle>
          <Badge variant="outline" className="border-rose-200 text-rose-700">
            {content.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7 text-foreground/84">{content.prompt}</p>
        {supportText ? (
          <div className="rounded-[1rem] bg-white/82 p-4 text-sm leading-6 text-muted-foreground">
            {supportText}
          </div>
        ) : null}
        {content.space ? (
          <div className="space-y-3 rounded-[1rem] border border-dashed border-border/80 bg-background/70 p-4">
            {Array.from({ length: content.space }).map((_, lineIndex) => (
              <div key={lineIndex} className="h-6 border-b border-border/70" />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
