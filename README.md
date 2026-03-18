# Lectio React

Educational component library built on Next.js + React 19 + TypeScript + Tailwind CSS v4. Renders structured lesson content into reusable teaching components and registry-driven lesson templates.

## Using Lectio React as a Local Library

Lectio React is packaged with `tsup` (esbuild). Another React/Next.js project can consume it via a local file reference.

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
  transpilePackages: ['lectio-react'],
};
```

### 4. Import and use

```tsx
import { HookHero, SectionHeader, ExplanationBlock } from 'lectio-react';
import type { SectionContent } from 'lectio-react';
import { validateSection, warnIfInvalid } from 'lectio-react';

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

After changing Lectio source, rebuild with `npm run package` for changes to appear in the consuming project.

## Public API

Everything is exported from a single entry point: `import { ... } from 'lectio-react'`.

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

Each component accepts a typed `content` prop (e.g. `HookHeroContent`, `QuizContent`). All content types are nested inside the root `SectionContent` interface.

### Registry

```ts
import { componentRegistry, getStableComponents, getComponentById } from 'lectio-react';
import type { ComponentMeta } from 'lectio-react';

const allComponents = getStableComponents();
const hook = getComponentById('hook-hero');
```

### Templates (10)

```ts
import { templateRegistry, getTemplateById, filterTemplates } from 'lectio-react';
import type { TemplateDefinition, TemplateContract } from 'lectio-react';

const template = getTemplateById('guided-concept-path');
```

Available templates: `guided-concept-path`, `figure-first`, `compare-and-apply`, `focus-flow`, `guided-concept-compact`, `formal-track`, `diagram-led-lesson`, `distinction-grid`, `timeline-narrative`, `process-trainer`.

### Validation

```ts
import { validateSection, warnIfInvalid } from 'lectio-react';

const warnings = validateSection(section); // string[]
warnIfInvalid(section); // logs to console in browser
```

### Type Helpers

```ts
import {
  getSectionHeaderContent,
  getWorkedExamples,
  getPitfallList,
  normalizePracticeHints,
  getPracticeAnswer,
  normalizePracticeSolution,
} from 'lectio-react';
```

### Presets

```ts
import { basePresets, basePresetMap } from 'lectio-react';
```

Five built-in colour presets: Blue Classroom, Warm Paper, Calm Green, High Contrast Focus, Minimal Light.

### Utility

```ts
import { cn } from 'lectio-react'; // clsx + tailwind-merge
```

## Export Contracts (Pipeline Bridge)

The `export-contracts` script exports template, component, and preset metadata as JSON for external pipelines (e.g. Python AI agents) that need to know about Lectio's structure without importing TypeScript.

```bash
npm run export-contracts                           # Default: agents/contracts/
npm run export-contracts -- --out /path/to/output   # Custom output directory
LECTIO_CONTRACTS_DIR=/path/to/output npm run export-contracts  # Via env var
```

Output files:
- `{template-id}.json` (×10) — template contract with lesson flow, required/optional components, generation guidance, and `allowed_presets`
- `component-field-map.json` — maps component IDs to their `SectionContent` field names
- `component-registry.json` — full component metadata (capacity, behaviour modes, cognitive job, etc.)
- `preset-registry.json` — visual preset palette, typography, density, and surface style

Run this whenever templates, components, or presets change. The pipeline reads these files — it never imports from `src/`.

## Development

```bash
npm run dev          # Start Next.js dev server (showcase at localhost:3000)
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint
npm run test         # Run Vitest test suite
npm run build        # Production Next.js build
npm run package      # Library build (src/lib/ -> dist/)
npm run validate     # Run lint + typecheck + test + build
```

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- Radix UI primitives (shadcn/ui style)
- KaTeX (math rendering)
- Lucide React (icons)
- Vitest + Testing Library

## Project Structure

```
src/lib/
├── index.ts                    # Library entry point (barrel export)
├── types.ts                    # All content type interfaces + helpers
├── registry.ts                 # Component metadata registry
├── validate.ts                 # Content capacity validation
├── template-registry.ts        # Template definitions + helpers
├── template-types.ts           # Template type interfaces
├── template-validation.ts      # Template contract validation
├── presets/base-presets.ts      # Colour preset definitions
├── components/lectio/          # 23 educational components
├── components/ui/              # Radix UI primitives (internal)
└── templates/                  # Template layout files (internal)
```
