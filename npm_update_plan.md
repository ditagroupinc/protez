# План оновлення пакетів — protezfoundation.org

## Виконано (аудит: 19 → 1 вразливість)

- ✅ **Етап 0** — мінорні оновлення (autoprefixer, postcss, prettier, sass, next-intl тощо) + `npm audit fix` транзитивних; видалено невикористовувані @types/react-syntax-highlighter, postcss-loader. (19 → 12)
- ✅ **Етап 1** — typescript-eslint 6 → 8; точкові фікси лінтера в `app/api/mailchimp/route.ts` і `MailingList.tsx`. (12 → 7)
- ✅ **Етап 3** — nodemailer 6 → 9 + @types/nodemailer 8; фікс minimatch. Контакт-форма перевірена функціонально до рівня SMTP-auth (живу відправку перевірити на оточенні з реальними EMAIL/PASS). (7 → 5)
- ✅ **Етап 2а** (22.07.2026) — eslint-config-next → 15.5.21 (без peer на next, сумісний з eslint 8) + override `"next": { "postcss": "^8.5.14" }`. Верифіковано: lint, tsc, build, Playwright-смок `/` і `/ua`. (5 → 1)

Кожен виконаний етап верифіковано `npm run lint && npx tsc --noEmit && npm run build`.

## Залишилося: Етап 2б — Next 15.5.21 + React 19 (закриває останній high)

**Відкладено рішенням користувача (22.07.2026): breaking change.** Мінорної альтернативи немає: 14.2.35 — остання версія гілки 14.x (security-backports ідуть у 15.5.x), а App Router у Next 15 вимагає React 19.

Залишковий ризик next@14.2.35 до виконання: формально застосовні лише DoS-класу advisories (Server Components, Image Optimization); частково пом'якшені хостингом на Vercel. Bypass/SSRF/XSS-сценарії до проєкту незастосовні (немає Pages Router i18n, WebSockets, rewrites, CSP nonces, недовіреного вводу в beforeInteractive, server actions).

```
npm install next@15.5.21 react@^19 react-dom@^19
npm install -D @types/react@^19 @types/react-dom@^19 @types/node@^22
npm install react-slick@^0.31.0
```

Зміни коду:
1. **Тип `Params`** (`src/types/index.ts`) → `Promise<{ locale: string }>`; сторінки вже роблять `await Promise.resolve(params)` — спростити до `await params`. Зачеплені: `app/[locale]/layout.tsx` + 10 сторінок (`(home-with-menu)/page.tsx`, `thank-you`, `dytyache-protezuvannya`, `donate`, `stories/*`, `partners`, `academy/*`).
2. **react-slick 0.29 → 0.31** — підтримка React 19.
3. `next.config.js`: `experimental.scrollRestoration` у 15 ще валідний; `sassOptions.additionalData` перевірити на build.
4. **CLAUDE.md**: прибрати згадку framer-motion, оновити версії Next/TS.

Що НЕ потребує змін: next-intl 4 (peer `^15`), @vercel/analytics + speed-insights (peer `react ^19`, `next >=13`), react-countup (peer `>=16.3`), react-intersection-observer 9.16 (peer `^19` вже є), cheerio, mailchimp.

## Свідомо НЕ оновлюємо зараз

| Пакет | Причина |
|---|---|
| typescript 5.9.3 → 7.0.2 | Native TS 7 — надто свіжий для екосистеми; typescript-eslint/next поки цілять 5.x |
| eslint 8.57 → 9/10 + flat config | Окремий PR (рішення користувача); підготовка до Next 16 |
| eslint-config-prettier 9 → 10 | Разом з міграцією на flat config |
| react-intersection-observer 9 → 10 | 9.16 вже React-19-ready; major без потреби |
| @types/node → 26 | Вирівнюємо з Vercel runtime (22), а не з latest |
| Next 16.2.11 | Видалено `next lint`, Turbopack за замовчуванням — після завершення блоків рефактор-плану |
| nodemailer types 8 vs lib 9 | @types відстають від v9 — стежити за оновленням |

## Верифікація етапу 2б

1. `npm run lint && npx tsc --noEmit && npm run build`
2. `npm audit` — очікувано 0 вразливостей.
3. Playwright MCP smoke: `/` та `/ua` — hero, каруселі react-slick, лічильники react-countup, секції з intersection-observer.
4. API-роути: POST `/api/mailchimp`, `/api/contact` (форма), `/api/revalidate` (secret + revalidateTag 'wp').
5. WP-контент на головній (fetch `src/lib/api.ts` з revalidate 3600).

Окремий коміт/PR; **не комітити без явного прохання** (правило CLAUDE.md).
