import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multi-section app example — Lectio docs",
  description: "LectioThemeSurface, templateRegistryMap, and template.render for streaming sections."
};

const importsExample = [
  'import { LectioThemeSurface, basePresetMap, templateRegistryMap } from "lectio-react";',
  'import type { SectionContent } from "lectio-react";'
].join("\n");

const resolveExample = [
  "const template = templateRegistryMap[document.template_id];",
  "const preset = basePresetMap[document.preset_id] ?? null;"
].join("\n");

const wrapExample = [
  "{template ? (",
  "  <LectioThemeSurface preset={preset}>",
  '    <div className="page-frame space-y-6">',
  '      <header className="lesson-shell p-6 sm:p-8">',
  "        {/* document title, context, template name */}",
  "      </header>",
  "",
  '      <div className="section-stack">',
  "        {sections.map((slot) =>",
  "          slot.status === \"ready\" && slot.section ? (",
  "            <article key={slot.section_id}>",
  "              {(() => {",
  "                const Layout = template.render;",
  "                return <Layout section={slot.section} />;",
  "              })()}",
  "            </article>",
  "          ) : (",
  '            <article key={slot.section_id} aria-busy="true">',
  "              {/* skeleton UI */}",
  "            </article>",
  "          )",
  "        )}",
  "      </div>",
  "    </div>",
  "  </LectioThemeSurface>",
  ") : (",
  "  <p>Unknown Lectio template</p>",
  ")}"
].join("\n");

export default function DocsTextbookAgentPage() {
  return (
    <>
      <p className="eyebrow">Integration</p>
      <h1>Multi-section documents (Textbook Agent pattern)</h1>
      <p className="lead">
        A multi-section Next.js app can consume <code>lectio-react</code> like this: resolve the
        document&apos;s template and preset, wrap the page in <code>LectioThemeSurface</code>, and render
        each section with the registry layout component (<code>template.render</code>), including
        skeleton states while sections stream in.
      </p>

      <h2>Imports</h2>
      <pre>
        <code>{importsExample}</code>
      </pre>

      <h2>Resolve template and preset</h2>
      <p>
        Your document model should carry stable string IDs that match the Lectio registries (for example{" "}
        <code>template_id</code> and <code>preset_id</code>).
      </p>
      <pre>
        <code>{resolveExample}</code>
      </pre>

      <h2>Wrap the document</h2>
      <p>
        <code>LectioThemeSurface</code> applies preset tokens to descendants. Your shell (titles,
        context, meta badges) stays outside or inside the surface as you prefer; the example below mirrors
        a production layout structure in simplified form.
      </p>
      <pre>
        <code>{wrapExample}</code>
      </pre>

      <h2>Why not TemplateRuntimeSurface here?</h2>
      <p>
        <code>TemplateRuntimeSurface</code> is ideal for a <strong>single</strong> section in isolation.
        Multi-section apps usually need custom chrome, ordering, streaming, and per-slot loading UI.
        Calling <code>template.render</code> directly keeps one theme wrapper and full control of the
        stack.
      </p>

      <h2>Frontend checklist</h2>
      <ul>
        <li>
          Import <code>lectio-react/theme.css</code> in your global stylesheet (see{" "}
          <Link href="/docs/installation">Installation</Link>).
        </li>
        <li>
          Align <code>template_id</code> and <code>preset_id</code> with template contracts and{" "}
          <code>allowed_presets</code>.
        </li>
        <li>Type section payloads as <code>SectionContent</code> (or validate before render).</li>
        <li>
          In Next.js, list <code>lectio-react</code> in <code>transpilePackages</code> if you hit
          precompiled dependency issues.
        </li>
      </ul>

      <div className="doc-callout">
        <p>
          This narrative matches the Textbook Agent pattern: adapt slot shapes and CSS classes to your own
          data layer. For a single section, prefer{" "}
          <Link href="/docs/rendering">Rendering patterns</Link>.
        </p>
      </div>
    </>
  );
}
