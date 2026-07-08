import type { Metadata } from "next";
import { cx, ui } from "@/lib/ui";
import AchievementForm from "../AchievementForm";

export const metadata: Metadata = { title: "Новое достижение" };

export default function NewAchievementPage() {
  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новое достижение</h1>
      <AchievementForm achievementId={null} />
    </div>
  );
}
