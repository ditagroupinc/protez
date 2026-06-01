# Архітектурний рефакторинг Protez Foundation

> **Single source of truth** для цього рефакторингу. Усі рішення, кроки й перевірки — тут.

## Загальна ціль

Сайт `protezfoundation.org` (Next.js 14 App Router) зараз має кілька системних проблем, які блокують перформанс, SEO й подальший розвиток:

1. **Майже все — Client Components.** Кожен `app/*/page.tsx` починається з `'use client'` лише тому, що сторінки доступаються до кастомного `LanguageContext` (React Context + `localStorage`). Це блокує SSG, гідрує весь застосунок на клієнті, погіршує LCP/FCP.
2. **Кастомна i18n без URL-сегментів.** `<html lang="en">` зашитий статично, метадані лише англійською, `hreflang` вказує на неіснуючий `/uk`. SEO для українського контенту нульовий. Дві паралельні схеми перекладів: JSON-файли в `/messages/*` та inline-обʼєкти `{english, ukrainian}` у ~49 місцях.
3. **Секції розкидані по чотирьох локаціях** (`/src/sections/`, `/src/sections/protez/1-…17-`, `/app/academy/sections/`, inline у деяких `page.tsx`) з реальними дублями (Header, Footer, OurResults, SpecialThanksToAllOurPartners).
4. **Перформанс-борги:** 1 виклик `next/image` із ~128 `<img>`, Nunito Sans у всіх 9 вагах × 2 стилі, `lodash` (1 використання), дві бібліотеки visibility (`react-visibility-sensor` + `react-intersection-observer`), `framer-motion` без lazy-load, Tailwind встановлений, але майже не використовується (71 `.module.scss`, ~0 Tailwind utility у JSX), нема Vercel Analytics / Speed Insights.
5. **WordPress дані** кешуються лише 2 хвилини без on-demand revalidation.
6. **Мертва гілка `main-for-pages`** з `output: 'export'` для GitHub Pages, тримає `next.config.js` галузями.

### Цільовий стан
- `next-intl` із URL `/` (англійська за замовчуванням, **без префіксу**) + `/ua/...` (українська).
- Усі page.tsx — Server Components (SSG для статичних сторінок, ISR для головної з on-demand revalidate).
- Усі секції під єдиним патерном `/src/sections/<page>/`, без дублів.
- SCSS Modules як єдиний підхід до стилів; Tailwind видалений; спільні змінні/breakpoints у `src/styles/`.
- Усі зображення через `next/image`, шрифти trim, deps очищені, Vercel Analytics + Speed Insights увімкнені.
- WordPress дані: `revalidate: 3600` + `/api/revalidate` з secret.
- Лише Vercel-деплой, гілка `main-for-pages` видалена.

## URL-стратегія (мінімізація SEO-втрат)

**Англомовні URL не змінюються:** `/`, `/academy`, `/academy/about`, `/academy/terms-conditions`, `/donate`, `/partners`. Усі backlinks, GA-історія, Google Search Console — без розриву.

**Українська локаль під префіксом `/ua`:** `/ua/academy`, `/ua/donate` тощо.

Технічно це досягається через `next-intl` із `localePrefix: { mode: 'as-needed', prefixes: { uk: '/ua' } }`. У коді ISO-локалі лишаються стандартні (`en`, `uk`); префікс URL для української — `/ua` (зрозуміліше для української аудиторії). `<html lang>` приймає `en` або `uk` відповідно; hreflang — `en`, `uk-UA`, `x-default` → англійський.

**Винятки — переіменування з 308 редиректами (Блок 7):**
- `/VadymFedorov` → `/stories/vadym-fedorov`
- `/ArtemSvergun` → `/stories/artem-svergun`
- `/thankYou` → `/thank-you`

Українські копії існують лише за новими шляхами (`/ua/stories/vadym-fedorov` і т.д.) — старих українських URL у пошуковій видачі немає.

**Geo-redirect:** middleware виконує редирект лише при першому візиті на `/` без cookie `NEXT_LOCALE`. Якщо Vercel-header `x-vercel-ip-country === 'UA'` — на `/ua`. Інакше — нічого не робить. Cookie фіксує вибір користувача.

## Технічний стек і ключові факти

- **Framework:** Next.js 14.2.35, App Router, TypeScript 5.2.2.
- **Стилі:** 71 SCSS-модуль + майже невикористаний Tailwind 3.3.1 (прибираємо Tailwind, нормалізуємо SCSS-архітектуру).
- **Шрифт:** Nunito Sans з `next/font/google` (`app/fonts.ts`).
- **Дані:** WordPress GraphQL через `src/lib/api.ts` (`fetchAPI`). Викликається лише з `app/page.tsx` через `src/utils/getPosts.ts`. HTML парсимо через `cheerio`.
- **Інтеграції:** Mailchimp (`app/api/mailchimp`), Nodemailer (`app/api/contact`), GTM + Facebook Pixel у `app/layout.tsx`.
- **Мови:** 2 (English, Ukrainian). Існуючі JSON: `messages/{en,uk}.json`, `messages/{academy-about,donations,termsConditions}.{en,uk}.json`.
- **Маршрути:** `/`, `/donate`, `/partners`, `/academy`, `/academy/about`, `/academy/terms-conditions`, `/VadymFedorov`, `/ArtemSvergun`, `/thankYou`.
- **CI/CD:** Vercel.

