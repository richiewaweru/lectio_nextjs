import { Card } from "@/lib/components/ui/card";
import { LectioThemeSurface } from "@/lib/templates/LectioThemeSurface";
import { ResolvedTemplatePreviewSurface } from "@/lib/templates/ResolvedTemplatePreviewSurface";
import {
  DEFAULT_PRESET_ID,
  resolveTemplateDefinition,
  resolveTemplatePreset
} from "@/lib/templates/runtime-resolver";

export function TemplatePreviewSurface({
  templateId,
  presetId = DEFAULT_PRESET_ID,
  showMetadata = true
}: {
  templateId: string;
  presetId?: string;
  showMetadata?: boolean;
}) {
  const definition = resolveTemplateDefinition(templateId);
  const preset = definition ? resolveTemplatePreset(definition, presetId) : null;

  if (definition) {
    return (
      <ResolvedTemplatePreviewSurface
        definition={definition}
        preset={preset}
        showMetadata={showMetadata}
      />
    );
  }

  return (
    <LectioThemeSurface>
      <div className="page-frame">
        <Card className="border-dashed bg-white/80 p-8 text-center text-muted-foreground">
          Unknown Lectio template: {templateId}
        </Card>
      </div>
    </LectioThemeSurface>
  );
}
