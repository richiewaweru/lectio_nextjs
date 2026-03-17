import { TemplatesGallery } from "@/app/templates/templates-gallery";
import { templateRegistry } from "@/lib/template-registry";

export default function TemplatesPage() {
  return (
    <main className="page-frame">
      <TemplatesGallery
        templates={templateRegistry.map((definition) => definition.contract)}
      />
    </main>
  );
}
