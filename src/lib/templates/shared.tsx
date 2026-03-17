import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

import type { SectionContent } from "@/lib/types";
import { SectionHeader } from "@/lib/components/lectio";
import {
  Card,
  CardContent
} from "@/lib/components/ui/card";
import { validateSection } from "@/lib/validate";
import { cn } from "@/lib/utils";

export function TemplateWarnings({ section }: { section: SectionContent }) {
  const warnings = validateSection(section);

  if (!warnings.length) {
    return null;
  }

  return (
    <Card className="border-amber-300 bg-amber-50/90">
      <CardContent className="flex gap-3 p-4">
        <AlertCircle className="mt-1 h-5 w-5 text-amber-700" />
        <div>
          <p className="font-semibold text-amber-900">Schema capacity warnings</p>
          <ul className="mt-2 space-y-1 text-sm text-amber-950/80">
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function TemplateShell({
  section,
  children,
  sidebar,
  singleColumn = false,
  contentClassName
}: {
  section: SectionContent;
  children: ReactNode;
  sidebar?: ReactNode;
  singleColumn?: boolean;
  contentClassName?: string;
}) {
  if (singleColumn || !sidebar) {
    return (
      <div className="lesson-shell p-6 sm:p-8">
        <div className={cn("relative z-10 space-y-6", contentClassName)}>
          <SectionHeader content={section.header!} />
          <TemplateWarnings section={section} />
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="lesson-shell p-6 sm:p-8">
        <div className={cn("relative z-10 space-y-6", contentClassName)}>
          <SectionHeader content={section.header!} />
          <TemplateWarnings section={section} />
          {children}
        </div>
      </div>
      <aside className="xl:sticky xl:top-8 xl:self-start">{sidebar}</aside>
    </div>
  );
}
