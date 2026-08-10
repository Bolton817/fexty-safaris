import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function PreFooterCTA() {
  const t = useTranslations('HomepageSections');
  return (
    <section className="py-16 bg-white border-t border-sand-100">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-savanna-950 mb-4 leading-tight tracking-tight">
          {t('ctaTitle')}
        </h2>
        <p className="text-base md:text-lg text-sand-600 mb-8 font-light max-w-2xl mx-auto">
          {t('ctaDesc')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-sunset-500 hover:bg-sunset-600 text-white rounded-full font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-sunset-500/20 hover:shadow-sunset-500/40 hover:-translate-y-0.5 group"
          >
            {t('ctaBtn')}
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="mailto:hello@fextysafaris.com" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-savanna-950 border border-sand-200 hover:border-sunset-500 hover:text-sunset-500 rounded-full font-bold tracking-widest uppercase text-xs transition-all duration-300"
          >
            {t('ctaBtnAlt')}
          </a>
        </div>
      </div>
    </section>
  );
}
