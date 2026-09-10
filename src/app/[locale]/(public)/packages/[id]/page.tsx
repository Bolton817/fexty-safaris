import type { Metadata } from 'next';
import { fetchPackageById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { Clock, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ScrollSpyNav from '@/components/packages/ScrollSpyNav';
import StickyBookingSidebar from '@/components/packages/StickyBookingSidebar';
import ItineraryAccordion from '@/components/packages/ItineraryAccordion';
import PackageInclusions from '@/components/packages/PackageInclusions';

export const revalidate = 3600;

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const { success, data: pkg } = await fetchPackageById(id);

  if (!success || !pkg) {
    return {
      title: 'Package Not Found',
      description: 'The requested safari package could not be found.',
    };
  }

  const tDynamic = await getTranslations('DynamicPackages');
  
  const slugMap: Record<string, string> = {
    'Masai Mara Migration Experience': 'masai_mara_migration',
    'Diani Beach Escape': 'diani_beach_escape',
    'Amboseli Elephant Safari': 'amboseli_elephants',
  };
  
  const slug = slugMap[pkg.title];
  const title = slug ? tDynamic(`${slug}.title` as any) : pkg.title;
  const description = slug ? tDynamic(`${slug}.description` as any) : (pkg.description || 'Experience the adventure of a lifetime with our meticulously crafted itinerary.');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fextysafaris.com';
  const heroImage = pkg.image_url || '/images/hero-safari.jpg';

  return {
    title: `${title} | Premium Safari Experience`,
    description: description.length > 160 ? `${description.slice(0, 157)}...` : description,
    keywords: [
      pkg.title,
      ...(Array.isArray(pkg.category) ? pkg.category : [pkg.category]),
      'Kenya Safari Package',
      'Fexty Safaris',
      'African Wildlife Tour',
      'East Africa Holiday'
    ].filter(Boolean),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}/packages/${id}`,
      languages: {
        en: `/en/packages/${id}`,
        sw: `/sw/packages/${id}`,
        fr: `/fr/packages/${id}`,
        es: `/es/packages/${id}`,
        de: `/de/packages/${id}`,
        zh: `/zh/packages/${id}`,
        ar: `/ar/packages/${id}`,
      },
    },
    openGraph: {
      title: `${title} | Fexty Safaris`,
      description: description,
      url: `/${locale}/packages/${id}`,
      siteName: 'Fexty Safaris',
      locale: locale,
      type: 'website',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${title} - Fexty Safaris`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Fexty Safaris`,
      description: description,
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

// Mock Fallback Data in case Supabase JSONB arrays are null
const FALLBACK_ITINERARY = [
  {
    day: 1,
    title: "Arrival & Transfer",
    description: "Welcome to East Africa! Our team will meet you at the airport and transfer you to your first camp.",
    lodging: "Premium Tented Camp",
    meals: "Dinner"
  },
  {
    day: 2,
    title: "Safari Game Drives",
    description: "Explore the wilderness with morning and afternoon game drives.",
    lodging: "Premium Tented Camp",
    meals: "Breakfast, Lunch, Dinner"
  }
];

const FALLBACK_INCLUSIONS = [
  "Luxury accommodation in premium tents/lodges",
  "All domestic bush flights & transfers",
  "Professional English-speaking safari guide"
];

const FALLBACK_EXCLUSIONS = [
  "International flights to/from East Africa",
  "Entry visas and travel insurance",
  "Premium brand spirits and champagne"
];

export default async function PackageDetails({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const { success, data: pkg } = await fetchPackageById(id);

  if (!success || !pkg) {
    notFound();
  }

  const tDynamic = await getTranslations('DynamicPackages');
  
  const slugMap: Record<string, string> = {
    'Masai Mara Migration Experience': 'masai_mara_migration',
    'Diani Beach Escape': 'diani_beach_escape',
    'Amboseli Elephant Safari': 'amboseli_elephants',
  };
  
  const slug = slugMap[pkg.title];
  const title = slug ? tDynamic(`${slug}.title` as any) : pkg.title;
  const description = slug ? tDynamic(`${slug}.description` as any) : pkg.description;

  // Safely parse or fallback for JSONB fields
  const itinerary = pkg.itinerary && Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 ? pkg.itinerary : FALLBACK_ITINERARY;
  const inclusions = pkg.inclusions && Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0 ? pkg.inclusions : FALLBACK_INCLUSIONS;
  const exclusions = pkg.exclusions && Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 ? pkg.exclusions : FALLBACK_EXCLUSIONS;
  const mapUrl = pkg.map_url || "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  return (
    <div className="flex-1 bg-sand-50 pb-20 relative">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-savanna-950">
        {pkg.image_url && (
          <img 
            src={pkg.image_url} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-savanna-950 via-savanna-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-7xl">
            <span className="inline-block py-1 px-3 rounded-full bg-sunset-500 text-white font-medium text-xs tracking-wider mb-4">
              {Array.isArray(pkg.category) ? pkg.category.join(' • ') : pkg.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl">{title}</h1>
            <div className="flex items-center gap-6 text-sand-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollSpyNav />

      <div className="container mx-auto px-4 max-w-7xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Main Content (Left Column, spans 2) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">Overview</h2>
              <div className="prose prose-sand max-w-none text-sand-700 whitespace-pre-wrap leading-relaxed text-lg">
                {description}
              </div>
            </section>

            <hr className="border-sand-100" />

            {/* ITINERARY */}
            <section id="itinerary" className="scroll-mt-32">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">Daily Itinerary</h2>
              <ItineraryAccordion itinerary={itinerary} />
            </section>

            <hr className="border-sand-100" />

            {/* MAP */}
            <section id="map" className="scroll-mt-32">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">Route Map</h2>
              <div className="rounded-2xl overflow-hidden border border-sand-200 shadow-sm relative aspect-video bg-sand-200">
                <img 
                  src={mapUrl} 
                  alt="Safari Route Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-savanna-950/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-3">
                     <MapPin className="w-6 h-6 text-sunset-500" />
                     <span className="font-bold text-savanna-900 text-lg">Interactive Route Map</span>
                   </div>
                </div>
              </div>
            </section>

            <hr className="border-sand-100" />

            {/* INCLUSIONS & EXCLUSIONS */}
            <section id="inclusions" className="scroll-mt-32 pb-12">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">What's Included</h2>
              <PackageInclusions inclusions={inclusions} exclusions={exclusions} />
            </section>

          </div>

          {/* Sticky Sidebar (Right Column, spans 1) */}
          <div className="lg:col-span-1">
            <StickyBookingSidebar 
              kshPrice={pkg.ksh_price} 
              usdPrice={pkg.usd_price} 
              duration={pkg.duration} 
              packageTitle={title}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
