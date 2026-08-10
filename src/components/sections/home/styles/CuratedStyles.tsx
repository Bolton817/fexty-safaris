'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

const archetypes = [
  {
    id: 'safari-bush',
    title: 'Safari & Bush',
    description: 'Immerse yourself in the heart of the savanna with thrilling game drives, close encounters with the Big Five, and nights spent under star-studded skies. Experience the raw beauty of untamed wilderness with our expert guides who bring the bush to life.',
    image: '/images/curated-safari.jpg'
  },
  {
    id: 'beach-escapes',
    title: 'Beach Escapes',
    description: 'Unwind with barefoot luxury on the pristine white sands of the Indian Ocean. From secluded private villas to vibrant coral reefs perfect for diving, let the rhythmic waves and tropical breeze wash away your stress in these idyllic coastal paradises.',
    image: '/images/curated-beach.jpg'
  },
  {
    id: 'romance',
    title: 'Romance & Honeymoon',
    description: 'Celebrate your love with intimate retreats tailored for unforgettable beginnings. Enjoy secluded sundowners, private bush dinners by candlelight, and luxurious lodges offering unparalleled privacy, creating the perfect backdrop for your romantic getaway.',
    image: '/images/curated-romance.jpg'
  },
  {
    id: 'group-departures',
    title: 'Group Departures',
    description: 'Embark on shared adventures designed with logistical perfection for large parties or families. Build lifelong connections as you explore extraordinary landscapes together, all while enjoying seamless coordination and exclusive group-friendly accommodations.',
    image: '/images/curated-group.jpg'
  }
];

export default function CuratedStyles() {
  const [activeId, setActiveId] = useState(archetypes[0].id);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only run on desktop/tablet where sticky scroll is active
    if (window.innerWidth < 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setActiveId(id);
          }
        });
      },
      {
        root: null,
        // Trigger when the item crosses the middle of the screen
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    );

    containerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      containerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Traveler Archetypes</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight mb-4">
            Curated For You
          </h3>
          <p className="text-base text-sand-500 leading-relaxed font-light">
            Whether you seek the thrill of the hunt or the peace of the waves, we tailor the experience precisely to your travel style.
          </p>
        </div>

        {/* --- MOBILE LAYOUT (Stacked Cards with Images) --- */}
        <div className="md:hidden flex flex-col gap-8">
          {archetypes.map((style) => (
            <div 
              key={style.id}
              className="flex flex-col bg-white border border-sand-200 rounded-2xl overflow-hidden"
            >
              <div className="w-full h-56 relative overflow-hidden">
                <img src={style.image} alt={style.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col items-start text-left">
                <h4 className="text-xl font-bold text-savanna-900 mb-3">{style.title}</h4>
                <p className="text-sand-600 text-sm leading-relaxed mb-6">{style.description}</p>
                <Link 
                  href={`/destinations?style=${style.id}`}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-sunset-500 hover:text-sunset-600 transition-colors group"
                >
                  Explore {style.title}
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP STICKY SCROLL LAYOUT --- */}
        <div className="hidden md:flex relative items-start gap-16 lg:gap-24">
          
          {/* Left Column: Scrolling Text Blocks */}
          <div className="w-1/2 flex flex-col py-[5vh]">
            {archetypes.map((style, index) => {
              const isActive = activeId === style.id;
              return (
                <div 
                  key={style.id}
                  data-id={style.id}
                  ref={(el) => { containerRefs.current[index] = el; }}
                  className="min-h-[60vh] flex flex-col justify-center pr-8"
                >
                  <div className={`transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'}`}>
                    <h4 className="text-3xl lg:text-4xl font-bold text-savanna-900 mb-6 leading-tight">
                      {style.title}
                    </h4>
                    <p className="text-sand-600 leading-relaxed text-lg mb-8 max-w-md">
                      {style.description}
                    </p>
                    <Link 
                      href={`/destinations?style=${style.id}`}
                      className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-sunset-500 hover:text-sunset-600 transition-colors group"
                    >
                      Explore {style.title}
                      <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Image Container */}
          <div className="w-1/2 sticky top-32 h-[60vh] rounded-2xl overflow-hidden shadow-2xl border border-sand-100">
            {archetypes.map((style) => (
              <img
                key={style.id}
                src={style.image}
                alt={style.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  activeId === style.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
