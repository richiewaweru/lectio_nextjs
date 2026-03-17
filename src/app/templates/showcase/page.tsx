import { calculusExtendedSection, calculusSection } from "@/lib/dummy-content";
import { ExtendedConceptPathTemplate } from "@/lib/templates/extended-concept-path";
import { GuidedConceptPathTemplate } from "@/lib/templates/guided-concept-path";

export default function TemplateShowcasePage() {
  return (
    <main className="page-frame space-y-10">
      <div className="space-y-3">
        <p className="eyebrow">Template showcase</p>
        <h1 className="font-[var(--font-display)] text-4xl text-primary sm:text-5xl">
          Compare Lectio templates
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          The original Guided Concept Path remains the stable baseline, while
          the Extended Concept Path acts as the richer visualization and testing
          harness for the complete-build component set.
        </p>
      </div>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="eyebrow">Baseline</p>
          <h2 className="font-[var(--font-display)] text-3xl text-primary">
            Guided Concept Path
          </h2>
        </div>
        <GuidedConceptPathTemplate section={calculusSection} />
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="eyebrow">Extended</p>
          <h2 className="font-[var(--font-display)] text-3xl text-primary">
            Extended Concept Path
          </h2>
        </div>
        <ExtendedConceptPathTemplate section={calculusExtendedSection} />
      </section>
    </main>
  );
}
