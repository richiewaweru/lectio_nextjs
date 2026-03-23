import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Core concepts — Lectio docs",
  description: "SectionContent, registry, templates, presets, and validation."
};

export default function DocsConceptsPage() {
  return (
    <>
      <p className="eyebrow">Core concepts</p>
      <h1>SectionContent, templates, and presets</h1>
      <p className="lead">
        Lectio centers on one typed payload per lesson section — <code>SectionContent</code> — plus
        registry metadata that decides which components a template expects and how strictly to validate
        them.
      </p>

      <h2>SectionContent</h2>
      <p>
        <code>SectionContent</code> (from <code>lectio-react</code>) aggregates optional blocks:
        header, hook, explanation, definitions, practice, quiz, diagrams, timeline, simulation, and
        more. Each block maps to a lectio component through the component registry’s{" "}
        <code>sectionField</code>.
      </p>
      <p>
        Individual components take a typed <code>content</code> prop, for example{" "}
        <code>HookHeroContent</code> for <code>HookHero</code>. Templates orchestrate several of these in
        a fixed instructional arc.
      </p>

      <h2>Component registry</h2>
      <p>
        <code>componentRegistry</code>, <code>getStableComponents()</code>, and{" "}
        <code>getComponentById()</code> expose metadata: cognitive job, behaviour modes, capacity limits,
        and the <code>SectionContent</code> field each component consumes.
      </p>

      <h2>Templates</h2>
      <p>
        Twelve public templates (for example <code>guided-concept-path</code>,{" "}
        <code>compare-and-apply</code>, <code>interactive-lab</code>) are defined in the template
        registry. Each has a contract describing required and optional components, generation guidance,
        and <code>allowed_presets</code>.
      </p>
      <p>
        For rendering, you usually pass <code>templateId</code>, <code>presetId</code>, and{" "}
        <code>section</code> into <code>TemplateRuntimeSurface</code> or render the template’s{" "}
        <code>render</code> component directly (see{" "}
        <Link href="/docs/rendering">Rendering patterns</Link>).
      </p>

      <h2>Presets</h2>
      <p>
        <code>basePresets</code> and <code>basePresetMap</code> define five visual themes (for example{" "}
        <code>blue-classroom</code>, <code>warm-paper</code>). Presets control palette, typography,
        density, and surface style; they integrate with <code>LectioThemeSurface</code> and the template
        surfaces.
      </p>

      <h2>Validation</h2>
      <p>
        <code>validateSection(section)</code> returns warning strings for capacity or shape issues.{" "}
        <code>warnIfInvalid(section)</code> logs those warnings in the browser — useful during
        development when wiring new generators.
      </p>
      <p>
        Template-level validation lives alongside the registry-driven field map so template contracts and
        component fields stay aligned.
      </p>

      <div className="doc-callout">
        <p>
          Explore live data shapes in the{" "}
          <Link href="/showcase">component showcase</Link> and <Link href="/templates">template demos</Link>
          ; the exported JSON contracts mirror the same registry source of truth.
        </p>
      </div>
    </>
  );
}
