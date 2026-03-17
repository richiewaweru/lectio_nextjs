import { notFound } from "next/navigation";

import { TemplateDetailChrome } from "@/app/templates/[templateId]/template-detail-chrome";
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

  const TemplatePreview = definition.render;

  return (
    <TemplateDetailChrome
      contract={definition.contract}
      presets={definition.presets}
      previewSummary={definition.preview.summary}
    >
      <TemplatePreview section={definition.preview.section} />
    </TemplateDetailChrome>
  );
}
