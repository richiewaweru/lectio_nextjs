# Lectio React

Educational component library built on Next.js + React 19 + TypeScript + Tailwind CSS v4. Renders structured lesson content into reusable teaching components and registry-driven lesson templates.

## Using Lectio React as a Local Library

Lectio React is packaged with `tsup` plus declaration output. Another React or Next.js project can consume it via a local file reference.

### 1. Build the library

```bash
cd lectio_nextjs
npm install
npm run package
```

This compiles `src/lib/` into `dist/` with bundled ESM JavaScript and TypeScript declarations.

### 2. Add to your project

In your consuming project's `package.json`:

```json
{
  "dependencies": {
    "lectio-react": "file:../lectio_nextjs"
  }
}
```

Then install:

```bash
npm install
```

### 3. Install runtime dependencies

Your project needs these alongside Lectio React:

```bash
npm install katex lucide-react clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-accordion @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-slider @radix-ui/react-slot
npm install -D tailwindcss @types/katex
```

If consuming from Next.js, add to your `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: ["lectio-react"],
};
```

### 4. Import and use

```tsx
import { HookHero, SectionHeader, ExplanationBlock } from "lectio-react";
import type { SectionContent } from "lectio-react";
import { validateSection, warnIfInvalid } from "lectio-react";

export default function Lesson({ section }: { section: SectionContent }) {
  warnIfInvalid(section);

  return (
    <>
      <SectionHeader content={section.header} />
      <HookHero content={section.hook} />
      <ExplanationBlock content={section.explanation} />
    </>
  );
}
```

Import the shared Lectio React theme once in your app stylesheet so template shells, tokens, KaTeX styles, and preset-scoped visuals are available:

```css
@import "tailwindcss";
@import "lectio-react/theme.css";
```

After changing Lectio source, rebuild with `npm run package` for changes to appear in the consuming project.

## Public API

Everything is exported from a single entry point: `import { ... } from "lectio-react"`.

### Components (23)

| Group | Components |
|-------|-----------|
| Foundation | `SectionHeader`, `HookHero`, `ExplanationBlock`, `PrerequisiteStrip`, `WhatNextBridge`, `InterviewAnchor` |
| Definition & Knowledge | `DefinitionCard`, `DefinitionFamily`, `GlossaryRail`, `GlossaryInline`, `InsightStrip`, `ComparisonGrid` |
| Examples & Process | `WorkedExampleCard`, `ProcessSteps` |
| Assessment & Practice | `PracticeStack`, `QuizCheck`, `ReflectionPrompt` |
| Alerts | `PitfallAlert` |
| Diagrams | `DiagramBlock`, `DiagramCompare`, `DiagramSeries`, `TimelineBlock` |
| Simulation | `SimulationBlock` |

Each component accepts a typed `content` prop. All content types are nested inside the root `SectionContent` interface.

`SimulationBlock` now supports three runtime modes:

- Live sandboxed iframe content when `SimulationContent.html_content` is present
- Static diagram fallback when `fallback_diagram` is present
- Scaffold placeholder when only the simulation `spec` is available

### Registry

```ts
import { componentRegistry, getStableComponents, getComponentById } from "lectio-react";
import type { ComponentMeta } from "lectio-react";

const allComponents = getStableComponents();
const hook = getComponentById("hook-hero");
```

### Templates (12)

```tsx
import { TemplatePreviewSurface, TemplateRuntimeSurface } from "lectio-react";
import type { SectionContent } from "lectio-react";

export function Lesson({ section }: { section: SectionContent }) {
  return (
    <>
      <TemplatePreviewSurface
        templateId="guided-concept-path"
        presetId="blue-classroom"
      />
      <TemplateRuntimeSurface
        templateId="guided-concept-path"
        presetId="blue-classroom"
        section={section}
      />
    </>
  );
}
```

Available templates: `guided-concept-path`, `figure-first`, `compare-and-apply`, `focus-flow`, `guided-concept-compact`, `formal-track`, `diagram-led-lesson`, `distinction-grid`, `timeline-narrative`, `process-trainer`, `interactive-lab`, `guided-discovery`.

For advanced or internal consumers, Lectio React also exports the low-level runtime pieces:

```ts
import {
  LectioThemeSurface,
  ResolvedTemplatePreviewSurface,
  templateRegistry,
  templateRegistryMap,
  getTemplateById,
  filterTemplates
} from "lectio-react";
```

Preset resolution is template-aware. Unsupported preset IDs fall back to `warm-paper` when allowed, then to the first preset allowed by that template.

### Simulation Content

```ts
import type { SimulationContent } from "lectio-react";

const simulation: SimulationContent = {
  explanation: "Observe how the output changes as you drag the slider.",
  html_content: "<!DOCTYPE html><html>...</html>",
  spec: {
    type: "graph_slider",
    goal: "Show the relationship directly.",
    anchor_content: {},
    context: {
      learner_level: "secondary",
      template_id: "interactive-lab",
      color_mode: "light",
      accent_color: "#f97316",
      surface_color: "#fff7ed",
      font_mono: "ui-monospace"
    },
    dimensions: { width: "100%", height: 320, resizable: false },
    print_translation: "static_diagram"
  }
};
```

### Validation

```ts
import { validateSection, warnIfInvalid } from "lectio-react";

const warnings = validateSection(section);
warnIfInvalid(section);
```

### Presets

```ts
import { basePresets, basePresetMap } from "lectio-react";
```

Five built-in colour presets: Blue Classroom, Warm Paper, Calm Green, High Contrast Focus, Minimal Light.

### Utility

```ts
import { cn } from "lectio-react";
```

## Export Contracts

The `export-contracts` script exports template, component, and preset metadata as JSON for external runtimes that need Lectio's structure without importing TypeScript.

```bash
npm run export-contracts
npm run export-contracts -- --out /path/to/output
LECTIO_CONTRACTS_DIR=/path/to/output npm run export-contracts
```

Output files:
- `{template-id}.json` (x12) - template contract with lesson flow, required/optional components, generation guidance, and `allowed_presets`
- `component-field-map.json` - maps component IDs to their `SectionContent` field names
- `component-registry.json` - full component metadata
- `preset-registry.json` - visual preset palette, typography, density, and surface style

Run this whenever templates, components, or presets change. External systems should read the exported JSON rather than importing from `src/`.

## Reference Docs

- `docs/reference/component-guide.md`
- `docs/reference/template-runtime-surfaces.md`

## Development

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run package
```

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- Radix UI primitives
- KaTeX
- Lucide React
- Vitest + Testing Library

## Project Structure

```text
src/lib/
|-- index.ts
|-- theme.css
|-- types.ts
|-- registry.ts
|-- validate.ts
|-- template-registry.ts
|-- template-types.ts
|-- template-validation.ts
|-- presets/base-presets.ts
|-- components/lectio/
|-- components/ui/
`-- templates/
```
