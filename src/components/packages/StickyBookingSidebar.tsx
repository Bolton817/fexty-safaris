'use client';

import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import PriceDisplay from '@/components/PriceDisplay';

interface StickyBookingSidebarProps {
  kshPrice: number;
  usdPrice: number;
  duration: string;
}

export default function StickyBookingSidebar({ kshPrice, usdPrice, duration }: StickyBookingSidebarProps) {
  return (
    <div className="sticky top-40 bg-white p-8 rounded-2xl shadow-xl border border-sand-200 z-30">
      <div className="mb-6 pb-6 border-b border-sand-100 text-center">
        <span className="text-xs text-sand-500 uppercase tracking-wider font-bold mb-1 block">Starting From</span>
        <PriceDisplay ksh={kshPrice} usd={usdPrice} className="text-4xl font-bold text-sunset-500 block mb-1" />
        <span className="text-sand-500 text-sm font-medium">per person sharing</span>
      </div>
      
      <h3 className="text-xl font-bold text-savanna-900 mb-6 text-center">Check Availability</h3>
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Inquiry Sent!"); }}>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
          <input type="date" required className="w-full pl-10 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:border-sunset-500 transition-all text-sm" />
        </div>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
          <input type="number" min="1" placeholder="Number of Guests" required className="w-full pl-10 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:border-sunset-500 transition-all text-sm" />
        </div>

        <button type="submit" className="w-full bg-savanna-800 hover:bg-savanna-950 text-white rounded-xl py-4 font-bold mt-2 shadow-lg hover:-translate-y-1 transition-all">
          Inquire About This Tour
        </button>
      </form>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-sand-600 bg-sand-50 p-3 rounded-lg">
          <Clock className="w-5 h-5 text-sunset-500 shrink-0" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-sand-600 bg-sand-50 p-3 rounded-lg">
          <MapPin className="w-5 h-5 text-sunset-500 shrink-0" />
          <span>Starts and ends in Nairobi</span>
        </div>
      </div>
    </div>
  );
}
