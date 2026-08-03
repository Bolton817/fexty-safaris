import { Link } from '@/i18n/routing';
import PriceDisplay from './PriceDisplay';
import { Clock, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PackageCardProps {
  pkg: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    duration: string;
    ksh_price: number;
    usd_price: number;
  };
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const t = useTranslations('DynamicPackages');
  
  // Basic mock logic for dynamic database content translations
  const slugMap: Record<string, string> = {
    'Masai Mara Migration Experience': 'masai_mara_migration',
    'Diani Beach Escape': 'diani_beach_escape',
    'Amboseli Elephant Safari': 'amboseli_elephants',
  };
  
  const slug = slugMap[pkg.title];
  const title = slug ? t(`${slug}.title` as any) : pkg.title;
  const description = slug ? t(`${slug}.description` as any) : pkg.description;

  return (
    <Link href={`/packages/${pkg.id}`} className="group flex flex-col bg-white rounded-2xl border border-sand-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        {pkg.image_url ? (
          <img 
            src={pkg.image_url} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sand-400">No Image</div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-savanna-900 shadow-sm">
          {pkg.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-savanna-950 mb-2 line-clamp-1 group-hover:text-sunset-500 transition-colors">{title}</h3>
        
        <div className="flex items-center gap-4 text-sand-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Kenya</span>
          </div>
        </div>
        
        <p className="text-sand-600 text-sm line-clamp-2 mb-6 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-sand-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-sand-500 uppercase tracking-wider font-medium">Starting from</span>
            <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} className="text-lg font-bold text-savanna-900" />
          </div>
          <span className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-sunset-500 group-hover:bg-sunset-500 group-hover:text-white transition-colors">
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
