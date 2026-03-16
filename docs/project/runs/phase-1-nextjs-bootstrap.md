## Feature: bootstrap next.js lectio demo

**Classification**: major
**Subsystems**: frontend

### Progress
- [x] Understood requirements and identified scope
- [x] Read relevant source code and project rules
- [x] Implemented the change
- [x] Wrote tests for new behavior
- [x] Ran validation (typecheck, lint, build)
- [x] Self-reviewed against agents/standards/review.md
- [ ] Wrote commit message(s) following agents/standards/communication.md
- [ ] Updated PR description with summary, validation evidence, risks
- [x] Noted any follow-up work or open questions

### Validation Evidence
- `npm run validate`
  - `eslint .` passed
  - `tsc --noEmit` passed
  - `vitest run` passed (`4` tests)
  - `next build` passed

### Risks and Follow-up
- Tailwind 4 required the PostCSS plugin package and non-`@apply` CSS for custom tokens; the current setup is validated but should stay aligned with future Tailwind updates.
- The original Svelte repo contained in-progress component work and was treated as reference only; no changes were made there after the workspace split.
