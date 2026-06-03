# Блок 9 — оптимізація бандлу й SSG (20/80 версія)

## Context

Після Блоків 1-7 проект має правильну архітектуру: `app/[locale]/<route>/page.tsx` — async RSC, layout — RSC із `generateStaticParams(['en','uk'])`, WordPress + cheerio ізольовані в server-only, middleware не блокує SSG.

**Що болить зараз:**

1. `src/sections/home/_root/index.tsx` — composer позначений `'use client'` через `useTranslations`. Це робить _всі_ лази-нащадки частиною одного клієнтського дерева, у тому числі повністю статичні секції (картинки + текст). 14 секцій тягнуться в client bundle.
2. `import 'slick-carousel/slick/slick.css'` і `'slick-theme.css'` дублюються у трьох client composer'ах (`home/_root:3-4`, `academy/_root:3-4`, `app/[locale]/academy/about/AcademyAboutClient.tsx:3-4`). CSS завантажується на всіх трьох сторінках, навіть тих, де слайдер не у viewport одразу.
3. Жодна `page.tsx` не має явного `export const dynamic` чи `revalidate`. Через `getMessages()` у layout Next.js може схибити з вибором рендеринг-режиму; у логах build немає чіткого `○`/`●` маркера.

**Що _не_ робимо у Блоці 9 (узгоджено):**

- `framer-motion` (TextAppearanceWrapper, MailingList) — окрема дискусія.
- `useScreenModeAndSize` і його 35 споживачів — окрема дискусія. Це означає, що `academy/_root`, `AcademyAboutClient`, Header, AcademyHeader залишаються `'use client'`. Виграш дає **home/\_root + Slick CSS + SSG explicit**, а не глобальна міграція в RSC.

**Цільовий результат:**

- `home/_root` — RSC.
- Slick CSS завантажується через єдиний island `src/islands/SlickCarousel/`.
- Усі page.tsx мають явний режим (`force-static` для статичних, `revalidate = 3600` для home).
- `npm run build` показує `○ (Static)` для всіх сторінок крім `/`, яка `●` (ISR).

---

## Рекомендована послідовність Блоку 9 (після ревізії)

| Сесія                                    | Статус                                        |
| ---------------------------------------- | --------------------------------------------- |
| 9.1 — slick island                       | ✅ виконано (commit `67a4c6e`)                |
| 9.2 — `home/_root` → RSC                 | ❌ відкочено (бандл-регресія 180 kB → 786 kB) |
| **9b** — прибрати `useScreenModeAndSize` | 📋 4 сесії (9b.1–9b.4)                        |
| **9c** — прибрати `framer-motion`        | 📋 3 сесії (9c.1–9c.3)                        |
| 9.3 — explicit `dynamic`/`revalidate`    | ⏸ ортогональне, можна будь-коли               |
| 9.2-redux — `home/_root` → RSC           | 📋 повтор після 9b + 9c                       |

**Чому такий порядок:** Сесія 9.2 у першій спробі дала 4× регресію бандла (`/[locale]` First Load JS: 180 kB → 786 kB). Корінь — `React.lazy()` + `<Suspense>` межі зникають, коли composer перестає бути Client Component, тож JS усіх ~17 client-нащадків мусить летіти у початковому payload. Аудит виявив два важелі, які насправді розплоджують `'use client'` у секціях: `useScreenModeAndSize` (30 файлів) і `framer-motion` (1 спільний `TextAppearanceWrapper`, 159 використань). Блоки **9b** і **9c** прибирають саме їх — тоді 9.2-redux має шанс реально зменшити бандл.

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

> ⚠ **Відкочено.** Перша спроба дала бандл-регресію `/[locale]` First Load JS: **180 kB → 786 kB**. Корінь — `React.lazy()` + `<Suspense>` межі, які раніше відкладали ~600 kB section-чанків на клієнт, **зникають** щойно composer стає RSC: усім ~17 client-нащадкам треба гідруватись одразу, тож весь їхній JS летить у початковому payload. `next/dynamic` не допоміг. Сесія повертається у плані як **9.2-redux** після Блоків 9b і 9c (там зменшується кількість `'use client'` нащадків, після чого RSC composer уже дасть виграш).
>
> Інструкції нижче лишаються як референс — виконувати **після** 9b + 9c.

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

