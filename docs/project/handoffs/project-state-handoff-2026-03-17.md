# Project State Handoff

## Current Product State

- The Next.js repo is the contract anchor for the cross-repo template system.
- The public routes are `/showcase`, `/templates`, and `/templates/[templateId]`.
- The template detail page uses a left-side persistent contract drawer on `md+` and a temporary left-side sheet on mobile, with desktop preference remembered in `localStorage`.

## Library Surface

- Public component exports: 23 teaching components
- New published components in this phase:
  - `ComparisonGrid`
  - `TimelineBlock`
- Extended components in this phase:
  - `PracticeStack`
  - `GlossaryRail`
  - `ProcessSteps`

## Template System

- Starter templates shipped through `src/lib/template-registry.ts`: 10
- Shared infrastructure:
  - `src/lib/template-types.ts`
  - `src/lib/template-validation.ts`
  - `src/lib/template-registry.ts`
  - `src/lib/presets/base-presets.ts`
- Shared template chrome:
  - `src/app/templates/templates-gallery.tsx`
  - `src/app/templates/[templateId]/page.tsx`
  - `src/app/templates/[templateId]/template-detail-chrome.tsx`
  - `src/app/templates/[templateId]/template-contract-panel.tsx`

## Documentation Updated

- `README.md`
- `docs/reference/component-guide.md`
- `docs/project/runs/phase7-contract-drawer-update.md`
- `docs/project/runs/phase8-source-of-truth-sync.md`

Historical planning docs were retained, but they now carry a status note directing readers back to the live implementation.

## Validation Status

- Validated on March 17, 2026 with:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Final commit and push details should be read from `docs/project/runs/phase8-source-of-truth-sync.md`.

## Known Notes

- Legacy public routes such as `/templates/showcase`, `/templates/guided-concept-path`, and `/templates/extended-concept-path` redirect to the gallery.
- `SimulationBlock` remains public in Next.js as a scaffolded surface.
