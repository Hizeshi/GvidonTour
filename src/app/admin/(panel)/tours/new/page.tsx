import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import type { LText } from "@/lib/catalog-types";
import TourForm from "../TourForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Новый тур" };

export default async function NewTourPage() {
  const [categories, cities] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.direction.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новый тур</h1>
      <TourForm
        tourId={null}
        categories={categories.map((c) => ({ id: c.id, name: c.name as LText }))}
        cities={cities.map((c) => ({ slug: c.slug, name: c.name as LText }))}
      />
    </div>
  );
}
