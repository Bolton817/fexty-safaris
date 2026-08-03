import { Link } from '@/i18n/routing';
import { Camera, Umbrella, Heart, Users } from 'lucide-react';

const archetypes = [
  {
    id: 'safari-bush',
    title: 'Safari & Bush',
    description: 'Immersive wildlife encounters in the heart of the savanna.',
    icon: Camera,
    color: 'text-savanna-600',
    bgColor: 'bg-savanna-50',
  },
  {
    id: 'beach-escapes',
    title: 'Beach Escapes',
    description: 'Barefoot luxury on the pristine white sands of the Indian Ocean.',
    icon: Umbrella,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    id: 'romance',
    title: 'Romance & Honeymoon',
    description: 'Intimate retreats tailored for unforgettable beginnings.',
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    id: 'group-departures',
    title: 'Group Departures',
    description: 'Shared adventures and logistical perfection for large parties.',
    icon: Users,
    color: 'text-sunset-500',
    bgColor: 'bg-sunset-50',
  }
];

export default function CuratedStyles() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Traveler Archetypes</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight mb-4">
            Curated For You
          </h3>
          <p className="text-base text-sand-500 leading-relaxed font-light">
            Whether you seek the thrill of the hunt or the peace of the waves, we tailor the experience precisely to your travel style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {archetypes.map((style) => (
            <Link 
              key={style.id}
              href={`/destinations?style=${style.id}`}
              className="group flex flex-col items-center text-center p-6 border border-transparent rounded-2xl transition-all duration-300 hover:border-sand-200 hover:bg-sand-50/50"
            >
              <div className={`w-16 h-16 rounded-full ${style.bgColor} ${style.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ease-out`}>
                <style.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold text-savanna-950 mb-2 group-hover:text-sunset-500 transition-colors">
                {style.title}
              </h4>
              <p className="text-sand-500 leading-relaxed text-xs">
                {style.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
