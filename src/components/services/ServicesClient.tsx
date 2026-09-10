'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Compass, Users, Briefcase, Heart, Gem, Plane, Anchor, Mountain } from 'lucide-react';
import { useEffect } from 'react';
import PageHero from '@/components/ui/PageHero';

export default function ServicesClient() {
  const t = useTranslations('Services');

  useEffect(() => {
    // Handle hash scrolling on page load if a hash is present
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero 
        title={t('title')}
        subtitle={t('subtitle')}
        image="/images/services-hero.jpg"
      />

      {/* 1. Customized Tour Packages */}
      <section id="customized-tour-packages" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="w-16 h-16 bg-savanna-50 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Compass className="w-8 h-8 text-sunset-500" />
              </div>
              <h2 className="text-4xl font-bold text-savanna-950 mb-6">{t('customizedTitle')}</h2>
              <p className="text-sand-600 text-lg leading-relaxed mb-6">
                {t('customizedDesc')}
              </p>
              <Link href="/deals#customized-tour-packages" className="inline-flex items-center gap-2 bg-savanna-900 hover:bg-savanna-800 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg">
                {t('explorePackages')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img src="/images/customized%20tour%20section.jpg" alt="Customized Tours" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Group Tours */}
      <section id="group-tours" className="py-24 bg-sand-50 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-sunset-500 rounded-3xl translate-x-4 translate-y-4" />
                <img src="/images/group%20tours%20section.jpg" alt="Group Tours" className="relative rounded-3xl shadow-xl object-cover h-[500px] w-full" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-16 h-16 bg-white border border-sand-200 rounded-full flex items-center justify-center mb-8 shadow-sm">
                <Users className="w-8 h-8 text-savanna-900" />
              </div>
              <h2 className="text-4xl font-bold text-savanna-950 mb-6">{t('groupTitle')}</h2>
              <p className="text-sand-600 text-lg leading-relaxed mb-6">
                {t('groupDesc')}
              </p>
              <Link href="/deals#group-tours" className="inline-flex items-center gap-2 bg-white border-2 border-savanna-900 text-savanna-900 hover:bg-savanna-50 px-8 py-4 rounded-xl font-bold transition-all">
                {t('viewGroupPackages')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Corporate Travel */}
      <section id="corporate-travel" className="relative py-32 scroll-mt-20">
        <div className="absolute inset-0 bg-[url('/images/corporate%20travel%20background.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-savanna-950/80 backdrop-blur-sm" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <Briefcase className="w-12 h-12 text-sunset-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">{t('corporateTitle')}</h2>
          <p className="text-sand-200 text-lg leading-relaxed mb-10">
            {t('corporateDesc')}
          </p>
          <Link href="/deals#corporate-mice" className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg">
            {t('exploreCorporate')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 4. Honeymoon & Romantic Getaways */}
      <section id="honeymoon-romantic-getaways" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-5/12 order-2 lg:order-1 relative z-10">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-sand-100 lg:-mr-20">
                <Heart className="w-10 h-10 text-sunset-500 mb-6" />
                <h2 className="text-3xl font-bold text-savanna-950 mb-6">{t('honeymoonTitle')}</h2>
                <p className="text-sand-600 text-lg leading-relaxed mb-6">
                  {t('honeymoonDesc')}
                </p>
                <Link href="/deals#romance-honeymoons" className="inline-flex items-center gap-2 text-savanna-900 font-bold hover:text-sunset-500 transition-colors uppercase tracking-wider text-sm">
                  {t('findRomanticEscape')} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="lg:w-7/12 order-1 lg:order-2">
              <img src="/images/honeymoon%20section.jpg" alt="Honeymoon" className="rounded-3xl shadow-xl object-cover h-[600px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destination Weddings */}
      <section id="destination-weddings" className="py-24 bg-sand-50 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <Gem className="w-12 h-12 text-savanna-900 mb-6" />
              <h2 className="text-4xl font-bold text-savanna-950 mb-6">{t('weddingTitle')}</h2>
              <p className="text-sand-600 text-lg leading-relaxed mb-6">
                {t('weddingDesc')}
              </p>
              <Link href="/deals#destination-weddings" className="inline-flex items-center gap-2 bg-savanna-900 hover:bg-savanna-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md">
                {t('planWedding')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="/images/destination%20wedding%201.jpg" alt="Wedding 1" className="rounded-3xl object-cover h-[300px] w-full mt-12" />
              <img src="/images/destination%20wedding%202.jpg" alt="Wedding 2" className="rounded-3xl object-cover h-[300px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ticketing & Visa Services */}
      <section id="ticketing-visa-services" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Plane className="w-12 h-12 text-sunset-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-savanna-950 mb-6">{t('ticketingTitle')}</h2>
          <p className="text-sand-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            {t('ticketingDesc')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            <div className="bg-sand-50 p-8 rounded-2xl border border-sand-100">
              <h3 className="text-xl font-bold text-savanna-900 mb-3">{t('flightBookingTitle')}</h3>
              <p className="text-sand-600 text-sm">{t('flightBookingDesc')}</p>
            </div>
            <div className="bg-sand-50 p-8 rounded-2xl border border-sand-100">
              <h3 className="text-xl font-bold text-savanna-900 mb-3">{t('visaProcessingTitle')}</h3>
              <p className="text-sand-600 text-sm">{t('visaProcessingDesc')}</p>
            </div>
            <div className="bg-sand-50 p-8 rounded-2xl border border-sand-100">
              <h3 className="text-xl font-bold text-savanna-900 mb-3">{t('insuranceTitle')}</h3>
              <p className="text-sand-600 text-sm">{t('insuranceDesc')}</p>
            </div>
          </div>
          
          <Link href="/contact" className="inline-flex items-center gap-2 bg-savanna-900 hover:bg-savanna-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md">
            {t('contactConcierge')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 7. Cruise Packages */}
      <section id="cruise-packages" className="py-24 bg-savanna-950 text-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Cruise" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full border border-savanna-800" />
            </div>
            <div className="lg:w-1/2">
              <Anchor className="w-12 h-12 text-sunset-500 mb-6" />
              <h2 className="text-4xl font-bold mb-6">{t('cruiseTitle')}</h2>
              <p className="text-sand-200 text-lg leading-relaxed mb-6">
                {t('cruiseDesc')}
              </p>
              <p className="text-sand-200 text-lg leading-relaxed mb-10">
                {t('cruiseDetail')}
              </p>
              <Link href="/deals#cruise-packages" className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-xl font-bold transition-all">
                {t('browseCruises')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Adventure Travel */}
      <section id="adventure-travel" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <Mountain className="w-12 h-12 text-savanna-900 mb-6" />
              <h2 className="text-4xl font-bold text-savanna-950 mb-6">{t('adventureTitle')}</h2>
              <p className="text-sand-600 text-lg leading-relaxed mb-6">
                {t('adventureDesc')}
              </p>
              <p className="text-sand-600 text-lg leading-relaxed mb-10">
                {t('adventureDetail')}
              </p>
              <Link href="/deals#adventure-alpine" className="inline-flex items-center gap-2 bg-savanna-900 hover:bg-savanna-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md">
                {t('findAdventure')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/Adventure%20travel%201.jpg" alt="Trekking" className="rounded-3xl object-cover h-[400px] w-full" />
                <img src="/images/adventure%20travel%202.jpg" alt="Diving" className="rounded-3xl object-cover h-[400px] w-full mt-12" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
