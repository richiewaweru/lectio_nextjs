# Lectio Next.js

Lectio is an educational UI component library used to render AI-generated textbook sections into clear, reusable learning experiences.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives backed by Radix UI
- Vitest + Testing Library

## Architecture

`Content Schema -> Educational Components -> Templates -> Rendered Lesson`

Each educational component represents a cognitive teaching move rather than a generic UI widget.

The first implemented template is `Guided Concept Path`:

`Hook -> Explain -> Define -> Example -> Practice -> What Next`

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
- `/templates/guided-concept-path` full rendered lesson template

## Notes

The original Svelte workspace was used only as source documentation and reference material. This app is intentionally separated in `C:\Projects\lectio_nextjs`.
