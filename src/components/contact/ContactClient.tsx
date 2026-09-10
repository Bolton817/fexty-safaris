'use client';

import { useState, Suspense, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';

function ContactForm({ t }: { t: any }) {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const subject = searchParams.get('subject');
    const date = searchParams.get('date');
    const guests = searchParams.get('guests');

    if (subject) {
      let initialMsg = `I would like to inquire about:\n${subject}\n`;
      if (date) initialMsg += `Proposed Date: ${date}\n`;
      if (guests) initialMsg += `Number of Guests: ${guests}\n`;
      setMessage(initialMsg);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setMessage('');
    } else {
      alert(result.error);
    }
    
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h4 className="text-xl font-bold mb-2">{t('successMessage')}</h4>
        <button onClick={() => setSuccess(false)} className="mt-6 text-sunset-500 font-medium hover:underline">
          {t('sendUsMessage')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-savanna-800 mb-2">{t('nameLabel')}</label>
        <input type="text" id="name" name="name" required className="w-full px-5 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500 transition-shadow" placeholder="John Doe" />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-savanna-800 mb-2">{t('emailLabel')}</label>
        <input type="email" id="email" name="email" required className="w-full px-5 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500 transition-shadow" placeholder="john@example.com" />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-savanna-800 mb-2">{t('messageLabel')}</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5} 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-5 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500 transition-shadow resize-none" 
          placeholder="..."
        ></textarea>
      </div>
      
      <button type="submit" disabled={isSubmitting} className="w-full btn-primary rounded-xl py-4 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:-translate-y-0 disabled:hover:shadow-none disabled:pointer-events-none">
        {isSubmitting ? t('sending') : t('sendMessage')}
      </button>
    </form>
  );
}

export default function ContactClient() {
  const t = useTranslations('Contact');
  const tFooter = useTranslations('Footer');

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Hero Section */}
      <PageHero 
        title={t('title')}
        subtitle={t('subtitle')}
        image="/images/contact-us-hero.jpg"
      />

      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-sand-200 overflow-hidden flex flex-col md:flex-row">
            
            {/* Contact Details Side */}
            <div className="md:w-5/12 bg-savanna-950 text-white p-10 md:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t('infoTitle')}</h2>
                <p className="text-sand-300 leading-relaxed mb-12">
                  {t('infoDesc')}
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-savanna-800 rounded-full text-sunset-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t('location')}</h4>
                      <p className="text-sand-300">Ngara Road, Nairobi Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-savanna-800 rounded-full text-sunset-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t('phone')}</h4>
                      <p className="text-sand-300">+254 727 202093</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-savanna-800 rounded-full text-sunset-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t('email')}</h4>
                      <p className="text-sand-300">deals@fextysafaris.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-sm text-sand-400">
                © {new Date().getFullYear()} Fexty Safaris. {tFooter('rights')}
              </div>
            </div>

            {/* Form Side */}
            <div className="md:w-7/12 p-10 md:p-16 bg-white">
              <h3 className="text-2xl font-bold text-savanna-900 mb-8">{t('sendUsMessage')}</h3>
              <Suspense fallback={<div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-slate-200 rounded"></div><div className="space-y-3"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-slate-200 rounded col-span-2"></div><div className="h-2 bg-slate-200 rounded col-span-1"></div></div><div className="h-2 bg-slate-200 rounded"></div></div></div></div>}>
                <ContactForm t={t} />
              </Suspense>
            </div>
            
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-sand-100 mt-12">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818451194215!2d36.8160!3d-1.2828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6a04dbcd3!2sDelta%20House%2C%20University%20Way%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Fexty Safaris Location"
          className="grayscale hover:grayscale-0 transition-all duration-700"
        />
      </section>
    </div>
  );
}
