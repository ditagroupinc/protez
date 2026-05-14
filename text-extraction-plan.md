# Text Extraction Plan — `app/academy`

> **Update (post-switch-titles)**: `switch-titles.md` уже відпрацьовано — 13 секцій із мапінгу мігровані з inline SVG-titles на `<ProtezImage>` + хук `useAcademyTitle`. Це впливає на цей план у кількох місцях — див. секцію **«Стан після switch-titles»** нижче. Решта плану лишається валідною.

## Контекст і ціль

**До**: усі тексти в `app/academy/sections/*` захардкоджені прямо в JSX. Частина секцій українською (Intro, MissionAndValues, OurGoals), частина — англійською (Header nav, OurResults, TheoryLectures, PracticeSessions, Chief, OurTeachers). SVG-іконки мають свої двомовні рендерери у `icons.tsx` (тільки для секцій, які НЕ були мігровані switch-titles — див. нижче).

**Після цієї фази**:
- Один JSON-файл на мову для всієї сторінки academy: `messages/uk.json`, `messages/en.json`.
- У JSX немає захардкоджених UI-рядків — усі через невеликий хук-читач.
- Структура JSON готова для подальшого підключення `next-intl` (Session 1+ з `plan.md`) **без зміни ключів**.
- Перемикання мови продовжує працювати через існуючий `LanguageContext`.

**Що НЕ робимо**: НЕ встановлюємо next-intl, НЕ переносимо сторінки під `app/[locale]/`, НЕ чіпаємо `texts-svg/index.js`, `LanguageContext`, нову інфраструктуру title-ів з switch-titles (`useAcademyTitle`, `ProtezImage`-виклики, файли у `public/academyPage/titles/`).

---

## Стан після switch-titles

Що змінилось у репо до старту цього плану:

1. **`useAcademyTexts.ts` уже існує** (`src/hooks/useAcademyTexts.ts`). Session 1 крок A.5 — пропустити, але перевірити що файл відповідає коду нижче.

2. **`useAcademyTitle.ts` додано** як сусідній хук (`src/hooks/useAcademyTitle.ts`). Не чіпаємо.

3. **`icons.tsx` у мігрованих секціях** (Intro, MissionAndValues, OurGoals, Academy, OurResults, Chief, Events, AcademyStudents, SummitResults, SpecialThanksToAllOurPartners, OurSponsors, OurTeachers, Footer) — title-функції видалені; файли або відсутні (якщо лишались лише titles), або тримають інші icons (`arrowUp` тощо). **Стара заборона «не чіпати icons.tsx» застаріла для цих секцій** — текстову екстракцію вона все одно не зачіпає (тексти живуть у JSX, не в icons.tsx).

4. **`icons.tsx` у НЕ мігрованих секціях** (`TheoryLectures`, `PracticeSessions`, `AmputeeRehab`, `WeAreInNews`, `Header`) — лишаються з inline SVG. Тут заборона досі діє: НЕ чіпаємо їх у цьому плані.

5. **Деструктуризація `lang` з `useLanguage()`**: у мігрованих секціях вона могла бути прибрана, якщо більше не лишилось `icons.X[lang](...)` викликів. Коли вставлятимете `useAcademyTexts()`, не покладайтесь на `lang` як на існуючий ідентифікатор у скоупі — хук сам читає мову всередині.

6. **JSX вже містить `<ProtezImage {...title.desktop} />`** у мігрованих секціях. Текстова заміна йде на інших рядках (description, cta, statement, items, …) — конфліктів з title-кодом немає.

7. **Бандл-метрики**: фінальний `npm run build` у Session 3 покаже кумулятивне падіння (switch-titles + text-extraction). Якщо потрібен «голий» внесок text-extraction — зняти базлайн розміру `/academy` до старту Session 1.

8. **Footer (Session 1, крок B.3)**: footer-логотип уже на `<ProtezImage>`, текстова заміна (supportAcademy, nonprofit, phone, email, copyright, terms, legalAddress) — окремі рядки, без перетину.

9. **Mission/Goals/Results/Chief (Session 2)**: title-рядки вже на `<ProtezImage>`. Замінюємо лише текстовий контент (statement, values[].title/text, items, stats[].label, role/description тощо).

