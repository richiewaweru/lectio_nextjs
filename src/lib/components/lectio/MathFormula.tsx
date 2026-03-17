import { cn, renderMath } from "@/lib/utils";

export function MathFormula({
  formula,
  displayMode = false,
  className
}: {
  formula: string;
  displayMode?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: renderMath(formula, displayMode) }}
    />
  );
}
