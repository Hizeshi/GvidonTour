# GVIDON TOUR — контекст проекта для Claude

Сайт туроператора по Казахстану (Астана): публичная витрина + самописная админка.
Прод: https://gvidon-tour.vercel.app (Vercel, деплой автоматом при push в `main`).

## Общение и рабочий процесс

- **Пользователь не знает английский — все ответы в чате только по-русски.**
- Работа идёт этапами: построить этап → проверить вживую в браузере (и админку, и что изменения видны на публичном сайте) → закоммитить и запушить → отчитаться в чате → ждать «продолжай». Не начинать следующий этап без сигнала.
- Секреты: пользователь сам вносит переменные в Vercel Dashboard вручную — я только говорю имя и значение. В `.env` локально записываю сам. Значения секретов никогда не коммитить.
- Коммиты делать через **Bash tool + heredoc** (PowerShell портит кириллицу в сообщениях коммитов). В конце сообщения — Co-Authored-By.

## Стек

- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, lucide-react
- Prisma 7 + `@prisma/adapter-pg`, Postgres на Supabase (только БД и Storage; **Supabase Auth НЕ используется**)
- Клиент Prisma генерируется в `src/generated/prisma/client`, импорт `@/generated/prisma/client`
- Авторизация полностью своя: `jose` (JWT HS256, httpOnly-кука `gv_admin`, 7 дней) + `bcryptjs`
- В Next.js 16 middleware переименован: файл `src/proxy.ts` (default export + `config.matcher`)

Решение по архитектуре (подтверждено с пользователем): полный self-hosted Supabase на VPS **не нужен**. При переезде на VPS — обычный Postgres + MinIO/диск. Вся работа с хранилищем изолирована в одном модуле `src/lib/storage.ts` именно ради этого.

## Структура

- `src/app/(site)/…` — публичные страницы (общий layout с Header/Footer/FloatingCta)
- `src/app/admin/login/…` — логин (вне panel-группы)
- `src/app/admin/(panel)/…` — админка: layout с сайдбаром и проверкой сессии; разделы: обзор, requests, media, tours, gallery, reviews, blog, achievements
- `src/lib/auth.ts` — createSession / getSession / destroySession
- `src/lib/db.ts` — prisma-клиент
- `src/lib/storage.ts` — Supabase Storage через чистый REST (без SDK): upload/delete/list/publicMediaUrl
- `src/lib/telegram.ts` — уведомления о заявках (fail-soft, таймаут 5с)
- `src/lib/catalog.ts` — все геттеры каталога (`getTours`, `getReviews`, `getBlogPosts`, `getGalleryItems`, `getAchievements`)
- `src/lib/content.ts` — статические тексты RU/EN/KK (и fallback-данные)
- `src/components/admin/AdminFormFields.tsx` — общие поля форм админки: `emptyLText`, `LTextField`, `LTextListEditor`
- `scripts/create-admin.ts` — создать/обновить админа: `npx tsx scripts/create-admin.ts <login> <password> [name]`
- `scripts/create-bucket.ts` — создание bucket `media` прямым SQL в `storage.buckets`

Модели БД: Tour, Category, Direction, Review, GalleryItem, Achievement, Lead(+LeadStatus), AdminUser, BlogPost.

## Ключевые паттерны (обязательны к соблюдению)

1. **Загрузка файлов — ТОЛЬКО через Route Handler, никогда через Server Action.**
   Server Action с `<input type="file">` (multipart) в этом проекте вызывает баг: при построении ответа action Next.js перерисовывает layout-дерево, и `redirect("/admin/login")` из `(panel)/layout.tsx` срабатывает до выполнения самого action → 303 на логин. Долго дебажилось на этапе 3. Рабочее решение: `src/app/admin/(panel)/media/upload/route.ts` + ручной `fetch()` c FormData на клиенте + `router.refresh()`.
2. **Сложные формы админки вызывают server actions как RPC** — прямой вызов `await saveX(id, payload)` из клиентского кода, НЕ привязка к нативной `<form action={...}>`. Это обходит весь класс бага из п.1.
3. **Fallback на статику**: каждый геттер в `catalog.ts` оборачивает запрос к БД в try/catch и при недоступности БД или пустой таблице возвращает данные из `content.ts`.
4. **«Полусмигрированная фича»**: наличие таблицы в БД и seed-данных НЕ значит, что компонент сайта читает из БД (так было с Achievements — CRUD работал бы «в пустоту»). При подключении любого нового раздела — grep по компоненту сайта и проверка, что данные реально идут через `catalog.ts`.
5. После мутаций в админке — `revalidatePath()` соответствующих публичных страниц.
6. Трёхъязычный контент: `LText = Record<"ru"|"en"|"kk", string>`, хранится в JSON-полях.
7. Каждый server action админки в начале сам проверяет `getSession()` (не полагаться только на proxy/layout).
8. Слаги: транслитерация через `slugify()` (кнопка «Из названия» в формах туров и блога), уникальность — ловить `Prisma.PrismaClientKnownRequestError` с кодом `P2002`.

## Переменные окружения (все уже в локальном `.env`)

| Имя | Назначение |
|---|---|
| `DATABASE_URL` | Postgres, transaction pooler :6543 (рантайм) |
| `DIRECT_URL` | Postgres, session pooler :5432 (CLI: db push, seed — DDL не работает через :6543) |
| `AUTH_SECRET` | подпись JWT сессии админки |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | уведомления о заявках |
| `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | Storage REST API |

⚠️ Не подтверждено, что пользователь внёс все 5 переменных (кроме DATABASE_URL) в Vercel — при проблемах на проде (логин/загрузка/телеграм) сначала проверить это.

## Команды

- `npm run dev` / `npm run build`
- `npm run db:push` — прогнать схему (идёт через DIRECT_URL)
- `npm run db:seed` — ⚠️ **ОПАСНО до этапа 6**: перезапишет галерею/отзывы демо-данными
- Node 26 стоит в Program Files; агентским шеллам может понадобиться prepend PATH

## Статус (на 2026-07-09)

План админки, утверждённый пользователем, выполнен на 5/6 этапов:

1. ✅ Авторизация + каркас админки — `bfc14b5`
2. ✅ Форма заявки + Telegram + /admin/requests — `8c9a239` (телеграм-бота для просмотра заявок пользователь делает сам)
3. ✅ Медиа-хранилище Supabase Storage — `6954bd6` + фикс загрузки `35792f4`
4. ✅ CRUD туров — `828b836`
5. ✅ CRUD галереи/отзывов/блога/достижений — `50838d8` (+ подключение Achievements к БД, см. паттерн №4)
6. ⬜ **Этап 6 — безопасная передача**: обезвредить `prisma/seed.ts` (чтобы случайный запуск не затёр прод-данные), бэкапы БД, смена паролей, короткая инструкция для клиента
7. ⬜ **Оптимизация**: Lighthouse, картинки/шрифты, решение по локальным URL (`/en`, `/kk`) для SEO, домен, Google Search Console

Эталонные данные прода после этапа 5: 6 туров, 9 фото, 3 отзыва, 4 статьи, 0 достижений.
