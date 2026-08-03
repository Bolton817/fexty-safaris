'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle, XCircle, ChevronDown, ChevronUp, Calendar, Users } from 'lucide-react';
import PriceDisplay from '@/components/PriceDisplay';
import { useTranslations } from 'next-intl';

interface PackageDetailsClientProps {
  pkg: any;
  title: string;
  description: string;
}

// Mock Data
const MOCK_ITINERARY = [
  {
    day: 1,
    title: "Arrival in Nairobi & Transfer to Safari",
    description: "Upon arrival at Jomo Kenyatta International Airport, our representative will greet you. We'll transfer you directly to Wilson Airport for your light aircraft flight into the bush. Enjoy your first game drive en route to the lodge.",
    lodging: "Premium Tented Camp",
    meals: "Dinner"
  },
  {
    day: 2,
    title: "Full Day Game Drives",
    description: "Wake up before dawn for an early morning game drive when predators are most active. Return for a hearty breakfast. Spend the afternoon relaxing at the lodge before embarking on an evening game drive.",
    lodging: "Premium Tented Camp",
    meals: "Breakfast, Lunch, Dinner"
  },
  {
    day: 3,
    title: "Cultural Visit & Sundowner",
    description: "In the morning, visit a local community village to learn about their traditions and way of life. Conclude your day with a spectacular sundowner out in the wild, watching the sunset with a cocktail in hand.",
    lodging: "Premium Tented Camp",
    meals: "Breakfast, Lunch, Dinner"
  },
  {
    day: 4,
    title: "Departure",
    description: "Enjoy one final sunrise game drive before breakfast. Afterwards, transfer to the airstrip for your flight back to Nairobi, connecting to your onward journey.",
    lodging: "None",
    meals: "Breakfast"
  }
];

const MOCK_INCLUSIONS = [
  "Luxury accommodation in premium tents/lodges",
  "All domestic bush flights & transfers",
  "Professional English-speaking safari guide",
  "Exclusive use of a 4x4 Safari Land Cruiser",
  "All national park and conservation fees",
  "Full board meals & selected beverages"
];

const MOCK_EXCLUSIONS = [
  "International flights to/from East Africa",
  "Entry visas and travel insurance",
  "Premium brand spirits and champagne",
  "Gratuities for guides and camp staff",
  "Optional activities (e.g., Hot Air Balloon)"
];

export default function PackageDetailsClient({ pkg, title, description }: PackageDetailsClientProps) {
  const tNav = useTranslations('Navbar');
  
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedDays, setExpandedDays] = useState<number[]>([1]); // Day 1 open by default

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

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

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
    <>
      {/* Scroll Spy Nav */}
      <div className="sticky top-20 z-40 bg-white border-b border-sand-200 shadow-sm hidden md:block">
        <div className="container mx-auto px-4">
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

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-16">
            
            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">Overview</h2>
              <div className="prose prose-sand max-w-none text-sand-700 whitespace-pre-wrap leading-relaxed text-lg">
                {description}
              </div>
            </section>

            <hr className="border-sand-100" />

            {/* ITINERARY */}
            <section id="itinerary" className="scroll-mt-32">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">Daily Itinerary</h2>
              <div className="space-y-4">
                {MOCK_ITINERARY.map((day) => {
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
            </section>

            <hr className="border-sand-100" />

            {/* MAP */}
            <section id="map" className="scroll-mt-32">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">Route Map</h2>
              <div className="rounded-2xl overflow-hidden border border-sand-200 shadow-sm relative aspect-video bg-sand-200">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                  alt="Safari Route Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-savanna-950/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-3">
                     <MapPin className="w-6 h-6 text-sunset-500" />
                     <span className="font-bold text-savanna-900 text-lg">Interactive Route Map</span>
                   </div>
                </div>
              </div>
              <p className="text-sm text-sand-500 mt-3 text-center">Route shown is for illustration purposes. Exact paths depend on weather and wildlife movements.</p>
            </section>

            <hr className="border-sand-100" />

            {/* INCLUSIONS & EXCLUSIONS */}
            <section id="inclusions" className="scroll-mt-32 pb-12">
              <h2 className="text-3xl font-bold text-savanna-900 mb-6">What's Included</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Includes */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-10" />
                  <h3 className="text-xl font-bold text-savanna-900 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-500" /> Included
                  </h3>
                  <ul className="space-y-4">
                    {MOCK_INCLUSIONS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sand-700">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excludes */}
                <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10" />
                  <h3 className="text-xl font-bold text-savanna-900 mb-6 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-red-400" /> Excluded
                  </h3>
                  <ul className="space-y-4">
                    {MOCK_EXCLUSIONS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sand-700">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar / Booking Widget */}
          <div className="lg:w-1/3">
            <div className="sticky top-40 bg-white p-8 rounded-2xl shadow-xl border border-sand-200 z-30">
              <div className="mb-6 pb-6 border-b border-sand-100 text-center">
                <span className="text-xs text-sand-500 uppercase tracking-wider font-bold mb-1 block">Starting From</span>
                <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} className="text-4xl font-bold text-sunset-500 block mb-1" />
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

                <button type="submit" className="w-full btn-primary rounded-xl py-4 font-bold mt-2 shadow-lg hover:-translate-y-1 transition-all">
                  {tNav('InquireNow')}
                </button>
              </form>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-sand-600 bg-sand-50 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-sunset-500 shrink-0" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-sand-600 bg-sand-50 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-sunset-500 shrink-0" />
                  <span>Starts and ends in Nairobi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
