import { Link } from '@/i18n/routing';
import { fetchPackages } from '@/lib/actions';
import PackageCard from '@/components/PackageCard';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600; // ISR cache every hour

export default async function Home() {
  const result = await fetchPackages();
  const packages = result.data || [];
  const t = await getTranslations('Navbar');

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center bg-savanna-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-savanna-800 to-savanna-950 opacity-90" />
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sunset-500/10 blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-savanna-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-sunset-500/20 text-sunset-300 font-medium text-sm tracking-wider mb-6 border border-sunset-500/30">
            DISCOVER THE WILD
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Premium Safaris <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-300 to-sunset-500">
              Beyond Imagination
            </span>
          </h1>
          <p className="text-lg md:text-xl text-sand-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Embark on curated adventures across breathtaking landscapes. Witness nature's greatest spectacles with uncompromised luxury and expert guides.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/destinations" 
              className="w-full sm:w-auto px-8 py-4 bg-sunset-500 hover:bg-sunset-600 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-sunset-500/25"
            >
              Explore {t('Destinations')}
            </Link>
            <Link 
              href="/deals" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm transition-all border border-white/10"
            >
              View {t('Deals')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories (Live Packages) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-savanna-900 mb-4">Curated Experiences</h2>
            <p className="text-sand-700 max-w-2xl mx-auto">From thrilling migrations to serene beach escapes, find the perfect journey tailored to your desires.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.length === 0 ? (
              <div className="col-span-full text-center py-12 text-sand-500 bg-sand-50 rounded-2xl border border-sand-200">
                <p className="text-lg font-medium">New experiences are being crafted.</p>
                <p>Check back soon for our latest curated safaris!</p>
              </div>
            ) : (
              packages.map((pkg: any) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