## Як працювати з цим документом

Рефакторинг розбито на **8 незалежних блоків**. Кожен блок виконується як **окрема Claude Code сесія**:

1. **На початку сесії** прочитати розділи «Загальна ціль», «URL-стратегія», «Технічний стек» цього файлу, а також блок-специфічний підрозділ «Контекст блоку» й «Підготовка».
2. **Виконати кроки** з підрозділу «План виконання».
3. **Завершити сесію** трьома обовʼязковими перевірками з підрозділу «Перевірка»:
   - **ESLint:** `npm run lint` — без warnings/errors.
   - **TypeScript:** `npx tsc --noEmit` — без errors.
   - **Playwright MCP:** ручний smoke-тест через `mcp__playwright__browser_*` — конкретний сценарій описаний у кожному блоці.

### Спільні умови перевірки
- Перед Playwright-перевіркою запустити dev-сервер у фоні: `npm run dev` (порт 3000).
- Після Playwright-перевірки закрити браузер: `mcp__playwright__browser_close`.
- Якщо будь-яка з трьох перевірок не зелена — **не закривати сесію**, виправити, повторити.

### Граф залежностей між блоками
```
Блок 1 ─────────────────────────────┐
Блок 2 ─────────────────────────────┤
Блок 3 ──┐                          ├──► Блок 8
Блок 4 ──┤                          │
Блок 5 ──┤                          │
         └──► Блок 6 ──► Блок 7 ────┘
```
Блоки 1–5 повністю незалежні; виконуються в будь-якому порядку. Блок 6 робиться після 3 (структура секцій) і бажано після 5 (стилі). Блок 7 — одразу після 6. Блок 8 — у самому кінці.

### Рекомендована послідовність випуску
1. **PR #1 — Блок 1:** Cleanup + Analytics
2. **PR #2 — Блок 2:** WordPress кеш + on-demand revalidate
3. **PR #3 — Блок 3:** Консолідація секцій
4. **PR #4 — Блок 5:** Прибирання Tailwind + нормалізація SCSS
5. **PR #5 — Блок 4:** `next/image`
6. **PR #6 — Блок 6:** i18n + RSC + middleware
7. **PR #7 — Блок 7:** SEO + редиректи + sitemap
8. **PR #8 — Блок 8:** Фінальне прибирання

---

## Блок 1 — Швидкий cleanup і аналітика

### Контекст блоку
Найменш ризиковий блок. Прибираємо мертвий код, важкі залежності, оновлюємо шрифт; додаємо Vercel Analytics і Speed Insights, щоб мати baseline-метрики перед більшими блоками. Без візуальних змін.

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Переглянути: `package.json`, `next.config.js`, `app/layout.tsx`, `app/fonts.ts`, `app/academy/sections/Academy/index.tsx` (єдине використання `lodash`).

### План виконання
1. Видалити гілку `main-for-pages` локально й на remote.
2. У `next.config.js` прибрати галузі `environment === 'pages'`: видалити `basePath`, виставити `output` без умови (взагалі прибрати), `images.unoptimized` теж прибрати.
3. У `app/fonts.ts` для Nunito Sans лишити лише ваги `400, 600, 700, 900` із subset `['latin', 'latin-ext', 'cyrillic']`.
4. `npm install @vercel/analytics @vercel/speed-insights`.
5. У `app/layout.tsx` додати `<Analytics />` із `@vercel/analytics/next` і `<SpeedInsights />` із `@vercel/speed-insights/next` всередині `<body>`.
6. Знайти єдине використання `lodash` у `app/academy/sections/Academy/index.tsx` і замінити на нативний еквівалент.
7. Знайти використання `react-visibility-sensor` і переписати на `react-intersection-observer` (вже в deps).
8. `npm rm lodash @types/lodash react-visibility-sensor`.

### Перевірка
- **ESLint:** `npm run lint` — без warnings/errors.
- **TypeScript:** `npx tsc --noEmit` — без errors.
- **Playwright MCP:**
  1. `mcp__playwright__browser_navigate` → `http://localhost:3000/`.
  2. `mcp__playwright__browser_console_messages` — жодних помилок 4xx/5xx чи uncaught exceptions.
  3. `mcp__playwright__browser_network_requests` — підтвердити, що є виклик `/_vercel/insights/*` (Analytics) і `/_vercel/speed-insights/*` (Speed Insights).
  4. `mcp__playwright__browser_snapshot` — головна рендериться, ключові секції присутні.
  5. `mcp__playwright__browser_close`.

