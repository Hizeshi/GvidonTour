import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText, TourDetails } from "@/lib/catalog-types";
import TourForm from "../TourForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Редактирование тура" };

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [tour, categories, cities] = await Promise.all([
    prisma.tour.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.direction.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!tour) notFound();

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>{(tour.title as LText).ru || "Редактирование тура"}</h1>
      <TourForm
        tourId={tour.id}
        categories={categories.map((c) => ({ id: c.id, name: c.name as LText }))}
        cities={cities.map((c) => ({ slug: c.slug, name: c.name as LText }))}
        initial={{
          slug: tour.slug,
          categoryId: tour.categoryId,
          city: tour.city,
          days: tour.days,
          priceFrom: tour.priceFrom,
          image: tour.image,
          imagePos: tour.imagePos,
          featured: tour.featured,
          published: tour.published,
          sortOrder: tour.sortOrder,
          region: tour.region as LText,
          title: tour.title as LText,
          desc: tour.desc as LText,
          duration: tour.duration as LText,
          priceText: tour.priceText as LText,
          details: tour.details as TourDetails | null,
        }}
      />
    </div>
  );
}
