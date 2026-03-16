import { calculusSection } from "@/lib/dummy-content";
import { GuidedConceptPathTemplate } from "@/lib/templates/guided-concept-path";

export default function GuidedConceptPathPage() {
  return (
    <main className="page-frame">
      <div className="mb-8 space-y-3">
        <p className="eyebrow">Template demo</p>
        <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
          Guided Concept Path
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          A full lesson section rendered from structured calculus content using
          the first Lectio template.
        </p>
      </div>

      <GuidedConceptPathTemplate section={calculusSection} />
    </main>
  );
}
