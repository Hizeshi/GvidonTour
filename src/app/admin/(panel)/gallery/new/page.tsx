import type { Metadata } from "next";
import { cx, ui } from "@/lib/ui";
import GalleryItemForm from "../GalleryItemForm";

export const metadata: Metadata = { title: "Новое фото/видео" };

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className={cx(ui.serif, "mb-8 text-[28px]")}>Новое фото/видео</h1>
      <GalleryItemForm itemId={null} />
    </div>
  );
}
