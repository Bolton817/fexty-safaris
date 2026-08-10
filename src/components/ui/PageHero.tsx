import React, { ReactNode } from 'react';

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  topLabel?: string;
  icon?: ReactNode;
}

export default function PageHero({ title, subtitle, image, topLabel, icon }: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-savanna-950 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-80 animate-in fade-in zoom-in-105 duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-savanna-950/90 via-savanna-950/40 to-black/10" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center mt-12 animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out">
        {icon && (
          <div className="flex justify-center mb-6">
            {icon}
          </div>
        )}
        
        {topLabel && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-sunset-500/20 text-sunset-400 font-bold tracking-widest text-[10px] md:text-xs uppercase mb-6 border border-sunset-500/30">
            {topLabel}
          </span>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl text-sand-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
