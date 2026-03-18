# Project State Handoff

## Current Product State

- The Next.js repo remains the contract anchor for the cross-repo template and component system.
- The public routes remain `/showcase`, `/templates`, and `/templates/[templateId]`.
- Public component exports remain 23 teaching components, with `SimulationBlock` still shipped as a scaffolded beta surface.

## Stabilization Changes In This Pass

- Fixed the rerender safety issue in:
  - `src/lib/components/lectio/DiagramSeries.tsx`
  - The component now uses a clamped render index so shrinking diagram arrays cannot blank the component.
- Added accessibility labels in:
  - `src/lib/components/lectio/PrerequisiteStrip.tsx`
  - `src/lib/components/lectio/GlossaryInline.tsx`
- Added focused regression coverage in `src/test/lectio.test.tsx` for:
  - `DiagramSeries` rerender clamping
  - Trigger `aria-label` coverage

## Validation Status

- Validated on March 18, 2026 with:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`

## What Is Still Deferred

- `SimulationBlock` remains a scaffolded surface only; no live interaction runtime was added here.
- Broader validation parity work was intentionally left out of this pass because the contract and test baseline were already green.

## Where To Start Next Time

- Start with `src/lib/components/lectio/DiagramSeries.tsx` for any further state-synchronization work.
- Check `src/test/lectio.test.tsx` first for the new parity regressions.
- Keep `src/lib/components/lectio/SimulationBlock.tsx` as the source of truth for future Svelte parity work.
