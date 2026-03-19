import type { SectionContent } from "@/lib/types";
import { Card } from "@/lib/components/ui/card";
import { LectioThemeSurface } from "@/lib/templates/LectioThemeSurface";
import {
  DEFAULT_PRESET_ID,
  resolveTemplateDefinition,
  resolveTemplatePreset
} from "@/lib/templates/runtime-resolver";

export function TemplateRuntimeSurface({
  templateId,
  section,
  presetId = DEFAULT_PRESET_ID
}: {
  templateId: string;
  section: SectionContent;
  presetId?: string;
}) {
  const definition = resolveTemplateDefinition(templateId);
  const preset = definition ? resolveTemplatePreset(definition, presetId) : null;
  const TemplateComponent = definition?.render ?? null;

  return (
    <LectioThemeSurface preset={preset}>
      {TemplateComponent ? (
        <TemplateComponent section={section} />
      ) : (
        <div className="page-frame">
          <Card className="border-dashed bg-white/80 p-8 text-center text-muted-foreground">
            Unknown Lectio template: {templateId}
          </Card>
        </div>
      )}
    </LectioThemeSurface>
  );
}
