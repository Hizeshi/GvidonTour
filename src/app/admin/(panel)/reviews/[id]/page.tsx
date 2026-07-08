import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import ReviewForm from "../ReviewForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование отзыва" };

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{review.author}</h1>
      <ReviewForm
        reviewId={review.id}
        initial={{
          author: review.author,
          rating: review.rating,
          text: review.text as LText,
          photo: review.photo,
          videoUrl: review.videoUrl,
          published: review.published,
        }}
      />
    </div>
  );
}
