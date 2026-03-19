# Feature: Library runtime surfaces and interactive templates

**Classification**: major
**Subsystems**: frontend, library packaging, docs

### Progress
- [x] Understood requirements and identified scope
- [x] Read relevant source code and project rules
- [x] Audited the in-progress library changes across runtime surfaces, theme packaging, interactive templates, simulation runtime, and contract exports
- [x] Wrote handoff and developer documentation
- [x] Added missing template-level README documentation
- [x] Ran validation (frontend: lint + typecheck + test + build + export-contracts)
- [x] Self-reviewed against agents/standards/review.md
- [ ] Wrote commit message(s) following agents/standards/communication.md
- [ ] Updated PR description or publish notes with summary, validation evidence, and risks
- [ ] Noted follow-up work or open questions

### Scope Summary
- Package the shared runtime theme in `src/lib/theme.css` so consuming apps can import the same tokens and template shell styling.
- Publish public runtime surfaces for template previews and live section rendering.
- Add the `interactive-lab` and `guided-discovery` template families to the registry and exported contracts.
- Upgrade `SimulationBlock` from scaffold-only to a live HTML runtime with fallback diagrams and expanded dialog viewing.
- Refresh developer-facing docs and handoff notes to explain how consumers should use the new library surface.

### Validation Evidence
- `npm run export-contracts`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run package`

### Risks and Follow-up
- Consuming apps must import `lectio-react/theme.css` or the new runtime surfaces will render without the intended tokens and shell styling.
- Contract JSON under `agents/contracts/` should be treated as generated output. Regenerate it whenever templates, presets, or component metadata change.
- The runtime surface exports now make `src/lib/index.ts` a more important public contract. Future refactors should preserve or explicitly version those exports.
