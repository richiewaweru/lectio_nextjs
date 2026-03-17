## Feature: Sidebar Navigation Alignment

**Classification**: minor
**Subsystems**: frontend, docs

### Progress
- [x] Understood requirements and identified scope
- [x] Read relevant source code and project rules
- [x] Implemented the sidebar navigation helper and global app shell wiring
- [x] Wrote tests for new behavior
- [x] Ran validation (backend: ruff + pytest, frontend: check + build)
- [x] Self-reviewed against agents/standards/review.md
- [x] Wrote commit message(s) following agents/standards/communication.md
- [x] Updated handoff/runbook summary, validation evidence, risks
- [x] Pushed the sidebar navigation change to GitHub
- [x] Noted any follow-up work or open questions

### Validation Evidence
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

### Risks and Follow-up
- The global desktop sidebar now derives its component and template links from a shared navigation helper so pages stay aligned with the live registries.
- `next-env.d.ts` may be regenerated during local validation.
- Initial feature push for this phase landed on `main` as `49b6732`.