10. **TheoryLectures / PracticeSessions** (Session 2) і **AmputeeRehab / WeAreInNews** (Session 3) — title досі inline, треба зберегти існуючі `icons.X[lang](...)` виклики. Тут `const { lang } = useLanguage()` лишається.

---

## Початкове "Що НЕ робимо" (історичне формулювання)

НЕ встановлюємо next-intl, НЕ переносимо сторінки під `app/[locale]/`, НЕ чіпаємо `texts-svg/index.js`, `LanguageContext`. `icons.tsx` чіпаємо лише в немігрованих секціях — і навіть там тільки за необхідності.

---

## Архітектура

### Структура файлів

```
messages/
  uk.json       ← всі тексти academy українською
  en.json       ← всі тексти academy англійською
```

Namespace: `academy.<section>.<key>`. Зворотньо сумісно з майбутнім `next-intl`.

### Хук-читач

`src/hooks/useAcademyTexts.ts` — повертає об'єкт текстів у поточній мові:

```ts
'use client'
import ukMessages from '@/../messages/uk.json'
import enMessages from '@/../messages/en.json'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

const dictionaries = {
  [Languages.Ukrainian]: ukMessages,
  [Languages.English]: enMessages,
} as const

export type AcademyTexts = typeof ukMessages.academy

export function useAcademyTexts(): AcademyTexts {
  const { lang } = useLanguage()
  return dictionaries[lang].academy
}
```

Використання:
```tsx
const t = useAcademyTexts()
<h1>{t.intro.description}</h1>
{t.goals.items.map((item, i) => <li key={i}>{item}</li>)}
```

### Конвенція ключів

- `camelCase`, ім'я секції в корені.
- Списки — JSON-масиви (на цьому етапі). При переході на `next-intl` перетворимо на об'єкти з числовими ключами одним пакетним переходом.
- Власні назви (імена, адреси) — у JSON для одноманітності.
- Дублі CTA між секціями (`"Apply to Academy"`) — дублюємо під ключами кожної секції, не дедуплікуємо.

### Симетрія мов

Для секцій, де у JSX зараз тільки одна мова, інша мова отримує той самий рядок з префіксом `[TODO translate] `. Це тримає структуру JSON-ів симетричною (інакше TS гнівається на розбіжність ключів).

---

# Sessions

Кожна сесія — самостійна одиниця Claude Code-роботи. Після кожної сайт працює, можна комітити і йти далі.

---

## Session 1 — Scaffold + Globals (Intro, Header, Footer)

**Мета**: підняти інфраструктуру (JSON + хук) і одразу пілотнути її на трьох найвидиміших глобальних секціях. Якщо щось не так зі структурою — побачимо тут, а не в наступних сесіях.

### Кроки

#### A. Інфраструктура

1. Перевірити `tsconfig.json`: `"resolveJsonModule": true`, `"esModuleInterop": true`. Якщо немає — додати.

2. Створити каталог `messages/` у корені.

