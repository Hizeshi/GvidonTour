import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  CATEGORY_DATA,
  CONTENT,
  DIRECTION_DATA,
  GRID_IMAGES,
  GRID_SPANS,
  TOUR_IMAGES,
  TOUR_META,
} from "../src/lib/content";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

async function main() {
  for (const [i, meta] of TOUR_META.entries()) {
    const ru = CONTENT.ru.tours[i];
    const en = CONTENT.en.tours[i];
    const kk = CONTENT.kk.tours[i];
    const img = TOUR_IMAGES[i];
    const data = {
      region: { ru: ru.region, en: en.region, kk: kk.region },
      title: { ru: ru.title, en: en.title, kk: kk.title },
      desc: { ru: ru.desc, en: en.desc, kk: kk.desc },
      duration: { ru: ru.dur, en: en.dur, kk: kk.dur },
      priceText: { ru: ru.price, en: en.price, kk: kk.price },
      days: meta.days,
      priceFrom: meta.priceFrom,
      city: meta.city,
      image: img.src,
      imagePos: img.pos ?? null,
      featured: meta.featured ?? false,
      sortOrder: i,
    };
    await prisma.tour.upsert({
      where: { slug: meta.slug },
      update: data,
      create: { slug: meta.slug, ...data },
    });
  }

  for (const [i, c] of CATEGORY_DATA.entries()) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, icon: c.icon, sortOrder: i },
      create: { slug: c.slug, name: c.name, icon: c.icon, sortOrder: i },
    });
  }

  for (const [i, d] of DIRECTION_DATA.entries()) {
    await prisma.direction.upsert({
      where: { slug: d.slug },
      update: { name: d.name, image: d.image, sortOrder: i },
      create: { slug: d.slug, name: d.name, image: d.image, sortOrder: i },
    });
  }

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: GRID_IMAGES.map((img, i) => ({
      src: img.src,
      caption: {
        ru: CONTENT.ru.caps[i],
        en: CONTENT.en.caps[i],
        kk: CONTENT.kk.caps[i],
      },
      span: GRID_SPANS[i] || null,
      sortOrder: i,
    })),
  });

  const [tours, categories, directions, gallery] = await Promise.all([
    prisma.tour.count(),
    prisma.category.count(),
    prisma.direction.count(),
    prisma.galleryItem.count(),
  ]);
  console.log(`Seeded: ${tours} tours, ${categories} categories, ${directions} directions, ${gallery} gallery items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
