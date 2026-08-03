import { Compass } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sand-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sunset-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-savanna-500/10 blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center z-10">
        {/* Animated Icon */}
        <div className="relative mb-8">
          {/* Glowing orb behind the compass */}
          <div className="absolute inset-0 bg-sunset-500 rounded-full blur-2xl opacity-40 animate-pulse" />
          
          {/* Main compass spinning slowly */}
          <div className="relative p-6 bg-white rounded-full shadow-2xl border border-sand-200">
            <Compass className="w-16 h-16 text-sunset-600 animate-[spin_3s_linear_infinite]" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Animated Text */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-savanna-950 uppercase tracking-[0.3em] mb-2 animate-pulse">
            Charting The Wild
          </h2>
          <p className="text-sand-600 text-sm font-medium tracking-wide">
            Preparing your next adventure...
          </p>
        </div>
      </div>
    </div>
  );
}
