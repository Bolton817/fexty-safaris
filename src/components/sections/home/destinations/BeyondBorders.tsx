import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PriceDisplay from '@/components/PriceDisplay';
import { getTranslations } from 'next-intl/server';

export default async function BeyondBorders() {
  const t = await getTranslations('HomepageSections');
  const supabase = await createClient();
  const { data: beyondPackages } = await supabase
    .from('packages')
    .select('*')
    .contains('category', ['beyond-borders'])
    .limit(4);

  const packages = beyondPackages || [];

  return (
    <section className="py-16 bg-white border-t border-sand-100">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">{t('bordersSub')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              {t('bordersTitle')}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {packages.map((pkg) => (
            <Link key={pkg.id} href={`/packages/${pkg.id}`} className="group relative rounded-2xl overflow-hidden aspect-[3/4] block">
              <img 
                src={pkg.image_url || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                alt={pkg.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-savanna-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 right-4 bg-sunset-500 text-white text-xs font-bold tracking-widest px-2 py-1 rounded">
                <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} />
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full flex items-center justify-between">
                <h4 className="text-xl font-bold text-white tracking-wide line-clamp-2 pr-2">{pkg.title}</h4>
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transform group-hover:translate-x-1 group-hover:bg-sunset-500 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/destinations/borders" className="inline-flex items-center gap-2 text-savanna-900 font-bold hover:text-sunset-500 transition-colors uppercase tracking-wider text-sm">
            {t('bordersViewAll')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
