import { Link } from '@/i18n/routing';
import { ArrowRight, Clock } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  image: string;
  category: string;
  duration: string;
  ksh_price: string;
  usd_price: string;
}

const mockDeals: Package[] = [
  {
    id: '1',
    title: 'Masai Mara Migration Experience',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Easter Special',
    duration: '3D 2N',
    ksh_price: '24,000',
    usd_price: '210',
  },
  {
    id: '2',
    title: 'Diani Beach Escape',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Honeymoon',
    duration: '5D 4N',
    ksh_price: '75,000',
    usd_price: '600',
  },
  {
    id: '3',
    title: 'Amboseli Elephant Safari',
    image: 'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Flash Sale',
    duration: '2D 1N',
    ksh_price: '18,500',
    usd_price: '150',
  },
  {
    id: '4',
    title: 'Samburu Cultural Safari',
    image: 'https://images.unsplash.com/photo-1547471080-7cb2cb6a5a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Family Adventure',
    duration: '4D 3N',
    ksh_price: '60,000',
    usd_price: '550',
  }
];

function HomePackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link href={`/packages/${pkg.id}`} className="group flex flex-col bg-white rounded-2xl border border-sand-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-sunset-500 cursor-pointer h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-savanna-950 shadow-sm uppercase">
          {pkg.category}
        </div>
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-savanna-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-white shadow-sm flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-sunset-400" />
          {pkg.duration}
        </div>
      </div>
      
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-savanna-950 mb-4 line-clamp-2 group-hover:text-sunset-500 transition-colors">
          {pkg.title}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-sand-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-sand-500 uppercase tracking-widest font-bold mb-0.5">Starting from</span>
            {/* Dual Pricing Placeholder */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-sunset-500">${pkg.usd_price}</span>
              <span className="text-xs font-medium text-sand-400">/ KES {pkg.ksh_price}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-sand-50 flex items-center justify-center text-sunset-500 group-hover:bg-sunset-500 group-hover:text-white transition-colors duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductCarousel() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Limited Time Offers</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              Dynamic Deals
            </h3>
          </div>
          <Link href="/deals" className="inline-flex items-center text-sm text-savanna-900 font-bold hover:text-sunset-500 transition-colors group">
            View All Offers <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4 px-4 pb-8">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 lg:gap-6 pb-2 pt-2">
            {mockDeals.map((deal) => (
              <div key={deal.id} className="min-w-[75vw] sm:min-w-[300px] max-w-[350px] flex-shrink-0 snap-start">
                <HomePackageCard pkg={deal} />
              </div>
            ))}
          </div>
          
          {/* Edge gradients for visual cues */}
          <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
