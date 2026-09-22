# Джерела даних і контракти

Читай розділ для змінюваного потоку. Точки входу сторінок — у [context-map](context-map.md), перевірки — у [testing](testing.md), змінні середовища — у [README](../README.md).

## Локалі, тексти й переходи

[routing](../src/lib/i18n.ts) → [middleware](../middleware.ts) → [request config](../i18n.ts) → [locale provider](<../app/[locale]/layout.tsx>) → `useTranslations`.

- Код локалі — `uk`, публічний prefix — `/ua`; EN використовує URL без prefix. Внутрішні переходи будуй через Link/router з `@/lib/i18n`, передаючи шлях без locale prefix.
- Автоматичне locale detection вимкнене. `persistLocaleChoice` сам пише `NEXT_LOCALE`; [LanguageSelectionModal](../src/components/LanguageSelectionModal/index.tsx) читає cookie і може клієнтськи перевести поточний шлях на збережену мову.
- Request config зіставляє файли та namespaces: `donations` → `donate`, `academy-about` → `academyAbout`, `children-prosthetics` → `childrenProsthetics`, `financial-audit` → `financialAudit`. Academy бере вкладений `.academy`; інші файли — цілий JSON.
- Message JSON містять також числа, URLs і масиви об'єктів. Під час зміни даних узгоджуй обидві локалі; структура та порядок масивів є частиною контракту споживача.
- Видимі заголовки можуть бути SVG у `icons.tsx` або `public`, а не текстом із messages; джерело визначай за імпортами секції.

## Секції й навігація

ID секції → [Header config](../src/sections/_shared/Header/config.ts) → menu component + labels із [shared messages](../messages).

- Home використовує [ProtezIDs](../src/consts/index.tsx); Academy — [IDs за alias `@academy/consts`](<../app/[locale]/academy/consts/index.ts>). У `src/consts` є ще одна, неповна декларація AcademyIDs; орієнтуйся на фактичний імпорт споживача.
- [HomeMenu](../src/sections/_shared/Header/HomeMenu.tsx) зіставляє IDs і labels за індексом. Зміна порядку/кількості потребує узгоджених labels обох локалей та відповідних section IDs.
- [Header](../src/sections/_shared/Header/index.tsx) розділяє `variant`, `sideMenu`, `ancorLinks` і `arrowUp`. Вибір задають route-group layouts; секція, menu anchor і режим layout мають відповідати одне одному.

## WordPress Events

[getHomeSections](../src/lib/api.ts) → HTML post → [parseEvents](../src/utils/parsers.ts) → [getPosts](../src/utils/getPosts.ts) → [Home page](<../app/[locale]/(home-with-menu)/page.tsx>) → [Events](../src/sections/home/Events/Events.tsx).

- WP query знаходить post за **title `Events`**. Slug не є взаємозамінним ідентифікатором: у CMS лишилися slugs дубльованих drafts.
- HTML-класи `.upcomingEventsCard*` та вкладені `img`, `p`, `h3`, `a` — контракт parser із CMS. Змінюй selectors разом із підтвердженим форматом джерела.
- Fetch використовує revalidation/tag із `src/lib/api.ts`. Відсутня конфігурація чи помилка дає порожній контент; parser повертає порожній масив, Events приховує порожню секцію.
- [Events utils](../src/sections/home/Events/utils.ts) визначають upcoming/past за `startDate`, сортують і доповнюють slides до мінімуму повторенням карток. Повторені картки в UI не означають дублікати CMS.
- Наявність `parseNews`/`parsePressRelease` не означає їх виклик: поточний WP-потік отримує тільки Events.

## Контент і поточні результати

[Home messages](../messages/home.en.json) → [Home OurResults](../src/sections/home/OurResults/OurResults.tsx); [Academy messages](../messages/academy.en.json) → [Academy OurResults](../src/sections/academy/OurResults/index.tsx). Кожен файл має пару `.uk.json`.

- Значення лічильників живуть у messages; [getCurrentMonth](../src/lib/date.ts) → [useStatsRange](../src/hooks/useStatsRange.ts) змінює лише підпис періоду, використовуючи UTC-місяць.
- [PressRelease](../src/sections/home/PressRelease/PressRelease.tsx) читає `home.pressRelease` із messages; це окреме джерело від WordPress Events.

