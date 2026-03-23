# Public docs site handoff (Next.js)

## Summary

Mirrored the SvelteKit Lectio public `/docs` information architecture into **lectio_nextjs**: shared `docs-navigation.ts` hrefs, sidebar **Documentation** block, mobile doc jump (`DocsMobileNav`), App Router pages under `src/app/docs/`, `.doc-prose` / `.doc-callout` in `globals.css`, homepage **Read the docs** CTA to `/docs`, and a sidebar test assertion for `/docs/introduction`.

## Next-specific deltas vs Svelte

- Package surface is **`lectio-react`** (tsup build from this repo via `npm run package`); consumers use `file:../lectio_nextjs` or the published tarball as documented in **Installation**.
- Live component gallery is **`/showcase`** (not `/components`).
- Next.js apps should set **`transpilePackages: ['lectio-react']`** when needed and import **`lectio-react/theme.css`** (or `@import "lectio-react/theme.css"`) in global CSS.
- **`DocsMobileNav`** is a client component using `usePathname` and `useRouter().push` from `next/navigation`.
- Doc headings use **`font-[var(--font-display)]`** in `.doc-prose` to align with the showcase shell.

## Files touched (high level)

- `src/lib/navigation/docs-navigation.ts`, `docs-mobile-nav.tsx`, `app-sidebar.tsx`
- `src/app/docs/**` (layout, home, introduction, installation, concepts, rendering, contracts, best-practices, examples/textbook-agent, reference)
- `src/app/globals.css`, `src/app/page.tsx`
- `src/test/sidebar-navigation.test.tsx`

## Sync discipline

When changing docs IA or page titles, update **`docs-navigation.ts`** and matching routes in both **lectio** (Svelte) and **lectio_nextjs**; repos stay parallel copies (no shared package).

## Validation

Run from repo root:

`npm run validate`
