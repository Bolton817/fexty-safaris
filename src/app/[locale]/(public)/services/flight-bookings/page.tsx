'use client';

import { Calendar, MapPin, Plane, Users } from 'lucide-react';

export default function FlightBookings() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! Our concierge team will email you shortly.");
  };

  return (
    <div className="min-h-screen bg-sand-50 pb-20">
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-savanna-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Concierge Flight Bookings</h1>
          <p className="text-sand-200 text-lg">Seamless connections from international arrivals to remote bush airstrips.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-sand-100 p-6 md:p-10 mb-16">
          <h2 className="text-2xl font-bold text-savanna-950 mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6 text-sunset-500" /> Flight Inquiry
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-bold text-sand-500 uppercase tracking-wider">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input type="text" placeholder="Departure City" required className="w-full pl-9 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:border-sunset-500 focus:ring-1 focus:ring-sunset-500 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-bold text-sand-500 uppercase tracking-wider">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input type="text" placeholder="Destination (e.g. Masai Mara)" required className="w-full pl-9 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:border-sunset-500 focus:ring-1 focus:ring-sunset-500 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-bold text-sand-500 uppercase tracking-wider">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input type="date" required className="w-full pl-9 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:border-sunset-500 focus:ring-1 focus:ring-sunset-500 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-bold text-sand-500 uppercase tracking-wider">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input type="number" min="1" placeholder="1" required className="w-full pl-9 pr-4 py-3 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:border-sunset-500 focus:ring-1 focus:ring-sunset-500 transition-all" />
              </div>
            </div>
            <div className="lg:col-span-4 mt-2">
              <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-lg transition-colors shadow-lg">
                Request Flight Details
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 text-center">
            <h3 className="text-xl font-bold text-savanna-950 mb-3">Domestic Bush Flights</h3>
            <p className="text-sand-600 text-sm leading-relaxed">Partnered with Safarilink and AirKenya to drop you directly in the heart of the national parks, avoiding long road transfers.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 text-center">
            <h3 className="text-xl font-bold text-savanna-950 mb-3">Private Charters</h3>
            <p className="text-sand-600 text-sm leading-relaxed">For ultimate privacy and flexibility, charter a light aircraft or helicopter tailored to your exact itinerary and schedule.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 text-center">
            <h3 className="text-xl font-bold text-savanna-950 mb-3">International Connections</h3>
            <p className="text-sand-600 text-sm leading-relaxed">We coordinate your international arrivals into Jomo Kenyatta (NBO) or Kilimanjaro (JRO) with your onward safari schedule.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