---

## Блок 2 — WordPress кеш + on-demand revalidate

### Контекст блоку
WordPress дані зараз кешуються лише 2 хвилини, що змушує сервер регулярно ходити в WP. Збільшуємо ISR до 1 години + додаємо `/api/revalidate` для негайного скидання кешу за webhook з WordPress. Видаляємо BigDataCloud — країну беремо з Vercel-header.

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Переглянути: `src/lib/api.ts`, `src/utils/getPosts.ts`, `src/utils/getCurrentCountry.ts`, `app/page.tsx`.

### План виконання
1. У `src/lib/api.ts` у `fetchAPI` замінити `next: { revalidate: 120 }` на `next: { revalidate: 3600, tags: ['wp'] }`.
2. Створити `app/api/revalidate/route.ts` (POST): зчитує `secret` (env `REVALIDATE_SECRET`) і body `{ tag?: string, path?: string }`; повертає 401 при невалідному secret; інакше викликає `revalidateTag(tag)` або `revalidatePath(path)`; повертає `{ revalidated: true, now: Date.now() }`.
3. У `.env.example` додати `REVALIDATE_SECRET=`.
4. Видалити `src/utils/getCurrentCountry.ts` і його використання в `app/page.tsx`. Якщо потрібно, у `app/page.tsx` зчитати країну з `headers().get('x-vercel-ip-country')`. Інакше повністю прибрати параметр `country`.
5. Видалити sub-section, що передавалися як `country` далі, або задефолтити.

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Playwright MCP:**
  1. `mcp__playwright__browser_navigate` → `http://localhost:3000/`.
  2. `mcp__playwright__browser_snapshot` — переконатися, що WordPress-секції (News, Events, Press Release, Statistics) присутні з контентом.
  3. `mcp__playwright__browser_network_request` → POST на `http://localhost:3000/api/revalidate` із body `{"secret":"<тест>","tag":"wp"}` → очікувати 200 + `{revalidated:true,...}`.
  4. `mcp__playwright__browser_network_request` → POST на той самий endpoint із порожнім secret → очікувати 401.
  5. `mcp__playwright__browser_close`.

---

## Блок 3 — Консолідація секцій

### Контекст блоку
Секції розкидані по 4 локаціях із реальними дублями (Header, Footer, OurResults, SpecialThanksToAllOurPartners). Зводимо все до єдиного патерну `/src/sections/<page>/`, ліквідуємо дублі, витягуємо inline-JSX зі сторінок у нормальні секції. Логіку компонентів не міняємо — лише переміщуємо й мерджимо дублі.

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Переглянути дерево: `src/sections/`, `app/academy/sections/`, `app/academy/components/`, `app/academy/about/sections/`, `app/donate/page.tsx`, `app/partners/page.tsx`, `app/VadymFedorov/page.tsx`, `app/ArtemSvergun/page.tsx`, `app/thankYou/page.tsx`.

### План виконання
Створити цільові каталоги й перенести секції за таблицею:

