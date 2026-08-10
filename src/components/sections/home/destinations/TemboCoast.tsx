import { Link } from '@/i18n/routing';
import { ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PriceDisplay from '@/components/PriceDisplay';
import { getTranslations } from 'next-intl/server';

export default async function TemboCoast() {
  const t = await getTranslations('HomepageSections');
  const supabase = await createClient();
  const { data: coastPackages } = await supabase
    .from('packages')
    .select('*')
    .contains('category', ['tembo-coast'])
    .limit(3);

  const packages = coastPackages || [];
  
  // Use the custom uploaded image for the Tembo Coast section
  const heroImage = '/images/tembo-coast.jpg';

  return (
    <section className="py-16 bg-white border-t border-sand-100">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-400 tracking-[0.2em] uppercase mb-2">{t('coastSub')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              {t('coastTitle')}
            </h3>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          
          <div className="lg:w-1/2 relative rounded-2xl overflow-hidden h-[400px] lg:h-auto min-h-[500px]">
             <img 
               src={heroImage} 
               alt="The Tembo Coast" 
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-savanna-950/60 to-transparent" />
          </div>

          <div className="lg:w-1/2 flex flex-col gap-4">
            {packages.map((pkg) => (
              <Link key={pkg.id} href={`/packages/${pkg.id}`} className="group flex bg-white border border-sand-200 rounded-2xl overflow-hidden hover:border-sunset-500 transition-colors h-32 md:h-40">
                <div className="w-1/3 md:w-2/5 overflow-hidden relative">
                  <img src={pkg.image_url || 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="w-2/3 md:w-3/5 p-4 md:p-6 flex flex-col justify-center">
                  <h4 className="text-lg md:text-xl font-bold text-savanna-950 mb-2 group-hover:text-sunset-500 transition-colors line-clamp-1">{pkg.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-sand-500 font-bold tracking-wider mb-2 md:mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-sunset-500" /> {pkg.duration}</span>
                  </div>
                  <div className="mt-auto">
                    <span className="inline-flex items-center bg-savanna-900 text-white text-[10px] md:text-xs font-bold tracking-widest px-2 py-1 rounded">
                      <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        <div className="text-center mt-12">
          <Link href="/destinations/coast" className="inline-flex items-center gap-2 text-sand-100 font-bold hover:text-sunset-400 transition-colors uppercase tracking-wider text-sm">
            {t('coastViewAll')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
