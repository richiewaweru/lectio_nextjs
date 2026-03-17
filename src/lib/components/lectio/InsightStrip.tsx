import type { InsightStripContent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function InsightStrip({ content }: { content: InsightStripContent }) {
  return (
    <section className="space-y-3">
      {content.cells.map((cell, index) => (
        <div
          key={cell.label}
          className={cn(
            "rounded-[1.35rem] border p-5 shadow-sm transition-colors",
            cell.highlight
              ? "border-violet-200 bg-violet-50 text-violet-950"
              : "border-border/70 bg-white/82 text-foreground"
          )}
        >
          <div className="grid gap-3 md:grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,220px)] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/72">
                {cell.label}
              </p>
            </div>
            <p className="font-[var(--font-display)] text-2xl leading-tight">
              {cell.value}
            </p>
            <div className="md:text-right">
              {cell.note ? (
                <p className="text-sm leading-6 text-muted-foreground">
                  {cell.note}
                </p>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground/75">
                  Key comparison point
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
