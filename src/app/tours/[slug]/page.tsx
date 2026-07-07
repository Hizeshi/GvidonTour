import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetailPage from "@/components/pages/TourDetailPage";
import { getTourBySlug, getTours } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Тур" };
  return {
    title: tour.title.ru,
    description: tour.desc.ru,
    openGraph: {
      title: `${tour.title.ru} — GVIDON TOUR`,
      description: tour.desc.ru,
      images: [{ url: tour.image }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [tour, all] = await Promise.all([getTourBySlug(slug), getTours()]);
  if (!tour) notFound();

  // Prefer same-city tours, then fill up to three with others.
  const others = all.filter((candidate) => candidate.slug !== tour.slug);
  const sameCity = others.filter((candidate) => candidate.city === tour.city);
  const similar = [...sameCity, ...others.filter((candidate) => candidate.city !== tour.city)].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title.ru,
    description: tour.desc.ru,
    image: `${SITE_URL}${tour.image}`,
    touristType: "Leisure",
    offers: {
      "@type": "Offer",
      price: tour.priceFrom,
      priceCurrency: "KZT",
      url: `${SITE_URL}/tours/${tour.slug}`,
    },
    provider: { "@type": "TravelAgency", name: "GVIDON TOUR", url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TourDetailPage tour={tour} similar={similar} />
    </>
  );
}
