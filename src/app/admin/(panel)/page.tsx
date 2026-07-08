import { Award, Image as ImageIcon, Inbox, MessageSquare, Newspaper, Route } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";

export const dynamic = "force-dynamic";

async function count(fn: () => Promise<number>): Promise<number | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const [tours, gallery, reviews, posts, achievements] = await Promise.all([
    count(() => prisma.tour.count()),
    count(() => prisma.galleryItem.count()),
    count(() => prisma.review.count()),
    count(() => prisma.blogPost.count()),
    count(() => prisma.achievement.count()),
  ]);

  const tiles = [
    { label: "Туры", value: tours, icon: Route },
    { label: "Фото в галерее", value: gallery, icon: ImageIcon },
    { label: "Отзывы", value: reviews, icon: MessageSquare },
    { label: "Статьи блога", value: posts, icon: Newspaper },
    { label: "Достижения", value: achievements, icon: Award },
    { label: "Заявки", value: null, icon: Inbox, note: "появятся на этапе 2" },
  ];

  return (
    <div>
      <h1 className={cx(ui.serif, "text-[28px]")}>Обзор</h1>
      <p className="mt-2 text-[14.5px] text-content/60">
        Содержимое сайта. Управление разделами будет открываться по мере готовности.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-[5px] border border-content/12 bg-panel p-5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-content/55">
                {tile.label}
              </span>
              <span className="lic text-[20px] text-gold">
                <tile.icon />
              </span>
            </div>
            <div className="mt-3 text-[30px] font-bold">
              {tile.value ?? <span className="text-[15px] font-semibold text-content/40">{tile.note ?? "нет данных"}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
