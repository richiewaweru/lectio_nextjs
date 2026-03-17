## Bugfix: Next diagram inspect surface styling

**Classification**: minor
**Root cause**: the enlarged `DiagramBlock` inspect view still rendered inside layered `glass-panel` surfaces, which likely triggered a compositing issue in the browser and caused the inspected SVG to appear black even though the markup was present.

### Progress
- [x] Reproduced the bug (or identified the failing code path)
- [x] Identified root cause
- [x] Implemented the fix
- [x] Added regression test
- [x] Ran validation
- [x] Self-reviewed the diff

### Validation Evidence
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

### Risks
- The new `surface` option on `DialogContent` is intentionally small and only used by `DiagramBlock` in this pass.
- Manual browser verification is still recommended because the reported bug is rendering/compositing-specific.
