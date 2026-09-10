import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Camera } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GalleryGridClient from '@/components/gallery/GalleryGridClient';

export const revalidate = 3600; // ISR cache every hour

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fextysafaris.co.ke';
  const heroImage = '/images/gallery%20images/diani-ocean-golden-hour.jpeg';

  return {
    title: 'Guest Experiences & Safari Visuals | Gallery',
    description: 'Explore authentic traveler photos and visual memories — sun-drenched coastal escapes, luxury resort stays, wildlife encounters, and untamed African adventures.',
    keywords: [
      'Fexty Safaris Gallery',
      'Kenya Client Photos',
      'Diani Beach Photos',
      'Jacaranda Resort Photos',
      'African Safari Photos',
      'Maasai Mara Gallery',
      'Guest Travel Memories'
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {
        en: '/en/gallery',
        sw: '/sw/gallery',
        fr: '/fr/gallery',
        es: '/es/gallery',
        de: '/de/gallery',
        zh: '/zh/gallery',
        ar: '/ar/gallery',
      },
    },
    openGraph: {
      title: 'Guest Experiences & Safari Visuals | Fexty Safaris Gallery',
      description: 'Real moments captured by our travelers — from sun-drenched coastal escapes and luxury resort dining to untamed savanna wildlife.',
      url: `/${locale}/gallery`,
      siteName: 'Fexty Safaris',
      locale: locale,
      type: 'website',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: 'Fexty Safaris Client Photos & Safari Gallery',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Guest Experiences & Safari Visuals | Fexty Safaris Gallery',
      description: 'Real moments captured by our travelers — from sun-drenched coastal escapes and luxury resort dining to untamed savanna wildlife.',
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

export default async function GalleryPage() {
  const t = await getTranslations('Gallery');

  const clientImages = [
    '/images/gallery%20images/jacaranda-resort-ocean-pool.jpg',
    '/images/gallery%20images/client-ocean-view-cliff.jpeg',
    '/images/gallery%20images/diani-ocean-golden-hour.jpeg',
    '/images/gallery%20images/client-poolside-lounge-smile.jpeg',
    '/images/gallery%20images/jacaranda-beach-villas-palms.jpg',
    '/images/gallery%20images/family-diani-beach-waves.jpeg',
    '/images/gallery%20images/family-poolside-fun.jpeg',
    '/images/gallery%20images/coastal-sunset-reflections.jpeg',
    '/images/gallery%20images/ocean-view-terrace-dining.jpeg',
    '/images/gallery%20images/client-beanbag-relaxing.jpeg',
    '/images/gallery%20images/client-fresh-coconut-drink.jpeg',
    '/images/gallery%20images/client-ocean-tides-smile.jpeg',
    '/images/gallery%20images/resort-lazy-river-pool.jpeg',
    '/images/gallery%20images/client-coastal-selfie.jpeg',
    '/images/gallery%20images/beach-stroll-sunset.jpeg',
    '/images/gallery%20images/beachfront-restaurant-relaxation.jpeg',
    '/images/gallery%20images/resort-gourmet-appetizers.jpeg',
    '/images/gallery%20images/resort-breakfast-dining.jpeg',
    '/images/gallery%20images/luxury-breakfast-spread.jpeg',
    '/images/gallery%20images/client-resort-welcome-smile.jpeg',
    '/images/gallery%20images/resort-architecture-hallway.jpeg',
    '/images/gallery%20images/guest-hallway-portrait.jpeg',
    '/images/gallery%20images/jacaranda-beach-resort-entrance.jpg',
  ];

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* 1. Page Hero */}
      <PageHero
        topLabel={t('topLabel')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        image="/images/gallery%20images/diani-ocean-golden-hour.jpeg"
        icon={<Camera className="w-10 h-10 text-sunset-400" />}
      />

      {/* 2. Pinterest-Style Masonry Grid */}
      <section className="py-12 md:py-16">
        <GalleryGridClient images={clientImages} />
      </section>
    </div>
  );
}
