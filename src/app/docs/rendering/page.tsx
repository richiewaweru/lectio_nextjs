import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rendering patterns — Lectio docs",
  description: "Template surfaces vs LectioThemeSurface and template.render for multi-section apps."
};

const surfaceExample = [
  'import { TemplatePreviewSurface, TemplateRuntimeSurface } from "lectio-react";',
  "import type { SectionContent } from \"lectio-react\";",
  "",
  "type Props = { section: SectionContent };",
  "",
  "export default function LessonSection({ section }: Props) {",
  "  return (",
  "    <>",
  '      <TemplatePreviewSurface templateId="guided-concept-path" presetId="blue-classroom" />',
  "      <TemplateRuntimeSurface",
  '        templateId="guided-concept-path"',
  '        presetId="blue-classroom"',
  "        section={section}",
  "      />",
  "    </>",
  "  );",
  "}"
].join("\n");

export default function DocsRenderingPage() {
  return (
    <>
      <p className="eyebrow">Rendering patterns</p>
      <h1>Surfaces, templates, and custom chrome</h1>
      <p className="lead">
        Choose the path that matches how much layout control you need: public template surfaces for a
        single section, or a theme wrapper plus registry <code>render</code> components when you own the
        document shell.
      </p>

      <h2>Default: preview and runtime surfaces</h2>
      <p>
        For one section at a time, use the exported wrappers — they match what the showcase uses for
        previews and are the supported consumer API.
      </p>
      <pre>
        <code>{surfaceExample}</code>
      </pre>
      <ul>
        <li>
          <strong>TemplatePreviewSurface</strong> — Seeded demo content for a template gallery or empty
          state.
        </li>
        <li>
          <strong>TemplateRuntimeSurface</strong> — Renders your real <code>section</code> through the
          selected template and preset.
        </li>
      </ul>

      <h2>Advanced: LectioThemeSurface and template.render</h2>
      <p>
        When you render <strong>many sections</strong> inside your own page frame (headers, progress,
        skeletons), wrap the stack in <code>LectioThemeSurface</code> with a resolved preset, then resolve
        the template from <code>templateRegistryMap</code> and invoke its <code>render</code> component per
        section.
      </p>
      <p>
        This is how the Textbook Agent frontend wires generated textbooks: one theme for the document,
        then the template’s <code>render</code> component with <code>section</code> bound for each ready
        slot.
      </p>
      <p>
        See the full walkthrough in{" "}
        <Link href="/docs/examples/textbook-agent">Multi-section app example</Link>.
      </p>

      <h2>Low-level exports</h2>
      <p>
        <code>LectioThemeSurface</code>, <code>ResolvedTemplatePreviewSurface</code>,{" "}
        <code>templateRegistry</code>, <code>templateRegistryMap</code>, <code>getTemplateById</code>, and{" "}
        <code>filterTemplates</code> are available for advanced tooling. Prefer the template surfaces
        unless you are composing custom preview chrome or multi-section layouts.
      </p>

      <h2>Available template IDs</h2>
      <p className="text-sm">
        <code>guided-concept-path</code>, <code>figure-first</code>, <code>compare-and-apply</code>,{" "}
        <code>focus-flow</code>, <code>guided-concept-compact</code>, <code>formal-track</code>,{" "}
        <code>diagram-led-lesson</code>, <code>distinction-grid</code>, <code>timeline-narrative</code>,{" "}
        <code>process-trainer</code>, <code>interactive-lab</code>, <code>guided-discovery</code>
      </p>
    </>
  );
}
