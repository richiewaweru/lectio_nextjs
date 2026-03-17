import TemplateDetailPage from "@/app/templates/[templateId]/page";

export default function GuidedConceptPathPage() {
  return TemplateDetailPage({
    params: Promise.resolve({ templateId: "guided-concept-path" })
  });
}
