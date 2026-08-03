'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, CheckCircle } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  lodging: string;
  meals: string;
}

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[];
}

export default function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]); // Day 1 open by default

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return <p className="text-sand-600">Full itinerary details coming soon.</p>;
  }

  return (
    <div className="space-y-4">
      {itinerary.map((day) => {
        const isOpen = expandedDays.includes(day.day);
        return (
          <div key={day.day} className="border border-sand-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => toggleDay(day.day)}
              className="w-full flex items-center justify-between p-6 bg-sand-50 hover:bg-sand-100 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <span className="w-12 h-12 bg-sunset-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  D{day.day}
                </span>
                <h3 className="text-xl font-bold text-savanna-900">{day.title}</h3>
              </div>
              {isOpen ? <ChevronUp className="w-6 h-6 text-sand-500" /> : <ChevronDown className="w-6 h-6 text-sand-500" />}
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-6 text-sand-700 leading-relaxed border-t border-sand-100">
                <p className="mb-4">{day.description}</p>
                <div className="flex flex-wrap gap-6 text-sm font-medium bg-sand-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sunset-500" />
                    <span>Lodging: {day.lodging}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Meals: {day.meals}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
