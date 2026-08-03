'use client';

import { FileText, Globe, HeartPulse, CheckCircle2 } from 'lucide-react';

export default function VisaPassport() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-savanna-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544644181-1484b3f8c853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Visa & Passport Requirements</h1>
          <p className="text-sand-200 text-lg">Essential travel information for your East African Safari.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-16 space-y-12">
        
        {/* Passports */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-full bg-savanna-100 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-savanna-900" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-savanna-950 mb-3">Passport Validity</h2>
            <p className="text-sand-700 leading-relaxed mb-4">
              Your passport must be valid for at least <strong>6 months</strong> from your date of entry into any East African country. 
              Additionally, you must have at least <strong>two consecutive blank pages</strong> for stamps upon arrival.
            </p>
          </div>
        </div>

        <hr className="border-sand-100" />

        {/* Visas */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-full bg-sunset-50 flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 text-sunset-500" />
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-bold text-savanna-950 mb-6">Visa Information</h2>
            
            <div className="space-y-6">
              <div className="bg-sand-50 p-6 rounded-xl border border-sand-200">
                <h3 className="text-xl font-bold text-savanna-900 mb-2">Kenya (eTA)</h3>
                <p className="text-sand-700 leading-relaxed mb-3">
                  Kenya operates an Electronic Travel Authorisation (eTA) system. All foreign visitors (including infants) must apply for an eTA prior to travel.
                </p>
                <ul className="space-y-2 text-sm text-sand-600">
                  <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-600" /> Apply at least 72 hours before travel.</li>
                  <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-600" /> Required documents: Passport copy, photo, accommodation details.</li>
                </ul>
              </div>

              <div className="bg-sand-50 p-6 rounded-xl border border-sand-200">
                <h3 className="text-xl font-bold text-savanna-900 mb-2">Tanzania</h3>
                <p className="text-sand-700 leading-relaxed mb-3">
                  Most nationalities require a visa to enter Tanzania. You can apply for an e-Visa online or obtain one upon arrival (expect queues).
                </p>
                <ul className="space-y-2 text-sm text-sand-600">
                  <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-600" /> Standard tourist visa costs $50 ($100 for US citizens).</li>
                  <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-600" /> e-Visa processing takes up to 10 days.</li>
                </ul>
              </div>

              <div className="bg-sand-50 p-6 rounded-xl border border-sand-200">
                <h3 className="text-xl font-bold text-savanna-900 mb-2">Rwanda</h3>
                <p className="text-sand-700 leading-relaxed">
                  Rwanda offers visas on arrival for all citizens of the world. Alternatively, you can apply online in advance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-sunset-200 shadow-md">
                <h3 className="text-xl font-bold text-sunset-600 mb-2">East Africa Tourist Visa</h3>
                <p className="text-sand-700 leading-relaxed">
                  If your itinerary includes Kenya, Rwanda, and Uganda, we highly recommend the single East Africa Tourist Visa. It allows multiple entries across all three countries for 90 days. Note: Tanzania is not part of this agreement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-sand-100" />

        {/* Health */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
            <HeartPulse className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-savanna-950 mb-3">Health & Vaccinations</h2>
            <p className="text-sand-700 leading-relaxed mb-4">
              <strong>Yellow Fever:</strong> A certificate is mandatory if you are traveling from or transiting through a Yellow Fever endemic country. It is also required when crossing between Kenya and Tanzania.
            </p>
            <p className="text-sand-700 leading-relaxed">
              <strong>Malaria:</strong> East Africa is a malaria zone. We strongly advise taking anti-malarial prophylaxis and consulting with your travel clinic prior to departure.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
