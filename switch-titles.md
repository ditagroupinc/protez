# Замінити inline SVG-titles секцій Academy на зовнішні SVG з `public/academyPage/titles/`

## Context

Зараз кожна секція в `app/academy/sections/*/icons.tsx` тримає `<sectionName>TitleDesktop` / `Mobile` як inline-JSX SVG-шейп з повним `<path d="…">` всередині бандла. Обидва ключі `english` і `ukrainian` повертають **той самий** англомовний SVG, тобто заявленої локалізації немає. Паралельно у `public/academyPage/titles/` лежать готові локалізовані SVG-файли (`<base>_en.svg` / `<base>_uk.svg`) і кілька нелокалізованих (`welcome.svg`, `protez-academy.svg`, `title.svg`).

**Мета**: замінити inline-функції на `<ProtezImage>` (обгортка `next/image`), що рендерить зовнішній SVG, обраний відповідно до поточної мови з `LanguageContext`. Це:
- дає реальну локалізацію (картинка українською для UK, англійською для EN);
- викидає з JS-бандла ~25 KB SVG-path даних на секцію (× ~13 секцій = десятки KB парс/виконання менше);
- зберігає поточну логіку desktop/mobile-варіантів там, де вона вже є.

**Performance — відповідь на запитання**: чистий виграш. Поточні inline SVG роздувають JS-бандл і парсяться React-ом при ініті компонента. Зовнішні SVG кешуються браузером, завантажуються паралельно через `next/image` з lazy loading (Intersection Observer) та явними розмірами (без CLS). `next/image` не запускає Image Optimization Pipeline для SVG, але lazy-loading і прев'юшний sizing працюють. Для above-fold секцій (Intro) ставимо `priority={true}`, щоб LCP не страждав. Чисто менше JS = швидший initial paint.

## Архітектура

### Конвенція імен файлів

```
public/academyPage/titles/
  <base>_<lang>.svg         ← desktop / default
  <base>_mobile_<lang>.svg  ← mobile-варіант (якщо потрібен окремий)
```

- `<lang>` = `en` | `uk`
- Якщо для секції немає окремого mobile-файлу — і desktop, і mobile-гілки рендерять одну і ту ж картинку (масштабування через CSS, як зараз).

### Хук вибору title

Новий файл `src/hooks/useAcademyTitle.ts`, побудований за тим же патерном, що `src/hooks/useAcademyTexts.ts` (читає `lang` з `useLanguage()` з `@/contexts/LanguageContext`). Хук повертає об'єкт `{ desktop, mobile? }` з полями `{ src, width, height, alt }` для поточної мови.

```ts
'use client'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const BASE = '/academyPage/titles'

type TitleVariant = { src: string; width: number; height: number; alt: string }
type TitleSpec = { desktop: TitleVariant; mobile?: TitleVariant }

// base — ім'я файлу без _<lang>.svg; alt — англійський опис, незалежний від мови;
// width/height — точні значення з viewBox SVG.
const TITLES = {
  intro:                     { desktop: { base: 'welcome',                             alt: 'About PROTEZ Academy',         width: ___, height: ___ } },
  missionAndValues:          { desktop: { base: 'mission-and-values',                  alt: 'Mission and values',           width: ___, height: ___ },
                               mobile:  { base: 'mission-and-values_mobile',           alt: 'Mission and values',           width: ___, height: ___ } },
  goals:                     { desktop: { base: 'our-goals',                           alt: 'Our goals',                    width: ___, height: ___ },
                               mobile:  { base: 'our-goals_mobile',                    alt: 'Our goals',                    width: ___, height: ___ } },
  academy:                   { desktop: { base: 'protez-academy',                      alt: 'Protez Academy',               width: ___, height: ___ } },
  ourResults:                { desktop: { base: 'our-results',                         alt: 'Our results',                  width: ___, height: ___ } },
  chief:                     { desktop: { base: 'yakov-gradinar',                      alt: 'Yakov Gradinar',               width: ___, height: ___ },
                               mobile:  { base: 'yakov-gradinar_mobile',               alt: 'Yakov Gradinar',               width: ___, height: ___ } },
  events:                    { desktop: { base: 'current-training-programs',           alt: 'Current training programs',    width: ___, height: ___ },
                               mobile:  { base: 'current-training-programs_mobile',    alt: 'Current training programs',    width: ___, height: ___ } },
  academyStudents:           { desktop: { base: 'academy-students',                    alt: 'Academy students',             width: ___, height: ___ } },
  summitResults:             { desktop: { base: 'summit-results',                      alt: 'Summit results',               width: ___, height: ___ },
                               mobile:  { base: 'summit-results_mobile',               alt: 'Summit results',               width: ___, height: ___ } },
  specialThanksToAllOurPartners: { desktop: { base: 'special-thanks-to-all-our-partners', alt: 'Special thanks to all our partners', width: ___, height: ___ },
                                   mobile:  { base: 'special-thanks-to-all-our-partners_mobile', alt: 'Special thanks to all our partners', width: ___, height: ___ } },
  ourSponsors:               { desktop: { base: 'our-sponsors',                        alt: 'Our sponsors',                 width: ___, height: ___ },
                               mobile:  { base: 'our-sponsors_mobile',                 alt: 'Our sponsors',                 width: ___, height: ___ } },
  ourTeachers:               { desktop: { base: 'we-train',                            alt: 'We train',                     width: ___, height: ___ } },
  footer:                    { desktop: { base: 'footer',                              alt: 'PROTEZ Academy',               width: ___, height: ___ },
                               mobile:  { base: 'footer_mobile',                       alt: 'PROTEZ Academy',               width: ___, height: ___ } },
} as const

const LANG_SUFFIX = {
  [Languages.Ukrainian]: 'uk',
  [Languages.English]:   'en',
} as const

export type AcademyTitleName = keyof typeof TITLES

export function useAcademyTitle(name: AcademyTitleName): TitleSpec {
  const { lang } = useLanguage()
  const suffix = LANG_SUFFIX[lang]
  const spec = TITLES[name]
  const buildSrc = (base: string) => `${BASE}/${base}_${suffix}.svg`
  return {
    desktop: { ...spec.desktop, src: buildSrc(spec.desktop.base) },
    ...(spec.mobile && {
      mobile: { ...spec.mobile, src: buildSrc(spec.mobile.base) },
    }),
  }
}
```

