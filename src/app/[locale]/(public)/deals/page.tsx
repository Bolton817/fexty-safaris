import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/routing';
import { Clock, ArrowRight } from 'lucide-react';
import PriceDisplay from '@/components/PriceDisplay';
import PageHero from '@/components/ui/PageHero';

export const revalidate = 3600; // ISR cache every hour

const SUB_CATEGORIES = [
  { id: 'bush-safari', title: 'Bush Safari' },
  { id: 'beach-escapes', title: 'Beach Escapes' },
  { id: 'romance-honeymoons', title: 'Romance & Honeymoons' },
  { id: 'adventure-alpine', title: 'Adventure & Alpine' },
  { id: 'corporate-mice', title: 'Corporate & MICE' },
  { id: 'customized-tour-packages', title: 'Customized Tours' },
  { id: 'group-tours', title: 'Group Tours' },
  { id: 'destination-weddings', title: 'Destination Weddings' },
  { id: 'cruise-packages', title: 'Cruise Packages' }
];

export default async function DealsPage() {
  const supabase = await createClient();
  
  // Fetch all packages
  const { data: allPackages } = await supabase.from('packages').select('*');
  const packages = allPackages || [];

  const groupedPackages = SUB_CATEGORIES.map(sub => {
    // Robust filtering to check if the sub.title or sub.id appears in the category array, package title, or description.
    const matchingPackages = packages.filter(pkg => {
      let cats: string[] = [];
      if (Array.isArray(pkg.category)) {
        cats = pkg.category;
      } else if (typeof pkg.category === 'string') {
        try {
          cats = JSON.parse(pkg.category);
        } catch {
          cats = [pkg.category];
        }
      }
      
      const lowerCats = cats.map((c: string) => c.toLowerCase());
      const lowerTitle = (pkg.title || '').toLowerCase();
      const lowerDesc = (pkg.description || '').toLowerCase();
      
      const subId = sub.id.toLowerCase();
      const subTitle = sub.title.toLowerCase();

      return lowerCats.includes(subId) || 
             lowerCats.includes(subTitle) ||
             lowerCats.some(c => c.includes(subId) || c.includes(subTitle)) ||
             lowerTitle.includes(subTitle) || 
             lowerTitle.includes(subId) ||
             lowerDesc.includes(subTitle);
    });
    return {
      ...sub,
      packages: matchingPackages
    };
  }).filter(group => group.packages.length > 0); // Only keep groups that have packages

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Exclusive Safari Deals"
        subtitle="Discover our handpicked selection of premium tour packages tailored for unforgettable African adventures"
        image="/images/deals-hero.jpg"
        topLabel="Special Offers"
      />

      {/* Dynamic Sections */}
      <div className="container mx-auto px-4 py-16 lg:py-24 space-y-24">
        {groupedPackages.length === 0 ? (
          <div className="text-center py-20 text-sand-500">
            <p className="text-xl">Deals and themed packages are currently being updated.</p>
            <p className="mt-2 text-sm">Please check back soon.</p>
          </div>
        ) : (
          groupedPackages.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <div className="flex items-end justify-between mb-10 border-b border-sand-100 pb-6">
                <div>
                  <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Theme</h2>
                  <h3 className="text-3xl lg:text-4xl font-bold text-savanna-950">{group.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.packages.map((pkg) => (
                  <Link 
                    key={pkg.id} 
                    href={`/packages/${pkg.id}`} 
                    className="group flex flex-col bg-white rounded-2xl border border-sand-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-sunset-500 cursor-pointer h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
                      <img 
                        src={pkg.image_url || 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-savanna-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-white shadow-sm flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-sunset-400" />
                        {pkg.duration}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold text-savanna-950 mb-3 line-clamp-2 group-hover:text-sunset-500 transition-colors">
                        {pkg.title}
                      </h4>
                      <p className="text-sand-600 text-sm line-clamp-2 mb-6 flex-grow">
                        {pkg.description || 'Experience the adventure of a lifetime with our meticulously crafted itinerary.'}
                      </p>
                      
                      <div className="pt-4 border-t border-sand-100 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-sand-500 uppercase tracking-widest font-bold mb-0.5">Starting from</span>
                          <div className="flex items-baseline gap-1.5">
                            <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} className="text-lg font-bold text-sunset-500" />
                          </div>
                        </div>
                        <div className="w-10 h-10 shrink-0 rounded-full bg-sand-50 flex items-center justify-center text-sunset-500 group-hover:bg-sunset-500 group-hover:text-white transition-colors duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
