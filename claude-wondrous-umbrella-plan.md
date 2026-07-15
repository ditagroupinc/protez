# SEO fixes для protezfoundation.org

## Context

Google Search Console надіслав повідомлення про індексаційні проблеми з 3xx-редіректами, ймовірно пов'язані з інтернаціоналізацією. Після аудиту виявлено:

**Що вже добре** (не чіпаємо):
- 9 із 10 підсторінок мають правильний per-page `generateMetadata` з canonical і hreflang.
- `app/sitemap.ts` перелічує обидві локалі з правильними `alternates.languages`.
- `app/robots.ts` дозволяє все, забороняє `/api/`.

**Що потрібно виправити:**

1. **SSR cookie-редірект `307` у `middleware.ts`** — головний підозрюваний за GSC-скаргу. Спрацьовує коли є cookie `NEXT_LOCALE=uk`; ламає CDN-кешування і реальні користувачі бачать редіректний hop. Googlebot без cookie його не бачить, але на Vercel Edge поведінка непередбачувана. `LanguageSelectionModal` уже вміє перемикати мову на клієнті через `router.replace(pathname, { locale })`, тож SSR-логіка зайва.
2. **`/thank-you` в sitemap, але має `noindex`** — GSC згенерує попередження «Submitted URL marked 'noindex'».
3. **Home page (`(home-with-menu)/page.tsx`)** не має власного `generateMetadata` — успадковує з root layout. Це працює, але немає локалізованого OG/description, немає `x-default` серед languages, тобто менше контролю.
4. **Дублювання коду в 8 файлах `generateMetadata`**: `SITE_URL`, побудова languages-мапи повторюються майже байт-в-байт. При наступному додаванні мови/сторінки — біль.
5. **Немає description** у 4-х сторінках: `stories/vadym-fedorov`, `stories/artem-svergun`, `academy/about`, `academy/terms-conditions`.
6. **Немає JSON-LD** `NonprofitOrganization` — втрачаємо knowledge panel і покращене відображення в SERP.
7. `host` у `app/robots.ts` — Yandex-специфіка, поза стандартом robots.txt.

**Мета:** прибрати всі повідомлення в GSC, зробити metadata DRY, підготувати ґрунт для richer SERP presence.

---

## Phase 1 — Sitemap і robots (швидкі виграші)

### Критичні файли
- `app/sitemap.ts:21` — прибрати запис `{ path: '/thank-you', … }`.
- `app/robots.ts` — додати `disallow: ['/api/', '/_next/', '/thank-you', '/ua/thank-you']`; прибрати рядок `host: …` (не існує в стандарті).

Побічний ефект: у сторінки `thank-you/page.tsx` уже стоїть `robots: { index: false, follow: false }` — тож `disallow` в robots.txt це прикриття другого рівня, не єдина захисна лінія.

---

## Phase 2 — SEO helper і refactor existing metadata

### Мотивація
Прибрати дублювання (`SITE_URL` + languages-map) з 8 файлів, зробити додавання нових локалей у майбутньому one-liner.

### Новий файл: `src/lib/seo.ts`

```ts
import type { Metadata } from 'next'

export const SITE_URL = 'https://www.protezfoundation.org'

/**
 * Builds absolute URL for a given locale + path.
 * path must start with '/' and refer to the EN version (without /ua prefix).
 */
export function localeUrl(locale: 'en' | 'uk', path: string): string {
  const clean = path === '/' ? '' : path
  return locale === 'uk' ? `${SITE_URL}/ua${clean}` : `${SITE_URL}${clean}`
}

/**
 * Builds alternates block for Next.js Metadata.
 * `path` is the EN path (e.g. '/donate', '/'), the helper handles /ua prefix.
 */
export function buildAlternates(locale: 'en' | 'uk', path: string): Metadata['alternates'] {
  return {
    canonical: locale === 'uk' ? `/ua${path === '/' ? '' : path}` : path,
    languages: {
      en: localeUrl('en', path),
      'uk-UA': localeUrl('uk', path),
      'x-default': localeUrl('en', path),
    },
  }
}
```

### Файли для рефакторингу (замінити локальний `SITE_URL` + `alternates.languages` на виклик helper)

- `app/[locale]/dytyache-protezuvannya/page.tsx`
- `app/[locale]/thank-you/page.tsx`
- `app/[locale]/(home-no-menu)/donate/page.tsx`
- `app/[locale]/(home-no-menu)/partners/page.tsx`
- `app/[locale]/(home-no-menu)/stories/vadym-fedorov/page.tsx`
- `app/[locale]/(home-no-menu)/stories/artem-svergun/page.tsx`
- `app/[locale]/academy/(with-menu)/page.tsx`
- `app/[locale]/academy/(no-menu)/about/page.tsx`
- `app/[locale]/academy/(no-menu)/terms-conditions/page.tsx`
- `app/[locale]/layout.tsx` — теж використати helper для root canonical/languages (path = `'/'`).

Патерн заміни в кожному файлі:
```ts
import { buildAlternates } from '@/lib/seo'
// ...
alternates: buildAlternates(locale as 'en' | 'uk', '/dytyache-protezuvannya'),
```

---

## Phase 3 — Додати відсутні `description` і home metadata

### Home page
Створити `generateMetadata` у `app/[locale]/(home-with-menu)/page.tsx`. Використати helper. Взяти title/description із root layout (перенести туди translation-based підхід через `getTranslations`, або залишити хардкод — тимчасово хардкод, у Phase 4 приберемо ще й root layout metadata частково). Додати OG.

### Відсутні description (користувач напише двомовні тексти)
Файли, куди додати `description` в `generateMetadata`:
- `app/[locale]/(home-no-menu)/stories/vadym-fedorov/page.tsx`
- `app/[locale]/(home-no-menu)/stories/artem-svergun/page.tsx`
- `app/[locale]/academy/(no-menu)/about/page.tsx`
- `app/[locale]/academy/(no-menu)/terms-conditions/page.tsx`

