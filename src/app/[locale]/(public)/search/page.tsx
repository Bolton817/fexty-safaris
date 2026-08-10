import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/routing';
import { Clock, ArrowRight, Search as SearchIcon, Frown } from 'lucide-react';
import PriceDisplay from '@/components/PriceDisplay';
import PageHero from '@/components/ui/PageHero';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string, destination?: string, style?: string, duration?: string }> }) {
  const supabase = await createClient();
  const params = await searchParams;
  const { q, destination, style, duration } = params;

  // Fetch all packages to do robust filtering in JS (easier for loose matching on categories and text)
  const { data: allPackages } = await supabase.from('packages').select('*');
  const packages = allPackages || [];

  const filteredPackages = packages.filter(pkg => {
    let match = true;
    const title = (pkg.title || '').toLowerCase();
    const desc = (pkg.description || '').toLowerCase();
    
    let cats: string[] = [];
    if (Array.isArray(pkg.category)) {
      cats = pkg.category.map((c: string) => c.toLowerCase());
    } else if (typeof pkg.category === 'string') {
      try {
        cats = JSON.parse(pkg.category).map((c: string) => c.toLowerCase());
      } catch {
        cats = [pkg.category.toLowerCase()];
      }
    }

    // 1. Text Query (from Navbar)
    if (q) {
      const qLower = q.toLowerCase();
      if (!title.includes(qLower) && !desc.includes(qLower) && !cats.some(c => c.includes(qLower))) {
        match = false;
      }
    }

    // 2. Destination (from Hero)
    if (destination) {
      const dLower = destination.toLowerCase();
      // Strict match: must be in title or categories (NOT description to avoid false positives)
      if (!title.includes(dLower) && !cats.some(c => c.includes(dLower) || c.includes('magical-kenya') && dLower === 'kenya' || c.includes('tembo-coast') && dLower === 'coast' || c.includes('beyond-borders') && dLower === 'outbound')) {
        match = false;
      }
    }

    // 3. Travel Style (from Hero)
    if (style) {
      const sLower = style.toLowerCase();
      // Strict match: must be in title or categories
      if (!cats.some(c => c.includes(sLower) || c.includes('safari') && sLower === 'luxury') && !title.includes(sLower)) {
        match = false;
      }
    }

    // 4. Duration (from Hero)
    if (duration) {
       const pkgDurStr = (pkg.duration || '').toLowerCase();
       // Parse the first number found in the duration string
       const matchNum = pkgDurStr.match(/\d+/);
       const days = matchNum ? parseInt(matchNum[0]) : 0;
       
       if (days > 0) {
         if (duration === '1-3' && (days < 1 || days > 3)) match = false;
         else if (duration === '4-7' && (days < 4 || days > 7)) match = false;
         else if (duration === '8+' && days < 8) match = false;
       } else {
         // Fallback if no number found, loose check
         if (duration === '1-3' && !pkgDurStr.includes('1') && !pkgDurStr.includes('2') && !pkgDurStr.includes('3')) match = false;
         else if (duration === '4-7' && !pkgDurStr.includes('4') && !pkgDurStr.includes('5') && !pkgDurStr.includes('6') && !pkgDurStr.includes('7')) match = false;
         else if (duration === '8+' && !pkgDurStr.includes('8')) match = false;
       }
    }

    return match;
  });

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Hero Section */}
      <PageHero 
        title="Search Results"
        subtitle={q ? `Showing results for "${q}"` : 'Showing packages matching your criteria'}
        image="/images/deals-hero.jpg"
        icon={<SearchIcon className="w-12 h-12 text-sunset-500" />}
      />

      {/* Results Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {filteredPackages.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-sand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Frown className="w-10 h-10 text-sand-400" />
            </div>
            <h2 className="text-2xl font-bold text-savanna-950 mb-4">No packages found</h2>
            <p className="text-sand-600 mb-8">
              We couldn't find any packages matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Link href="/deals" className="btn-primary rounded-xl px-8 py-3">
              View All Packages
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-10 text-sand-600 font-medium">
              Found {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
