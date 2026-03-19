import type { ReactNode } from "react";

import type { TemplatePresetDefinition } from "@/lib/template-types";
import { cn } from "@/lib/utils";

export function LectioThemeSurface({
  preset = null,
  className,
  children
}: {
  preset?: TemplatePresetDefinition | null;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("lectio-runtime", className)} data-lectio-preset={preset?.id}>
      {children}
    </div>
  );
}
