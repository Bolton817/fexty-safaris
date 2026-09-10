import type { Metadata } from 'next';
import ServicesClient from '@/components/services/ServicesClient';

export const revalidate = 3600; // ISR cache every hour

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fextysafaris.com';
  const heroImage = '/images/services-hero.jpg';

  return {
    title: 'Comprehensive Travel Services & Concierge | Fexty Safaris',
    description: 'From bespoke custom tour itineraries and corporate MICE events to flight ticketing, visa assistance, and destination weddings, discover our full suite of premium travel services.',
    keywords: [
      'Customized Tour Packages',
      'Corporate Travel Kenya',
      'MICE Safaris',
      'Destination Weddings Kenya',
      'Flight Ticketing Services',
      'Visa Assistance Kenya',
      'Luxury Concierge East Africa',
      'Cruise Holiday Packages'
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: '/en/services',
        sw: '/sw/services',
        fr: '/fr/services',
        es: '/es/services',
        de: '/de/services',
        zh: '/zh/services',
        ar: '/ar/services',
      },
    },
    openGraph: {
      title: 'Comprehensive Travel Services & Concierge | Fexty Safaris',
      description: 'Explore our complete suite of bespoke tour packages, corporate MICE travel, wedding planning, flight ticketing, and concierge solutions.',
      url: `/${locale}/services`,
      siteName: 'Fexty Safaris',
      locale: locale,
      type: 'website',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: 'Travel Services & Concierge - Fexty Safaris',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Comprehensive Travel Services & Concierge | Fexty Safaris',
      description: 'Explore our complete suite of bespoke tour packages, corporate MICE travel, wedding planning, flight ticketing, and concierge solutions.',
      images: [heroImage],
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

export default function ServicesPage() {
  return <ServicesClient />;
}
