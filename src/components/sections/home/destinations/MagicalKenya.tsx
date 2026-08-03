import { Link } from '@/i18n/routing';
import { ArrowRight, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import PriceDisplay from '@/components/PriceDisplay';

export default async function MagicalKenya() {
  const supabase = await createClient();
  const { data: kenyaPackages } = await supabase
    .from('packages')
    .select('*')
    .contains('category', ['magical-kenya'])
    .limit(3);

  // If no packages found, we can either return null or empty state. 
  // Returning an empty array is fine, it just won't render cards.
  const packages = kenyaPackages || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">The Heart of the Safari</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              Magical Kenya
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-fr mb-10">
          {packages.map((pkg, index) => {
            // Recreate the layout logic: first item is large, others are small
            const className = index === 0 
              ? 'lg:col-span-8 lg:row-span-2 min-h-[400px]' 
              : 'lg:col-span-4 min-h-[250px]';

            return (
              <Link 
                key={pkg.id} 
                href={`/packages/${pkg.id}`}
                className={`group relative rounded-2xl overflow-hidden block ${className}`}
              >
                <div className="absolute inset-0">
                  <img 
                    src={pkg.image_url || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-savanna-950/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex gap-2 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="text-white text-xs font-bold tracking-widest bg-sunset-500 px-2 py-1 rounded">
                      <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} />
                    </span>
                    <span className="text-white text-xs font-bold tracking-widest bg-savanna-950/50 backdrop-blur px-2 py-1 rounded flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {pkg.duration}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white transform group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                    {pkg.title}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/destinations/magical-kenya" className="inline-flex items-center justify-center px-8 py-3.5 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold tracking-widest uppercase text-xs transition-colors duration-300 group">
            Explore All Kenya Safaris
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
