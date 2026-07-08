import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import AchievementForm from "../AchievementForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование достижения" };

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.achievement.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{(item.title as LText).ru || "Редактирование"}</h1>
      <AchievementForm
        achievementId={item.id}
        initial={{
          title: item.title as LText,
          image: item.image,
          sortOrder: item.sortOrder,
        }}
      />
    </div>
  );
}
