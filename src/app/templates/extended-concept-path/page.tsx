import { calculusExtendedSection } from "@/lib/dummy-content";
import { ExtendedConceptPathTemplate } from "@/lib/templates/extended-concept-path";

export default function ExtendedConceptPathPage() {
  return (
    <main className="page-frame">
      <div className="mb-8 space-y-3">
        <p className="eyebrow">Template demo</p>
        <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
          Extended Concept Path
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          A full-surface lesson template that visualizes the complete-build
          component families on top of the current Lectio Next.js stack.
        </p>
      </div>

      <ExtendedConceptPathTemplate section={calculusExtendedSection} />
    </main>
  );
}
