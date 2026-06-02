# Блок 9 — оптимізація бандлу й SSG (20/80 версія)

## Context

Після Блоків 1-7 проект має правильну архітектуру: `app/[locale]/<route>/page.tsx` — async RSC, layout — RSC із `generateStaticParams(['en','uk'])`, WordPress + cheerio ізольовані в server-only, middleware не блокує SSG.

**Що болить зараз:**

1. `src/sections/home/_root/index.tsx` — composer позначений `'use client'` через `useTranslations`. Це робить *всі* лази-нащадки частиною одного клієнтського дерева, у тому числі повністю статичні секції (картинки + текст). 14 секцій тягнуться в client bundle.
2. `import 'slick-carousel/slick/slick.css'` і `'slick-theme.css'` дублюються у трьох client composer'ах (`home/_root:3-4`, `academy/_root:3-4`, `app/[locale]/academy/about/AcademyAboutClient.tsx:3-4`). CSS завантажується на всіх трьох сторінках, навіть тих, де слайдер не у viewport одразу.
3. Жодна `page.tsx` не має явного `export const dynamic` чи `revalidate`. Через `getMessages()` у layout Next.js може схибити з вибором рендеринг-режиму; у логах build немає чіткого `○`/`●` маркера.

**Що *не* робимо у Блоці 9 (узгоджено):**

- `framer-motion` (TextAppearanceWrapper, MailingList) — окрема дискусія.
- `useScreenModeAndSize` і його 35 споживачів — окрема дискусія. Це означає, що `academy/_root`, `AcademyAboutClient`, Header, AcademyHeader залишаються `'use client'`. Виграш дає **home/_root + Slick CSS + SSG explicit**, а не глобальна міграція в RSC.

**Цільовий результат:**

- `home/_root` — RSC.
- Slick CSS завантажується через єдиний island `src/islands/SlickCarousel/`.
- Усі page.tsx мають явний режим (`force-static` для статичних, `revalidate = 3600` для home).
- `npm run build` показує `○ (Static)` для всіх сторінок крім `/`, яка `●` (ISR).

---

## Сесія 9.1 — `src/islands/SlickCarousel`

### Контекст сесії

Зараз `react-slick` імпортується напряму в 15 секціях, а slick CSS — у 3 composer'ах. Створюємо одну точку входу для `Slider` і CSS, переключаємо всіх споживачів.

### Підготовка

- Прочитати `Block 9 — Context` (вище).
- Переглянути:
  - `src/sections/home/_root/index.tsx:3-4` (slick CSS імпорти).
  - `src/sections/academy/_root/index.tsx:3-4`.
  - `app/[locale]/academy/about/AcademyAboutClient.tsx:3-4`.
  - Список споживачів `react-slick`: `src/sections/home/{PeopleTrustUs, PressRelease, MeetOurTeam, OfficeLocations, Merch, OurPatients, Veterans, Events}/`, `src/sections/academy/{Intro, OurGoals, Academy, AcademyStudents, MissionAndValues, Events}/`, `src/sections/academy-about/WeTrain/`.

### План виконання

1. Створити `src/islands/SlickCarousel/index.tsx`:
   ```tsx
   'use client'
   import 'slick-carousel/slick/slick.css'
   import 'slick-carousel/slick/slick-theme.css'
   import Slider from 'react-slick'
   export default Slider
   export type { Settings } from 'react-slick'
   ```
2. У 15 секціях-споживачах замінити `import Slider from 'react-slick'` на `import Slider from '@/islands/SlickCarousel'`. Якщо споживач імпортує тип `Settings` — теж із island.
3. Видалити slick CSS-імпорти з `home/_root:3-4`, `academy/_root:3-4`, `AcademyAboutClient.tsx:3-4`.
4. Перевірити, що жоден інший файл не імпортує `slick-carousel/slick/*.css` напряму: `grep -r "slick-carousel/slick" src app`.

### Перевірка