**Чому окремий хук, а не розширення `useAcademyTexts`**: метадані ассета (width/height/alt) не залежать від мови — зайве дублювати в `messages/uk.json` і `messages/en.json`. TS-мапа дає строгу типізацію (`AcademyTitleName`) і JSON-и лишаються суто для текстового контенту.

### Як виглядатиме використання

```tsx
// Простий випадок (тільки desktop, CSS scaling для мобільного)
import ProtezImage from '@/components/ProtezImage'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

const { desktop } = useAcademyTitle('missionAndValues')
<ProtezImage {...desktop} className={style.title} />
```

```tsx
// Десктоп + мобільний варіант (умова через isMobile, як зараз)
const { desktop, mobile } = useAcademyTitle('theoryLectures')
{isMobile && mobile
  ? <ProtezImage {...mobile} className={styles.sectionTitle} />
  : <ProtezImage {...desktop} className={styles.sectionTitle} />}
```

`priority={true}` додати тільки для `intro` (above-fold).

## Мапінг секцій → base-ім'я файлу

Підтверджено користувачем:

| Секція                             | base                                | mobile варіант |
|-----------------------------------|-------------------------------------|----------------|
| `Intro`                           | `welcome`                           | —              |
| `MissionAndValues`                | `mission-and-values`                | ✓              |
| `OurGoals`                        | `our-goals`                         | ✓              |
| `Academy` (gallery)               | `protez-academy`                    | —              |
| `OurResults`                      | `our-results`                       | —              |
| `Chief`                           | `yakov-gradinar`                    | ✓              |
| `Events`                          | `current-training-programs`         | ✓              |
| `AcademyStudents`                 | `academy-students`                  | —              |
| `SummitResults`                   | `summit-results`                    | ✓ (tablet → mobile) |
| `SpecialThanksToAllOurPartners`   | `special-thanks-to-all-our-partners`| ✓              |
| `OurSponsors`                     | `our-sponsors`                      | —              |
| `OurTeachers`                     | `we-train`                          | —              |
| `Footer`                          | `footer`                            | ✓              |

**Не покрито мапінгом** (потребує уточнення перед імплементацією; за замовчуванням пропустимо в цьому проході — залишимо старий inline SVG):
- `TheoryLectures`
- `PracticeSessions`
- `AmputeeRehab`
- `WeAreInNews`
- Окремий пункт «summit: summit_en.svg» (можливо інший SVG-елемент усередині `SummitResults`; не плутати з `summit-results_*.svg`)

**Бракує файлів** (треба додати у `public/academyPage/titles/` перед/під час імплементації — без них build/runtime зламається):
- `welcome_en.svg`, `welcome_uk.svg` (зараз тільки нелокалізований `welcome.svg`)
- `protez-academy_en.svg`, `protez-academy_uk.svg` (зараз `protez-academy.svg`, `protez-academy-1.svg`)
- `footer_en.svg`, `footer_uk.svg`, `footer_mobile_en.svg`, `footer_mobile_uk.svg`
- Усі `*_mobile_*.svg` варіанти (для секцій, що мають мобільну гілку)

## Кроки імплементації

### 1. Додати відсутні SVG-файли у `public/academyPage/titles/`

Користувач постачає (або експорт з Figma) для всіх позицій з таблиці вище. Без цього кроку решта впаде в 404.

### 2. Створити хук

- NEW: `src/hooks/useAcademyTitle.ts` (код вище).
- `width` / `height` для кожного запису — узяти з атрибуту `viewBox` (або `width`/`height`) поточного inline SVG у відповідному `icons.tsx`. Це найшвидший шлях не помилитися.

