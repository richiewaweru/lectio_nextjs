import type { InsightStripContent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function InsightStrip({ content }: { content: InsightStripContent }) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {content.cells.map((cell) => (
        <div
          key={cell.label}
          className={cn(
            "rounded-[1.35rem] border p-5 shadow-sm",
            cell.highlight
              ? "border-violet-200 bg-violet-50 text-violet-950"
              : "border-border/70 bg-white/80 text-foreground"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {cell.label}
          </p>
          <p className="mt-3 font-[var(--font-display)] text-2xl leading-tight">
            {cell.value}
          </p>
          {cell.note ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {cell.note}
            </p>
          ) : null}
        </div>
      ))}
    </section>
  );
}
