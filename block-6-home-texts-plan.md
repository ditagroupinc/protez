# Блок 6 (підкрок) — Винесення текстів home + _shared у JSON

## Context

Зараз кожна секція головної (`src/sections/home/*`) та спільні секції (`src/sections/_shared/Header`, `Footer`, `MailingList`, `SpecialThanksToAllOurPartners`) тримають білінгвальні рядки як inline `{ english, ukrainian }` літерали, які індексуються `useLanguage().lang`. Загалом ~190 таких літералів.

Сторінки `academy` вже використовують чистіший патерн: типізовані словники JSON у `messages/*.json` + кастомний хук (`useAcademyTexts`, `useDonationsTexts`, `useAcademyAboutTexts`, `useTermsConditionsTexts`).

Повний Блок 6 з `protez-refactor-plan.md` врешті замінює це на `next-intl` + RSC. Цей PR — **підготовчий крок**: він консолідує inline-літерали у наявний JSON+hook патерн, щоб майбутня next-intl міграція стала механічною заміною хука, а не правкою кожного літерала.

Очікуваний результат:
- Єдине джерело істини для копірайту home + _shared.
- Секції стають коротшими й не містять inline-рядків.
- Жодних візуальних чи runtime-змін.

## Підтверджені рішення

| Питання | Рішення |
|---|---|
| Обсяг | `src/sections/home/*` + `src/sections/_shared/*` |
| JSON для home | Split-файли: `messages/home.en.json` + `messages/home.uk.json` (як donations) |
| JSON для _shared | Split-файли: `messages/shared.en.json` + `messages/shared.uk.json` |
| Хук для home | Один `useHomeTexts()` |
| Хук для _shared | Один `useSharedTexts()` |
| WP-секції (Events, OurPatients) | Пропустити — inline-літералів немає |
| `_root` композитор | Пропустити — inline-літералів немає |

## Файли до створення

- `messages/home.en.json`
- `messages/home.uk.json`
- `messages/shared.en.json`
- `messages/shared.uk.json`
- `src/hooks/useHomeTexts.ts`
- `src/hooks/useSharedTexts.ts`

### Структура JSON

`home.{lang}.json` — top-level ключі = camelCase назви секцій:

```json
{
  "letsGiveHope": { "description": "...", "needAProthesis": "...", "protezAcademy": "..." },
  "peopleTrustUs": { "...": "..." },
  "prostheticsForUkrainians": { "...": "..." },
  "ourResults": { "...": "..." },
  "sampleProsthesesCosts": { "...": "..." },
  "protezAcademyPromo": { "...": "..." },
  "veterans": { "...": "..." },
  "pressRelease": { "...": "..." },
  "meetOurTeam": { "...": "..." },
  "officeLocations": { "...": "..." },
  "merch": { "...": "..." },
  "inNeed": { "...": "..." },
  "protezAcademyEvent": { "...": "..." }
}
```

`shared.{lang}.json`:

```json
{
  "header": { "...": "..." },
  "footer": { "...": "..." },
  "mailingList": { "...": "..." },
  "specialThanksToAllOurPartners": { "...": "..." }
}
```

### Шаблон хука (за зразком `useDonationsTexts`)

```ts
// src/hooks/useHomeTexts.ts
'use client'
import enMessages from '../../messages/home.en.json'
import ukMessages from '../../messages/home.uk.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type HomeTexts = typeof enMessages

export function useHomeTexts(): HomeTexts {
  const { lang } = useLanguage()
  return dictionaries[lang]
}
```

Той самий шаблон для `useSharedTexts.ts` проти `shared.{en,uk}.json`.

## Покрокова міграція секції (повторити для кожної)

Для кожної секції зі списку нижче:

1. Відкрити `.tsx`. Знайти inline-літерал виду `const xxxText = { ... }`.
2. Для кожного ключа створити два JSON-записи:
   - `home.en.json → <section>.<key>` ← значення з `english`.
   - `home.uk.json → <section>.<key>` ← значення з `ukrainian`.
3. Видалити inline-блок.
4. Робота з `useLanguage()`:
   - Якщо `lang` використовується **виключно** для індексації цього літерала — прибрати імпорт `useLanguage`.
   - Якщо `lang` потрібен ще десь (іконки, `MakeDonationButton lang={lang}`, маршрутизація) — лишити.
5. Додати `const t = useHomeTexts()` (або `useSharedTexts()` для `_shared`).
6. Замінити JSX: `xxxText.key[lang]` → `t.<section>.<key>`.

Імена пропсів, структура JSX, className, ID — не чіпати. **Рухаються лише рядки.**

## Перелік секцій

### home (→ `useHomeTexts`)

