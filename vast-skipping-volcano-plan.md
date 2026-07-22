# Анкор-меню для сторінки dytyache-protezuvannya

## Контекст

Сторінка `app/[locale]/dytyache-protezuvannya` вже використовує спільний `Header` з `variant="childrenProsthetics"` (teal-акцент — ті самі кольори, що й на financial-audit, бо financial-audit використовує той самий variant). Бургер уже є на десктопі та мобільному, але оскільки layout не передає `sideMenu`, він відкриває `GeneralMenu`, у якого `<nav>` порожній — анкор-лінків немає.

Треба повторити патерн financial-audit: окремий drawer-меню компонент зі списком анкорів на всі секції сторінки. Усі 4 секції вже мають id (`ChildrenProstheticsIDs` у `src/consts/index.tsx`), тому самі секції змінювати не потрібно:

| # | Секція | id |
|---|--------|-----|
| 1 | HeroSection | `childrenProstheticsHero` |
| 2 | OurApproach | `childrenProstheticsApproach` |
| 3 | ChildrenStories | `childrenProstheticsStories` |
| 4 | ApplyAndSupport | `childrenProstheticsApply` |

Еталон: `src/sections/_shared/Header/FinancialAuditMenu.tsx` + `FINANCIAL_AUDIT_NAV_IDS` у `config.ts` + блок `nav` у `messages/financial-audit.{en,uk}.json`. Скрол — чисті hash-анкори (`<Link href="#id">`), smooth scroll глобальний, зсув під фіксований хедер — через `scroll-margin-top`.

## Зміни

### 1. `src/sections/_shared/Header/config.ts`
- До union `HeaderSideMenu` додати `'childrenProsthetics'`.
- Додати список (enum `ChildrenProstheticsIDs` тут уже імпортовано):
```ts
export const CHILDREN_PROSTHETICS_NAV_IDS = [
  ChildrenProstheticsIDs.Hero,
  ChildrenProstheticsIDs.Approach,
  ChildrenProstheticsIDs.Stories,
  ChildrenProstheticsIDs.Apply,
] as const
```

### 2. Новий файл `src/sections/_shared/Header/ChildrenProstheticsMenu.tsx`
Копія `FinancialAuditMenu.tsx` з двома змінами:
- `useTranslations('childrenProsthetics')` замість `'financialAudit'`;
- map по `CHILDREN_PROSTHETICS_NAV_IDS`.

Решта без змін: лінк «на головну» (`tShared('protezPage.navigation.0')`), кнопки MakeDonation / SupportWithAmazon / «потрібен протез», телефон, перемикач мови, teal-акцент. Стилі (`.ancorList`, `.ancorItem`, `.ancorLink`, `.navigation.teal`, `.sideMenu.childrenProsthetics`) уже існують у `Header/style.module.scss` — нового SCSS не потрібно.

### 3. `src/sections/_shared/Header/index.tsx`
Імпортувати `ChildrenProstheticsMenu` і додати гілку в `renderSideMenu()` (поруч із гілкою `financialAudit`, ~рядок 93):
```tsx
if (resolvedSideMenu === 'childrenProsthetics') {
  return <ChildrenProstheticsMenu accent={cfg.accent} closeMenu={closeMenu} navRef={ref} />
}
```

### 4. `app/[locale]/dytyache-protezuvannya/layout.tsx`
```tsx
<Header variant="childrenProsthetics" sideMenu="childrenProsthetics" ancorLinks arrowUp={false} />
```
(`ancorLinks` лишаємо — лого веде на `#childrenProstheticsHero`.)

### 5. i18n — обидві локалі (`messages/children-prosthetics.en.json` + `.uk.json`)
Додати блок `nav` (конвенція: ключі = сирі значення id, як у financial-audit):

**uk:**
```json
"nav": {
  "childrenProstheticsHero": "Дитяче протезування",
  "childrenProstheticsApproach": "Наш підхід",
  "childrenProstheticsStories": "Історії дітей",
  "childrenProstheticsApply": "Заявка та підтримка"
}
```
**en:**
```json
"nav": {
  "childrenProstheticsHero": "Children's Prosthetics",
  "childrenProstheticsApproach": "Our Approach",
  "childrenProstheticsStories": "Children's Stories",
  "childrenProstheticsApply": "Apply & Support"
}
```
(Останній пункт — одна секція `ApplyAndSupport` з двома картками «Заявка» + «Підтримати», тому спільна назва.)

### 6. `src/sections/childrenProsthetics/_root/style.module.scss`
Хедер `position: fixed`, тому додати всередину `.main` (дзеркально до financial-audit `_root`):
```scss
section[id] {
  scroll-margin-top: 100px;
}
```

## Перевірка

1. `npm run dev`, відкрити `/uk/dytyache-protezuvannya` та `/en/dytyache-protezuvannya`.
2. Десктоп: бургер праворуч у хедері → drawer з 4 анкор-пунктами; клік по пункту — smooth-скрол до секції без «залізання» під хедер, меню закривається.
3. Мобільний viewport (< 768px): той самий drawer через мобільний бургер.
4. Кольори: білий хедер, teal бургер/акценти — ідентично financial-audit.
5. Обидві локалі показують свої підписи; перемикач мови в меню працює.
6. Регресія: `/uk/financial-audit` — меню працює як раніше.
