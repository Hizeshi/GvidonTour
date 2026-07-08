import type { Metadata } from "next";
import { cx, ui } from "@/lib/ui";
import ReviewForm from "../ReviewForm";

export const metadata: Metadata = { title: "Новый отзыв" };

export default function NewReviewPage() {
  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новый отзыв</h1>
      <ReviewForm reviewId={null} />
    </div>
  );
}
