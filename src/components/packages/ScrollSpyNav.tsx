'use client';

import { useState, useEffect } from 'react';

export default function ScrollSpyNav() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'itinerary', 'map', 'inclusions'];
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // offset for sticky nav
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-sand-200 shadow-sm hidden md:block">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-8 py-4">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'itinerary', label: 'Itinerary' },
            { id: 'map', label: 'Route Map' },
            { id: 'inclusions', label: 'Inclusions' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-bold transition-colors ${
                activeSection === item.id ? 'text-sunset-600 border-b-2 border-sunset-500 pb-1' : 'text-sand-600 hover:text-sunset-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
