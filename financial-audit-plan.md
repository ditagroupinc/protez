# Інтеграція statistika-po-rokam-design.html → сторінка `/financial-audit`

## Контекст

`statistika-po-rokam-design.html` (корінь репозиторію) — самодостатній HTML-мокап сторінки «Незалежний фінансовий аудит»: таби років 2022–2025, стат-картки з count-up, інтерактивна донат-діаграма 8 категорій витрат, бари розподілу бюджету, порівняльна таблиця, картка «Завантажити PDF», плаваюча фонова анімація (glow-блоби + іскри), scroll-reveal, двомовність ua/en у JS-об'єктах. Його треба портувати в сайт як нову сторінку за архітектурним зразком `app/[locale]/dytyache-protezuvannya`.

**Рішення користувача:** slug `/financial-audit` (EN) + `/ua/financial-audit` (UK); shared Header/Footer як у dytyache-protezuvannya, але **з пунктами меню (якорями) головної сторінки** в бургер-меню хедера (десктоп + мобільний), як дає `<Header variant="home" />`; кнопка PDF — існуючий `Button variant="primary-teal"`; PDF-placeholder `/documents/foundingDocuments/assessment-regulations.pdf` (файл існує, замінять пізніше); дані — хардкод у типізованому TS; сторінку `/financial-audit` у меню не додавати; додати в sitemap. Кольори `#4AC0B0`-сім'ї → існуючі teal-змінні `globals.css`; кольори без аналогів — нові змінні.

**Джерело даних:** JS-об'єкти `DATA`/`TABLE`/`STR`/`CATEGORIES`/`AUDIT_NOTE` дизайн-файлу (рядки 631–800). Статична HTML-таблиця містить застарілі значення (955K/3,73M/5,16M) — ігнорувати; runtime-значення: пацієнти 31/83/273, бюджети 610K / 3,76M (en: 3.76M) / 3,99M (en: 3.99M).

## Нові файли

```
app/[locale]/financial-audit/layout.tsx
app/[locale]/financial-audit/page.tsx
messages/financial-audit.en.json
messages/financial-audit.uk.json
src/sections/financialAudit/data.ts
src/sections/financialAudit/_root/index.tsx + style.module.scss
src/sections/financialAudit/_shared/Reveal/        (index.tsx + style.module.scss)
src/sections/financialAudit/_shared/FadeSwap/      (index.tsx + style.module.scss)
src/sections/financialAudit/_shared/SplitHeading/  (index.tsx + style.module.scss)
src/sections/financialAudit/_shared/useDrawIn.ts
src/sections/financialAudit/HeroSection/           (index.tsx + style.module.scss)
src/sections/financialAudit/YearStats/             (index.tsx + style.module.scss)
src/sections/financialAudit/ExpenseBreakdown/      (index.tsx + style.module.scss)
src/sections/financialAudit/BudgetAllocation/      (index.tsx + style.module.scss)
src/sections/financialAudit/YearComparison/        (index.tsx + style.module.scss)
src/sections/financialAudit/DownloadReport/        (index.tsx + style.module.scss)
```

## Змінювані файли (4)

1. **`i18n.ts`** — додати `import('./messages/financial-audit.${locale}.json')` у `Promise.all` + `financialAudit: financialAudit.default` у мапу messages (за зразком `childrenProsthetics`, рядки 18/28/42).
2. **`app/globals.css`** — додати в `:root` (після teal-блоку, ~рядок 46) 7 змінних кольорів діаграми: `--chart-amber: #f2b84b`, `--chart-purple: #b98bdb`, `--chart-blue: #6c8cd5`, `--chart-coral: #ef7b6d`, `--chart-green: #8fd46b`, `--chart-sky: #4fa8d8`, `--chart-grey: #9a9a9a`.
3. **`app/sitemap.ts`** — додати `{ path: '/financial-audit', changeFrequency: 'monthly', priority: 0.6 }` у `routes`.
4. **`src/sections/_shared/Header/HomeMenu.tsx`** — виправити побудову лінків для крос-роутного використання (див. крок 1а). Гілка `ancorLinks={false}` зараз ніде не використовується і зламана (генерує `/letsGiveHope` → 404), тож зміна безризикова для головної.

