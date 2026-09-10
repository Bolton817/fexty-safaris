import type { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const revalidate = 3600; // ISR cache every hour

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fextysafaris.co.ke';
  const heroImage = '/images/contact-us-hero.jpg';

  return {
    title: 'Contact Us | Plan Your Safari Adventure',
    description: 'Get in touch with the Fexty Safaris travel concierge team for personalized safari itineraries, booking inquiries, corporate packages, and custom quotes.',
    keywords: [
      'Contact Fexty Safaris',
      'Safari Inquiries Kenya',
      'Book Safari Nairobi',
      'Custom Travel Consultation',
      'Fexty Safaris Phone Number',
      'Kenya Travel Agent Contact',
      'Tour Booking Office Nairobi'
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: '/en/contact',
        sw: '/sw/contact',
        fr: '/fr/contact',
        es: '/es/contact',
        de: '/de/contact',
        zh: '/zh/contact',
        ar: '/ar/contact',
      },
    },
    openGraph: {
      title: 'Contact Us | Fexty Safaris',
      description: 'Reach out to our safari specialists to plan your dream African holiday, beach getaway, or group excursion.',
      url: `/${locale}/contact`,
      siteName: 'Fexty Safaris',
      locale: locale,
      type: 'website',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: 'Contact Fexty Safaris Concierge Team',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us | Fexty Safaris',
      description: 'Reach out to our safari specialists to plan your dream African holiday, beach getaway, or group excursion.',
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

export default function ContactPage() {
  return <ContactClient />;
}
