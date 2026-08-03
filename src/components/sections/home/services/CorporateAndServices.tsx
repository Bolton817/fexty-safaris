import { Link } from '@/i18n/routing';
import { Briefcase, GraduationCap, Plane, FileText, ArrowRight } from 'lucide-react';

export default function CorporateAndServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">Beyond Leisure</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight mb-4">
            Logistical Excellence
          </h3>
          <p className="text-base text-sand-500 leading-relaxed font-light">
            Fexty Safaris specializes in tailoring complex travel operations for large groups, ensuring flawless execution.
          </p>
        </div>

        {/* Corporate & Educational Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Corporate MICE */}
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-sand-200 hover:border-sunset-500 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row h-full">
            <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Corporate MICE" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col justify-center flex-grow">
              <div className="w-10 h-10 bg-savanna-50 rounded-full flex items-center justify-center text-savanna-900 mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-savanna-950 mb-2">Corporate MICE</h4>
              <p className="text-sand-500 text-xs leading-relaxed mb-4 flex-grow">
                Reward top performers or host executive retreats. We handle ground logistics, luxury accommodations, and team-building perfectly.
              </p>
              <Link href="/contact" className="inline-flex items-center text-savanna-900 font-bold hover:text-sunset-500 transition-colors uppercase tracking-widest text-[10px]">
                Request Proposal <ArrowRight className="ml-2 w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Educational Trips */}
          <div className="group relative rounded-2xl overflow-hidden bg-white border border-sand-200 hover:border-sunset-500 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row h-full">
            <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Educational Trips" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col justify-center flex-grow">
              <div className="w-10 h-10 bg-sunset-50 rounded-full flex items-center justify-center text-sunset-500 mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-savanna-950 mb-2">Educational Trips</h4>
              <p className="text-sand-500 text-xs leading-relaxed mb-4 flex-grow">
                Transform the savanna into a classroom. We design safe, culturally immersive safaris tailored to curriculum objectives.
              </p>
              <Link href="/contact" className="inline-flex items-center text-sunset-500 font-bold hover:text-sunset-600 transition-colors uppercase tracking-widest text-[10px]">
                Contact Our Team <ArrowRight className="ml-2 w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Minimal Ancillary Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <Link href="/services/flights" className="group bg-white border border-sand-200 hover:border-sunset-500 rounded-2xl p-6 flex items-center transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 rounded-full bg-sand-50 flex items-center justify-center text-savanna-900 mr-4 group-hover:bg-sunset-500 group-hover:text-white transition-colors">
              <Plane className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-savanna-950 mb-0.5 group-hover:text-sunset-500 transition-colors">Flight Bookings</h4>
              <p className="text-xs text-sand-500 line-clamp-1">Global connections and domestic routing.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-sand-300 group-hover:text-sunset-500 transform group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/services/visas" className="group bg-white border border-sand-200 hover:border-sunset-500 rounded-2xl p-6 flex items-center transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 rounded-full bg-sand-50 flex items-center justify-center text-savanna-900 mr-4 group-hover:bg-sunset-500 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-savanna-950 mb-0.5 group-hover:text-sunset-500 transition-colors">Visa Concierge</h4>
              <p className="text-xs text-sand-500 line-clamp-1">Hassle-free eTA and East African visas.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-sand-300 group-hover:text-sunset-500 transform group-hover:translate-x-1 transition-all" />
          </Link>

        </div>

      </div>
    </section>
  );
}
