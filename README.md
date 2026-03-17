# Lectio Next.js

Lectio is an educational UI component library used to render AI-generated textbook sections into clear, reusable learning experiences.

## Current Status

- 23 public teaching components are exported from `src/lib/components/lectio/index.ts`.
- 10 starter templates ship through the shared template registry in `src/lib/template-registry.ts`.
- Public routes are:
  - `/showcase`
  - `/templates`
  - `/templates/[templateId]`
- Legacy public template routes now redirect back to `/templates`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives backed by Radix UI
- Vitest + Testing Library

## Architecture

`Content Schema -> Educational Components -> Templates -> Rendered Lesson`

Each educational component represents a cognitive teaching move rather than a generic UI widget. The public template system is now registry-driven rather than single-template-route driven.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Pages

- `/` overview and navigation
- `/showcase` component showcase
- `/templates` registry-driven gallery
- `/templates/[templateId]` registry-driven detail page
- `/templates/showcase`, `/templates/guided-concept-path`, and `/templates/extended-concept-path` redirect to the gallery

## Notes

- The template detail page uses a left-side persistent contract drawer on `md+` and a temporary mobile sheet, with desktop preference stored in `localStorage`.
- The public app shell now includes a shared desktop-only sticky sidebar that derives its component and template links from the live registries.
- The current implementation in `src/lib/` and `src/app/templates/` is the source of truth over older planning briefs.
