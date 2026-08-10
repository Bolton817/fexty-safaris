'use client'

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, MapPin, Compass, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/images/hero-safari.jpg',
    heading1: 'Endless Discoveries.',
    heading2: 'Unforgettable Journeys.',
    text: 'Curated luxury safaris tailored to your wildest dreams.',
  },
  {
    image: '/images/hero-beach.jpg',
    heading1: 'Pristine Shores.',
    heading2: 'Tropical Bliss.',
    text: 'Relax and rejuvenate on the breathtaking beaches of the Kenyan coast.',
  },
  {
    image: '/images/hero-international.jpg',
    heading1: 'Explore The World.',
    heading2: 'Limitless Horizons.',
    text: 'From the Maldives to Dubai, let us take you beyond borders.',
  },
  {
    image: '/images/hero-romance.jpg',
    heading1: 'Romantic Getaways.',
    heading2: 'Forever Memories.',
    text: 'Exclusive, intimate packages designed for your perfect honeymoon.',
  },
  {
    image: '/images/hero-corporate.jpg',
    heading1: 'Corporate Retreats.',
    heading2: 'Seamless Execution.',
    text: 'End-to-end travel solutions for business trips and conferences.',
  }
];

export default function Hero() {
  const router = useRouter();
  const t = useTranslations('Hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left'|'right'>('right');

  // Search State
  const [destination, setDestination] = useState('');
  const [style, setStyle] = useState('');
  const [duration, setDuration] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (style) params.append('style', style);
    if (duration) params.append('duration', duration);
    router.push(`/search?${params.toString()}`);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    // Autoplay only on desktop
    let interval: NodeJS.Timeout;
    const checkAndStartAutoplay = () => {
      interval = setInterval(() => {
        nextSlide();
      }, 6000);
    };

    checkAndStartAutoplay();
    
    // Re-evaluate on resize
    const handleResize = () => {
      clearInterval(interval);
      checkAndStartAutoplay();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [nextSlide]);

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-savanna-950 overflow-hidden group">
      
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[6000ms] ease-linear"
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-savanna-950/60 via-savanna-950/30 to-savanna-950/90" />
        </div>
      ))}

      {/* Manual Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 z-20 p-3 rounded-full bg-black/20 hover:bg-sunset-500 text-white backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all focus:opacity-100 outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 z-20 p-3 rounded-full bg-black/20 hover:bg-sunset-500 text-white backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all focus:opacity-100 outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full container mx-auto px-4 pt-16 flex flex-col items-center text-center">
        
        {/* Slide Content */}
        <div className="h-[140px] md:h-[180px] flex flex-col justify-end mb-8 relative w-full max-w-4xl">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute bottom-0 w-full transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-2xl">
                {slide.heading1}<br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-300 to-sunset-500">
                  {slide.heading2}
                </span>
              </h1>
              <p className="text-base md:text-lg text-sand-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
                {slide.text}
              </p>
            </div>
          ))}
        </div>
        
        {/* Floating Search Console (Glassmorphism) - Dynamic */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-[1.5rem] md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2"
        >
          
          <div className="flex-1 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl md:rounded-full flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-sunset-500 transition-all cursor-pointer">
            <MapPin className="w-5 h-5 text-sunset-500 mr-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <label htmlFor="destination" className="text-[10px] font-bold text-savanna-500 uppercase tracking-widest cursor-pointer">{t('searchDestination')}</label>
              <select 
                id="destination" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm text-savanna-950 font-bold focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">{t('searchWhere')}</option>
                <option value="kenya">Magical Kenya</option>
                <option value="coast">The Tembo Coast</option>
                <option value="outbound">Beyond Borders</option>
              </select>
            </div>
          </div>

          <div className="flex-1 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl md:rounded-full flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-sunset-500 transition-all cursor-pointer">
            <Compass className="w-5 h-5 text-sunset-500 mr-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <label htmlFor="style" className="text-[10px] font-bold text-savanna-500 uppercase tracking-widest cursor-pointer">{t('searchStyle')}</label>
              <select 
                id="style" 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-transparent text-sm text-savanna-950 font-bold focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">{t('searchWhatType')}</option>
                <option value="luxury">Luxury Safari</option>
                <option value="beach">Beach Escape</option>
                <option value="family">Family Adventure</option>
                <option value="romance">Honeymoon</option>
              </select>
            </div>
          </div>

          <div className="flex-1 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl md:rounded-full flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-sunset-500 transition-all cursor-pointer">
            <Clock className="w-5 h-5 text-sunset-500 mr-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <label htmlFor="duration" className="text-[10px] font-bold text-savanna-500 uppercase tracking-widest cursor-pointer">{t('searchDuration')}</label>
              <select 
                id="duration" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-transparent text-sm text-savanna-950 font-bold focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">{t('searchHowLong')}</option>
                <option value="1-3">1 - 3 Days</option>
                <option value="4-7">4 - 7 Days</option>
                <option value="8+">8+ Days</option>
              </select>
            </div>
          </div>

          <button type="submit" className="md:w-16 lg:w-28 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl md:rounded-full flex items-center justify-center py-3 transition-colors shadow-lg shadow-sunset-500/30 group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="md:hidden lg:inline-block ml-2 font-bold text-sm">{t('searchBtn')}</span>
          </button>
          
        </form>
        
        {/* Slide Indicators */}
        <div className="mt-8 flex gap-2">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-sunset-500' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
