# Project State Handoff

## Current Product State

- The Next.js repo remains the contract anchor for the Lectio component and template library.
- The public library surface now includes 12 template families, including the new `interactive-lab` and `guided-discovery` presets-first interactive flows.
- The public library now exports runtime helpers for seeded previews and live template rendering:
  - `TemplatePreviewSurface`
  - `TemplateRuntimeSurface`
  - `ResolvedTemplatePreviewSurface`
  - `LectioThemeSurface`
- Shared template styling now lives in `src/lib/theme.css`, which is also exported as `lectio-react/theme.css` for consuming apps.
- `SimulationBlock` is no longer scaffold-only. It can now render sandboxed `html_content`, show fallback diagrams, and expose an expanded dialog view.

## What Changed In This Pass

- Registered two new template families in `src/lib/template-registry.ts`:
  - `interactive-lab`
  - `guided-discovery`
- Added runtime resolver and surface helpers under `src/lib/templates/` so consumers can render a template by `templateId` plus preset and section data.
- Expanded `SimulationContent` in `src/lib/types.ts` with `html_content?: string`.
- Updated the showcase/detail route to render through the public preview surface instead of inlining the preview component directly.
- Moved the shared theme, KaTeX import, and preset-scoped shell styles into `src/lib/theme.css`, then imported that asset from `src/app/globals.css`.
- Refreshed contract export coverage so `agents/contracts/` includes 12 template JSON files plus updated component and preset registries.
- Added the missing local README docs for the new template folders:
  - `src/lib/templates/interactive-lab/README.md`
  - `src/lib/templates/guided-discovery/README.md`

## Documentation Updated

- `README.md`
- `docs/reference/component-guide.md`
- `docs/reference/template-runtime-surfaces.md`
- `docs/project/runs/phase12-library-runtime-surfaces-and-interactive-templates.md`

## Validation Status

- Validated on March 19, 2026 with:
  - `npm run export-contracts`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
  - `npm run package`
- Local dev server restarted and verified on `http://127.0.0.1:3000`.

## Risks And Notes

- Consumers must import `lectio-react/theme.css` for template shells, preset overrides, KaTeX, and utility classes to render correctly.
- The new runtime surfaces fall back gracefully for unknown template IDs and unsupported preset IDs, but they still depend on the registry being kept current.
- `agents/contracts/` is generated output and should be refreshed with `npm run export-contracts` after template, preset, or registry changes.

## Where To Start Next Time

- Start with `docs/reference/template-runtime-surfaces.md` for the intended developer usage model.
- Check `src/lib/templates/TemplatePreviewSurface.tsx` and `src/lib/templates/TemplateRuntimeSurface.tsx` for the new public runtime entrypoints.
- Review `src/test/runtime-surface.test.tsx` and `src/test/template-rollout.test.tsx` for regression coverage around the expanded template surface.
- Use `src/lib/templates/interactive-lab/README.md` and `src/lib/templates/guided-discovery/README.md` as the pattern for future interactive template families.
