import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TestimonialsWall() {
  const t = useTranslations('Testimonials');
  const tHome = useTranslations('HomepageSections');
  
  const testimonials = [
    {
      id: 1,
      name: t('test1_author'),
      location: t('test1_role'),
      quote: t('test1_text'),
      rating: 5,
    },
    {
      id: 2,
      name: t('test2_author'),
      location: t('test2_role'),
      quote: t('test2_text'),
      rating: 5,
    },
    {
      id: 3,
      name: t('test3_author'),
      location: t('test3_role'),
      quote: t('test3_text'),
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header & Trust Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-bold text-sunset-500 tracking-[0.2em] uppercase mb-2">{tHome('testimonialsSub')}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-savanna-950 leading-tight tracking-tight">
              {tHome('testimonialsTitle')}
            </h3>
          </div>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-sand-200 rounded-full shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-savanna-600" />
            <span className="text-xs font-bold text-savanna-950 uppercase tracking-widest">Verified Partner</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white border border-sand-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-sand-100 group-hover:text-sunset-100 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sunset-500 text-sunset-500" />
                ))}
              </div>
              
              <p className="text-sand-600 leading-relaxed text-sm mb-6 relative z-10 font-medium">
                "{testimonial.quote}"
              </p>
              
              <div className="flex flex-col">
                <span className="font-bold text-savanna-950 text-sm">{testimonial.name}</span>
                <span className="text-[10px] text-sand-400 font-medium tracking-wide uppercase mt-0.5">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
