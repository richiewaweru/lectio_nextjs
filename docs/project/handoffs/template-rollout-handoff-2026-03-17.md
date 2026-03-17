# Template Rollout Handoff

## Scope
- Implemented the shared template contract system in the Next.js repo first and used it as the source of truth for the cross-repo rollout.
- Shipped 10 starter templates with per-template `config`, `layout`, `preview`, `README`, and `presets`.
- Replaced the old public template showcase with a registry-driven gallery and dynamic detail route.

## Key Changes
- Added shared template infrastructure:
  - `src/lib/template-types.ts`
  - `src/lib/template-validation.ts`
  - `src/lib/template-registry.ts`
  - `src/lib/presets/base-presets.ts`
- Published new components:
  - `ComparisonGrid`
  - `TimelineBlock`
- Adapted existing components:
  - `PracticeStack` supports `accordion | flat-list`
  - `GlossaryRail` supports `sticky | drawer | inline-strip`
  - `ProcessSteps` supports `static | step-reveal`
- Added shared template render helpers in `src/lib/templates/shared.tsx`.
- Updated public routes:
  - `/templates`
  - `/templates/[templateId]`
- Redirected legacy public template routes back to the new gallery.
- Updated showcase coverage and component docs for the new components.

## Validation
- `npm run typecheck`
- `npm test`
- `npm run lint`
- `npm run build`

All four passed on March 17, 2026.

## Notes
- Legacy extended/enriched template surfaces were removed from the public gallery and kept out of the main browsing flow.
- The Next implementation is the contract anchor for the matching Svelte port.
- Local dev server intentionally left running on `http://localhost:3000`.