## Річна фінансова звітність

[Аудиторські PDF](../public/documents/financialAudit) → [financialAudit/data.ts](../src/sections/financialAudit/data.ts) → `getYearData` → секції [financialAudit](../src/sections/financialAudit).

- Річні аудиторські дані та поточні маркетингові лічильники мають окремі джерела. Змінюй фінансові суми за відповідним PDF і методологією, описаною біля категорій у `data.ts`.
- Category percentages обчислюються від `TOTAL_EXPENSES`; revenue зберігається окремо. Сума category USD має відповідати expenses відповідного року.
- Category USD, labels у `financial-audit.*.json` і кольори пов'язані за індексом; [ExpenseBreakdown](../src/sections/financialAudit/ExpenseBreakdown/index.tsx) використовує цей порядок напряму.
- Роки, default, PDF links і доступність даних визначає `data.ts`. `pending` означає відсутній звіт, `null` — відсутнє значення; зберігай відмінність від числового нуля.
- [DownloadReport](../src/sections/financialAudit/DownloadReport/index.tsx) вимикає завантаження для pending/відсутнього PDF. Новий рік додавай з узгодженими даними та станом доступності джерела.

## SVG та інші медіа

[Academy title SVG](../public/academyPage/titles) → [generator](../scripts/generate-academy-titles.mjs) → [generated map](../src/hooks/academyTitles.generated.ts) → [useAcademyTitle](../src/hooks/useAcademyTitle.ts).

- Для кожного base потрібні `_en.svg`, `_uk.svg`, `_mobile_en.svg`, `_mobile_uk.svg`; розміри беруться з SVG. Редагуй джерела й регенеруй карту: ручна зміна generated TS буде перезаписана.
- Інші title hooks мають ручні карти. У `useAcademyTitle` поле `desktop` також може містити mobile-варіант залежно від viewport.
- [ProtezImage](../src/components/ProtezImage/index.tsx) додає `/` до local src через [getPath](../src/components/ProtezImage/utils.ts); local src передавай без початкового `/`, remote URL — з `external`. Remote hosts визначає [Next config](../next.config.js).

## Форми, API та зовнішні сервіси

[MailingList](../src/sections/_shared/MailingList/MailingList.tsx) → `subscribeToMailchimp({email, locale})` у [api.ts](../src/lib/api.ts) → [Mailchimp route](../app/api/mailchimp/route.ts) → додавання підписника.

- UI статус має відповідати результату API, а не лише завершенню `await`: helper може повернути `null` після помилки. Locale передається явно, оскільки API route має власне визначення мови відповіді.
- [Contact route](../app/api/contact/route.js) → [Nodemailer](../src/config/nodemailer.ts) відправляє лист. Його frontend helper у `api.ts` закоментований; це окремий шлях від активної Mailchimp-форми.
- Межі server/client визначай за функціями та імпортами: `src/lib/api.ts` поєднує серверний WP-fetch і клієнтський subscription helper; `src/lib/i18n.ts` має browser cookie helper. Серверні credentials залишаються на серверній межі; налаштування описані в [README](../README.md).
- [Donate](../src/sections/donate/Donate/index.tsx) містить банківські переходи, Zelle і Donorbox script/iframe. CTA веде на locale-aware `/donate`; платіж виконує зовнішній сервіс.
- URL заявок розміщені в [Button](../src/components/Button/index.tsx), [Header config](../src/sections/_shared/Header/config.ts), [Academy links](<../app/[locale]/academy/consts/links.ts>) та `apply.formHref` у [children-prosthetics messages](../messages/children-prosthetics.en.json) і UK-парі. Перед зміною URL знайди всі споживачі конкретної форми.

## SEO та маршрути

[SEO helpers](../src/lib/seo.ts) → metadata сторінок; перелік sitemap заданий окремо в [app/sitemap.ts](../app/sitemap.ts).

- Canonical, alternates і OpenGraph URL формуй для публічних EN/UA шляхів через helpers. Доданий чи перейменований route узгоджуй із sitemap та [legacy redirects](../next.config.js).
- Для thank-you зберігай узгоджені правила індексації: [page metadata](<../app/[locale]/thank-you/page.tsx>), [robots](../app/robots.ts) і відсутність у sitemap.