| Поточний шлях | Новий шлях | Дія |
|---|---|---|
| `src/sections/Header/*` | `src/sections/_shared/Header/*` | Канонічний; параметризувати через prop `variant: 'home' \| 'academy'`. |
| `src/sections/Footer/*` | `src/sections/_shared/Footer/*` | Канонічний; параметризувати. |
| `app/academy/sections/Header/*` | — | Видалити (дубль); унікальні стилі/посилання переїхати в canonical Header як `variant="academy"`. |
| `app/academy/sections/Footer/*` | — | Видалити. |
| `src/sections/ProtezHomePage/*` | `src/sections/home/_root/*` | Перенести; стає композитором home-секцій. |
| `src/sections/protez/1-LetsGiveHope` | `src/sections/home/LetsGiveHope` | Прибрати числовий префікс. |
| `src/sections/protez/2-PeopleTrustUs` | `src/sections/home/PeopleTrustUs` | |
| `src/sections/protez/3-ProstheticsForUkrainians` | `src/sections/home/ProstheticsForUkrainians` | |
| `src/sections/protez/5-OurResults` | `src/sections/home/OurResults` | Канонічний (121 рядок). |
| `src/sections/protez/6-SampleProsthesesCosts` | `src/sections/home/SampleProsthesesCosts` | |
| `src/sections/protez/7-ProtezAcademy` | `src/sections/home/ProtezAcademyPromo` | Уникнути колізії з `academy/Academy`. |
| `src/sections/protez/8-Veterans` | `src/sections/home/Veterans` | |
| `src/sections/protez/9-Events` | `src/sections/home/Events` | |
| `src/sections/protez/10-PressRelease` | `src/sections/home/PressRelease` | |
| `src/sections/protez/11-OurPatients` | `src/sections/home/OurPatients` | |
| `src/sections/protez/12-MeetOurTeam` | `src/sections/home/MeetOurTeam` | |
| `src/sections/protez/13-OfficeLocations` | `src/sections/home/OfficeLocations` | |
| `src/sections/protez/16-MailingList` | `src/sections/_shared/MailingList` | Шарити з academy. |
| `src/sections/protez/17-Merch` | `src/sections/home/Merch` | |
| `src/sections/SpecialThanksToAllOurPartners` | `src/sections/_shared/SpecialThanksToAllOurPartners` | Канонічний; іконки → `/public/icons/partners/`. |
| `app/academy/sections/SpecialThanksToAllOurPartners` | — | Видалити. |
| `app/academy/sections/OurResults` | — | Видалити; використати `home/OurResults` з `variant="academy"`. |
| `app/academy/sections/{Intro, MissionAndValues, OurGoals, Academy, Chief, Events, AcademyStudents, AmputeeRehab, SummitResults, OurSponsors}` | `src/sections/academy/<Name>` | Перенести. |
| `app/academy/sections/{TheoryLectures, OurTeachers, WeAreInNews, PracticeSessions}` | — | Видалити (закоментований мертвий код). |
| `app/academy/about/sections/{AboutUs, History, WeTrain}` | `src/sections/academy-about/<Name>` | Перенести; Header/Footer → `_shared`. |
| `app/academy/terms-conditions/sections/Header` | — | Видалити; використати `_shared/Header` із `variant`. |
| `app/academy/components/*` | `src/components/*` | AcademySection, BurgerButton, BackToTopButton, SliderNavigation, SocialMediaLinks. |
| `app/donate/page.tsx` (inline JSX) | `src/sections/donate/{Hero, Tiers, Impact, Form, FAQ}` | Витягти за блоками. |
| `app/partners/page.tsx` (inline JSX) | `src/sections/partners/<Name>` | Витягти. |
| `app/VadymFedorov/page.tsx` (inline JSX) | `src/sections/stories/VadymFedorov` + `StoryLayout` | Витягти, додати спільний layout. URL переіменовується у Блоці 7. |
| `app/ArtemSvergun/page.tsx` (inline JSX) | `src/sections/stories/ArtemSvergun` | Витягти. URL переіменовується у Блоці 7. |
| `app/thankYou/page.tsx` (inline JSX) | `src/sections/thank-you/ThankYou` | Витягти. URL переіменовується у Блоці 7. |
| `/components/` (порожня) | — | Видалити (legacy). |

