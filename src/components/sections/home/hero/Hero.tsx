import { Search, MapPin, Compass, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Home');
  
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-savanna-950 overflow-hidden">
      {/* Immersive 3D/Parallax Background Frame */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-savanna-950/60 via-savanna-950/20 to-savanna-950/90" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 pt-16 flex flex-col items-center text-center">
        {/* Kinetic Typography */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight max-w-4xl mx-auto drop-shadow-2xl">
          Endless Discoveries.<br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-300 to-sunset-500">
            Unforgettable Journeys.
          </span>
        </h1>
        <p className="text-base md:text-lg text-sand-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
          Curated luxury safaris tailored to your wildest dreams.
        </p>
        
        {/* Floating Search Console (Glassmorphism) */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-[1.5rem] md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2">
          
          <div className="flex-1 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl md:rounded-full flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-sunset-500 transition-all cursor-pointer">
            <MapPin className="w-5 h-5 text-sunset-500 mr-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <label htmlFor="destination" className="text-[10px] font-bold text-savanna-500 uppercase tracking-widest cursor-pointer">Destination</label>
              <select id="destination" className="w-full bg-transparent text-sm text-savanna-950 font-bold focus:outline-none cursor-pointer appearance-none">
                <option value="">Where to?</option>
                <option value="kenya">Magical Kenya</option>
                <option value="coast">The Tembo Coast</option>
                <option value="outbound">Beyond Borders</option>
              </select>
            </div>
          </div>

          <div className="flex-1 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl md:rounded-full flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-sunset-500 transition-all cursor-pointer">
            <Compass className="w-5 h-5 text-sunset-500 mr-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <label htmlFor="style" className="text-[10px] font-bold text-savanna-500 uppercase tracking-widest cursor-pointer">Travel Style</label>
              <select id="style" className="w-full bg-transparent text-sm text-savanna-950 font-bold focus:outline-none cursor-pointer appearance-none">
                <option value="">What type?</option>
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
              <label htmlFor="duration" className="text-[10px] font-bold text-savanna-500 uppercase tracking-widest cursor-pointer">Duration</label>
              <select id="duration" className="w-full bg-transparent text-sm text-savanna-950 font-bold focus:outline-none cursor-pointer appearance-none">
                <option value="">How long?</option>
                <option value="1-3">1 - 3 Days</option>
                <option value="4-7">4 - 7 Days</option>
                <option value="8+">8+ Days</option>
              </select>
            </div>
          </div>

          <button className="md:w-16 lg:w-28 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl md:rounded-full flex items-center justify-center py-3 transition-colors shadow-lg shadow-sunset-500/30 group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="md:hidden lg:inline-block ml-2 font-bold text-sm">Search</span>
          </button>
          
        </div>
      </div>
    </section>
  );
}
