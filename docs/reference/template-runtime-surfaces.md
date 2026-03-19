# Template Runtime Surfaces

This guide explains the new runtime-oriented library APIs that let a consuming app render Lectio templates by `templateId` instead of wiring preview and layout components manually.

## What Changed

- The library now exports four runtime helpers:
  - `TemplatePreviewSurface`
  - `TemplateRuntimeSurface`
  - `ResolvedTemplatePreviewSurface`
  - `LectioThemeSurface`
- The shared template styling has been moved into `src/lib/theme.css` and is exported as `lectio-react/theme.css`.
- Two new high-interaction template families are now part of the registry:
  - `interactive-lab`
  - `guided-discovery`
- `SimulationBlock` now supports live sandboxed HTML through `SimulationContent.html_content`.

## Quick Start

Import the shared theme once in your app stylesheet:

```css
@import "tailwindcss";
@import "lectio-react/theme.css";
```

Then render either a seeded template preview or a live section:

```tsx
import {
  TemplatePreviewSurface,
  TemplateRuntimeSurface,
} from "lectio-react";
import type { SectionContent } from "lectio-react";

export function TemplateExamples({ section }: { section: SectionContent }) {
  return (
    <>
      <TemplatePreviewSurface
        templateId="guided-discovery"
        presetId="blue-classroom"
      />
      <TemplateRuntimeSurface
        templateId="interactive-lab"
        presetId="warm-paper"
        section={section}
      />
    </>
  );
}
```

## Surface Responsibilities

### `TemplatePreviewSurface`

Use this when you only know the `templateId` and want the library's seeded preview content for that template.

- Resolves the template definition from the registry
- Resolves the requested preset, with fallback behavior
- Wraps the preview in `LectioThemeSurface`
- Can optionally hide metadata via `showMetadata={false}`

### `TemplateRuntimeSurface`

Use this when you have real `SectionContent` and want the library to render the registered template layout for that data.

- Resolves the template definition by `templateId`
- Resolves an allowed preset for that template
- Wraps the render in `LectioThemeSurface`
- Shows a friendly fallback card for unknown template IDs

### `ResolvedTemplatePreviewSurface`

Use this lower-level surface when you have already resolved a `TemplateDefinition` and optional preset yourself and only want the themed preview shell.

### `LectioThemeSurface`

Use this as the lowest-level wrapper when you need preset-aware styling without using the higher-level preview/runtime helpers directly.

## Preset Resolution

Preset resolution is template-aware.

- If the requested preset is allowed by the template, it is used.
- Otherwise the runtime falls back to `warm-paper` when that preset is allowed.
- If `warm-paper` is not allowed, the runtime falls back to the template's first allowed preset.
- In development, unsupported preset IDs emit a console warning so the mismatch is visible early.

## Interactive Simulation Content

`SimulationBlock` can now render live HTML content directly from the content payload.

```ts
import type { SimulationContent } from "lectio-react";

const simulation: SimulationContent = {
  explanation: "Adjust the slider and observe the output.",
  html_content: "<!DOCTYPE html><html>...</html>",
  spec: {
    type: "graph_slider",
    goal: "Show how the variable changes in real time.",
    anchor_content: {},
    context: {
      learner_level: "secondary",
      template_id: "interactive-lab",
      color_mode: "light",
      accent_color: "#f97316",
      surface_color: "#fff7ed",
      font_mono: "ui-monospace",
    },
    dimensions: { width: "100%", height: 320, resizable: false },
    print_translation: "static_diagram",
  },
  fallback_diagram: {
    svg_content: "<svg>...</svg>",
    caption: "Static fallback for print or non-interactive contexts.",
    alt_text: "Annotated fallback diagram.",
  },
};
```

Runtime behavior:

- If `html_content` is present, `SimulationBlock` renders a sandboxed iframe plus an expanded dialog view.
- If `html_content` is absent but `fallback_diagram` is present, the fallback diagram is rendered.
- If neither is present, the block stays in scaffold mode and renders the placeholder surface.

## New Interactive Template Families

### `interactive-lab`

- Simulation-first lesson arc
- Best for hands-on STEM exploration
- Single-column layout that keeps attention on the interactive
- Good match for `SimulationBlock` content that should lead before the explanation

### `guided-discovery`

- Explanation-first lesson arc with simulation support
- Best when learners need context before the interactive makes sense
- Uses a glossary sidebar on larger screens
- Good match for sections that teach the concept first, then confirm it through interaction

## Adding Or Extending Templates

When adding a new template family, keep this set in sync:

1. Add the template folder under `src/lib/templates/<template-id>/`.
2. Create `config.ts`, `layout.tsx`, `preview.ts`, `presets.ts`, and `README.md`.
3. Register the template in `src/lib/template-registry.ts`.
4. Export any public helpers needed from `src/lib/index.ts`.
5. Refresh contracts with `npm run export-contracts`.
6. Update developer-facing docs if the public usage model changed.

## Related Files

- `src/lib/index.ts`
- `src/lib/template-registry.ts`
- `src/lib/templates/runtime-resolver.ts`
- `src/lib/templates/TemplatePreviewSurface.tsx`
- `src/lib/templates/TemplateRuntimeSurface.tsx`
- `src/lib/theme.css`
- `src/test/runtime-surface.test.tsx`
