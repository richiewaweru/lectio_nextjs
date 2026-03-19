# Lectio Next.js Component Guide

This guide documents the current public Next.js library surface after the runtime surface and interactive template expansion.

## What Ships Now

- Framework: Next.js App Router + React + TypeScript + Tailwind CSS v4
- Public library entrypoint: `src/lib/index.ts`
- Public teaching component count: 23
- Public template count: 12 template families in `src/lib/template-registry.ts`
- Public runtime surfaces:
  - `TemplatePreviewSurface`
  - `TemplateRuntimeSurface`
  - `ResolvedTemplatePreviewSurface`
  - `LectioThemeSurface`
- Shared theme asset: `src/lib/theme.css`
- Public routes:
  - `/showcase`
  - `/templates`
  - `/templates/[templateId]`

## Public Components

### Foundation

- `SectionHeader`
- `HookHero`
- `ExplanationBlock`
- `PrerequisiteStrip`
- `WhatNextBridge`
- `InterviewAnchor`

### Definition and Knowledge

- `DefinitionCard`
- `DefinitionFamily`
- `GlossaryRail`
- `GlossaryInline`
- `InsightStrip`
- `ComparisonGrid`

### Examples and Process

- `WorkedExampleCard`
- `ProcessSteps`

### Assessment and Practice

- `PracticeStack`
- `QuizCheck`
- `ReflectionPrompt`

### Alerts

- `PitfallAlert`

### Visual and Sequence

- `DiagramBlock`
- `DiagramCompare`
- `DiagramSeries`
- `TimelineBlock`

### Interactive Runtime

- `SimulationBlock`

`SimulationBlock` now supports:

- Live sandboxed HTML via `SimulationContent.html_content`
- Static fallback diagrams via `fallback_diagram`
- Scaffold mode when only the interaction spec is available

## Current Template System

The public template system is registry-driven and now includes both preview-time and runtime rendering helpers.

- Registry: `src/lib/template-registry.ts`
- Shared contracts and selectors: `src/lib/template-types.ts`
- Validation: `src/lib/template-validation.ts`
- Runtime resolver: `src/lib/templates/runtime-resolver.ts`
- Public surfaces:
  - `src/lib/templates/TemplatePreviewSurface.tsx`
  - `src/lib/templates/TemplateRuntimeSurface.tsx`
  - `src/lib/templates/ResolvedTemplatePreviewSurface.tsx`
  - `src/lib/templates/LectioThemeSurface.tsx`
- Gallery shell: `src/app/templates/templates-gallery.tsx`
- Detail shell: `src/app/templates/[templateId]/template-detail-chrome.tsx`

The 12 shipped templates are:

- Guided Concept Path
- Figure First
- Compare and Apply
- Focus Flow
- Guided Concept Compact
- Formal Track
- Diagram-Led Lesson
- Distinction Grid
- Timeline Narrative
- Process Trainer
- Interactive Lab
- Guided Discovery

## New Library Additions In This Pass

- New public runtime surfaces:
  - `TemplatePreviewSurface`
  - `TemplateRuntimeSurface`
  - `ResolvedTemplatePreviewSurface`
  - `LectioThemeSurface`
- New template families:
  - `Interactive Lab`
  - `Guided Discovery`
- New shared package asset:
  - `src/lib/theme.css`
- New simulation runtime capability:
  - `SimulationContent.html_content`

## Published Component Additions

These components were added during the cross-repo template rollout and are now part of the public library:

- `ComparisonGrid`
- `TimelineBlock`

These existing components were extended to support the template system:

- `PracticeStack`: `accordion | flat-list`
- `GlossaryRail`: `sticky | drawer | inline-strip`
- `ProcessSteps`: `static | step-reveal`

## How Developers Should Use The New Surfaces

1. Import `lectio-react/theme.css` once in the consuming app so template tokens, KaTeX styling, and preset overrides are available.
2. Use `TemplatePreviewSurface` when you only know the `templateId` and want the seeded preview content from the registry.
3. Use `TemplateRuntimeSurface` when you have real `SectionContent` and want the registered template layout rendered with preset-aware styling.
4. Use `LectioThemeSurface` only when you need a lower-level wrapper for custom template shells or advanced composition.
5. Run `npm run export-contracts` after changing templates, presets, or component metadata so `agents/contracts/` stays aligned.

## Template Detail Drawer

The template detail route now uses a persistent left-side contract drawer on `md+`.

- Desktop: in-layout persistent drawer that resizes the preview area
- Mobile: temporary left-side sheet
- Desktop state key: `template-contract-drawer-open`

## Copy or Fork Checklist

If you want to reuse a component or template outside this repo, copy these pieces together:

1. The component or template from `src/lib/components/lectio/` or `src/lib/templates/`.
2. Supporting UI primitives from `src/lib/components/ui/`.
3. `src/lib/types.ts` for the content contracts.
4. `src/lib/registry.ts` and `src/lib/template-registry.ts` if you want showcase and template metadata.
5. `src/lib/validate.ts` and `src/lib/template-validation.ts` if you want the same validation behavior.
6. `src/lib/utils.ts` and shared styling from `src/lib/theme.css`.

## Important Current Notes

- `SimulationBlock` is public in the Next.js workspace and now supports live HTML, static fallback diagrams, and scaffold mode.
- Consuming apps should treat `lectio-react/theme.css` as required when rendering template surfaces from the package.
- Legacy wrappers and redirects such as `src/lib/templates/guided-concept-path.tsx`, `src/lib/templates/extended-concept-path.tsx`, and `/templates/showcase` remain only to preserve older entry points.
- Treat the current implementation in `src/lib/` and `src/app/templates/` as source of truth over older planning briefs.
