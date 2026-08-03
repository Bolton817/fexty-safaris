import { Compass, Shield, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'About Us | Fexty Safaris',
};

export default async function AboutPage() {
  const t = await getTranslations('About');
  const tNav = await getTranslations('Navbar');

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-savanna-950">
        <div className="absolute inset-0 bg-gradient-to-br from-savanna-800 to-savanna-950 opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-sand-200 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-savanna-900 mb-8">{t('title')}</h2>
            <p className="text-lg text-sand-700 leading-relaxed mb-6">
              {t('p1')}
            </p>
            <p className="text-lg text-sand-700 leading-relaxed">
              {t('p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-savanna-900">{t('whyChooseUs')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Compass, title: t('expertGuides'), desc: t('expertGuidesDesc') },
              { icon: Star, title: t('uncompromisedLuxury'), desc: t('uncompromisedLuxuryDesc') },
              { icon: Shield, title: t('tailoredItineraries'), desc: t('tailoredItinerariesDesc') },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 text-center hover:border-sunset-500 transition-colors">
                <div className="w-16 h-16 mx-auto bg-sunset-50 text-sunset-500 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-savanna-900 mb-3">{feature.title}</h3>
                <p className="text-sand-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-savanna-900 mb-6">{tNav('InquireNow')}</h2>
          <Link href="/contact" className="btn-primary rounded-full px-8 py-4">
            {tNav('InquireNow')}
          </Link>
        </div>
      </section>
    </div>
  );
}