1. **`React.lazy()` → `next/dynamic`** — змістовно лише якщо треба `ssr: false` десь (зараз потреби нема).
2. **`BackToTopButton` → RSC** — мікро-приз ~1 KB, fast-follow після блоку.
3. **Header розпил на shell + LangSwitcher/BurgerMenu islands** — має сенс після Блоку 9b (без `useScreenModeAndSize` shell ближче до RSC-кандидата); зараз shell все одно client через локаль-логіку.
4. **Інтеграція з `goofy-pondering-wozniak-plan.md`** — мовна модалка як `next/dynamic({ssr:false})` island у layout.

> Раніше тут були `useScreenModeAndSize` і `framer-motion` — обидва переведені в скоуп як Блоки **9b** і **9c** нижче.

---

## Блок 9b — прибрати `useScreenModeAndSize` (4 сесії)

### Контекст блоку

`grep -rl "useScreenModeAndSize" src app` повертає **31 файл** (сам хук + **30 споживачів**). Кожен споживач порівнює `width` з фіксованими порогами (480/600/800/1180/1366). Заміна на CSS-only патерни дає три виграші:

- Знімає ризик гідраційного mismatch (немає JS-керованого viewport-стейту).
- Прибирає залежність 30 компонентів від client-only хука (частина після зачистки стає RSC-кандидатами; решта лишається client через інші причини, але чистіша).
- Розблоковує Сесію **9.2-redux** (RSC composer).

