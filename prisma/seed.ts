import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";
import {
  BLOG_META,
  CATEGORY_DATA,
  CONTENT,
  DIRECTION_DATA,
  GRID_IMAGES,
  GRID_SPANS,
  REVIEW_DATA,
  TOUR_IMAGES,
  TOUR_META,
} from "../src/lib/content";
import { TOUR_DETAILS } from "../src/lib/tour-details";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  }),
});

async function main() {
  const [existingTours, existingCategories, existingDirections, existingGallery, existingReviews, existingBlogPosts] =
    await Promise.all([
      prisma.tour.count(),
      prisma.category.count(),
      prisma.direction.count(),
      prisma.galleryItem.count(),
      prisma.review.count(),
      prisma.blogPost.count(),
    ]);
  const hasData =
    existingTours + existingCategories + existingDirections + existingGallery + existingReviews + existingBlogPosts >
    0;
  if (hasData && process.env.SEED_FORCE !== "1") {
    console.error(
      "[seed] В базе уже есть данные (туры/категории/направления/галерея/отзывы/блог).\n" +
        "Повторный запуск seed сотрёт правки, сделанные через админку, и вернёт демо-контент.\n" +
        "Ничего не изменено. Если это действительно нужно (например, чистая база на новом сервере),\n" +
        "запустите: SEED_FORCE=1 npm run db:seed (bash) или $env:SEED_FORCE=1; npm run db:seed (PowerShell)."
    );
    process.exit(1);
  }

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
      details: (TOUR_DETAILS[meta.slug] ?? Prisma.JsonNull) as Prisma.InputJsonValue,
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

  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: REVIEW_DATA.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      videoUrl: r.videoUrl,
    })),
  });

  for (const [i, meta] of BLOG_META.entries()) {
    const ru = CONTENT.ru.blogPosts[i];
    const en = CONTENT.en.blogPosts[i];
    const kk = CONTENT.kk.blogPosts[i];
    const content = ru.content.map((_, pi) => ({
      type: "text",
      text: { ru: ru.content[pi], en: en.content[pi], kk: kk.content[pi] },
    }));
    const data = {
      title: { ru: ru.title, en: en.title, kk: kk.title },
      excerpt: { ru: ru.excerpt, en: en.excerpt, kk: kk.excerpt },
      content: content as Prisma.InputJsonValue,
      image: meta.image,
      publishedAt: new Date(meta.publishedAt),
      sortOrder: i,
    };
    await prisma.blogPost.upsert({
      where: { slug: meta.slug },
      update: data,
      create: { slug: meta.slug, ...data },
    });
  }

  const [tours, categories, directions, gallery, reviews, blogPosts] = await Promise.all([
    prisma.tour.count(),
    prisma.category.count(),
    prisma.direction.count(),
    prisma.galleryItem.count(),
    prisma.review.count(),
    prisma.blogPost.count(),
  ]);
  console.log(
    `Seeded: ${tours} tours, ${categories} categories, ${directions} directions, ${gallery} gallery items, ${reviews} reviews, ${blogPosts} blog posts`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
