# Protez Foundation

Marketing site for [protezfoundation.org](https://www.protezfoundation.org) — a 501(c)(3) nonprofit providing prosthetics and rehabilitation to Ukrainians affected by the war.

## Stack

- **Next.js 14** (App Router) + **TypeScript** (`strict: true`)
- **next-intl** for i18n — English at `/`, Ukrainian at `/ua`
- **WordPress GraphQL** for homepage Events. See the [data map](.agent-guidance/data-map.md) for the other content sources and their consumers.
- **SCSS modules** for styles, **react-slick** for carousels, **react-countup** + **react-intersection-observer** for scroll-driven UI
- **Mailchimp** for newsletter signup, **Nodemailer** (Gmail) for `/api/contact`
- **GTM** + **Facebook Pixel** analytics, **Vercel Analytics** + **Speed Insights**
- Hosted on **Vercel**

## Getting started

```sh
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` for the integrations you need, then open <http://localhost:3000>.

With Vercel project access, use `vercel link` and `vercel env pull .env.local` to obtain the configured environment instead. Missing WordPress configuration omits homepage Events; Mailchimp and email delivery require their own credentials. Localized content and static assets are stored in the repository.

## Scripts

See [package.json](package.json) for commands and lifecycle hooks. Use the [testing guide](.agent-guidance/testing.md) to select checks for a change.

## URL structure

- `/` → English homepage
- `/ua` → Ukrainian homepage
- `/<page>` → English, `/ua/<page>` → Ukrainian (e.g. `/academy`, `/ua/academy`)
- Legacy camelCase redirects are defined in [next.config.js](next.config.js); [middleware.ts](middleware.ts) handles locale routing.

Rendering and revalidation are configured per page under `app/[locale]/`; inspect the affected route's exports when changing its data or caching.

## Environment variables

| Var | Purpose |
| --- | --- |
| `WORDPRESS_API_URL` | WordPress GraphQL endpoint |
| `WORDPRESS_AUTH_REFRESH_TOKEN` | Optional value sent directly as a Bearer token to WordPress |
| `GTM_ID` | Google Tag Manager container ID |
| `FACEBOOK_PIXEL_ID` | Facebook Pixel ID read by `src/lib/fpixel.ts` |
| `MAILCHIMP_API_KEY` | Mailchimp API key (newsletter) |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp audience ID; the API route currently fixes the datacenter to `us8` |
| `EMAIL`, `PASS` | Gmail sender account and password used by Nodemailer |
| `ENVIRONMENT` | `pages` selects the `/protez/` video-path prefix in `ProtezVideo` |

[.env.example](.env.example) lists these names. `FACEBOOK_PIXEL_ID` and `ENVIRONMENT` are also read through client imports; their availability in browser code needs verification before relying on those settings.

## Repo layout

- `app/` — App Router routes. All page routes live under `app/[locale]/`. Layout sets locale, fonts, GTM, analytics. Two API routes: `/api/contact`, `/api/mailchimp`.
- `src/sections/` — page sections and shared header/footer/form sections.
- `src/components/` — shared UI components.
- `src/islands/` — client wrappers for runtime dependencies such as carousels.
- `src/hooks/` — shared hooks and generated title lookups; see the data map for asset generation.
- `src/lib/` — mixed server and browser utilities, including WordPress fetching, subscription helpers, locale navigation and analytics. Determine the boundary from the function and its imports.
- `src/utils/` — CMS loading/parsing and shared helpers.
- `messages/` — localized content and translations grouped by surface area.
- `public/` — static assets

## Development guidance

Start with [AGENTS.md](AGENTS.md) for shared working rules. Use the [context map](.agent-guidance/context-map.md) to find entry points for a task, the data map for content contracts, and the testing guide for verification. Path aliases and formatting/lint rules live in the repository configuration files.
