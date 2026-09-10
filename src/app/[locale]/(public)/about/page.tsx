import type { Metadata } from 'next';
import { Target, Eye, Shield, Leaf, HeartHandshake, Award, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';

export const revalidate = 3600; // ISR cache every hour

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fextysafaris.com';
  const heroImage = '/images/about-us-hero.jpg';

  return {
    title: 'About Us | Our Story, Mission & Safari Heritage',
    description: 'Learn about Fexty Safaris — our passion for African wildlife, commitment to sustainable eco-tourism, customer-first hospitality, and bespoke safari journeys.',
    keywords: [
      'About Fexty Safaris',
      'Kenya Safari Company',
      'Sustainable Eco-Tourism',
      'African Wildlife Guides',
      'Safari Heritage Kenya',
      'Trusted Tour Operator Nairobi',
      'Luxury Travel Specialists'
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        sw: '/sw/about',
        fr: '/fr/about',
        es: '/es/about',
        de: '/de/about',
        zh: '/zh/about',
        ar: '/ar/about',
      },
    },
    openGraph: {
      title: 'About Us | Fexty Safaris',
      description: 'Discover the heart and soul behind Fexty Safaris — our story, vision, sustainable conservation values, and passion for unforgettable travel.',
      url: `/${locale}/about`,
      siteName: 'Fexty Safaris',
      locale: locale,
      type: 'website',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: 'About Fexty Safaris - Heritage & Sustainable Tourism',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Us | Fexty Safaris',
      description: 'Discover the heart and soul behind Fexty Safaris — our story, vision, and sustainable safari experiences.',
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

export default async function AboutPage() {
  const t = await getTranslations('About');

  const coreValues = [
    { icon: HeartHandshake, text: t('valueCustomerCentric') },
    { icon: Shield, text: t('valueIntegrity') },
    { icon: Target, text: t('valueInnovation') },
    { icon: Leaf, text: t('valueSustainability') },
    { icon: Award, text: t('valueExcellence') },
  ];

  const whyChooseUs = [
    { title: t('expertiseTitle'), desc: t('expertiseDesc') },
    { title: t('personalizationTitle'), desc: t('personalizationDesc') },
    { title: t('supportTitle'), desc: t('supportDesc') },
    { title: t('pricingTitle'), desc: t('pricingDesc') },
    { title: t('partnershipsTitle'), desc: t('partnershipsDesc') },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* 1. Hero Section */}
      <PageHero 
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        image="/images/about-us-hero.jpg"
      />

      {/* 2. Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-sand-100">
                <img 
                  src="/images/about%20page%20story%20section.jpg" 
                  alt="Our Story" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-sunset-100 rounded-full blur-3xl opacity-60 -z-10" />
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-savanna-100 rounded-full blur-3xl opacity-60 -z-10" />
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-savanna-950 mb-8">{t('ourStoryTitle')}</h2>
              <p className="text-lg md:text-xl text-sand-600 leading-relaxed">
                {t('ourStoryContent')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Section */}
      <section className="py-24 bg-savanna-50 border-y border-sand-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-sand-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Eye className="w-48 h-48 text-savanna-900" />
              </div>
              <div className="w-16 h-16 bg-sunset-100 text-sunset-600 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-savanna-950 mb-6">{t('visionTitle')}</h3>
              <p className="text-xl text-sand-700 leading-relaxed relative z-10">
                {t('visionContent')}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-savanna-900 p-10 rounded-3xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Target className="w-48 h-48 text-white" />
              </div>
              <div className="w-16 h-16 bg-savanna-800 text-sunset-400 rounded-2xl flex items-center justify-center mb-8 border border-savanna-700">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">{t('missionTitle')}</h3>
              <ul className="space-y-4 relative z-10">
                {[t('mission1'), t('mission2'), t('mission3'), t('mission4')].map((m, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-sunset-400 shrink-0 mt-0.5" />
                    <span className="text-lg text-sand-100">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values & Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-savanna-950 mb-6">{t('whyChooseUsTitle')}</h2>
            <div className="w-24 h-1 bg-sunset-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-sand-200 hover:border-sunset-500 hover:shadow-xl transition-all duration-300 group">
                <h4 className="text-xl font-bold text-savanna-900 mb-4 group-hover:text-sunset-600 transition-colors">{item.title}</h4>
                <p className="text-sand-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Core Values */}
          <div className="bg-sand-50 rounded-3xl p-10 md:p-16 border border-sand-200">
            <h3 className="text-3xl font-bold text-savanna-950 mb-10 text-center">{t('coreValuesTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {coreValues.map((val, i) => {
                const [title, desc] = val.text.split(': ');
                return (
                  <div key={i} className="flex gap-4 items-start bg-white p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-savanna-100 text-savanna-700 flex items-center justify-center shrink-0">
                      <val.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-savanna-900 mb-1">{title}</h4>
                      <p className="text-sm text-sand-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sustainability Section */}
      <section className="py-24 bg-savanna-950 text-white relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=1920&q=80" 
          alt="Sustainability" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <Leaf className="w-16 h-16 text-sunset-500 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('sustainabilityTitle')}</h2>
          <p className="text-xl text-sand-200 mb-12">{t('sustainabilityDesc')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[t('sust1'), t('sust2'), t('sust3')].map((item, i) => (
              <div key={i} className="bg-savanna-900/80 backdrop-blur-md p-8 rounded-2xl border border-savanna-700">
                <CheckCircle2 className="w-8 h-8 text-sunset-400 mb-6" />
                <p className="text-sand-100 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-savanna-950 mb-6">{t('faqTitle')}</h2>
            <div className="w-24 h-1 bg-sunset-500 mx-auto rounded-full" />
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-sand-50 rounded-2xl border border-sand-200 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-lg text-savanna-900 group-open:text-sunset-600 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-sand-400 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-sand-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      {/* 7. CTA Section */}
      <section className="py-24 bg-sunset-500">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">{t('ctaTitle')}</h2>
          <p className="text-xl text-white/90 mb-12">{t('ctaDesc')}</p>
          <Link href="/contact" className="inline-block bg-savanna-950 hover:bg-savanna-900 text-white font-bold tracking-widest uppercase px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