- `npm run lint`, `npx tsc --noEmit` — чисто.
- `npm run build` — без помилок.
- Playwright MCP:
  1. `/` → переконатися, що слайдери `PeopleTrustUs`, `PressRelease`, `OurPatients`, `MeetOurTeam`, `OfficeLocations`, `Merch`, `Veterans`, `Events` працюють (стрілки, swipe, dots).
  2. `/academy`, `/ua/academy` → перевірити слайдери `Intro`, `OurGoals`, `Academy`, `AcademyStudents`, `MissionAndValues`, `Events`.
  3. `/academy/about`, `/ua/academy/about` → слайдер `WeTrain`.
  4. `/donate`, `/partners`, `/thank-you`, `/stories/*` (сторінки **без** слайдера) → `mcp__playwright__browser_evaluate` → `Array.from(document.styleSheets).some(s => (s.href || '').includes('slick'))` має бути `false`. Це підтверджує, що slick CSS більше не тягнеться на сторінки без слайдера.
  5. `mcp__playwright__browser_console_messages` — без помилок.
  6. `mcp__playwright__browser_close`.

---

## Сесія 9.2 — `src/sections/home/_root` → RSC

### Контекст сесії

Зараз `home/_root` — `'use client'` через `useTranslations`. Знімаємо клієнтську парасолю над усім home-деревом: composer стає async RSC, переклади беруться через `getTranslations`. Лази-нащадки лишаються як є (`React.lazy()` працює в RSC для client children через Next.js streaming).

Базується на Сесії 9.1: slick CSS уже не імпортується тут (зняли у 9.1).

### Підготовка

- Прочитати `Block 9 — Context`.
- Переглянути `src/sections/home/_root/index.tsx` повністю.
- Переконатися, що Сесія 9.1 виконана.
- Бачити, які секції в дереві справді клієнтські (через `'use client'` в їхніх файлах) — це не блокує RSC composer.

### План виконання

1. У `src/sections/home/_root/index.tsx`:
   - Видалити `'use client'` (рядок 1).
   - Замінити `import { useTranslations } from 'next-intl'` на `import { getTranslations } from 'next-intl/server'`.
   - Зробити функцію `async`: `export default async function ProtezHomePage(...)`.
   - Замінити `const t = useTranslations('home.root')` на `const t = await getTranslations('home.root')`.
   - Решту коду не чіпати: `React.lazy()` і `<Suspense>` лишаються (Next 14 нормально стрімить client children з RSC parent).
2. У `app/[locale]/page.tsx` переконатися, що composer імпортується й передаються дані з `getPosts()`. Ця сторінка вже async RSC — без змін.

### Перевірка

- `npm run lint`, `npx tsc --noEmit` — чисто.
- `npm run build` — у логах для `/` і `/ua` повинна показатися менша First Load JS vs baseline (зафіксувати конкретні цифри в commit message).
- Playwright MCP:
  1. `/` → весь home-контент рендериться, hero LCP працює, лічильник `OurResults` крутиться при scroll, форма MailingList сабмітить.
  2. `/ua` → українська версія, все працює.
  3. `mcp__playwright__browser_evaluate` → перевірити, що ключові тексти hero (з `home.root`) присутні у вихідному HTML (через `document.body.innerHTML.includes('...')`), тобто SSR живий.
  4. `mcp__playwright__browser_console_messages` — без hydration mismatch.
  5. `mcp__playwright__browser_close`.

---

## Сесія 9.3 — SSG explicit на всіх page.tsx

### Контекст сесії

Жодна сторінка не має `export const dynamic` чи `revalidate`. Виставляємо явно, щоб Vercel-edge-кеш знав, що це SSG.

### Підготовка

- Прочитати `Block 9 — Context`.
- Переглянути всі `app/[locale]/<route>/page.tsx`.
- Підтвердити, що `app/[locale]/layout.tsx` не зачіпає `headers()`/`cookies()` (вже підтверджено в дослідженні: лише `setRequestLocale` + `getMessages()` — SSG-friendly).

### План виконання

Додати на верхньому рівні кожного файлу:

1. `app/[locale]/page.tsx` → `export const revalidate = 3600` (ISR узгоджено з WP fetch revalidate).
2. `app/[locale]/donate/page.tsx` → `export const dynamic = 'force-static'`.
3. `app/[locale]/partners/page.tsx` → `export const dynamic = 'force-static'`.
4. `app/[locale]/academy/page.tsx` → `export const dynamic = 'force-static'`.
5. `app/[locale]/academy/about/page.tsx` → `export const dynamic = 'force-static'`.
6. `app/[locale]/academy/terms-conditions/page.tsx` → `export const dynamic = 'force-static'`.
7. `app/[locale]/stories/vadym-fedorov/page.tsx` → `export const dynamic = 'force-static'`.
8. `app/[locale]/stories/artem-svergun/page.tsx` → `export const dynamic = 'force-static'`.
9. `app/[locale]/thank-you/page.tsx` → `export const dynamic = 'force-static'`.

### Перевірка

- `npm run lint`, `npx tsc --noEmit` — чисто.
- `npm run build` — у логах:
  - `/` і `/ua` → `●` (ISR, revalidate 3600).
  - усі інші маршрути (включаючи `/ua/` варіанти) → `○` (Static).
- Playwright MCP:
  1. Smoke по всіх сторінках в обох локалях (`/`, `/ua`, `/donate`, `/ua/donate`, `/academy`, `/ua/academy`, `/academy/about`, `/ua/academy/about`, `/academy/terms-conditions`, `/ua/academy/terms-conditions`, `/partners`, `/ua/partners`, `/stories/vadym-fedorov`, `/ua/stories/vadym-fedorov`, `/stories/artem-svergun`, `/ua/stories/artem-svergun`, `/thank-you`, `/ua/thank-you`) — контент рендериться, переключення локалі працює.
  2. `mcp__playwright__browser_console_messages` — без помилок.
  3. `mcp__playwright__browser_close`.

---

## Критичні файли (узагальнено)

**Нові:**
- `src/islands/SlickCarousel/index.tsx`

**Модифікуються:**
- 15 секцій-споживачів `react-slick` — імпорт міняється на `@/islands/SlickCarousel`.
- `src/sections/home/_root/index.tsx` — RSC, getTranslations, без slick CSS.
- `src/sections/academy/_root/index.tsx` — без slick CSS (тільки рядки 3-4).
- `app/[locale]/academy/about/AcademyAboutClient.tsx` — без slick CSS (тільки рядки 3-4).
- 9 `page.tsx` під `app/[locale]/` — додається `export const dynamic`/`revalidate`.

**Не зачіпаємо:**
- `framer-motion` файли.
- `useScreenModeAndSize` і його споживачі.
- `academy/_root` і `AcademyAboutClient` composer-логіка (тільки CSS-імпорт).
- Header, Footer, AcademyHeader (залишаються client через useScreenModeAndSize).

---

## Baseline для порівняння

Перед стартом блоку зафіксувати в commit-повідомленні або окремому notes-файлі:

1. `npm run build` → First Load JS для `/`, `/academy`, `/academy/about`, `/donate`, `/partners` (saved as baseline).
2. `grep -rl "'use client'" src/sections src/components | wc -l` (тут має зменшитися на 1 після Сесії 9.2).
3. У `.next/build-manifest.json` — розмір chunk для `_app-pages-browser_src_sections_home_*`.

Фінально порівняти ті ж цифри після Сесії 9.3.

---

## Питання поза скоупом (для окремої дискусії)

1. **`useScreenModeAndSize`** — головний блокер для RSC у 35+ секціях. Варіанти: SCSS @media-only де можливо, container queries, server-side viewport hints. Дасть найбільший виграш у бандлі, але масштабна робота.
2. **`framer-motion`** — TextAppearanceWrapper + MailingList useInView. Можливі шляхи: повне видалення (CSS @keyframes + IntersectionObserver), LazyMotion+m+domAnimation, або зміна tradeoff'ів.
3. **`React.lazy()` → `next/dynamic`** — змістовно лише якщо треба `ssr: false` десь (зараз потреби нема).
4. **`BackToTopButton` → RSC** — мікро-приз ~1 KB, fast-follow після блоку.
5. **Header розпил на shell + LangSwitcher/BurgerMenu islands** — має сенс після рефактору `useScreenModeAndSize`; зараз shell все одно client.
6. **Інтеграція з `goofy-pondering-wozniak-plan.md`** — мовна модалка як `next/dynamic({ssr:false})` island у layout.
