# Registry-Driven Field Map Handoff

## What Changed

The component registry is now self-describing. Each `ComponentMeta` entry declares a `sectionField` property that maps it to its `SectionContent` field. The hardcoded `componentFieldMap` in `template-validation.ts` has been eliminated — it is now derived at runtime via `getComponentFieldMap()`.

This is a port of the same refactor from the SvelteKit sibling project.

## Files Modified

| File | Change |
|---|---|
| `src/lib/registry.ts` | Added `sectionField: keyof SectionContent \| null` to `ComponentMeta`, added it to all 23 entries, added `getComponentFieldMap()` helper |
| `src/lib/template-validation.ts` | Removed hardcoded 23-entry map and local `findComponentMeta()`, now imports `getComponentById` and `getComponentFieldMap` from registry |
| `scripts/export-contracts.ts` | New file — exports template contracts, component field map, and full registry as JSON to `agents/contracts/` |
| `package.json` | Added `export-contracts` script, added `tsx` devDependency |
| `src/test/lectio.test.tsx` | Added 4 tests for `getComponentFieldMap()` correctness |
| `docs/reference/registry-field-map.md` | Developer documentation for the new design |

## Cross-Repo Status

This change was shipped to both sibling projects in the same session:
- **SvelteKit** (`lectio`): commit `914ea75` on `master`
- **Next.js** (`lectio_nextjs`): commit `34af2a3` on `main`

Both projects are in sync. The design, field mappings, and export script are identical.

## Validation Status

- `npm run typecheck` — 0 errors
- `npm run test` — 34/34 tests pass (4 new)

## How to Add a New Component Going Forward

1. Create the component file in `src/lib/components/lectio/`
2. Add the entry in `src/lib/registry.ts` with `sectionField` declared
3. Add the corresponding field to `SectionContent` in `src/lib/types.ts`
4. Run `npm run export-contracts`

No other file needs to change. `template-validation.ts` and the pipeline contracts update automatically.

## Where To Start Next Time

- Read `docs/reference/registry-field-map.md` for the full design rationale
- Review `src/lib/registry.ts` for the `ComponentMeta` interface and `getComponentFieldMap()`
- Check `src/test/lectio.test.tsx` for the field map regression tests
- Run `npm run export-contracts` after any component or template changes
