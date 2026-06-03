# Language Selection Modal (First Visit)

## Context

На сайті `protezfoundation.org` зараз мова визначається або URL-префіксом (`/` = EN, `/ua` = UK), або автоматичним geo-редіректом у middleware (UA IP → `/ua`). Це неявно — користувач не контролює вибір, а UA-українець, який хоче читати англійською, отримує редірект.

Мета: показати першому відвідувачу блокуючу модалку з вибором мови (UA / EN). Вибір зберігається, при наступних візитах модалка не показується. Geo-редірект прибирається — модалка стає єдиним джерелом істини для першого вибору.

Persistence: **cookie `NEXT_LOCALE`** (її next-intl router виставляє автоматично при `router.replace({ locale })`) + **localStorage `langChoice`** (явний прапор «модалку бачив»).

## Compatibility constraint (важливо)

Цей план **сумісний з Сесією 9.3** (`bundle-optimization-plan.md`), яка робить усі сторінки `force-static` / `revalidate = 3600`. Тому:

- **НЕ використовуємо `cookies()` з `next/headers` у layout** — це opt-out зі SSG і зламає `force-static`.
- Замість серверного читання cookie — **inline `<script>` у `<body>` (runs synchronously before paint)** перевіряє `document.cookie` і виставляє клас `lang-chosen` на `<html>`. CSS ховає модалку за цим класом → нуль флешу для повторних відвідувачів, без шкоди для SSG.
- Модалка завжди в HTML (статичний markup), але прихована CSS поки не підтверджено відсутність cookie.

Trade-off: ~120 байт inline JS у `<body>`. У повторного відвідувача модалка не моргає (CSS-клас встановлюється до першого paint). У першого — модалка показується нормально.

## Approach

1. **Inline pre-check script** у `<body>` `app/[locale]/layout.tsx` синхронно читає `document.cookie`. Якщо `NEXT_LOCALE` присутній — додає клас `lang-chosen` на `<html>` до першого paint.
2. **`<LanguageSelectionModal />` рендериться завжди** (unconditional) у layout. SCSS-правило `html.lang-chosen .overlay { display: none }` ховає її для повторних відвідувачів.
3. **Client-side модалка** на mount читає `document.cookie` + `localStorage.langChoice` і виставляє `isOpen` згідно з реальністю (на випадок коли pre-check script не встиг, fallback).
4. **При кліку** — модалка пише `langChoice` у localStorage, і якщо обрана мова відрізняється від поточної локалі URL → `router.replace(pathname, { locale: chosen })` (next-intl сам виставить `NEXT_LOCALE` cookie). Якщо мова збігається — manually set cookie + закрити модалку.
5. **Прибрати geo-redirect** з `middleware.ts` — модалка тепер відповідає за перший вибір.

## Files

### 1. `middleware.ts` — повністю прибрати geo-redirect

Видалити блок `if (pathname === '/' && !request.cookies.get('NEXT_LOCALE')) {...}` (рядки 8–19), а також невикористовувані імпорти `NextRequest`, `NextResponse`. Перевірено: `x-vercel-ip-country` / `request.geo` ніде більше в коді не використовується (`src/`, `app/`) — це повне очищення IP/edge детекції локації.

Залишається лише:

```ts
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n'

export default createIntlMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

### 2. `app/[locale]/layout.tsx` — inline pre-check + модалка

- **НЕ** імпортувати `cookies` з `next/headers`.
- Усередині `<body>` (перед `<NextIntlClientProvider>`) додати inline script:
  ```tsx
  <script
    dangerouslySetInnerHTML={{
      __html: `try{if(document.cookie.indexOf('NEXT_LOCALE=')>-1)document.documentElement.classList.add('lang-chosen')}catch(e){}`,
    }}
  />
  ```
  Це звичайний raw `<script>`, синхронний, виконується інлайн при парсингу HTML. Жодного впливу на SSG: layout залишається повністю статичним.
- Усередині `<NextIntlClientProvider>` після `{children}` додати безумовно:
  ```tsx
  <LanguageSelectionModal />
  ```
- Імпорт: `import LanguageSelectionModal from '@/components/LanguageSelectionModal'`.

Layout лишається RSC, без dynamic API → `force-static` / `revalidate` з Сесії 9.3 продовжують працювати.

### 3. **NEW** `src/components/LanguageSelectionModal/index.tsx` — модалка

Client Component. Логіка:

- `'use client'` directive.
- Стан `isOpen` ініціалізується через **lazy initializer**, який синхронно читає `document.cookie`:
  ```ts
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof document === 'undefined') return true // SSR: лишаємо в DOM
    return !document.cookie.includes('NEXT_LOCALE=')
  })
  ```
  - На сервері: `isOpen = true` → markup завжди є.
  - На клієнті при першому рендері: якщо cookie є → одразу `false`, React не покаже overlay; CSS-клас `lang-chosen` додатково гарантує, що навіть до hydration overlay не блимне.
- Якщо `isOpen === false` → рендерити `null` (модалка взагалі не у DOM після hydration, чисто).
- Використати `useLocale()`, `useRouter()`, `usePathname()` з `@/lib/i18n` (той самий патерн, що в Header `switchLocale`, файл `src/sections/_shared/Header/index.tsx:1-50`).
- `useEffect` додає `no-scroll` клас на `<body>` поки `isOpen`, прибирає при анмаунті/закритті (клас вже є в `app/globals.css:143`).
- Функція `handleChoose(chosen: 'en' | 'uk')`:
  ```ts
  // localStorage flag (за вимогою)
  localStorage.setItem('langChoice', chosen)

  if (chosen !== locale) {
    // next-intl router сам виставить NEXT_LOCALE cookie
    startTransition(() => {
      router.replace(pathname, { locale: chosen })
    })
  } else {
    // Та сама мова — manually set cookie, щоб наступний візит не показав модалку
    document.cookie = `NEXT_LOCALE=${chosen}; path=/; max-age=31536000; samesite=lax`
  }

  // Виставити клас на <html> одразу, щоб не залежати від reload
  document.documentElement.classList.add('lang-chosen')
  setIsOpen(false)
  ```
- Розмітка: full-screen fixed overlay (`position: fixed; inset: 0; z-index: 9999`) + центрований картковий контент.
- Текст у двох мовах (hardcoded, не через `useTranslations` — обидві мови показуються одночасно):
  - Заголовок: `Welcome / Вітаємо`
  - Підзаголовок: `Please choose your language / Будь ласка, оберіть мову`
  - Кнопки: `English` / `Українська` (рівні за вагою).
- Кнопки переюзують `Button` з `@/components/Button` (вже є в проекті).
- НЕ закривається по escape / outside click — це блокуюча модалка.

### 4. **NEW** `src/components/LanguageSelectionModal/styles.module.scss`

- `.overlay` — `position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.7); display: flex; align-items: center; justify-content: center;`
- `.card` — біла картка, padding, border-radius, max-width ~480px, текст по центру.
- `.title`, `.subtitle`, `.actions` (flex з gap для кнопок).
- Адаптив для mobile (≤ 600px) — стек кнопок вертикально, менші відступи.

### 5. **NEW** правило в `app/globals.css` (або `src/styles/_lang-modal.scss`)

Глобальне правило ховає overlay для відвідувачів з cookie до hydration (працює з класом, який додає inline pre-check script):

```css
html.lang-chosen [data-lang-modal] {
  display: none !important;
}
```

У модалці на root-overlay додати `data-lang-modal=""` — це селектор, який не залежить від CSS modules hash.

## Behavior matrix

Усі публічні сторінки живуть під `app/[locale]/*` (`/`, `/ua`, `/academy`, `/ua/academy`, `/donate`, `/ua/donate`, `/partners`, `/stories/*`, `/thank-you` тощо). Це означає: **модалка показується на ПЕРШІЙ сторінці незалежно від того, чи це home, academy, donate чи deep link** — бо всі вони використовують `app/[locale]/layout.tsx`.

| Сценарій | Що бачить юзер |
|---|---|
| Перший візит на `/` (cookie немає) | Inline script не додає клас → модалка видима → обирає UA → cookie+localStorage → `router.replace` на `/ua` |
| Перший візит на `/` → обирає EN | Модалка → клік EN → cookie+localStorage → модалка закривається, навігації нема |
| Перший візит deep link `/academy` | Модалка показується ПОВЕРХ academy → обирає EN → лишається на `/academy`; обирає UK → `router.replace` на `/ua/academy` |
| Перший візит deep link `/ua/donate` | Модалка показується поверх UK-donate → обирає UK → лишається на `/ua/donate`; обирає EN → `router.replace` на `/donate` |
| Перший візит на `/stories/artem-svergun` | Та сама логіка — модалка → вибір → потенційний `router.replace` зберігає шлях, лише міняє префікс |
| Повторний візит (cookie є) | Inline script додає `lang-chosen` клас → CSS ховає overlay до hydration → нуль флешу. React lazy state бачить cookie → `isOpen = false` → overlay не у DOM після hydration |
| Cookie видалив, localStorage є | Модалка покажеться — юзер просто повторить вибір. Прийнятний edge case. |
| JS вимкнено | Inline script не виконається → CSS-клас не додасться → overlay видимий завжди. Модалка не функціональна (кнопки бездіяльні), але контент за нею НЕ заблокований візуально (overlay просто перекриває). Trade-off прийнятний — ~0.2% користувачів без JS. |
| API routes (`/api/contact` тощо) | Модалка НЕ застосовна — це не сторінки. Жодного впливу. |

**Ключова деталь:** `router.replace(pathname, { locale: chosen })` з next-intl автоматично робить переклад шляху (наприклад `/academy` ↔ `/ua/academy`), тому користувач лишається на тій самій сторінці, лише міняється локаль.

## SSG / ISR compatibility check

Після впровадження плану:

- `app/[locale]/layout.tsx` НЕ використовує `cookies()`, `headers()`, `searchParams` → залишається статично-сумісним.
- `npm run build` має показувати ті самі `○` / `●` маркери, що й після Сесії 9.3:
  - `/` і `/ua` → `●` (ISR, revalidate 3600).
  - Решта 8 маршрутів × 2 локалі → `○` (Static).
- Якщо хтось у майбутньому додасть `cookies()` у layout — білд почне показувати `λ` (Dynamic), що буде явним сигналом про регресію.

## Verification

1. **TypeScript**: `npx tsc --noEmit` — без помилок.
2. **Lint**: `npm run lint` — чисто.
3. **Format**: `npm run format`.
4. **Build markers (критично):** `npm run build` — переконатися, що `/`, `/ua` показуються як `●` (ISR), решта 16 маршрутів як `○` (Static). Якщо хоч одна сторінка стала `λ` — модалка десь зачепила dynamic API, треба знайти й винести в client.
5. **Dev**: `npm run dev`, потім вручну (або через Playwright MCP):
   - Очистити cookies+localStorage → відкрити `localhost:3000` → переконатись, що модалка блокує, скрол заблокований.
   - Клік "Українська" → URL стає `/ua`, контент UK, модалки нема. Перевірити `document.cookie` має `NEXT_LOCALE=uk`, `localStorage.langChoice === 'uk'`.
   - Перезавантажити сторінку → модалки нема, **нуль флешу** (через DevTools Slow 3G throttling переконатись, що overlay ніколи не зʼявляється навіть на мить).
   - Очистити лише cookies → reload → модалка повертається.
   - Натиснути EN на `/ua` → URL стає `/`, контент EN, cookie оновлюється.
6. **Pre-check script:** у DevTools Elements → переконатися, що `<html class="lang-chosen">` зʼявляється для відвідувачів з cookie, відсутній — без cookie.
7. **Geo-redirect**: переконатись, що UA-VPN відвідувач НЕ редіректиться автоматично з `/` на `/ua` (модалка має зʼявитись на `/`).
8. **No-JS smoke (опційно):** вимкнути JS у DevTools → overlay видимий (acceptable), решта сторінки читабельна за overlay через scroll (acceptable trade-off для ~0.2% користувачів).

## Files to touch (summary)

- ✏️ `middleware.ts` — видалити блок geo-redirect.
- ✏️ `app/[locale]/layout.tsx` — додати inline pre-check `<script>` + безумовний `<LanguageSelectionModal />`. **БЕЗ `cookies()`.**
- ✏️ `app/globals.css` — додати правило `html.lang-chosen [data-lang-modal] { display: none !important }`.
- ➕ `src/components/LanguageSelectionModal/index.tsx` — нова модалка з lazy `useState` initializer.
- ➕ `src/components/LanguageSelectionModal/styles.module.scss` — нові стилі.

## Out of scope

- Cookie banner / GDPR consent — `NEXT_LOCALE` це functional cookie, не вимагає consent.
- Зберігати вибір мови у user profile / WP — поза рамками.
- A/B test тексту модалки — поза рамками.
- Аналітика події `language_chosen` — можна додати потім через GTM dataLayer push, не критично для MVP.
- Server-side cookie read через PPR (Next 15+) — коли проект мігрує на Next 15 з PPR в стейблі, можна перенести cookie-read у Suspense-wrapped Server Component і прибрати inline script. Поки лишаємо pure-client як найпростіший SSG-сумісний варіант.