**НЕ чіпати:** решту `Header/*` (index.tsx, config.ts, GeneralMenu), `Footer/*`, `Button/*`, `src/consts/index.tsx`, `middleware.ts`.

## Кроки

### 1. Route-файли (клони dytyache-protezuvannya)
- `layout.tsx`: `<Header variant="childrenProsthetics" sideMenu="home" ancorLinks={false} arrowUp={false} />` + `{children}` + `<Footer layout="childrenProstheticsPage" />`.
  - `variant="childrenProsthetics"` → teal-хром (білий хедер, teal donate CTA, teal burger) — «той самий хедер, що й у dytyache-protezuvannya».
  - `sideMenu="home"` → бургер-меню (десктопне `.desktopBurger` і мобільне) рендерить `<HomeMenu>` — ті ж 17 якірних пунктів `HOME_NAV_IDS` + лінк Protez Academy + CTA + телефон, що й на головній (`Header/index.tsx:25-43` — проп `sideMenu` типобезпечно комбінується з будь-яким variant). Підписи пунктів — з наявного `shared.header.protezPage.navigation` (`messages/shared.{en,uk}.json`) — нових перекладів для меню не треба.
  - `ancorLinks={false}` → лого веде на `/` (прецедент: `thank-you/layout.tsx`), а пункти меню — на головну з якорем (після кроку 1а).
  - Пункт для самої `/financial-audit` в меню НЕ додаємо (рішення користувача). Drawer-меню лишається з червоним hover, як на головній (стилі `HomeMenu` захардкоджені — не чіпаємо).

### 1а. Фікс `HomeMenu.tsx` (крос-роутні якірні лінки)
Зараз (`HomeMenu.tsx:39,55`): `linksPrefix = ancorLinks ? '#' : '/'` → з `/financial-audit` лінк `#id` лишає користувача на цій же сторінці (якорів там нема), а `/id` — 404. Жоден режим не дає `/#id`.
Фікс: у гілці `ancorLinks={false}` рендерити локалізований `Link` з `@/lib/i18n` з `href={'/#' + id}` (замість plain `next/link`) — з `/ua/financial-audit` вийде `/ua#id`, локаль не губиться. Гілка `ancorLinks={true}` (головна сторінка) — без змін (`#id`, plain link). Поведінка головної не змінюється взагалі.
- `page.tsx`: клон `dytyache-protezuvannya/page.tsx` — `export const dynamic = 'force-static'`, `generateMetadata` з `getTranslations({ locale, namespace: 'financialAudit.meta' })`, `buildAlternates(locale, '/financial-audit')`, `openGraph.url = localeUrl(locale, '/financial-audit')` (`src/lib/seo.ts`); тіло: `setRequestLocale(locale)` → `<FinancialAuditPage />` з `@/sections/financialAudit/_root`.

### 2. Переклади `messages/financial-audit.{en,uk}.json`
Namespace-структура: `meta` (title/description), `hero` (titleSerif/titleBold/description/yearNote/pendingNote), `stats` (titleSerif/titleBold `{year}`/patientsLabel/budgetLabel), `breakdown` (titleSerif/titleBold/description/centerPending/centerYear `{year}`/categories[8]), `allocation` (titleSerif/titleBold/program/admin/fundraising), `comparison` (titleSerif/titleBold/metric/patients/budget), `download` (title `{year}`/description/cta/pendingCta). Значення — з `STR`/`CATEGORIES`/`AUDIT_NOTE`/`heroDescText` дизайн-файлу (uk ← `ua`-ключі, en ← `en`). ICU-гоча: `{year}` передавати як `String(year)`, інакше next-intl форматує `2 024`.