**Підтверджений скоуп (перед кожною сесією перевіряти grep'ом — список нижче це snapshot на момент плану):**

| Bucket                                                                   | Файлів | Сесія |
| ------------------------------------------------------------------------ | ------ | ----- |
| Слайдер-секції, що ще імпортують хук                                     | 12     | 9b.1  |
| Image-swap / двогілковий JSX / prop-tweak                                | 11     | 9b.2  |
| Headers + composers + `_root`                                            | 5      | 9b.3  |
| `OurResults` (home, не-слайдер, prop-tweak)                              | 1      | 9b.1  |
| `TextAppearanceWrapper` (імпорт хука вже закоментований; видалити рядок) | 1      | 9b.4  |
| **Разом**                                                                | **30** |       |

> ⚠ Попередня версія плану казала «14 слайдер-секцій». Насправді `academy/OurGoals` і `academy/MissionAndValues` уже без хука (використовують лише `react-slick` зі статичним `responsive` array), тож скоуп 9b.1 — **12 слайдерів**, не 14.

**Інфраструктура вже на місці:**

- `src/styles/_breakpoints.scss` — `$bp-phone` (480), `$bp-mobile` (600), `$bp-mobile-lg` (800), `$bp-tablet` (1024), `$bp-tablet-lg` (1180), `$bp-desktop` (1366), `$bp-desktop-lg` (1440), `$bp-desktop-xl` (1600), `$bp-desktop-2xl` (1920).
- `src/styles/_mixins.scss` — `@mixin phone`, `@mixin mobile`, `@mixin mobile-lg`, `@mixin tablet`, `@mixin tablet-lg`, `@mixin desktop`, `@mixin desktop-lg`, `@mixin desktop-xl` (усі `max-width`).
- `react-slick` `responsive` prop — уже використовується статично в усіх 15 слайдер-секціях (включно з OurGoals/MissionAndValues/Intro), runtime-width ніколи не був потрібний.

**Поза скоупом блоку:**

- `useAcademyTitle` — власний `matchMedia`, незалежний, не чіпаємо.
- `useDonateTitle` — чистий, без viewport-залежностей.
- Header `useTransition`/`useRouter` для перемикання локалі — лишається client.

---

### Сесія 9b.1 — слайдери + OurResults знімають хук

**Скоуп (13 файлів = 12 слайдерів + 1 не-слайдер):**

- Home слайдери (8): `PeopleTrustUs`, `PressRelease`, `OurPatients`, `OfficeLocations`, `Events`, `Veterans`, `MeetOurTeam`, `Merch`.
- Academy слайдери (3): `Academy`, `AcademyStudents`, `Events`.
- Academy-about слайдер (1): `WeTrain`.
- Home не-слайдер (1): `OurResults` — `isDesktopLayout = width > 800` гейтить `<Body large={...}>` і дві JSX-гілки (рядки 50/60/64/68/98). Логіка ідентична до «outside-slick `isDesktopLayout`» в інших слайдерах — тому фолдиться у 9b.1.

> ⚠ `academy/OurGoals` і `academy/MissionAndValues` **навмисно не в списку** — вони вже без хука. Не чіпати. `academy/Intro` теж без хука.

**Підготовка:**

- `grep -l "useScreenModeAndSize" src/sections/home src/sections/academy src/sections/academy-about` → порівняти зі списком вище. Якщо grep повертає більше — додати; менше — викинути.
- Прочитати TSX кожної секції. Підтвердити, що `responsive` array у слайдера покриває потрібні breakpoints.
- Знайти `width`-логіку **поза** слайдер-конфігом (наприклад, у `PeopleTrustUs`: `showTopNavigation = width < 1180 && width > 800`, `isDesktopLayout = width > 800`).

**План для кожного файлу:**

1. Видалити `const { width } = useScreenModeAndSize()` + імпорт.
2. Для кожної `width`-залежної гілки поза слайдером:
   - **Conditional render елемента/обгортки** → рендерити безумовно, накласти SCSS-клас з `@include mobile-lg { display: none }` (або інверсією).
   - **Prop tweak за шириною** (`<Body large={isDesktop}>`) → розділити на два елементи, по одному на breakpoint через CSS; або переписати `Body`, щоб читав `data-viewport` атрибут.
3. Slick config: без змін (вже статичний `responsive` array).

**Перевірка:**

- `npm run lint`, `npx tsc --noEmit` — чисто.
- `npm run build` — без помилок.
- Playwright MCP:
  - `/`, `/ua`, `/academy`, `/ua/academy`, `/academy/about`, `/ua/academy/about`.
  - Кожен слайдер при ширині 375 / 768 / 1024 / 1366 через `mcp__playwright__browser_resize` — стрілки, dots, swipe, `slidesToShow` коректні.
  - На `/` доскролити до `OurResults`: при 1366 px рендериться desktop-гілка (рядок 68), при 375 px — mobile-гілка (рядок 98). CountUp анімується.
  - `mcp__playwright__browser_console_messages` — без помилок і hydration warnings.

---

### Сесія 9b.2 — image-swap + двогілковий JSX (11 файлів)

**Скоуп (11 файлів):**
`LetsGiveHope`, `InNeed`, `ProstheticsForUkrainians`, `SampleProsthesesCosts`, `ProtezAcademyPromo`, `ProtezAcademyEvent`, `Footer` (\_shared), `MailingList` (\_shared), `SpecialThanksToAllOurPartners` (\_shared), `Donate`, `VadymFedorov`.

**Три розрізнені під-патерни (не всі підходять під чистий `<picture>`):**

| Патерн                                                                                                                                                  | Як виглядає в коді                                                                                          | Файли (з grep)                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. `<picture>` image swap** — одне `<img>`, чий `src` обирається з `width > N ? desktop : mobile`                                                     | `const title = width > 800 ? icons.x.desktop : icons.x.mobile; … {title[lang](…)}`                          | `LetsGiveHope` (hero title logo). Інші — звіряти per-file.                                                                                                                                                                                                                                                                                            |
| **B. Двогілковий JSX + CSS `display` toggle** — `isDesktopLayout` гейтить цілі піддерева (різний порядок елементів, обгортки, додаткові кнопки/підписи) | `{width <= 800 && (<Mobile />)} … {width > 800 && (<Desktop />)}` **або** `isDesktopLayout` у 3+ JSX-місцях | `Donate` (рядки 40+123 explicit two-branch), `Footer` (`isDesktopLayout` гейтить кілька піддерев), `SpecialThanksToAllOurPartners` (рядок 51 `{width < 600 ? … : …}` перемикає весь partners grid), `InNeed`, `ProstheticsForUkrainians` (плюс `isMobileLayout`), `SampleProsthesesCosts`, `ProtezAcademyPromo`, `ProtezAcademyEvent`, `MailingList`. |
| **C. Prop tweak only** — `<Body large={width > 1180}>` тощо. Та ж зачистка, що OurResults у 9b.1: два елементи через CSS або data-attribute.            | `VadymFedorov` (рядки 61, 64 `<Body large={width > 1180}>`).                                                |

> ⚠ Перед редагуванням кожного файлу — **читати end-to-end** і класифікувати в A/B/C. Snapshot вище — попередній; фікс різний по патернах; не застосовувати патерн A до файлу під B.

**Підготовка (Pattern A — `<picture>`):**

- `ProtezImage` обгортає `next/image` (`src/components/ProtezImage/index.tsx:31-43`). Перехід на `<picture>` означає втрату WebP/оптимізації next/image для конкретних ассетів. **Прийнятний trade-off**: майже завжди swap — це лого/іконки PNG у `public/`, не фото. Для фото — Pattern B (двійник `<ProtezImage>` з CSS toggle).

**План (Pattern A):**

1. Створити `src/components/ResponsiveImage/index.tsx` (Server Component):

   ```tsx
   import { getPath } from '@/components/ProtezImage/utils'

   interface Props {
     mobile: string
     desktop: string
     alt: string
     breakpoint?: number // min-width px for desktop variant, default 801
     width: number
     height: number
     className?: string
     external?: boolean
   }

   export default function ResponsiveImage({
     mobile,
     desktop,
     alt,
     breakpoint = 801,
     width,
     height,
     className,
     external = false,
   }: Props) {
     return (
       <picture className={className}>
         <source media={`(min-width: ${breakpoint}px)`} srcSet={getPath(desktop, external)} />
         <img
           src={getPath(mobile, external)}
           alt={alt}
           width={width}
           height={height}
           loading="lazy"
         />
       </picture>
     )
   }
   ```

2. У кожній Pattern-A секції замінити:
   ```tsx
   const { width } = useScreenModeAndSize()
   const logo = width > 800 ? icons.foo.desktop : icons.foo.mobile
   {
     logo[lang](style.title)
   }
   ```
   на:
   ```tsx
   <ResponsiveImage mobile={icons.foo.mobile.src} desktop={icons.foo.desktop.src} ... />
   ```
   (Для render-function патернів типу `logo[lang](style.title)` може знадобитись тонкий client-острівець або розділення на дві `<ResponsiveImage>` per locale.)

**План (Pattern B — двогілковий JSX + CSS toggle):**

Це **явний патерн для `Donate`, `Footer`, `SpecialThanksToAllOurPartners`** та будь-якого файлу, де `isDesktopLayout` гейтить серйозне DOM, не лише `<img>`. **Не** намагатись звести Pattern B до `<picture>` — mobile та desktop гілки розходяться структурно.

1. Рендерити **обидві гілки безумовно** (без JS-гейтів):
   ```tsx
   <div className={style.mobileOnly}>
     {/* старий `{width <= 800 && (...)}` контент без змін */}
   </div>
   <div className={style.desktopOnly}>
     {/* старий `{width > 800 && (...)}` контент без змін */}
   </div>
   ```
2. У `style.module.scss` секції додати два visibility-класи через існуючі мікс-іни:
   ```scss
   .mobileOnly {
     @include mobile-lg {
       display: block;
     } // <= 800
     @media (min-width: 801px) {
       display: none;
     }
   }
   .desktopOnly {
     display: none;
     @media (min-width: 801px) {
       display: block;
     }
   }
   ```
   Адаптувати поріг per-file (`Donate`/`Footer` — 800, `SpecialThanks` — 600 → використати `@include mobile`).
3. Видалити `const { width } = useScreenModeAndSize()` + імпорт.
4. **Нота про DOM cost:** обидві гілки тепер у HTML завжди. Для SEO ок (Google читає обидві), це стандартний responsive-патерн; зростання HTML модерне. Якщо гілка важка (>2 KB rendered) — краще Pattern A або сплит секції.
5. Per-file очікувані гілки на момент плану (звірити перед редагуванням):
   - `Donate` — explicit two-branch на `width <= 800` / `width > 800` (рядки ~40, ~123). Дзеркальний layout з переставленими tier-блоками. **Pattern B.**
   - `Footer` (\_shared) — `isDesktopLayout = width > 800` гейтить кілька піддерев. **Pattern B.**
   - `SpecialThanksToAllOurPartners` (\_shared) — `{width < 600 ? … : …}` на рядку 51 перемикає весь partner grid. **Pattern B з `@include mobile`.**
   - `MailingList` (\_shared) — `isDesktopLayout` + `useInView` (framer). **Pattern B для layout; `useInView` swap — у 9c.2.** Послідовність 9b.2 → 9c.2 на цьому файлі обовʼязкова, щоб уникнути merge-конфліктів.
   - `InNeed`, `ProstheticsForUkrainians`, `SampleProsthesesCosts`, `ProtezAcademyPromo`, `ProtezAcademyEvent` — найімовірніше Pattern B; читати end-to-end і вирішувати.

**План (Pattern C — prop tweak only):**

Та ж зачистка, що OurResults у 9b.1: розділити на два елементи з `.mobileOnly` / `.desktopOnly` (рекомендовано) АБО переписати prop-сайт на CSS-керований атрибут. `VadymFedorov` (`<Body large={width > 1180}>` рядки 61, 64) — канонічний приклад Pattern C у 9b.2.

**Перевірка:**

- Lint + tsc + build чисто.
- Playwright на 375 / 768 / 1024 / 1366. Для Pattern A: через `mcp__playwright__browser_evaluate` відкрити Network panel — підтвердити, що завантажується **лише один** з mobile/desktop image варіантів на breakpoint.
- Для Pattern B: `mcp__playwright__browser_evaluate` → `getComputedStyle(...).display` для `.mobileOnly` і `.desktopOnly` per viewport — рівно один має бути `block`/`flex`, інший `none`.
- Visual smoke: hero логотипи, in-need map, mailing list image, Donate tier layout, Footer колонки, SpecialThanks partner grid — все рендериться коректно на кожному viewport.

---

### Сесія 9b.3 — Headers + AcademyAboutClient

**Скоуп (5 файлів):**
`src/sections/_shared/Header/index.tsx`, `src/sections/_shared/AcademyHeader/index.tsx`, `src/sections/_shared/AcademyHeaderMinimal/index.tsx`, `src/sections/academy/_root/index.tsx`, `app/[locale]/academy/about/AcademyAboutClient.tsx`.

**Підготовка:**

- `Header` використовує `width < 768` для body-scroll-lock при відкритому burger-меню (рядки ~109-130 з `useEffect` + `document.body.classList`).
- `academy/_root` + `AcademyAboutClient` використовують `width < 768`, щоб ховати back-to-top на мобільному.
- Усі 5 лишаються Client Components (router/transition/useState) — ця сесія знімає лише хук, не `'use client'` директиву.

**План:**

1. **Headers — scroll lock:**
   - Видалити `useScreenModeAndSize` + деривацію `isMobile = width < 768`.
   - Виставляти клас `menu-open` на `<html>` і `<body>` безумовно при `headerIsOpened === true` (залишити `useState` + `useEffect`).
   - У global SCSS (або shared header SCSS) гейтити scroll-lock тільки на мобільному:
     ```scss
     @media (max-width: 767px) {
       html.no-scroll,
       body.no-scroll {
         overflow: hidden;
       }
     }
     ```
   - Той самий патерн для `AcademyHeader` і `AcademyHeaderMinimal`.
2. **`academy/_root` + `AcademyAboutClient` — back-to-top видимість:**
   - Видалити `useScreenModeAndSize` + width-перевірку.
   - Рендерити `BackToTopButton` безумовно.
   - Обгорнути SCSS-класом, що ховає на мобільному: `.backToTopWrapper { @include mobile-lg { display: none } }`.
   - (Альтернатива: додати `hideOnMobile` prop до `BackToTopButton`, який накладає SCSS-клас усередині — трохи чистіше, опційно.)
3. Перевірити, що `useTransition`/`useRouter`/`useState`/`useEffect` лишилися — знімається **лише** `useScreenModeAndSize`.

**Перевірка:**

- Lint + tsc + build чисто.
- Playwright:
  - При 375px: відкрити burger → body заскроллокнутий; закрити → відновлено.
  - При 1280px: burger не рендериться (CSS @media); body scroll ніколи не локається, навіть якщо `headerIsOpened` якось перемкнеться.
  - Скролити довгу сторінку при 1280px → back-to-top зʼявляється; при 375px → ні.
  - Locale switch (`en` ↔ `uk`) — працює.

---

### Сесія 9b.4 — зачистити «хвостовик» + видалити хук + фінальна перевірка

**План:**

1. **`src/components/TextAppearanceWrapper/index.tsx`** — на момент плану імпорт хука і його використання **уже закоментовані** (рядки 5, 18, 36). Видалити ці 3 рядки повністю, щоб у файлі не лишилось жодної згадки `useScreenModeAndSize`. Без цього кроку наступний grep (крок 2) дасть false-positive і delete хука завалить review.
2. `grep -rn "useScreenModeAndSize" src app` → очікувати **нуль хітів**. Якщо щось лишилося — це пропущено в 9b.1–9b.3; роутити в відповідну сесію за патерном і перезапускати її.
3. Видалити `src/hooks/useScreenModeAndSize.tsx`.
4. Перевірити, чи ще потрібен `react-use`: `grep -rn "from 'react-use'" src app`. Якщо нуль — `npm uninstall react-use`.
5. Повний `npm run build`:
   - Зафіксувати `/[locale]` First Load JS (очікується: ~180 kB, ±5; великий зсув бандла — після 9c + 9.2-redux).
   - Зафіксувати `'use client'` count: `grep -rl "'use client'" src app | wc -l`. Великого падіння не чекати — більшість файлів лишаються client через інші причини (форми, слайдери, framer). Виграш Блоку 9b — **гідраційна стабільність + готовність до 9.2-redux**, не миттєвий `'use client'` drop.
6. Playwright smoke по всіх 9 маршрутах × 2 локалі × 4 ширини (375 / 768 / 1024 / 1366).

---

## Блок 9c — прибрати `framer-motion` (3 сесії)

### Контекст блоку

Усього 2 місця імпорту framer-motion у кодбазі:

- `src/components/TextAppearanceWrapper/index.tsx` — `motion`, `HTMLMotionProps`, `Variants`. Обгортає children у `<motion.div>` зі spring-physics slide-up + fade за `whileInView`. Використовується в **31 файлі (159 місць)**, переважно home-секції.
- `src/sections/_shared/MailingList/MailingList.tsx` — `useInView` гейтить CSS-клас для reveal-анімації.

framer-motion додає ~30 kB minified+gzipped у shared chunk. Замінюємо на CSS keyframes + `react-intersection-observer` (вже в deps, вже використовується в `academy/_root` і `AcademyAboutClient`).

**API surface, який зберігаємо для `TextAppearanceWrapper`:**

- Props: `children`, `reverse?: boolean`, `isDisabled?: boolean`, `className?: string`, плюс passthrough event-handlers (`onMouseEnter`/`onMouseLeave` використовуються `SampleProsthesesCosts`).
- Поведінка: fade + slide up (або down при `reverse`) при 80% видимості; статично видимий при `isDisabled`.

---

### Сесія 9c.1 — переписати внутрішку `TextAppearanceWrapper`

**Скоуп:** `src/components/TextAppearanceWrapper/index.tsx` + новий `src/components/TextAppearanceWrapper/style.module.scss`.

**План:**

1. Створити `src/components/TextAppearanceWrapper/style.module.scss`:
   ```scss
   .wrapper {
     opacity: 0;
     transform: translateY(100px);
     transition:
       opacity 0.5s ease-out,
       transform 0.5s ease-out;
     will-change: opacity, transform;
   }
   .reverse {
     transform: translateY(-100px);
   }
   .visible {
     opacity: 1;
     transform: translateY(0);
   }
   ```
2. Переписати компонент (лишається `'use client'` — IntersectionObserver вимагає):

   ```tsx
   'use client'
   import { useInView } from 'react-intersection-observer'
   import type { HTMLAttributes, ReactNode } from 'react'
   import style from './style.module.scss'

   interface Props extends HTMLAttributes<HTMLDivElement> {
     reverse?: boolean
     isDisabled?: boolean
     children?: ReactNode
   }

   export const TextAppearanceWrapper = ({
     children,
     reverse = false,
     isDisabled = false,
     className,
     ...rest
   }: Props) => {
     const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.8 })
     const visible = isDisabled || inView
     const cls = [style.wrapper, reverse && style.reverse, visible && style.visible, className]
       .filter(Boolean)
       .join(' ')
     return (
       <div ref={ref} className={cls} {...rest}>
         {children}
       </div>
     )
   }
   ```

3. Прибрати імпорти `motion`, `HTMLMotionProps`, `Variants`.
4. lint + tsc.

**Перевірка:**

- Playwright `/`: скролити сторінку, спостерігати fade + slide-up для кожної картки/кнопки в обгортці.
- Spot-check `isDisabled` споживачів (якщо є) — рендеряться видимими одразу.
- Spot-check `reverse` споживачів — slide-down реверсний.
- `mcp__playwright__browser_console_messages` — без IntersectionObserver / React помилок.

---

### Сесія 9c.2 — `MailingList` framer-motion → react-intersection-observer

**Скоуп:** `src/sections/_shared/MailingList/MailingList.tsx`.

**План:**

1. Замінити `import { useInView } from 'framer-motion'` на `import { useInView } from 'react-intersection-observer'`.
2. Оновити API call: framer `const isInView = useInView(ref, { once: true })` → r-i-o `const { ref, inView } = useInView({ triggerOnce: true })`. Повернутий `ref` навісити на target.
3. Замінити usage `isInView` → `inView` у JSX (рядок ~71: `<div className={\`${style.images} ${inView ? style.show : ''}\`}>`).
4. Прибрати ручний `useRef(null)` — r-i-o дає ref.
5. lint + tsc.

**Перевірка:** Playwright `/`, доскролити до `MailingList`, переконатися, що image-reveal анімація працює (клас `style.show` накладається).

---

### Сесія 9c.3 — uninstall `framer-motion` + фінальна перевірка

**План:**

1. `grep -rn "from 'framer-motion'" src app` → очікувати нуль хітів.
2. `npm uninstall framer-motion`.
3. Повний `npm run build`:
   - Зафіксувати `First Load JS shared by all` (очікуване падіння ~25-30 kB).
   - Зафіксувати `/[locale]` First Load JS.
4. Playwright smoke по `/`, `/ua`, `/academy`, `/academy/about`, `/donate`, `/partners`, `/thank-you`, `/stories/*` — усі `TextAppearanceWrapper` анімації працюють, інтеракції без зламів.

---

## Критичні файли (Блоки 9b + 9c)

**Нові:**

- `src/components/ResponsiveImage/index.tsx` (Сесія 9b.2).
- `src/components/TextAppearanceWrapper/style.module.scss` (Сесія 9c.1).

**Модифікуються:**

- 30 споживачів `useScreenModeAndSize`, розкладені на:
  - **9b.1 (13 файлів):** 12 слайдерів + `home/OurResults`.
  - **9b.2 (11 файлів):** Pattern A / Pattern B / Pattern C — класифікація per-file у 9b.2.
  - **9b.3 (5 файлів):** Headers + composers + `_root`.
  - **9b.4 (1 файл):** `src/components/TextAppearanceWrapper/index.tsx` — прибрати закоментовані рядки.
- `src/components/TextAppearanceWrapper/index.tsx` (також Сесія 9c.1) — повний rewrite внутрішки.
- `src/sections/_shared/MailingList/MailingList.tsx` (Сесії 9b.2 + 9c.2) — layout split + useInView swap. **Послідовність 9b.2 → 9c.2** обовʼязкова.
- Shared header SCSS (Сесія 9b.3) — scoped scroll-lock CSS.
- 12 слайдер-SCSS-модулів + `OurResults` SCSS (Сесія 9b.1) — портувати runtime width-гілки в `@media`.
- 11 секцій у 9b.2 (TSX + SCSS) — Pattern A/B/C per file.

**Видаляється:**

- `src/hooks/useScreenModeAndSize.tsx` (Сесія 9b.4).
- `framer-motion` із `package.json` (Сесія 9c.3).
- Опційно `react-use` із `package.json` (Сесія 9b.4), якщо більше нема споживачів.

**Не зачіпається:**

- `useAcademyTitle`, `useDonateTitle` — уже viewport-independent або власний `matchMedia`.
- `next/image` usages поза 11 image-swap місцями.
- `react-slick` (вже ізольований у `SlickCarousel` острівці з 9.1).
- Header locale-switch логіка (`useTransition` + `useRouter`).

---

## End-to-end перевірка (після того, як 9b + 9c заїхали)

1. `npm run lint`, `npx tsc --noEmit` — чисто.
2. `npm run build`:
   - First Load JS shared chunks: очікуване падіння ~30 kB (framer-motion gone).
   - `/[locale]` First Load JS: очікуване скромне падіння або flat — основний приз приходить після 9.2-redux.
   - `'use client'` count: `grep -rl "'use client'" src app | wc -l` — очікуване 53 → ~48 (скромний прямий drop; більший — після того, як 9.2-redux зможе безпечно виконатись).
3. Playwright MCP, автоматизований smoke:
   - Усі 9 маршрутів × 2 локалі × 4 ширини (375 / 768 / 1024 / 1366).
   - Per route: проскролити сторінку повністю, переконатись що картинки не зламані, слайдери працюють, анімації тригеряться, без помилок у консолі, без hydration warnings.
   - Headers: burger перемикається + body-scroll-lock на мобільному, без lock на desktop.
   - Back-to-top: видно лише на desktop там, де він є.
4. Bundle inspection: відкрити `.next/analyze/` (якщо `@next/bundle-analyzer` конфігурований) або інспектувати `chunks/` вручну. Підтвердити, що `framer-motion` чанків нема.

---

## Послідовність виконання (9b + 9c)

Виконувати в такому порядку:

1. **9b.1** (12 слайдерів + `OurResults`, 13 файлів) — незалежна, well-bounded.
2. **9b.2** (image swap / двогілковий JSX / prop tweak, 11 файлів) — Pattern A залежить від `ResponsiveImage` scaffold; Pattern B/C — незалежні.
3. **9b.3** (Headers + Academy, 5 файлів) — незалежна від 9b.1/9b.2.
4. **9b.4** (зняти dead-рядки в `TextAppearanceWrapper`, видалити хук, перевірити) — після 9b.1–9b.3.
5. **9c.1** (`TextAppearanceWrapper` rewrite) — незалежна від 9b; можна паралельно.
6. **9c.2** (`MailingList` useInView swap) — незалежна; може паралельно з 9c.1 (на `MailingList` файлі — після 9b.2, щоб уникнути merge-conflict).
7. **9c.3** (uninstall `framer-motion`, перевірити) — після 9c.1 + 9c.2.
8. **9.3** (explicit `dynamic`/`revalidate`) — ортогональне, будь-коли.
9. **9.2-redux** (`home/_root` → RSC) — після 9b + 9c. З меншою кількістю Client Components бандл нарешті має падати.

Кожна сесія невелика, окремий PR. Разом: 7 PR на 9b + 9c, +1 на 9.3, +1 на 9.2-redux = 9 PR до закриття Блоку 9.