| Секція | JSON-ключ |
|---|---|
| `src/sections/home/LetsGiveHope/LetsGiveHope.tsx` | `letsGiveHope` |
| `src/sections/home/PeopleTrustUs/PeopleTrustUs.tsx` | `peopleTrustUs` |
| `src/sections/home/ProstheticsForUkrainians/*.tsx` | `prostheticsForUkrainians` |
| `src/sections/home/OurResults/*.tsx` | `ourResults` |
| `src/sections/home/SampleProsthesesCosts/*.tsx` | `sampleProsthesesCosts` |
| `src/sections/home/ProtezAcademyPromo/*.tsx` | `protezAcademyPromo` |
| `src/sections/home/Veterans/*.tsx` | `veterans` |
| `src/sections/home/PressRelease/*.tsx` | `pressRelease` |
| `src/sections/home/MeetOurTeam/*.tsx` | `meetOurTeam` |
| `src/sections/home/OfficeLocations/*.tsx` | `officeLocations` |
| `src/sections/home/Merch/*.tsx` | `merch` |
| `src/sections/home/InNeed/*.tsx` | `inNeed` |
| `src/sections/home/ProtezAcademyEvent/*.tsx` | `protezAcademyEvent` |

Пропустити: `Events`, `OurPatients` (тягнуть текст з WP), `_root` (лише composer).

### _shared (→ `useSharedTexts`)

| Секція | JSON-ключ |
|---|---|
| `src/sections/_shared/Header/*` | `header` |
| `src/sections/_shared/Footer/*` | `footer` |
| `src/sections/_shared/MailingList/*` | `mailingList` |
| `src/sections/_shared/SpecialThanksToAllOurPartners/*` | `specialThanksToAllOurPartners` |

## На що звернути увагу

- **Короткі однакові рядки** (наприклад `'Protez Academy'` в обох мовах) — все одно перенести; у JSON можуть бути ідентичні значення між локалями.
- **Масиви** (картки команди в `MeetOurTeam`, FAQ-елементи) — зберегти форму масиву: у JSON емітимо масив локалізованих обʼєктів під ключем секції; у компоненті індексуємо за integer-ом.
- **Не-рядкові значення** (React-вузли/JSX усередині літерала) — не переносимо в JSON. Якщо такий літерал зустрівся — залишити inline і відмітити у PR-описі.
- **Парність локалей**: кожен ключ у `home.en.json` мусить існувати в `home.uk.json` (і навпаки). TS зловить відсутні англійські ключі через `HomeTexts = typeof enMessages`. Відсутні українські ключі мовчки дають `undefined` — перевірити дифом.
- **Робоча мова** (CLAUDE.md): міграцію обох локалей робити в одному коміті.
- **WP-секції** — `Events`, `OurPatients` не чіпати.
- **`useLanguage` залишити там, де `lang` усе ще йде в дочірні компоненти** (`MakeDonationButton`, локалізовані маршрути).

## Референси (для виконавця)

- Зразок патерну хука: `src/hooks/useAcademyTexts.ts`, `src/hooks/useDonationsTexts.ts`
- Зразок JSON: `messages/donations.en.json`, `messages/donations.uk.json`
- Зразок споживача: `src/sections/academy/Intro/index.tsx`
- Enum мов: `src/types/index.ts` (`Languages.English = 'english'`, `Languages.Ukrainian = 'ukrainian'`)
- Приклад inline-літерала: `src/sections/home/LetsGiveHope/LetsGiveHope.tsx:15-30`

## Перевірка

Згідно з умовами Блоку 6 з `protez-refactor-plan.md`:

1. `npm run lint` — без warnings/errors.
2. `npx tsc --noEmit` — без errors. (TS зловить будь-який відсутній JSON-ключ, що згадується у компоненті.)
3. `npm run format` — Prettier чистий.
4. Playwright MCP smoke (dev на :3000):
   - Navigate `/`. Screenshot. Без console errors.
   - Переключити мову через `localStorage.setItem('lang', 'ukrainian')` + reload. Перевірити, що всі home-секції рендеряться українською.
   - Переключити назад на англійську. Перевірити англійський рендер.
   - Navigate `/academy`, `/academy/about` — переконатися, що спільні Header/Footer/MailingList коректно показують обидві мови.
   - `mcp__playwright__browser_close`.
5. Spot-diff: до/після скріншоти `/` у обох мовах мають бути візуально ідентичні.

## Поза обсягом цього PR

- Встановлення `next-intl`, URL-маршрутизація, RSC-конверсія (решта Блоку 6).
- WP-секції (`Events`, `OurPatients`).
- Реструктуризація `messages/{en,uk}.json` (academy-namespace лишається на місці).
- Tailwind/SCSS (Блок 5, вже зроблено).
- Конверсія зображень (Блок 4, вже зроблено).
