import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetailPage from "@/components/pages/TourDetailPage";
import { getTourBySlug, getTours } from "@/lib/catalog";
import { CONTENT } from "@/lib/content";
import { DEFAULT_LOCALE, isLocale, localeAlternates, localeHref } from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd, jsonLdScript, SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};

  const title = tour.title[lang];
  const description = tour.desc[lang];
  return {
    title,
    description,
    alternates: localeAlternates(`/tours/${slug}`, lang),
    openGraph: {
      title: `${title} — GVIDON TOUR`,
      description,
      url: `${SITE_URL}${localeHref(`/tours/${slug}`, lang)}`,
      locale: lang,
      images: [{ url: tour.image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const [tour, all] = await Promise.all([getTourBySlug(slug), getTours()]);
  if (!tour) notFound();

  // Prefer same-city tours, then fill up to three with others.
  const others = all.filter((candidate) => candidate.slug !== tour.slug);
  const sameCity = others.filter((candidate) => candidate.city === tour.city);
  const similar = [...sameCity, ...others.filter((candidate) => candidate.city !== tour.city)].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title[lang],
    description: tour.desc[lang],
    image: absoluteUrl(tour.image),
    inLanguage: lang,
    touristType: "Leisure",
    offers: {
      "@type": "Offer",
      price: tour.priceFrom,
      priceCurrency: "KZT",
      url: `${SITE_URL}${localeHref(`/tours/${slug}`, lang)}`,
    },
    provider: { "@type": "TravelAgency", name: "GVIDON TOUR", url: SITE_URL },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "GVIDON TOUR", url: `${SITE_URL}${localeHref("/", lang)}` },
    { name: CONTENT[lang].nav.tours, url: `${SITE_URL}${localeHref("/tours", lang)}` },
    { name: tour.title[lang], url: `${SITE_URL}${localeHref(`/tours/${slug}`, lang)}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbs) }} />
      <TourDetailPage tour={tour} similar={similar} />
    </>
  );
}
