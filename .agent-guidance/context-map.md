# Карта контексту

Обери рядок за задачею, прочитай цільові файли та їхніх споживачів. Старі приклади показують зв’язки, а не автоматично встановлюють стиль нових змін. Контракти джерел — у [data-map](data-map.md), перевірки — у [testing](testing.md).

| Задача | Точки входу |
| --- | --- |
| Сторінка, layout, порядок секцій | [Маршрути](../app/[locale]), [секції](../src/sections); Home: [page](<../app/[locale]/(home-with-menu)/page.tsx>) → [root](../src/sections/home/_root/index.tsx); Academy: [page](<../app/[locale]/academy/(with-menu)/page.tsx>) → [root](../src/sections/academy/_root/index.tsx). Перевір layout відповідної route group. |
| Меню, anchors, мовна модалка | [Header/config](../src/sections/_shared/Header/config.ts), потрібне меню в [Header](../src/sections/_shared/Header), [LanguageSelectionModal](../src/components/LanguageSelectionModal/index.tsx). |
| Локалізація, текст, картки | [Routing](../src/lib/i18n.ts), [збирання messages](../i18n.ts), [messages](../messages), цільова секція. |
| CMS Events | [API](../src/lib/api.ts), [парсери](../src/utils/parsers.ts), [getPosts](../src/utils/getPosts.ts), [Events](../src/sections/home/Events). |
| Поточні результати | [Home OurResults](../src/sections/home/OurResults/OurResults.tsx), [Academy OurResults](../src/sections/academy/OurResults/index.tsx), [useStatsRange](../src/hooks/useStatsRange.ts). |
| Фінансовий звіт | [Дані](../src/sections/financialAudit/data.ts), [root](../src/sections/financialAudit/_root/index.tsx), цільова секція в [financialAudit](../src/sections/financialAudit). |
| Спільний UI, стилі, motion | [Components](../src/components), [CSS tokens](../app/globals.css), [SCSS variables](../src/styles/_variables.scss), [mixins](../src/styles/_mixins.scss), [breakpoints](../src/styles/_breakpoints.scss), [fonts](../app/fonts.ts). Використовуй наявні токени й mixins відповідної сторінки; перевір споживачів спільного компонента. |
| Зображення, відео, SVG-заголовки | [ProtezImage](../src/components/ProtezImage/index.tsx), [ProtezVideo](../src/components/ProtezVideo/index.tsx), цільовий hook у [hooks](../src/hooks), [public](../public), [генератор Academy](../scripts/generate-academy-titles.mjs). |
| Слайдер, lazy rendering | [SlickCarousel](../src/islands/SlickCarousel/index.tsx), [SuspenseSection](../src/components/SuspenseSection/index.tsx), root та цільова секція. Зберігай межі клієнтських залежностей; додавай `use client` там, де потрібні browser API, state чи effects. |
| Форми, підписка, донати | [MailingList](../src/sections/_shared/MailingList/MailingList.tsx), [API routes](../app/api), [Nodemailer](../src/config/nodemailer.ts), [Donate](../src/sections/donate/Donate/index.tsx), [Button](../src/components/Button/index.tsx). |
| SEO, URL, tracking | [SEO helpers](../src/lib/seo.ts), [sitemap](../app/sitemap.ts), [robots](../app/robots.ts), [locale layout](../app/[locale]/layout.tsx), [middleware](../middleware.ts), [Next config](../next.config.js), [FacebookPixelEvents](../src/components/FacebookPixelEvents/index.jsx). |
| Збірка, env, інструменти | [README](../README.md), [package.json](../package.json), [Next config](../next.config.js), [TypeScript](../tsconfig.json), [ESLint](../.eslintrc.json), [Prettier](../.prettierrc.json), [workflows](../.github/workflows). |
