# Project Config

Lectio Next.js is a component-first educational UI library for rendering structured lesson content into interactive textbook sections.

The architecture is:

`Content Schema -> Educational Components -> Templates -> Rendered Lesson`

## Architecture Rules

The project uses the Next.js App Router and organizes code by role:

| Area | Owns | May import from | Must NOT import from |
| --- | --- | --- | --- |
| `src/lib/types.ts` | content schema contracts | nothing | app routes, rendered pages |
| `src/lib/components/ui/` | shadcn-style UI primitives backed by Radix | `src/lib/utils.ts` | lesson content, templates, routes |
| `src/lib/components/lectio/` | educational interaction components | `src/lib/types.ts`, `src/lib/components/ui/`, `src/lib/utils.ts` | `src/app/` |
| `src/lib/templates/` | instructional templates that assemble educational components | `src/lib/components/lectio/`, `src/lib/types.ts`, `src/lib/validate.ts` | `src/app/` |
| `src/app/` | routes, metadata, page composition | `src/lib/**` | internal component implementation details outside the public library surface |

Critical invariants:
- `src/lib/types.ts` is the source of truth for all lesson content shapes.
- Educational components represent cognitive jobs, not generic marketing UI.
- Templates assemble components in documented instructional order and stay free of app-specific business logic.
- UI primitives stay reusable and content-agnostic.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Conventions

- **Commits**: `type(scope): summary`
- **Branches**: `codex/<slug>` when creating a new branch for this workspace
- **Package manager**: `npm`
- **Aliases**: `@/*` maps to `src/*`

## Key Entities

- `SectionContent` - the full schema for a rendered lesson section
- `componentRegistry` - metadata source for showcase and contribution review
- `GuidedConceptPathTemplate` - first instructional template for phase 1
- `calculusSection` - dummy calculus content used for showcase and demo pages
