import type { SimulationContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

export function SimulationBlock({
  content
}: {
  content: SimulationContent;
}) {
  return (
    <Card className="border-primary/10 bg-white/88">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">Simulation</p>
          <Badge variant="outline">Scaffold</Badge>
        </div>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          Manipulate and discover
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {content.explanation ? (
          <p className="text-base leading-7 text-foreground/84">
            {content.explanation}
          </p>
        ) : null}
        <div
          className="flex items-center justify-center rounded-[1.25rem] border border-dashed border-border/80 bg-secondary/35 p-6 text-center text-sm leading-6 text-muted-foreground"
          style={{ minHeight: `${content.spec.dimensions.height}px` }}
        >
          Interactive experience will mount here when the interaction pipeline is connected.
        </div>
        <div className="grid gap-3 rounded-[1.25rem] bg-white/82 p-4 text-sm leading-6 text-foreground/82 md:grid-cols-2">
          <div>
            <p className="font-semibold text-primary">Type</p>
            <p>{content.spec.type}</p>
          </div>
          <div>
            <p className="font-semibold text-primary">Goal</p>
            <p>{content.spec.goal}</p>
          </div>
          <div>
            <p className="font-semibold text-primary">Dimensions</p>
            <p>
              {content.spec.dimensions.width} by {content.spec.dimensions.height}px
            </p>
          </div>
          <div>
            <p className="font-semibold text-primary">Print fallback</p>
            <p>{content.spec.print_translation}</p>
          </div>
        </div>
        {content.fallback_diagram ? (
          <div className="space-y-3 rounded-[1.25rem] border border-border/70 bg-background/75 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Fallback diagram
            </p>
            <div
              aria-label={content.fallback_diagram.alt_text}
              className="overflow-hidden rounded-[1rem] border border-border/70 bg-white [&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{
                __html: content.fallback_diagram.svg_content
              }}
            />
            <p className="text-sm leading-6 text-muted-foreground">
              {content.fallback_diagram.caption}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
