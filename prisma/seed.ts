import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { CONTENT, GRID_IMAGES, GRID_SPANS, TOUR_IMAGES } from "../src/lib/content";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

const TOUR_META = [
  { slug: "astana-city", days: 2, priceFrom: 120_000, city: "astana", featured: true },
  { slug: "almaty-alatau", days: 3, priceFrom: 180_000, city: "almaty", featured: true },
  { slug: "charyn-canyon", days: 1, priceFrom: 45_000, city: "charyn", featured: true },
  { slug: "kolsai-kaindy", days: 2, priceFrom: 95_000, city: "almaty" },
  { slug: "turkestan", days: 2, priceFrom: 110_000, city: "turkestan" },
  { slug: "mangystau-bozzhyra", days: 4, priceFrom: 290_000, city: "mangystau" },
];

const CATEGORIES = [
  { slug: "kids", icon: "backpack", name: { ru: "Детский туризм", en: "Kids tourism", kk: "Балалар туризмі" } },
  { slug: "industrial", icon: "factory", name: { ru: "Промышленный туризм", en: "Industrial tourism", kk: "Өнеркәсіптік туризм" } },
  { slug: "ethno", icon: "tent", name: { ru: "Этнотуры", en: "Ethno tours", kk: "Этнотурлар" } },
  { slug: "pilgrimage", icon: "landmark", name: { ru: "Паломнические туры", en: "Pilgrimage tours", kk: "Қажылық турлар" } },
  { slug: "vip", icon: "crown", name: { ru: "VIP", en: "VIP", kk: "VIP" } },
  { slug: "mice", icon: "briefcase", name: { ru: "MICE", en: "MICE", kk: "MICE" } },
];

const DIRECTIONS = [
  { slug: "astana", image: "/images/tour-astana.jpg", name: { ru: "Астана", en: "Astana", kk: "Астана" } },
  { slug: "almaty", image: "/images/tour-almaty.jpg", name: { ru: "Алматы", en: "Almaty", kk: "Алматы" } },
  { slug: "burabay", image: null, name: { ru: "Бурабай", en: "Burabay", kk: "Бурабай" } },
  { slug: "charyn", image: "/images/tour-charyn.jpg", name: { ru: "Чарын", en: "Charyn", kk: "Шарын" } },
  { slug: "baikonur", image: null, name: { ru: "Байконур", en: "Baikonur", kk: "Байқоңыр" } },
  { slug: "turkestan", image: "/images/tour-turkestan.jpg", name: { ru: "Туркестан", en: "Turkestan", kk: "Түркістан" } },
];

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

  for (const [i, c] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, icon: c.icon, sortOrder: i },
      create: { slug: c.slug, name: c.name, icon: c.icon, sortOrder: i },
    });
  }

  for (const [i, d] of DIRECTIONS.entries()) {
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
