import type { Metadata } from "next";
import { cx, ui } from "@/lib/ui";
import DirectionForm from "../DirectionForm";

export const metadata: Metadata = { title: "Новый город" };

export default function NewDirectionPage() {
  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новый город</h1>
      <DirectionForm directionId={null} />
    </div>
  );
}