### 3. `data.ts` — типізований конфіг
`AUDIT_YEARS = [2022, 2023, 2024, 2025]`, `DEFAULT_YEAR = 2024`, `YearData = { patients: number | null, budget: {en,uk} | null, split: {program,admin,fund} | null, reportPdf: string | null, pending?, cats: {pct, amount:{en,uk}}[8] }`. Значення — з JS-об'єкта `DATA` (2022: 74/6/12/2/3/0/1/2 %, split 97/2/1 і т.д.). `reportPdf = '/documents/foundingDocuments/assessment-regulations.pdf'` для 2022–2024, `null` для 2025 (pending). `CATEGORY_COLORS = ['var(--teal)', 'var(--chart-amber)', …]`, `BAR_COLORS = { program: 'var(--teal)', admin: 'var(--chart-amber)', fund: 'var(--chart-purple)' }`. Порівняльна таблиця **деривується** з `AUDIT_DATA` — одне джерело правди, застарілі числа не просочаться.

### 4. `_shared` хелпери
- **`Reveal`**: `useInView({ triggerOnce: true, threshold: 0.15 })` (react-intersection-observer вже в deps), props `{children, className?, delay?}`; SCSS = `.reveal/.in-view` дизайну (opacity 0 + translateY(26px) → 0, `.7s cubic-bezier(.22,.9,.3,1)`), reduced-motion → одразу видимий. Спільний `TextAppearanceWrapper` не підходить (translateY(100px), threshold 0.8).
- **`FadeSwap`**: `{swapping: boolean}` → `opacity: 0` / transition `.2s ease`.
- **`SplitHeading`**: `{as: 'h1'|'h2', serif, bold}` — два блокові span; `.serif` = `playfairDisplayItalic.className` (з `app/fonts.ts`, як у `childrenProsthetics/OurApproach`) + italic 700, `color: var(--teal)`; `.bold` = 900 uppercase. Type scale: h1 72/78→44/48 (≤900px)→30/34 (≤520px); h2 60/76→40→26/32. SVG-титули (патерн dytyache) НЕ використовуємо — тут живий текст.
- **`useDrawIn(year)`**: хук — на зміну року `setDrawn(false)` → подвійний `requestAnimationFrame` → `setDrawn(true)` (репліка two-rAF трюку дизайну для draw-in донату/барів; cleanup скасовує rAF).

### 5. `_root` — стан і композиція
`'use client'` (зразок: `childrenProsthetics/_root/index.tsx`). Стан: `year` + `swapping`; `changeYear`: clearTimeout → `setSwapping(true)` → через 200мс `setYear(next); setSwapping(false)` (fade-out → підміна даних → fade-in, як у дизайні). Стан течe вниз props-ами (без контексту). Eager: `HeroSection`, `YearStats`; `React.lazy` + `SuspenseSection`: `ExpenseBreakdown`, `BudgetAllocation`, `YearComparison`, `DownloadReport`. Фон сторінки: `var(--white)`, текст `var(--forest)`.

