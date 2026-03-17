import type { CSSProperties } from "react";

import type { ComparisonGridContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";
import { cn } from "@/lib/utils";

export function ComparisonGrid({ content }: { content: ComparisonGridContent }) {
  const gridStyle = {
    gridTemplateColumns: `minmax(9rem, 1.1fr) repeat(${content.columns.length}, minmax(10rem, 1fr))`
  } satisfies CSSProperties;

  return (
    <Card className="border-cyan-200 bg-cyan-50/45">
      <CardHeader className="pb-3">
        <p className="eyebrow text-cyan-700">Comparison</p>
        <CardTitle className="font-[var(--font-display)] text-2xl text-primary">
          {content.title}
        </CardTitle>
        {content.intro ? (
          <p className="text-sm leading-6 text-muted-foreground">{content.intro}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          {content.columns.map((column) => (
            <div
              key={column.id}
              className={cn(
                "rounded-[1.25rem] border bg-white/82 p-4",
                column.highlight
                  ? "border-cyan-300 shadow-[0_12px_30px_rgba(8,145,178,0.12)]"
                  : "border-cyan-100"
              )}
            >
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  {column.title}
                </p>
                {column.badge ? (
                  <Badge variant="outline" className="border-cyan-200 text-cyan-700">
                    {column.badge}
                  </Badge>
                ) : null}
              </div>
              <p className="mt-3 text-base leading-7 text-foreground/84">
                {column.summary}
              </p>
              {column.detail ? (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {column.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-[1.25rem] border border-cyan-100 bg-white/88">
          <div className="min-w-[48rem]">
            <div
              className="grid items-stretch border-b border-cyan-100 bg-cyan-50/80"
              style={gridStyle}
            >
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Criterion
              </div>
              {content.columns.map((column) => (
                <div
                  key={`head-${column.id}`}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700"
                >
                  {column.title}
                </div>
              ))}
            </div>
            {content.rows.map((row) => (
              <div
                key={row.criterion}
                className="grid border-t border-cyan-100 first:border-t-0"
                style={gridStyle}
              >
                <div className="px-4 py-4 text-sm font-semibold text-primary">
                  {row.criterion}
                  {row.takeaway ? (
                    <p className="mt-1 text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground">
                      {row.takeaway}
                    </p>
                  ) : null}
                </div>
                {row.values.map((value, index) => (
                  <div
                    key={`${row.criterion}-${index}`}
                    className="px-4 py-4 text-sm leading-6 text-foreground/82"
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {content.apply_prompt ? (
          <div className="rounded-[1.15rem] bg-cyan-100/70 p-4 text-sm leading-6 text-cyan-950">
            <span className="mr-2 font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Apply it
            </span>
            {content.apply_prompt}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