Формат: `description: isUk ? 'UA-текст…' : 'EN text…'`. Плейсхолдери під час імплементації — потім користувач замінить на реальні тексти в цих же файлах (або через translation keys, якщо він так забажає).

---

## Phase 4 — JSON-LD `NonprofitOrganization`

### Куди
У `app/[locale]/layout.tsx` між `<head>` тегом і GTM script додати `<Script id="ld-org" type="application/ld+json" strategy="beforeInteractive">` з organizatiton schema. Один блок на локаль, з локалізованою `description` та `inLanguage`.

### Мінімальна схема (розширюємо в міру потреби)

```ts
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NonprofitOrganization',
  name: 'Protez Foundation',
  url: SITE_URL,
  logo: `${SITE_URL}/protez-foundation-logo.png`, // TODO підтвердити реальний шлях у /public
  description,          // локалізований опис (той самий, що вже в metadata)
  inLanguage: isUk ? 'uk-UA' : 'en-US',
  sameAs: [
    // TODO взяти з src/sections/_shared/Footer/… (Facebook, Instagram, LinkedIn, YouTube тощо)
  ],
  // EIN / taxID / address — залишити TODO для користувача, він впише реальні дані
}
```

Данні для `sameAs` вичитаємо з `src/sections/_shared/Footer/` (там є соц-посилання). `taxID`/EIN — залишу placeholder-коментар, користувач впише реальне значення.

---

## Phase 5 — Прибрати SSR cookie-редірект з middleware

### Зміна в `middleware.ts`

**Було** (13 рядків): `intlMiddleware` + cookie 307 branch.
**Стане** (2 рядки):

```ts
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n'

export default createIntlMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

Видалити імпорт `NextRequest, NextResponse` і `LOCALE_COOKIE_NAME` (у `src/lib/i18n.ts` константа залишається — її використовує modal).

### Компенсуюча зміна в `LanguageSelectionModal/index.tsx`

Зараз модалка відкривається, тільки якщо cookie немає. Якщо cookie є і не збігається з поточною локаллю, робимо клієнтський `router.replace(pathname, { locale: savedLocale })` на mount (без відкриття модалки). Це відтворює поведінку старого middleware, але без 3xx на серверному рівні.

Псевдокод:
```ts
useEffect(() => {
  const savedMatch = document.cookie.match(/(?:^|; )NEXT_LOCALE=(en|uk)/)
  const saved = savedMatch?.[1] as Locale | undefined

  if (!saved) {
    setIsOpen(true) // існуюча поведінка — показуємо модалку
    return
  }

  if (saved !== locale) {
    router.replace(pathname, { locale: saved }) // клієнтський перехід, без SSR-редіректу
  }
}, [])
```

---

## Verification (для всіх phases)

1. `npm run lint && npx tsc --noEmit` — без помилок.
2. `npm run dev` → відкрити:
   - `http://localhost:3000/` — переглянути `view-source:`, знайти `<link rel="canonical" href=".../">`, `<link rel="alternate" hreflang="en">`, `hreflang="uk-UA"`, `hreflang="x-default">`. Також JSON-LD блок.
   - `http://localhost:3000/ua` — canonical має бути `.../ua`, languages ті самі три.
   - `http://localhost:3000/dytyache-protezuvannya` — canonical `.../dytyache-protezuvannya`, hreflang на обидві локалі.
   - Аналогічно для `/donate`, `/partners`, `/academy`, `/academy/about`, `/academy/terms-conditions`, `/stories/vadym-fedorov`, `/stories/artem-svergun`, `/thank-you` та їх UK-аналогів.
   - `/thank-you` — має мати `<meta name="robots" content="noindex, nofollow">`.
3. Sitemap: `curl http://localhost:3000/sitemap.xml` — переконатися, що `/thank-you` та `/ua/thank-you` **відсутні**. Всі інші URL присутні для обох локалей.
4. Robots: `curl http://localhost:3000/robots.txt` — `Disallow: /thank-you` є, `Host:` — немає.
5. Middleware поведінка:
   - `curl -I -H "Cookie: NEXT_LOCALE=uk" http://localhost:3000/donate` — має повернути **`200`**, не `307` (redirect більше не робиться на сервері).
   - У браузері з cookie `NEXT_LOCALE=uk` зайти на `/donate` — має відбутися **клієнтський** перехід на `/ua/donate` (URL змінюється у адрес-барі без hard-navigation).
   - Перший візит (без cookie) — модалка вибору мови відкривається як раніше.
6. Google Rich Results Test (`https://search.google.com/test/rich-results`): вставити URL прод-сайту (після деплою) → перевірити, що `NonprofitOrganization` схема детектиться без помилок.
7. Через 1-2 тижні після деплою в GSC перевірити:
   - Page Indexing → скарги про «Page with redirect» / «Alternate page with canonical» мають зменшитися.
   - Sitemap → «Submitted URL marked noindex» має зникнути.

---

## Що навмисно **не** робимо

- Не перекладаємо metadata через translation keys масово (можна в наступній ітерації). Зараз залишаємо `isUk ? '…' : '…'` inline, як у більшості файлів.
- Не змінюємо `en` → `en-US` у hreflang (Google обидва варіанти сприймає, зміна не критична).
- Не додаємо structured data для окремих сторінок (Article, Event, Person). Тільки Organization на цьому етапі.
- Не міняємо `next.config.js` redirects — вони старі, стабільні, `permanent: true` (`308`), Google це любить.
- Не рухаємо favicon/apple-touch-icon шляхи — вони вже в root layout.