### 3. Для кожної секції з мапінгу

Файли: `app/academy/sections/<Section>/index.tsx` + `app/academy/sections/<Section>/icons.tsx`.

**У `index.tsx`**:
1. Додати імпорти:
   ```tsx
   import ProtezImage from '@/components/ProtezImage'
   import { useAcademyTitle } from '@/hooks/useAcademyTitle'
   ```
2. Усередині компонента викликати хук:
   ```tsx
   const title = useAcademyTitle('<sectionKey>')
   ```
3. Замінити `{icons.<x>Logo.desktop[lang](style.title)}` → `<ProtezImage {...title.desktop} className={style.title} />`.
4. Для гілок з `isMobile` / `isTablet` — підставити `<ProtezImage {...title.mobile} … />` у відповідну гілку.
5. Прибрати непотрібний `lang` із деструктуризацій `useLanguage()`, якщо більше не використовується.

**У `icons.tsx`**:
1. Видалити інлайн-функції `<section>TitleDesktop` / `Mobile` / `Tablet` і відповідні поля з `icons` об'єкта.
2. Інші icons (`arrowUp`, лого хедера, кнопки тощо) — НЕ чіпати.
3. Якщо після видалення в `icons` лишаються тільки titles — видалити `icons.tsx` цілком і прибрати імпорт з `index.tsx`.

### 4. Для секцій без мапінгу

Не чіпаємо в цьому проході. Залишаємо старі inline-функції в `icons.tsx`. Документуємо в коміт-меседжі.

### 5. Особливий випадок — `SummitResults`

Поточно є `desktop` + `tablet` (не `mobile`). У хуку це поле `mobile` (семантично — «не-desktop»). У JSX замінити `isTablet ? icons.X.tablet : icons.X.desktop` на той самий патерн з `title.mobile`/`title.desktop`. CSS-логіка перемикання — без змін.

### 6. Особливий випадок — `Footer`

Поточно лише `footerTitleDesktop` / `footerTitleMobile` без локалізації. Тепер: `useAcademyTitle('footer')` повертає `{ desktop, mobile }` локалізованих файлів `footer_<lang>.svg` та `footer_mobile_<lang>.svg`. Гілка рендера лишається без змін.

## Критичні файли

**NEW**:
- `src/hooks/useAcademyTitle.ts`
- `public/academyPage/titles/*_mobile_*.svg`, `welcome_{en,uk}.svg`, `protez-academy_{en,uk}.svg`, `footer{,_mobile}_{en,uk}.svg`

**EDIT** (для кожної секції зі списку мапінгу):
- `app/academy/sections/Intro/index.tsx` + `icons.tsx`
- `app/academy/sections/MissionAndValues/index.tsx` + `icons.tsx`
- `app/academy/sections/OurGoals/index.tsx` + `icons.tsx`
- `app/academy/sections/Academy/index.tsx` + `icons.tsx`
- `app/academy/sections/OurResults/index.tsx` + `icons.tsx`
- `app/academy/sections/Chief/index.tsx` + `icons.tsx`
- `app/academy/sections/Events/index.tsx` + `icons.tsx`
- `app/academy/sections/AcademyStudents/index.tsx` + `icons.tsx`
- `app/academy/sections/SummitResults/index.tsx` + `icons.tsx`
- `app/academy/sections/SpecialThanksToAllOurPartners/index.tsx` + `icons.tsx`
- `app/academy/sections/OurSponsors/index.tsx` + `icons.tsx`
- `app/academy/sections/OurTeachers/index.tsx` + `icons.tsx`
- `app/academy/sections/Footer/index.tsx` + `icons.tsx`

**Існуючі сутності, які перевикористовуємо**:
- `src/components/ProtezImage/index.tsx` — обгортка `next/image` з `getPath`.
- `src/contexts/LanguageContext.tsx` — джерело `lang` (Languages.Ukrainian / .English).
- Патерн з `src/hooks/useAcademyTexts.ts` — як шаблон для нового хука.

## Verification

1. `npm run lint && npm run build` — без помилок TS / ESLint.
2. У DevTools → Network перевірити, що SVG-файли вантажаться без 404 для обох мов:
   - відкрити `/academy` в UK → побачити `*_uk.svg` у запитах title-зображень;
   - переключити мову на EN → побачити, що `*_en.svg` підвантажились;
3. Візуально пройти кожну змінену секцію в UK та EN; для секцій з mobile-варіантом — resize до < ~768 px і переконатися, що рендериться `*_mobile_*.svg`.
4. `Intro` лишається LCP-кандидатом — перевірити в Lighthouse, що LCP не виріс після зміни. Якщо так — додати `priority` у `desktop`-рендер Intro.
5. У Console — без warning'ів про missing alt / next/image dimensions.
6. Перевірити, що JS-бандл секцій справді зменшився: `npm run build` → подивитись size звіт; має бути помітне падіння на сторінці `/academy`.