### 6. Секції
- **HeroSection** `{year, onYearChange}`: `.smokeBg` (radial-градієнти + `::after` 200px fade до білого) → `.heroFx` `aria-hidden` з 3 glow + 5 іскор (inline left/duration/delay, дизайн рядки 488–492) → `SplitHeading h1` + опис + таби + примітка. Keyframes `heroDrift1/2/3` + `rise` **скопіювати** з `childrenProsthetics/HeroSection/style.module.scss` (рядки 27–106, там же зразок reduced-motion), перефарбувавши у teal-мапінг. `heroIn` stagger (delays .05/.15/.25/.35s). Таби: `<button type="button" aria-pressed>`; active = teal + `rgba(15,158,139,.16)`. Примітка 2025: pill `.pending` з пульсуючою крапкою (`pulseDot`, `var(--teal-dark)`).
- **YearStats** `{year, swapping}`: `useInView({triggerOnce, threshold: 0.4})`; пацієнти = `react-countup` з **`key={year}`** (ремаунт → повторний count-up при перемиканні року), локалізований separator; бюджет — текст без count-up; `—` для pending. Картки в `<Reveal delay>`; грід у `<FadeSwap>`.
- **ExpenseBreakdown** `{year, swapping}`: донат — чистий React/SVG: `R=80`, `CIRC=2πR`, для кожної категорії `len=(pct/100)·CIRC`, `strokeDashoffset=-(acc/100)·CIRC`; `strokeDasharray` через inline `style` = `drawn ? \`${len} ${CIRC-len}\` : \`0 ${CIRC}\`` + CSS transition `.7s` (draw-in через `useDrawIn`). **`var(--…)` в SVG лише через inline `style`, не через атрибути.** `<svg>` з CSS `transform: rotate(-90deg); overflow: visible` (інакше drop-shadow glow обрізається), `aria-hidden` (дані дублює список). 2025 → лише сіре кільце `var(--mint-grey)`. Hover-синхронізація: один стан `activeIdx` → класи `.active`/`.dim` на сегментах і рядках списку (скидати при зміні року). Центр: `$бюджет` / «скоро|soon» + рік.
- **BudgetAllocation** `{year, swapping}`: 3 бари, fill `width: drawn ? val% : 0%` + transition `1s cubic-bezier(.22,.9,.3,1)`, кольори з `BAR_COLORS`; pending → `—`.
- **YearComparison** `{swapping}`: контент від року НЕ залежить, лише від локалі (3,76M vs 3.76M) — деривується з `AUDIT_DATA`; `<thead>` + `th scope`; 2024 → `.highlight` (teal 700); 2025 → `—`; wrapper `overflow-x: auto`. У `<FadeSwap>` (дизайн фейдить її разом з усіма).
- **DownloadReport** `{year, swapping}`: картка (іконка ↓ на `rgba(15,158,139,.15)`, h4 «Аудит за {рік}», опис) + кнопка: активні роки — `<Button as="link" href={reportPdf} target="_blank" rel="noopener noreferrer" variant="primary-teal" size="normal">`; 2025 — `<Button as="button" disabled aria-disabled variant="primary-teal">` з текстом pendingCta (стилі `:disabled` у Button вже є). `download`-атрибут не потрібен — конвенція репо для PDF: `target="_blank"` (див. `academy/FoundingDocuments`). Button не модифікуємо.

## Мапінг кольорів (дизайн → фінальний)

| Дизайн | Фінально |
|---|---|
| `--bg #FFFFFF` | `var(--white)` (сторінка біла, НЕ `--sand`) |
| `--panel/--bg-soft #F3F3F3` | `var(--light-grey)` (точний збіг hex) |
| `--line #E2E3E7` | `var(--mint-grey)` (бордери, трек донату, лінії таблиці) |
| `--accent #4AC0B0` | `var(--teal)` (акцент, serif-span, активний таб, категорія 0) |
| `--accent-dark #2E8B7E` | `var(--teal-dark)` (пульс-крапка) |
| `--accent-soft #7FDCCB` | `var(--teal-light)` (тіло іскри) |
| `--text/-dim/-faint` | `var(--forest)` / `var(--forest-dim)` / `var(--forest-faint)` |
| `#0d1211` (текст pending-pill) | `var(--jet)` |
| 7 кольорів діаграми | нові `--chart-*` змінні |
| `rgba(74,192,176,…)` (smoke/glow/тінти) | `rgba(15,158,139,…)` ті ж альфи (літерали — конвенція репо) |
| `rgba(46,139,126,.28)` (g2) | `rgba(12,122,107,.28)` |
| `rgba(127,220,203,…)` (g3, тінь іскри) | `rgba(74,192,176,…)` |
| `--panel-2 #C7C8CF` | не використовується у портованій розмітці — відкинути |

## Ефекти → механізми

Hero-stagger → CSS keyframe + delays; drift-glows/іскри/smoke → скопійовані keyframes; scroll-reveal → `Reveal`; count-up → react-countup + `key={year}`; draw-in донату/барів → `useDrawIn` + CSS transitions; pulseDot → keyframe; fade-swap → стан `swapping` + 200мс timeout; hover-мікроінтеракції → CSS. Кожен SCSS-модуль — блок `@media (prefers-reduced-motion: reduce)`. Медіа-запити — сирі `@media (max-width: 900px / 520px)` для точності дизайну.

