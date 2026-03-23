import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Installation — Lectio docs",
  description: "Build lectio-react, add to your app, install peers, and import theme CSS."
};

const packageJsonSnippet = `{
  "dependencies": {
    "lectio-react": "file:../lectio_nextjs"
  }
}`;

const importSnippet = `import {
  TemplateRuntimeSurface,
  TemplatePreviewSurface,
  validateSection,
  warnIfInvalid
} from "lectio-react";
import type { SectionContent } from "lectio-react";`;

const nextConfigSnippet = `const nextConfig = {
  transpilePackages: ["lectio-react"],
};

export default nextConfig;`;

export default function DocsInstallationPage() {
  return (
    <>
      <p className="eyebrow">Installation</p>
      <h1>Install and wire Lectio React in your app</h1>
      <p className="lead">
        Build the library from this repository, reference it from your React or Next.js project, add
        peer dependencies, and import the shared theme stylesheet so templates and components look
        correct.
      </p>

      <h2>1. Build the package</h2>
      <pre>
        <code>{`cd lectio_nextjs
npm install
npm run package`}</code>
      </pre>
      <p>
        This compiles <code>src/lib/</code> into <code>dist/</code> with bundled ESM and TypeScript
        declarations.
      </p>

      <h2>2. Depend on the package</h2>
      <p>In the consuming project <code>package.json</code>:</p>
      <pre>
        <code>{packageJsonSnippet}</code>
      </pre>
      <p>
        Then run <code>npm install</code> (adjust the path to match your folder layout).
      </p>

      <h2>3. Install runtime dependencies</h2>
      <p>Your app needs Lectio React’s runtime stack alongside the package:</p>
      <pre>
        <code>{`npm install katex lucide-react clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-accordion @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-slider @radix-ui/react-slot
npm install -D tailwindcss @types/katex`}</code>
      </pre>

      <h2>4. Next.js consumers</h2>
      <p>
        If you use Next.js, transpile the local package so server and client bundles compile cleanly:
      </p>
      <pre>
        <code>{nextConfigSnippet}</code>
      </pre>

      <h2>5. Import the theme once</h2>
      <p>In your app stylesheet (Tailwind v4 entry):</p>
      <pre>
        <code>{`@import "tailwindcss";
@import "lectio-react/theme.css";`}</code>
      </pre>
      <p>
        This brings in design tokens, preset-scoped surfaces, KaTeX rules, and utilities that templates
        expect.
      </p>

      <h2>6. Use the public API</h2>
      <p>Everything ships from a single entry:</p>
      <pre>
        <code>{importSnippet}</code>
      </pre>

      <h2>After you change Lectio React</h2>
      <p>
        Run <code>npm run package</code> again in this repo so <code>dist/</code> updates; your consumer
        will pick up changes on the next install or link refresh.
      </p>

      <h2>Optional: contract export for pipelines</h2>
      <p>
        If agents or a backend need structural metadata, run <code>npm run export-contracts</code> here
        and read JSON from the output directory (see{" "}
        <Link href="/docs/contracts">Contracts and pipelines</Link>).
      </p>
    </>
  );
}