Після переносу:
- Оновити всі імпорти.
- `page.tsx` стають тонкими файлами, що рендерять composer-секцію свого розділу.

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Playwright MCP:** smoke по всіх сторінках:
  1. Для кожної URL `/`, `/donate`, `/partners`, `/academy`, `/academy/about`, `/academy/terms-conditions`, `/VadymFedorov`, `/ArtemSvergun`, `/thankYou`:
     - `mcp__playwright__browser_navigate`.
     - `mcp__playwright__browser_snapshot` — переконатися, що ключові секції рендеряться (текст «Let's Give Hope», «Our Results», «Footer» і т.д.).
     - `mcp__playwright__browser_console_messages` — жодних помилок.
  2. `mcp__playwright__browser_close`.

---

## Блок 4 — `<img>` → `next/image`

### Контекст блоку
Зараз ~128 raw `<img>` і лише 1 `next/image`. Це найбільший легкий виграш для LCP. Конвертуємо всі зображення з явними розмірами; `priority` на LCP-кандидата кожної сторінки.

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Знайти всі `<img` через `grep -r "<img" app src`.
- `src/components/ProtezImage/*` — оцінити, чи стає тонкою обгорткою над `next/image`, чи видаляємо.

### План виконання
1. Створити one-off скрипт `scripts/image-dimensions.mjs`, який бере `sharp`, проходить по `/public/**/*.{png,jpg,jpeg,webp,svg}` і друкує `path → width x height` у JSON. Запустити: `node scripts/image-dimensions.mjs > image-dimensions.json`.
2. Для кожного `<img src="/...">`: замінити на `<Image src="..." width={...} height={...} alt="..." />`, використовуючи дані з `image-dimensions.json`.
3. Для зовнішніх (`protez.wpengine.com`) — `<Image>` із `width`/`height` або `fill` + контейнер із розмірами; `next.config.js` `remotePatterns` вже містить хост.
4. LCP-зображення кожної сторінки (hero) — додати `priority`. Решта — лазі за замовчуванням.
5. `ProtezImage` — або тонка обгортка над `next/image` із дефолтними параметрами, або повне видалення з заміною на прямий `next/image`.
6. Видалити `scripts/image-dimensions.mjs` і `image-dimensions.json` після використання.

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Playwright MCP:**
  1. `mcp__playwright__browser_navigate` → `http://localhost:3000/`.
  2. `mcp__playwright__browser_evaluate` → script `document.querySelectorAll('img[src*="/_next/image"]').length` — має бути > 0 (зображення проходять через оптимізатор).
  3. `mcp__playwright__browser_evaluate` → script `document.querySelectorAll('img:not([src*="/_next/image"]):not([src^="data:"])').length` — має бути 0 (немає raw `<img>` крім data: URI).
  4. `mcp__playwright__browser_evaluate` → перевірити, що LCP-кандидат hero має `fetchpriority="high"` або відповідний атрибут від `priority`.
  5. Повторити для `/academy`, `/donate`, `/partners`.
  6. `mcp__playwright__browser_console_messages` — жодних 404 на зображення.
  7. `mcp__playwright__browser_close`.

---

## Блок 5 — Прибирання Tailwind, нормалізація SCSS Modules

### Контекст блоку
Tailwind встановлений, але utility-класів у JSX практично нема — 71 `.module.scss` несе весь UI. Прибираємо Tailwind-плюмбінг, виносимо CSS-змінні з `globals.css` у SCSS-partial (`_variables.scss`, `_breakpoints.scss`, `_mixins.scss`), вмикаємо auto-import partials через `sassOptions`. Слік-CSS виносимо з layout у клієнтський острівець (готує Блок 6).

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Переглянути: `tailwind.config.js`, `postcss.config.js`, `app/globals.css`, `next.config.js`, `app/layout.tsx` (імпорт `slick-carousel/*.css`).
- Виконати `grep -rEn "className=\"[^\"]*(flex|grid|text-|bg-|p-|m-|w-|h-|gap-|rounded-|shadow-|border-|hover:|md:|lg:)" app src --include="*.tsx"` — впевнитися, що Tailwind utility у JSX справді нема (очікувано 0). Якщо щось знайдеться — конвертувати в `.module.scss` або в `app/globals.css` поряд із прибиранням Tailwind.

### План виконання
1. Створити `src/styles/`:
   - `_variables.scss` — портувати `:root` змінні з `app/globals.css` як SCSS-vars (`$pink`, `$blue`, `$dark-blue`, `$section-padding-horizontal`, `$transition-base` тощо). Лишити їх також як CSS custom props у `globals.css` для рантайму (theming/island-overrides).
   - `_breakpoints.scss` — `$bp-mobile: 800px`, `$bp-tablet: 1024px`, `$bp-desktop: 1440px` (підвести під реальні breakpoints у модулях — попередньо grep `@media`).
   - `_mixins.scss` — `@mixin mobile`, `@mixin tablet`, `@mixin desktop` (через `_breakpoints`).
2. У `next.config.js` додати `sassOptions`:
   ```js
   sassOptions: {
     includePaths: [path.join(__dirname, 'src/styles')],
     additionalData: `@use 'variables' as *; @use 'mixins' as *;`,
   }
   ```
   так модулі отримують `$pink`, `@include mobile { … }` без явного `@use`.
3. У `app/globals.css` видалити Tailwind-директиви (рядки `@tailwind base; @tailwind components; @tailwind utilities;`). Решту (CSS custom props, утилітні класи `.textContainer`, `.hidden`, `.svgTextBlock`) залишити.
4. Видалити `tailwind.config.js`.
5. У `postcss.config.js` прибрати `tailwindcss/nesting`. Якщо потрібен nesting — замінити на `postcss-nesting` (`npm install -D postcss-nesting`) або повністю видалити, якщо CSS не використовує SCSS-like nesting. `autoprefixer` лишити.
6. `npm rm tailwindcss`. Підтвердити, що `sass`, `postcss`, `autoprefixer` лишилися.
7. Перенести `import 'slick-carousel/slick/slick.css'` і `'slick-carousel/slick/slick-theme.css'` із `app/layout.tsx` у файл, що реально використовує `react-slick` (тимчасово — в найближчий компонент-споживач; у Блоці 6 переїде в `src/islands/SlickCarousel`).
8. (Опційно, fast-follow) Поступово замінити hardcoded hex у модулях на `$pink`/`$blue`/`$dark-blue` — не блокує PR.

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Build:** `npm run build` — Sass компілюється, у бандлі нема Tailwind-класів.
- **Playwright MCP:** baseline-діф:
  1. Перед стартом блоку: `mcp__playwright__browser_take_screenshot` для `/`, `/academy`, `/academy/about`, `/academy/terms-conditions`, `/donate`, `/partners`, `/VadymFedorov`, `/ArtemSvergun`, `/thankYou` → зберегти в `tmp/baseline/<page>.png`.
  2. Після кроків — повторити, візуально порівняти. Жодних структурних/візуальних відмінностей.
  3. `mcp__playwright__browser_evaluate` → `Array.from(document.styleSheets).some(s => (s.href || '').includes('tailwind'))` має бути `false`.
  4. `mcp__playwright__browser_console_messages` — без помилок про невідомі класи / неіснуючі CSS-vars.
  5. `mcp__playwright__browser_close`.

---

## Блок 6 — i18n + RSC + middleware

### Контекст блоку
Серце рефакторингу. Переходимо з кастомного `LanguageContext` на `next-intl`. **URL-стратегія:** `/` (англійська, без префіксу) + `/ua/...` (українська). Усі page.tsx стають async Server Components. Інтерактивні елементи виносимо в `/src/islands/`. Geo-redirect виконує middleware лише при першому візиті на `/` без cookie.

### Підготовка
- Прочитати «Загальна ціль», **«URL-стратегія»**, «Технічний стек».
- Переглянути: `src/contexts/LanguageContext.tsx`, усі `src/hooks/use*Texts*.ts`, `messages/en.json`, `messages/uk.json`, `messages/academy-about.{en,uk}.json`, `messages/donations.{en,uk}.json`, `messages/termsConditions.{en,uk}.json`, `app/layout.tsx`, кожен `app/[route]/page.tsx`, усі inline-словники `{english, ukrainian}` (grep `"english:"` і `"ukrainian:"`).
- Документація next-intl App Router: https://next-intl.dev/docs/getting-started/app-router
- Документація `localePrefix` з кастомними префіксами: https://next-intl.dev/docs/routing#locale-prefix-as-needed

### План виконання
1. `npm install next-intl`.
2. Створити `i18n.ts` (root) і `src/lib/i18n.ts`:
   - `locales = ['en','uk']` (стандартні ISO 639-1).
   - `defaultLocale = 'en'`.
   - `localePrefix = { mode: 'as-needed', prefixes: { uk: '/ua' } }`.
3. Створити `middleware.ts`:
   - `createMiddleware` з конфігом next-intl.
   - Кастомний preflight: **лише для `/` без cookie `NEXT_LOCALE`** зчитати `request.geo?.country`. Якщо `'UA'` — повернути `Response.redirect(new URL('/ua', request.url), 307)`; інакше нічого не робити. Виставити cookie `NEXT_LOCALE=en|uk` на основі поточної локалі при наступних запитах.
4. Створити структуру `messages/{en,uk}/{common,home,academy,academy-about,academy-terms,donate,partners,stories,thank-you}.json`.
5. Розбити існуючі `messages/en.json` і `messages/uk.json` на namespace-файли; конвертувати inline `{english, ukrainian}` обʼєкти (~49) у відповідний namespace.
6. У `next.config.js` обгорнути експорт у `createNextIntlPlugin('./i18n.ts')`.
7. Створити route group `app/[locale]/`. **Директорія потрібна next-intl навіть для default-locale без префіксу** — middleware виконує внутрішній rewrite (`/academy` → `/en/academy` всередині, URL у браузері лишається `/academy`).
   - `layout.tsx`:
     - `<html lang={locale === 'uk' ? 'uk' : 'en'}>`, `<body>`, `NextIntlClientProvider`, GTM script, FacebookPixel, Analytics, SpeedInsights, шрифт.
     - `generateStaticParams` → `[{locale:'en'},{locale:'uk'}]`.
     - `generateMetadata` приймає `params.locale` і будує `title`/`description`/`openGraph.locale`/`alternates.languages`. Для англійських сторінок: `<link rel="alternate" hreflang="en" href="https://protezfoundation.org/academy"/>` + `hreflang="uk-UA" href="https://protezfoundation.org/ua/academy"/>` + `hreflang="x-default" href="https://protezfoundation.org/academy"/>`.
   - Перенести `app/page.tsx` → `app/[locale]/page.tsx` як `async` server.
   - Перенести інші сторінки у `app/[locale]/`:
     - `academy/page.tsx`
     - `academy/about/page.tsx`
     - `academy/terms-conditions/page.tsx`
     - `donate/page.tsx`
     - `partners/page.tsx`
     - `stories/vadym-fedorov/page.tsx` (новий path, старий редиректить у Блоці 7)
     - `stories/artem-svergun/page.tsx` (новий path)
     - `thank-you/page.tsx` (новий path)
8. Кореневий `app/layout.tsx` стає мінімальним wrapper (без `<html>`/`<body>`) — потрібен лише для `/api/*` і root not-found.
9. У кожній серверній page прибрати `'use client'`; замінити `useLanguage()` на `const t = await getTranslations('<namespace>')`; зробити `async`. Виставити `export const dynamic = 'force-static'` (всі, крім home).
10. Створити клієнтські острівці у `src/islands/`:
    - `LangSwitcher` — `useRouter` з `next-intl/navigation`, зберігає поточний path при перемиканні. Враховує custom prefix `/ua`.
    - `BurgerMenu` — мобільне меню (раніше у Header).
    - `SlickCarousel` — обгортка над `react-slick`; імпортує `slick-carousel/slick/slick.css` тут (а не в layout).
    - `ScrollReveal` — `react-intersection-observer` (заміна `TextAppearanceWrapper` + VisibilitySensor).
    - `ContactForm`, `MailchimpForm` — приймають локалізовані рядки через props.
    - `LazyMotion` — `next/dynamic(() => import('framer-motion'), {ssr:false})` + `LazyMotion features={domAnimation}`.
    - `VideoPlayer` — `ProtezVideo` як клієнтський.
11. У `app/api/contact/route.ts` і `app/api/mailchimp/route.ts` додати `locale` у payload; повідомлення про помилки беруться через `getTranslations({locale, namespace:'forms'})`.
12. Видалити `src/contexts/LanguageContext.tsx`, усі `src/hooks/use*Texts*.ts`, `src/hooks/useCountryLanguage.ts`.
13. Видалити старі `app/{donate,partners,academy,VadymFedorov,ArtemSvergun,thankYou}/page.tsx` (вони замінені новими в `[locale]/` або через 308-редиректи у Блоці 7).

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Playwright MCP:**
  1. Geo-redirect (мок UA): `mcp__playwright__browser_navigate` → `http://localhost:3000/` із cookie очищеним і моком `x-vercel-ip-country: UA` (через `mcp__playwright__browser_evaluate` або налаштування headers) → очікувати, що URL стає `/ua`.
  2. Без геолокації: `mcp__playwright__browser_navigate` → `http://localhost:3000/` → залишається `/`, англомовний контент.
  3. `mcp__playwright__browser_navigate` → `http://localhost:3000/academy`:
     - `mcp__playwright__browser_evaluate` → `document.documentElement.lang === 'en'`.
     - `mcp__playwright__browser_evaluate` → `document.title` містить англомовний рядок.
     - `mcp__playwright__browser_snapshot` — англомовний контент.
  4. `mcp__playwright__browser_navigate` → `http://localhost:3000/ua/academy`:
     - `mcp__playwright__browser_evaluate` → `document.documentElement.lang === 'uk'`.
     - Контент український.
  5. LangSwitcher: на `/academy` клікнути перемикач → URL стає `/ua/academy`, контент перемикається. На `/ua/academy` клікнути назад → URL стає `/academy` (без `/en`).
  6. SSG-перевірка: `mcp__playwright__browser_evaluate` → перевірити, що ключові рядки контенту присутні у вихідному HTML (через `document.body.innerHTML.includes('...')` — текст є до гідрації).
  7. Форми: на `/donate` `mcp__playwright__browser_fill_form` + submit → перевірити локалізоване повідомлення; повторити на `/ua/donate`.
  8. Перевірити metadata: `mcp__playwright__browser_evaluate` → `document.querySelector('link[rel="alternate"][hreflang="uk-UA"]').href` дорівнює `https://protezfoundation.org/ua/academy` (або з відповідним host).
  9. `mcp__playwright__browser_console_messages` — жодних помилок.
  10. `mcp__playwright__browser_close`.

---

## Блок 7 — SEO + редиректи + sitemap

### Контекст блоку
**Скорочений завдяки URL-стратегії «root = EN, /ua = UA»**: англомовні URL не змінюються, тож редиректи потрібні лише для трьох переіменованих маршрутів (стори + thank-you). Решта — sitemap + robots із правильними alternates.

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Переглянути: `next.config.js`, `middleware.ts` (з Блоку 6), `app/[locale]/layout.tsx`.

### План виконання
1. У `next.config.js` додати `async redirects()` зі статус-кодом 308:
   - `/VadymFedorov` → `/stories/vadym-fedorov`
   - `/ArtemSvergun` → `/stories/artem-svergun`
   - `/thankYou` → `/thank-you`
   - (українські копії під `/ua/` додавати не треба — у Google їх немає).
2. Створити `app/sitemap.ts`: для кожного маршруту (`/`, `/academy`, `/academy/about`, `/academy/terms-conditions`, `/donate`, `/partners`, `/stories/vadym-fedorov`, `/stories/artem-svergun`, `/thank-you`) повертає `{ url, alternates: { languages: { en: 'https://…<path>', 'uk-UA': 'https://…/ua<path>' } } }`.
3. Створити `app/robots.ts`: дозволяє все, додає `sitemap: 'https://protezfoundation.org/sitemap.xml'`.
4. Переконатися, що в `app/[locale]/layout.tsx` `generateMetadata.alternates.languages` коректно вказує `en`, `uk-UA` і `x-default` для поточного шляху.

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Playwright MCP:**
  1. `mcp__playwright__browser_network_request` → GET `http://localhost:3000/academy` (без follow-redirect) → статус 200 (англомовний контент, **не** редирект).
  2. `mcp__playwright__browser_network_request` → GET `http://localhost:3000/VadymFedorov` → статус 308, Location `/stories/vadym-fedorov`. Повторити для `/ArtemSvergun` і `/thankYou`.
  3. `mcp__playwright__browser_navigate` → `http://localhost:3000/sitemap.xml` → відповідь містить пари для кожного маршруту: англійський URL + `/ua/...` як `xhtml:link` alternate; також `x-default`.
  4. `mcp__playwright__browser_navigate` → `http://localhost:3000/robots.txt` → відповідь містить рядок `Sitemap: http://localhost:3000/sitemap.xml`.
  5. На `/academy`: `mcp__playwright__browser_evaluate` → `document.querySelector('link[rel="canonical"]').href` дорівнює `https://protezfoundation.org/academy`. На `/ua/academy`: відповідно `…/ua/academy`.
  6. `mcp__playwright__browser_close`.

---

## Блок 8 — Фінальне прибирання

### Контекст блоку
Останній прохід: видалити все, що стало непотрібним після попередніх блоків, оновити README, переконатися, що build повністю зелений і всі сторінки в обох локалях працюють.

### Підготовка
- Прочитати «Загальна ціль», «URL-стратегія», «Технічний стек».
- Зробити повний пошук «висячих» імпортів і файлів: `grep -r "from '@/contexts/LanguageContext'"`, `grep -r "useLanguage"`, `grep -r "messages/en.json"`, `grep -r "main-for-pages"`.

### План виконання
1. Видалити `src/contexts/LanguageContext.tsx` (якщо ще лишився).
2. Видалити `src/utils/getCurrentCountry.ts` (якщо ще лишився).
3. Видалити всі `src/hooks/use*Texts*.ts` (Academy, Donations, TermsConditions і подібні).
4. Видалити порожні каталоги `app/academy/sections/`, `app/academy/components/`, `app/academy/about/sections/`, `app/academy/about/components/`, `app/academy/terms-conditions/sections/`, корінь `/components/`.
5. Видалити старі `messages/en.json`, `messages/uk.json` (роздроблені у Блоці 6).
6. Видалити закоментовані секції `TheoryLectures`, `OurTeachers`, `WeAreInNews`, `PracticeSessions`.
7. Видалити `countup.js` із deps, якщо `react-countup` працює без нього.
8. Оновити README: Node ≥20, `npm run dev`, `npm run build`, Vercel-only, опис env vars (`REVALIDATE_SECRET`, `GTM_ID`, `WORDPRESS_API_URL`, `MAILCHIMP_*`), URL-структура (`/` англ., `/ua/...` укр.).
9. Перевірити, що `next.config.js` не містить ніяких `environment === 'pages'` залишків.
10. `npm run build` локально — переглянути логи: усі сторінки крім home позначені `○ (Static)`, home — `● (ISR)`.

### Перевірка
- **ESLint:** `npm run lint`.
- **TypeScript:** `npx tsc --noEmit`.
- **Playwright MCP:** повний smoke по всіх сторінках у обох локалях:
  1. Для кожного URL у `[/, /ua, /academy, /ua/academy, /academy/about, /ua/academy/about, /academy/terms-conditions, /ua/academy/terms-conditions, /donate, /ua/donate, /partners, /ua/partners, /stories/vadym-fedorov, /ua/stories/vadym-fedorov, /stories/artem-svergun, /ua/stories/artem-svergun, /thank-you, /ua/thank-you]`:
     - `mcp__playwright__browser_navigate`.
     - `mcp__playwright__browser_snapshot` — ключові секції рендеряться.
     - `mcp__playwright__browser_console_messages` — жодних помилок.
     - `mcp__playwright__browser_evaluate` → `document.documentElement.lang` відповідає локалі (`en` для англомовних URL, `uk` для `/ua/...`).
  2. `mcp__playwright__browser_close`.

---

## Додатки

### Корисні команди
- `npm run dev` — dev-сервер (порт 3000).
- `npm run build` — production build; шукати в логах `○ (Static)` / `● (ISR)` / `ƒ (Dynamic)` для кожного маршруту.
- `npm run lint` — ESLint.
- `npx tsc --noEmit` — TypeScript без емісії.

### Env vars (на момент завершення рефакторингу)
- `WORDPRESS_API_URL` — GraphQL endpoint.
- `GTM_ID` — Google Tag Manager.
- `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX` — Mailchimp.
- `SMTP_*` — Nodemailer (контактна форма).
- `REVALIDATE_SECRET` — секрет для `/api/revalidate` (нове у Блоці 2).

### Глобальні ризики
- Візуальні регресії при прибиранні Tailwind / винесенні CSS-vars у SCSS-partial — обовʼязково baseline-скріншоти.
- Втрата SEO-ваги мінімальна: англомовні URL не змінюються; лише три camelCase маршрути дістають 308-редирект. Sitemap із правильними alternates допоможе Google зматчити українські копії.
- Зламана гідрація через залежність від клієнтського часу — пройти серверні секції на наявність `Math.random` / `Date.now`.
- WordPress webhook на `/api/revalidate` потрібно налаштувати з боку WP після деплою Блоку 2.
- `<html lang="uk">` повинен бути виставлений лише для маршрутів під `/ua` — перевірити Block 6 verification.