3. Створити `messages/uk.json` зі **повним скелетом** усіх секцій academy (включно з порожніми об'єктами для тих, які заповнюватимуться в наступних сесіях):
   ```json
   {
     "academy": {
       "intro": {},
       "header": { "nav": {}, "cta": {} },
       "footer": {},
       "mission": { "values": [] },
       "goals": { "items": [] },
       "ourResults": { "stats": [], "cta": {} },
       "chief": {},
       "ourTeachers": { "members": [] },
       "theoryLectures": { "items": [] },
       "practiceSessions": { "items": [] },
       "academyGallery": {},
       "academyStudents": {},
       "amputeeRehab": {},
       "events": {},
       "summitResults": {},
       "weAreInNews": {},
       "ourSponsors": {},
       "specialThanksToAllOurPartners": {}
     }
   }
   ```

4. Створити `messages/en.json` з **ідентичною структурою** (так само порожні гнізда). Симетрія обов'язкова.

5. Створити `src/hooks/useAcademyTexts.ts` (код вище).

6. (Опційно) Створити скрипт `scripts/check-messages-parity.js` для перевірки симетрії ключів між uk/en:
   ```js
   const a = require('../messages/uk.json')
   const b = require('../messages/en.json')
   const diff = (x, y, p = '') => {
     for (const k of new Set([...Object.keys(x || {}), ...Object.keys(y || {})])) {
       const path = p + '.' + k
       if (typeof x?.[k] === 'object' && x[k] !== null && !Array.isArray(x[k]) &&
           typeof y?.[k] === 'object' && y[k] !== null && !Array.isArray(y[k])) {
         diff(x[k], y[k], path)
       } else if (k in (x || {}) !== k in (y || {})) {
         console.log('MISMATCH:', path)
       }
     }
   }
   diff(a, b)
   ```

#### B. Заповнення JSON для Intro / Header / Footer

1. `app/academy/sections/Intro/index.tsx`: витягнути всі захардкоджені рядки. Заповнити `messages/uk.json` (поточний український текст) і `messages/en.json` (англійський; для рядків, що зараз тільки UK — копія UK з `[TODO translate] `):
   ```json
   "intro": {
     "description": "...",
     "cta": { "register": "...", "support": "..." },
     "sponsorsTitle": "Наші спонсори:",
     "partnersTitle": "Наші партнери:",
     "allSponsorsLink": "Всі спонсори та партнери"
   }
   ```

2. `app/academy/sections/Header/index.tsx`: масив `AncorLinks` (id ↔ label) — перенести labels у `header.nav.*`. CTA-кнопки → `header.cta.*`. Phone → `header.phone`.

3. `app/academy/sections/Footer/index.tsx`: заповнити `footer.*` (supportAcademy, nonprofit, legalAddressLabel, legalAddress, phone, email, copyright, terms).

4. Прогнати `node scripts/check-messages-parity.js` — жодного MISMATCH.

#### C. Заміна в JSX

Для кожного з трьох файлів:

1. Додати:
   ```tsx
   import { useAcademyTexts } from '@/hooks/useAcademyTexts'
   ```

2. На початку компонента:
   ```tsx
   const t = useAcademyTexts()
   ```

3. Замінити захардкоджені рядки на `t.intro.description`, `t.header.nav.intro` тощо.

4. **НЕ чіпати** `icons.<section>[lang](...)` виклики у немігрованих секціях (Header, TheoryLectures, PracticeSessions, AmputeeRehab, WeAreInNews). Для решти секцій titles вже на `<ProtezImage>` — ці виклики просто не існують.

5. Якщо `Header` має масив `AncorLinks` з захардкодженими labels: лишити структуру масиву (там id + scrollTo логіка), але `label` діставати з `t.header.nav[id]`.

### Перевірка

- `npm run lint && npm run build` — чисто.
- `/academy` — нав-меню, Intro і Footer показують правильні тексти в обох мовах через перемикач.
- Якорі працюють.
- Email/phone живі.
- Жодного консольного попередження.

### Файли

- NEW: `messages/uk.json`, `messages/en.json`, `src/hooks/useAcademyTexts.ts`, `scripts/check-messages-parity.js` (опційно)
- EDIT: `tsconfig.json` (за потреби), `app/academy/sections/Intro/index.tsx`, `Header/index.tsx`, `Footer/index.tsx`

### Definition of done

- Хук імпортується без помилок, TS бачить тип `AcademyTexts` зі структурою скелета.
- У трьох вище файлах **немає** захардкоджених UI-рядків (крім значень, які лишаються константами: id для anchor-ів, аріа-атрибути за потреби).

---

## Session 2 — Core content (Mission, Goals, OurResults, TheoryLectures, PracticeSessions, Chief)

**Мета**: шість контентних секцій за одним механічним патерном. Розділення UK-only vs EN-only не змінює роботу — однаково копіюємо в обидва JSON і ставимо `[TODO translate]` де треба.

### Кроки

#### A. Заповнення JSON

1. **`MissionAndValues`** — статемент місії + 5 карток `values` (title + text):
   ```json
   "mission": {
     "statement": "Місія: Розвивати систему протезування...",
     "values": [
       { "title": "Людиноцентричність", "text": "..." },
       { "title": "Якість і професійність", "text": "..." },
       { "title": "Практичність", "text": "..." },
       { "title": "Постійний розвиток", "text": "..." },
       { "title": "Інноваційність", "text": "..." }
     ]
   }
   ```

2. **`OurGoals`** — 7 рядків у `goals.items`.

3. **`OurResults`**:
   ```json
   "ourResults": {
     "datesRange": "(May 2022 – September 2023)",
     "description": "Ukrainian Specialists already went through the Program...",
     "stats": [
       { "value": "92", "label": "People received prosthetics" },
       { "value": "26", "label": "Specialists trained" },
       { "value": "9",  "label": "Prostheses were provided" },
       { "value": "2",  "label": "Summits were organized" }
     ],
     "cta": { "apply": "Apply to Academy", "support": "Support Academy" }
   }
   ```

4. **`TheoryLectures`**:
   ```json
   "theoryLectures": {
     "items": [
       "/01 - Etiology of polytrauma and subsequent management of polytrauma patients",
       "/02 - Examples of post-operative care",
       "/03 - Objectives of pre-amputation consultation",
       "/04 - Different levels of upper and lower limb amputations",
       "/05 - Overview of cadaver anatomy",
       "/06 - Physiology"
     ],
     "cta": "Apply to Academy"
   }
   ```

5. **`PracticeSessions`**:
   ```json
   "practiceSessions": {
     "items": [
       "Preparatory stage",
       "Diagnostic (test) socket",
       "Casting and measuring the prosthesis"
     ]
   }
   ```

6. **`Chief`**:
   ```json
   "chief": {
     "role": "CHIEF MEDICAL OFFICER, CERTIFIED PROSTHETIST AND ORTHOTIST",
     "description": "During the course of the program they will learn proven methods..."
   }
   ```

7. У протилежну мову (UK для англомовних секцій, EN для україномовних) — або одразу переклад, або `[TODO translate] ` + оригінал.

8. Parity check — `node scripts/check-messages-parity.js`, жодного MISMATCH.

#### B. Заміна в JSX

1. `MissionAndValues/index.tsx`:
   ```tsx
   const t = useAcademyTexts()
   <p>{t.mission.statement}</p>
   {t.mission.values.map((v, i) => (
     <Card key={i} title={v.title} text={v.text} />
   ))}
   ```

2. `OurGoals/index.tsx`:
   ```tsx
   {t.goals.items.map((item, i) => (
     <GoalCard key={i} text={item} />
   ))}
   ```

3. `OurResults/index.tsx` (+ `components/AcademyResultCard`):
   - `t.ourResults.description`, `t.ourResults.datesRange`
   - `t.ourResults.stats.map((s, i) => <Card value={s.value} label={s.label} />)`
   - CTA-кнопки.

4. `TheoryLectures/index.tsx`: ітерація `t.theoryLectures.items`.

5. `PracticeSessions/index.tsx`: ітерація `t.practiceSessions.items`.

6. `Chief/index.tsx`: `t.chief.role`, `t.chief.description`.

7. Якщо в компонентах є локальні константи-масиви `const values = [...]` / `const goals = [...]` — видалити (вони замінені JSON-ом).

### Перевірка

- Усі шість секцій рендеряться в обох мовах, картки/елементи в правильному порядку.
- Числа статистики (`92`, `26`) рендеряться правильно — це рядки в JSON, але якщо в JSX вони передаються в `react-countup` як number — зробити `parseInt(s.value)`.
- `npm run lint && npm run build` — чисто.

### Файли

- EDIT: `messages/uk.json`, `messages/en.json`, `MissionAndValues/index.tsx`, `OurGoals/index.tsx`, `OurResults/index.tsx`, `OurResults/components/AcademyResultCard/index.tsx`, `TheoryLectures/index.tsx`, `PracticeSessions/index.tsx`, `Chief/index.tsx`

---

## Session 3 — Решта секцій + фінальний cleanup

**Мета**: добити решту 9 секцій (вони складніші — слайдери, галереї, підкомпоненти) і завершити фінальним QA-проходом.

### Список секцій

- `OurTeachers` (8 викладачів)
- `Academy` (галерея зі слайдером)
- `AcademyStudents`
- `AmputeeRehab`
- `Events`
- `SummitResults`
- `WeAreInNews`
- `OurSponsors`
- `SpecialThanksToAllOurPartners`

### Кроки

#### A. Міграція секцій

Для кожної:

1. Відкрити `index.tsx`, інвентаризувати всі захардкоджені рядки (включно з alt-текстами `<img>` / `<Image>`).
2. Заповнити відповідний namespace у `messages/{uk,en}.json`.
3. Якщо є слайдер-captions, list-описи — у JSON-масив.
4. Замінити рядки на `t.<section>.*`.
5. **НЕ чіпати** `icons.<section>[lang](...)` у немігрованих секціях (TheoryLectures, PracticeSessions, AmputeeRehab, WeAreInNews); у мігрованих їх уже немає — на їх місці `<ProtezImage {...title.desktop} />`.
6. Parity check після кожної (або пакетно в кінці).

#### B. Фінальний cleanup

1. **Grep на захардкоджені рядки**: пройтися по `app/academy/sections/**/*.tsx` і шукати кириличні літери та english phrases поза JSX-логікою:
   ```bash
   grep -rEn "[А-Яа-яЇїІіЄєҐґ]" app/academy/sections --include='*.tsx'
   grep -rEn '"[A-Z][a-z]{3,}.*[a-z]"' app/academy/sections --include='*.tsx'
   ```
   Все, що знайдено — або винести в JSON, або документувати чому лишається (наприклад, css-клас, aria-label, id).

2. **TODO-марковані переклади**: зібрати список з `grep -n "\[TODO translate\]" messages/`, віддати перекладачу. Можна закомітити з TODO — це не блокує продакшн.

3. **Перевірка дублікатів**: пройтись по JSON-у, переконатись що однакові рядки в різних секціях — це свідомий дубль (`"Apply to Academy"` в Header/Results/Lectures). Окей.

4. **Видалити мертвий код**: локальні константи `const titles = [...]` / `const items = [...]` у компонентах, що тепер беруть дані з JSON — видалити.

5. **Запустити повну перевірку**:
   ```bash
   npm run lint
   npm run build
   ```

6. **Smoke test у браузері**:
   - `/academy` у UK і EN
   - Перемикач мови
   - Всі якорі навігації
   - Зовнішні Link-и (Apply / Support / Foundation)
   - Console — без помилок і без mismatch гідрації

### Definition of done

- Жодного захардкодженого UI-рядка в `app/academy/sections/*/index.tsx` (виключення: icons.tsx, css-класи, aria, id).
- Обидва JSON-и в повній паритеті.
- Build + lint чисто.
- Сайт працює ідентично до старту цього плану (з точки зору користувача), але тепер всі тексти живуть в `messages/*.json`.

### Файли

- EDIT: `messages/uk.json`, `messages/en.json` + 9 файлів секцій (+ підкомпоненти `TeacherCard` тощо за потреби) + фінальні точкові виправлення з grep.

---

# Готовність до наступного етапу

Після Session 3 інтеграція `next-intl` (Session 1+ з `plan.md`) зводиться до:

1. Install `next-intl`, додати `i18n/`, `middleware.ts`, перенести під `app/[locale]/` — як описано в `plan.md`.
2. Конвертувати JSON-масиви → об'єкти з числовими ключами (`values.0.title` замість `values[0].title`). **Структура решти ключів НЕ змінюється.**
3. Замінити `useAcademyTexts()` на `useTranslations('academy')`. Це точкова заміна по проекту.

Тобто ця фаза робить ~80% корисної роботи (extraction + структура) без зміни рантайму. Інтеграція `next-intl` потім стає механічною.

---

# Файли під цей план

**NEW**:
- `messages/uk.json`
- `messages/en.json`
- `src/hooks/useAcademyTexts.ts` — *уже існує після switch-titles, лише перевірити вміст*
- `scripts/check-messages-parity.js` (опційно)

**EDIT**: усі `app/academy/sections/*/index.tsx` (точкова заміна рядків на `t.*`), `tsconfig.json` (за потреби).

**НЕ ЧІПАЄМО**: `next.config.js`, `app/layout.tsx`, `src/contexts/LanguageContext.tsx`, `app/academy/components/texts-svg/index.js`, `src/hooks/useAcademyTitle.ts`, `public/academyPage/titles/*`, `app/academy/sections/*/icons.tsx` **немігрованих секцій** (Header, TheoryLectures, PracticeSessions, AmputeeRehab, WeAreInNews).
