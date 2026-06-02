# Protez Foundation — Claude Code instructions

## Project

`protezfoundation.org` — marketing site for a 501(c)(3) nonprofit providing prosthetics and rehab to Ukrainians affected by the war. Static pages + dynamic WordPress content (news, events, press, stats).

## Stack

- **Next.js 14.2.35** (App Router) + **TypeScript 5.2.2** (`strict: true`). Node ≥ 18, npm, hosted on Vercel.
- Fonts: **Nunito Sans** via `next/font/google` (`app/fonts.ts`); local Playfair Display Italic used only in `SampleProsthesesCosts`.
- i18n: custom `LanguageContext` (React Context + `localStorage`) — being migrated to `next-intl` with `/` = EN, `/ua` = UK.
- WordPress GraphQL via `src/lib/api.ts → fetchAPI`; HTML parsed with `cheerio`. WP fetches happen only in `app/page.tsx` via `src/utils/getPosts.ts`.
- Integrations: Mailchimp (`app/api/mailchimp`), Nodemailer (`app/api/contact`), GTM + Facebook Pixel (`app/layout.tsx`).
- UI/animation: `framer-motion`, `react-slick` + `slick-carousel`, `react-countup`, `react-intersection-observer`.

## Path aliases

- `@/*` → `./src/*`
- `@academy/*` → `./app/academy/*`

## Commands

- `npm run dev` — dev server :3000 (prestart runs `generate:academy-titles`).
- `npm run build` / `npm start`.
- `npm run lint`, `npx tsc --noEmit`, `npm run format` (Prettier).
- `npm run generate:academy-titles` — regenerates `src/hooks/academyTitles.generated.ts` from SVGs in `public/academyPage/titles/`.

## Structure

- `app/` — App Router. Most `page.tsx` are Client Components solely because of `LanguageContext`. A duplicated `app/academy/sections/` + `app/academy/components/` exists alongside `src/sections/` — to be consolidated (refactor Block 3).
- `src/sections/protez/{1-…17-}<Name>` — home sections with numeric prefixes (to be removed).
- `src/components/` — shared: `Button`, `Typography`, `ProtezImage`, `ProtezVideo`, `Section`, `Divider`, `TextAppearanceWrapper`, `FacebookPixelEvents`, `FullScreenFallback`, `SuspenseSection`, `VideoAndFilter`.
- `src/hooks/use*Texts*.ts` — bilingual texts. `academyTitles.generated.ts` is **auto-generated; do not edit manually**.
- `messages/{en,uk}.json` + `messages/{academy-about,donations,termsConditions}.{en,uk}.json` — JSON translations. ~49 inline `{english, ukrainian}` objects still exist (to be unified in Block 6).
- `scripts/generate-academy-titles.mjs` — runs via `predev`/`prebuild`. Do not disable.

## Code conventions

- **Prettier:** no `;`, single quotes, `printWidth: 100`, `trailingComma: 'es5'`, `arrowParens: 'avoid'`. Run `npm run format`, don't hand-align.
- **ESLint:**
  - `no-console: error` (only `console.warn`/`console.error` allowed).
  - `@typescript-eslint/no-unused-vars` strict; `_`-prefixed args ignored.
  - `padding-line-between-statements` — blank line before every `return` and after `const/let/var` blocks.
- **TypeScript:** strict. Avoid `any` (`no-explicit-any` warns).
- **`'use client'`:** only where actually needed. Refactor goal: minimize Client Components.

## Active refactor

**`protez-refactor-plan.md` at repo root is the single source of truth** for the architectural refactor (i18n + `/` + `/ua` URLs, RSC, section consolidation, SCSS → Tailwind, on-demand WP revalidate, `next/image`, SEO/sitemap). Split into 8 independent PR blocks. Read the relevant block before touching its scope and run its checks (lint + `tsc --noEmit` + Playwright MCP smoke).

## Known quirks

- `useAcademyTitle` (`src/hooks/`) auto-swaps the mobile asset into the `desktop` field when viewport ≤ 800px — 14 consumer sections need no changes.

## Working language

Ukrainian. When changing UI copy or form messages, update **both locales (en + uk)** at once.

## NEVER MAKE COMITS UNLESS ASKED EXPLICITLY
