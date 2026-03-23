import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introduction — Lectio docs",
  description: "What Lectio React is, what you build with it, and how this site is organized."
};

export default function DocsIntroductionPage() {
  return (
    <>
      <p className="eyebrow">Introduction</p>
      <h1>What is Lectio?</h1>
      <p className="lead">
        Lectio React is an educational component library for{" "}
        <strong className="text-foreground">React 19</strong> and{" "}
        <strong className="text-foreground">Next.js</strong>. It turns typed lesson data into coherent
        instructional UI: hooks, explanations, definitions, practice, comparisons, diagrams,
        timelines, and more — each component encodes a <em>teaching move</em>, not a generic widget.
      </p>

      <h2>What you build with it</h2>
      <ul>
        <li>
          <strong>Single sections</strong> — Render one <code>SectionContent</code> object with a chosen
          template surface, or compose individual lectio components when you control layout yourself.
        </li>
        <li>
          <strong>Multi-section documents</strong> — Wrap many sections in a shared theme (preset) and
          loop registry template layouts, the pattern used by the Textbook Agent frontend.
        </li>
        <li>
          <strong>Pipeline-aware generation</strong> — Export JSON contracts so agents and backends can
          learn required fields, capacities, and allowed presets without importing TypeScript from this
          repo.
        </li>
      </ul>

      <h2>How this site is organized</h2>
      <ul>
        <li>
          <Link href="/showcase">Component showcase</Link> — Interactive gallery of all stable lectio
          components with sample content.
        </li>
        <li>
          <Link href="/templates">Templates</Link> — Twelve registry-backed lesson templates with
          previews and per-template detail pages.
        </li>
        <li>
          <Link href="/docs">Documentation</Link> (this section) — Installation, concepts, rendering
          patterns, contracts, and integration examples.
        </li>
      </ul>

      <div className="doc-callout">
        <p>
          Lectio React is packaged with <code>tsup</code> into <code>dist/</code>. Consumers import from{" "}
          <code>lectio-react</code> and pull in <code>lectio-react/theme.css</code> once for tokens,
          presets, KaTeX styling, and shared utilities.
        </p>
      </div>
    </>
  );
}