## Верифікація

1. `npm run lint` + `npx tsc --noEmit` — чисто. (Prettier: без `;`, одинарні лапки; ESLint: blank line перед return.)
2. `npm run dev` → **Playwright MCP** на `http://localhost:3000/financial-audit` і `/ua/financial-audit`:
   - **Перепис компонентів** (snapshot): hero-заголовок (serif+bold), опис, 4 таби, примітка; h2 «Повний звіт за 2024 рік» + 2 стат-картки; h2 розподілу + донат (9 circle: трек+8) + 8 рядків категорій; 3 бари; таблиця 5×3; download-картка; shared Header (teal CTA) і Footer присутні; хедер/футер/drawer з дизайн-файлу відсутні.
   - **Текстовий диф**: через `browser_evaluate` зібрати `document.body.innerText` для обох локалей і звірити, що присутній КОЖЕН рядок з `STR`/`CATEGORIES`/`AUDIT_NOTE`/`heroDescText` відповідної мови + числа `31/83/273`, `610K`, uk `3,76M/3,99M` / en `3.76M/3.99M`; і що ВІДСУТНІ застарілі `955K`, `3,73M`, `5,16M`.
   - **Перемикання років**: 2025 → pending-pill, `—` у картках/барах/таблиці-2025, сіре кільце, «скоро/soon», кнопка disabled «Звіт готується»; 2022 → `+31`, `$610K`, перший сегмент 74%, бари 97/2/1, кнопка активна; opacity не застрягає в 0 після crossfade.
   - **Hover-синхронізація**: hover рядка → сегмент glow, решта dim; hover сегмента → рядок active; mouseleave — скидання.
   - **PDF**: href `/documents/foundingDocuments/assessment-regulations.pdf`, `target="_blank"`, HTTP 200.
   - **Бургер-меню**: клік по бургеру (десктоп і мобільний) відкриває drawer з 17 пунктами home-навігації + Protez Academy; клік по пункту (напр. «Наші результати») закриває меню і веде на `/#ourResults` (з `/ua/…` — на `/ua#ourResults`) із прокруткою до секції головної; регресія головної: на `/` пункти меню як і раніше `#id` (скрол без перезавантаження).
   - **Локаль**: перемикач у Header EN↔UA лишає той самий роут з префіксом.
   - **Мобільний 520px** (`browser_resize`): 1 колонка карток, донат 220px, стовпчикова download-картка, компактна таблиця.
   - **Reduced motion**: емуляція через CDP — іскри приховані, glow статичні, reveal одразу видимі.
   - **Консоль**: нуль помилок і hydration-warnings (`browser_console_messages`).
3. `npm run build` — обидва URL статичні, sitemap містить `/financial-audit` + `/ua/financial-audit`.

## Ризики

- Hydration: усі initial-стани анімацій детерміновані (drawn=false, inView=false, CountUp 0) — однакові на сервері й клієнті; без `Date`/`random` у рендері.
- `reactStrictMode: false` у next.config — подвійних ефектів немає, rAF-трюк безпечний.
- Швидкі кліки по табах — clearTimeout перед новим swap (ref).
- Playfair 700 — синтезований bold з одного TTF, так само як у `OurApproach` (прийнятно, зафіксовано).
- Правка `HomeMenu.tsx` — єдина зміна shared-компонента; гілка `ancorLinks={true}` (головна) не торкається, а `false`-гілка сьогодні ніде не викликається. Перевірити головну в smoke-тесті все одно.
- `TopBarCtas` і хром хедера керуються `variant`, а не `sideMenu` — тому CTA лишаються teal (childrenProsthetics), drawer — home. Це очікувано.
- Логотип Header з `/ua/…` веде на EN-домашню (plain `next/link`) — наявна поведінка (`thank-you`), поза скоупом.
- **Комітів не робити** (правило CLAUDE.md).
