import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Camera } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import GalleryGridClient from '@/components/gallery/GalleryGridClient';

export const metadata = {
  title: 'Gallery | Fexty Safaris',
  description: 'Explore our client moments and visual memories with Fexty Safaris.',
};

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
