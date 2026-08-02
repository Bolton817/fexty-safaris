import { Compass, Shield, Star, Users } from 'lucide-react';
import { Link } from '@/i18n/routing';

export const metadata = {
  title: 'About Us | Fexty Safaris',
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-savanna-950">
        <div className="absolute inset-0 bg-gradient-to-br from-savanna-800 to-savanna-950 opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-xl text-sand-200 max-w-2xl mx-auto">
            Crafting unforgettable adventures since 2010.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-savanna-900 mb-8">Born from a Love of the Wild</h2>
            <p className="text-lg text-sand-700 leading-relaxed mb-6">
              Fexty Safaris was founded on a simple principle: to share the untamed beauty of East Africa with the world, without compromising on luxury or ecological responsibility. 
            </p>
            <p className="text-lg text-sand-700 leading-relaxed">
              Our team consists of born-and-raised local guides who know every hidden trail and watering hole. We don't just take you on a tour; we immerse you in the rhythm of the savanna.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-savanna-900">Why Choose Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Compass, title: 'Expert Local Guides', desc: 'Navigate the wild with guides who have lifelong experience.' },
              { icon: Star, title: 'Premium Luxury', desc: 'Rest in the finest lodges and camps under the African sky.' },
              { icon: Shield, title: 'Safe & Secure', desc: 'Your safety is our top priority, with 24/7 support.' },
              { icon: Users, title: 'Tailored for You', desc: 'Every itinerary is customized to match your wildest dreams.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 text-center hover:border-sunset-500 transition-colors">
                <div className="w-16 h-16 mx-auto bg-sunset-50 text-sunset-500 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-savanna-900 mb-3">{feature.title}</h3>
                <p className="text-sand-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-savanna-900 mb-6">Ready for your adventure?</h2>
          <Link href="/contact" className="inline-block px-8 py-4 bg-sunset-500 hover:bg-sunset-600 text-white rounded-full font-semibold transition-all shadow-lg">
            Get in Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
}
