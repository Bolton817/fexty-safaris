import type { Metadata } from 'next';
import Hero from '@/components/sections/home/hero/Hero';
import MagicalKenya from '@/components/sections/home/destinations/MagicalKenya';
import TemboCoast from '@/components/sections/home/destinations/TemboCoast';
import BeyondBorders from '@/components/sections/home/destinations/BeyondBorders';
import ProductCarousel from '@/components/sections/home/deals/ProductCarousel';
import CuratedStyles from '@/components/sections/home/styles/CuratedStyles';
import CorporateAndServices from '@/components/sections/home/services/CorporateAndServices';
import TestimonialsWall from '@/components/sections/home/testimonials/TestimonialsWall';
import PreFooterCTA from '@/components/sections/home/cta/PreFooterCTA';

export const revalidate = 3600; // ISR cache every hour

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fextysafaris.com';

  return {
    title: {
      absolute: 'Fexty Safaris | Premium Tours, Safaris & Travel Concierge',
    },
    description: 'Experience untamed African wilderness, luxury Maasai Mara and Amboseli safaris, pristine Diani beach escapes, and tailor-made worldwide travel with Fexty Safaris.',
    keywords: [
      'Fexty Safaris',
      'Kenya Safaris',
      'Maasai Mara Safari',
      'Amboseli National Park',
      'Diani Beach Holidays',
      'Luxury African Safaris',
      'Kenya Tour Operator',
      'East Africa Holiday Packages',
      'Custom Travel Concierge'
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        sw: '/sw',
        fr: '/fr',
        es: '/es',
        de: '/de',
        zh: '/zh',
        ar: '/ar',
      },
    },
    openGraph: {
      title: 'Fexty Safaris | Premium Tours, Safaris & Travel Concierge',
      description: 'Experience untamed African wilderness, luxury Maasai Mara and Amboseli safaris, pristine Diani beach escapes, and tailor-made worldwide travel with Fexty Safaris.',
      url: `/${locale}`,
      siteName: 'Fexty Safaris',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/logo-dark.png',
          width: 1200,
          height: 630,
          alt: 'Fexty Safaris - Premium Tours & Travel',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Fexty Safaris | Premium Tours, Safaris & Travel Concierge',
      description: 'Experience untamed African wilderness, luxury Maasai Mara safaris, and pristine coastal retreats.',
      images: ['/logo-dark.png'],
      creator: '@FextySafaris',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <MagicalKenya />
      <TemboCoast />
      <BeyondBorders />
      <ProductCarousel />
      <CuratedStyles />
      <CorporateAndServices />
      <TestimonialsWall />
      <PreFooterCTA />
    </div>
  );
}
