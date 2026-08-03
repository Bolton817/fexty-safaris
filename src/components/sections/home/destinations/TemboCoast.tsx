import { Link } from '@/i18n/routing';
import { ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PriceDisplay from '@/components/PriceDisplay';

export default async function TemboCoast() {
  const supabase = await createClient();
  const { data: coastPackages } = await supabase
    .from('packages')
    .select('*')
    .contains('category', ['tembo-coast'])
    .limit(3);

  const packages = coastPackages || [];
  
  // Use the first package's image for the large hero image if available, else a fallback
  const heroImage = packages.length > 0 
    ? (packages[0].image_url || 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')
    : 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="py-16 bg-white border-t border-sand-100">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Pristine White Sands</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              The Tembo Coast
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
                  <div className="flex items-center gap-3 text-xs text-sand-500 font-bold tracking-wider mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-sunset-500" /> {pkg.duration}</span>
                  </div>
                  <span className="text-sunset-500 font-bold text-sm">
                    From <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

        <div className="text-center">
          <Link href="/destinations/coast" className="inline-flex items-center justify-center px-8 py-3.5 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold tracking-widest uppercase text-xs transition-colors duration-300 group">
            Discover Coastal Escapes
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
