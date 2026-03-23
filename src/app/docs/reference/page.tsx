import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reference — Lectio docs",
  description: "Repo markdown, TypeScript sources, and live showcase routes."
};

export default function DocsReferencePage() {
  return (
    <>
      <p className="eyebrow">Reference</p>
      <h1>Source material in the repository</h1>
      <p className="lead">
        These Markdown files stay in the repo for editors and agents. This site adds guided tutorials
        under <Link href="/docs">/docs</Link>; use both when onboarding.
      </p>

      <h2>Library guides</h2>
      <ul>
        <li>
          <code>docs/reference/component-guide.md</code> — Public surface, showcase routes, contract
          export summary, fork checklist, SimulationBlock notes.
        </li>
        <li>
          <code>docs/reference/registry-field-map.md</code> — <code>sectionField</code>, field map
          derivation, pipeline JSON usage, extension workflow.
        </li>
      </ul>

      <h2>Component notes</h2>
      <p>Shorter per-component reference (purpose, inputs, behaviours):</p>
      <ul>
        <li>
          <code>docs/components/comparison-grid.md</code>
        </li>
        <li>
          <code>docs/components/timeline-block.md</code>
        </li>
      </ul>

      <h2>Root README</h2>
      <p>
        <code>README.md</code> — Quick install, dependency list, full component table, template IDs,
        validation helpers, preset helpers, <code>npm run package</code> (tsup), and{" "}
        <code>export-contracts</code> usage.
      </p>

      <h2>Showcase routes</h2>
      <ul>
        <li>
          <Link href="/showcase">/showcase</Link> — Component gallery with anchors per registry id.
        </li>
        <li>
          <Link href="/templates">/templates</Link> — Template gallery and detail pages.
        </li>
      </ul>

      <h2>TypeScript sources of truth</h2>
      <ul>
        <li>
          <code>src/lib/types.ts</code> — <code>SectionContent</code> and content interfaces.
        </li>
        <li>
          <code>src/lib/registry.ts</code> — Component metadata.
        </li>
        <li>
          <code>src/lib/template-registry.ts</code> — Template contracts and <code>render</code>{" "}
          components.
        </li>
        <li>
          <code>src/lib/index.ts</code> — Public package exports for <code>lectio-react</code>.
        </li>
      </ul>
    </>
  );
}
