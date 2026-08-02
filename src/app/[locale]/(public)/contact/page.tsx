'use client'

import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      alert(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-sand-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Contact Details Side */}
          <div className="md:w-5/12 bg-savanna-950 text-white p-10 md:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-sand-300 leading-relaxed mb-12">
                Whether you're ready to book or just looking for inspiration, our safari experts are here to help you plan the journey of a lifetime.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-savanna-800 rounded-full text-sunset-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Office</h4>
                    <p className="text-sand-300">Nairobi, Kenya<br/>Westlands, 00100</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-savanna-800 rounded-full text-sunset-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-sand-300">+254 700 000 000<br/>Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-savanna-800 rounded-full text-sunset-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-sand-300">info@fextysafaris.co.ke</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-sm text-sand-400">
              © 2026 Fexty Safaris. All rights reserved.
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-7/12 p-10 md:p-16 bg-white">
            <h3 className="text-2xl font-bold text-savanna-900 mb-8">Send us a Message</h3>
            
            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 text-sunset-500 font-medium hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-savanna-800 mb-2">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-5 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500 transition-shadow" placeholder="John Doe" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-savanna-800 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" required className="w-full px-5 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500 transition-shadow" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-savanna-800 mb-2">Your Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full px-5 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500 transition-shadow resize-none" placeholder="Tell us about your dream safari..."></textarea>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full bg-sunset-500 hover:bg-sunset-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-md disabled:opacity-70 disabled:hover:scale-100">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
