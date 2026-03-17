## Bugfix: Diagram inspect rendering and showcase hash navigation

**Classification**: minor
**Root cause**: the Next showcase sidebar linked to hash targets that were never rendered on the `/showcase` page, and `DiagramBlock` injected the enlarged SVG directly onto a `glass-panel` host, making the inspect state fragile inside the dialog surface.

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
- Component sidebar links now use native anchor navigation for hash targets only; template links intentionally remain route navigation.
- Manual browser smoke was not run from the desktop after the code change, so the automated regression suite is the primary verification here.
