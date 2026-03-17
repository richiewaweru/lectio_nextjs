import type { SectionHeaderContent } from "@/lib/types";
import { Badge } from "@/lib/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/lib/components/ui/card";

const pillTone = {
  all: "border-slate-200 bg-slate-50 text-slate-700",
  warm: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  cold: "border-sky-200 bg-sky-50 text-sky-700"
} as const;

export function SectionHeader({ content }: { content: SectionHeaderContent }) {
  return (
    <Card className="border-primary/10 bg-primary text-primary-foreground">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {content.section_number ? (
            <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
              {content.section_number}
            </Badge>
          ) : null}
          <Badge className="bg-white/12 text-primary-foreground hover:bg-white/12">
            {content.subject}
          </Badge>
          <Badge variant="outline" className="border-white/20 text-primary-foreground">
            {content.grade_band}
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="font-[var(--font-display)] text-4xl text-primary-foreground sm:text-5xl">
            {content.title}
          </CardTitle>
          {content.subtitle ? (
            <p className="max-w-3xl text-lg leading-8 text-primary-foreground/76">
              {content.subtitle}
            </p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-primary-foreground/86">
        {content.objective ? (
          <p className="max-w-2xl text-base leading-7">
            <span className="font-semibold uppercase tracking-[0.18em] text-primary-foreground/65">
              Objective
            </span>{" "}
            {content.objective}
          </p>
        ) : null}
        {content.level_pills?.length ? (
          <div className="flex flex-wrap gap-2">
            {content.level_pills.map((pill) => (
              <Badge
                key={`${pill.label}-${pill.variant}`}
                variant="outline"
                className={pillTone[pill.variant]}
              >
                {pill.label}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
