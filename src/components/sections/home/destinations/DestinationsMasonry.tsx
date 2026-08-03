import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 'kenya',
    title: 'Magical Kenya',
    subtitle: 'The Heart of the Safari',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    className: 'lg:col-span-8 lg:row-span-2 min-h-[300px] lg:min-h-[450px]',
  },
  {
    id: 'coast',
    title: 'The Tembo Coast',
    subtitle: 'Pristine White Sands',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    className: 'lg:col-span-4 min-h-[200px]',
  },
  {
    id: 'outbound',
    title: 'Beyond Borders',
    subtitle: 'Wonders of East Africa',
    image: 'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    className: 'lg:col-span-4 min-h-[200px]',
  },
];

export default function DestinationsMasonry() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Geographic Pillars</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              Where will your journey take you?
            </h3>
          </div>
          <Link href="/destinations" className="inline-flex items-center text-sm text-savanna-900 font-bold hover:text-sunset-500 transition-colors group">
            View All Destinations 
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 auto-rows-fr">
          {destinations.map((dest) => (
            <Link 
              key={dest.id} 
              href={`/destinations#${dest.id}`}
              className={`group relative rounded-2xl overflow-hidden block ${dest.className}`}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Dark Gradient Overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-savanna-950/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Text Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="text-sunset-300 font-bold text-[10px] tracking-widest uppercase mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  {dest.subtitle}
                </span>
                <h4 className="text-2xl md:text-3xl font-bold text-white transform group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                  {dest.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
