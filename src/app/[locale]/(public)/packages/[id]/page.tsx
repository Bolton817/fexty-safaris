import { fetchPackageById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import PriceDisplay from '@/components/PriceDisplay';
import { Clock, MapPin, CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

export default async function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { success, data: pkg } = await fetchPackageById(id);

  if (!success || !pkg) {
    notFound();
  }

  const tDynamic = await getTranslations('DynamicPackages');
  const tPackage = await getTranslations('Package');
  const tNav = await getTranslations('Navbar');
  
  // Basic mock logic for dynamic database content translations
  const slugMap: Record<string, string> = {
    'Masai Mara Migration Experience': 'masai_mara_migration',
    'Diani Beach Escape': 'diani_beach_escape',
    'Amboseli Elephant Safari': 'amboseli_elephants',
  };
  
  const slug = slugMap[pkg.title];
  const title = slug ? tDynamic(`${slug}.title` as any) : pkg.title;
  const description = slug ? tDynamic(`${slug}.description` as any) : pkg.description;

  return (
    <div className="flex-1 bg-sand-50 pb-20">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-savanna-950">
        {pkg.image_url && (
          <img 
            src={pkg.image_url} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-savanna-950 via-savanna-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-sunset-500 text-white font-medium text-xs tracking-wider mb-4">
              {pkg.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{title}</h1>
            <div className="flex items-center gap-6 text-sand-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200">
              <h2 className="text-2xl font-bold text-savanna-900 mb-6">{tPackage('overview')}</h2>
              <div className="prose prose-sand max-w-none text-sand-700 whitespace-pre-wrap leading-relaxed">
                {description}
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200">
              <h2 className="text-2xl font-bold text-savanna-900 mb-6">{tPackage('includes')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Luxury Accommodation",
                  "Expert Safari Guide",
                  "All Park Entry Fees",
                  "Airport Transfers",
                  "Daily Game Drives",
                  "Full Board Meals"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sand-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-lg border border-sand-200">
              <h3 className="text-xl font-bold text-savanna-900 mb-2">{tPackage('bookNow')}</h3>
              <p className="text-sand-600 text-sm mb-6">{tPackage('startingFrom')} per person</p>
              
              <div className="bg-sand-50 p-6 rounded-xl border border-sand-100 mb-6 text-center">
                <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} className="text-4xl font-bold text-sunset-500 block mb-1" />
                <span className="text-sand-500 text-sm font-medium">All inclusive package</span>
              </div>

              <Link href="/contact" className="block w-full text-center btn-primary rounded-xl py-4 px-6">
                {tNav('InquireNow')}
              </Link>
              
              <p className="text-center text-xs text-sand-500 mt-4">
                No credit card required for inquiry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
