# GVIDON TOUR — сайт-визитка

Сайт-визитка принимающего туроператора в Казахстане. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, три языка (RU / EN / KK), настоящие фотографии Астаны и Казахстана.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

Продакшн-сборка:

```bash
npm run build
npm start
```

## Структура

- `src/app` — страницы: главная, о компании, туры, галерея, услуги, контакты
- `src/app/globals.css` — Tailwind v4: токены дизайна в `@theme`, keyframes, reveal-классы
- `src/components` — шапка, подвал, карточки туров, слайдер галереи, форма, карта Казахстана
- `src/lib/content.ts` — весь текст на трёх языках
- `src/lib/ui.ts` — общие наборы Tailwind-классов (кнопки, заголовки, формы)
- `public/images` — фотографии (источники и лицензии: см. `CREDITS.md`)
