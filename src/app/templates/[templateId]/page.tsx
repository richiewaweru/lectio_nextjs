import { notFound } from "next/navigation";

import { TemplateDetailChrome } from "@/app/templates/[templateId]/template-detail-chrome";
import { TemplatePreviewSurface } from "@/lib/templates/TemplatePreviewSurface";
import { getTemplateById, templateRegistry } from "@/lib/template-registry";

export function generateStaticParams() {
  return templateRegistry.map((definition) => ({
    templateId: definition.contract.id
  }));
}

export default async function TemplateDetailPage({
  params
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const definition = getTemplateById(templateId);

  if (!definition) {
    notFound();
  }

  return (
    <TemplateDetailChrome contract={definition.contract} presets={definition.presets}>
      <TemplatePreviewSurface
        templateId={templateId}
        presetId={definition.presets[0]?.id}
        showMetadata={false}
      />
    </TemplateDetailChrome>
  );
}
