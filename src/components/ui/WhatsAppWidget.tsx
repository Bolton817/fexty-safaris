'use client'

import { useState } from 'react';
import { X, Send } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const CONTACTS = [
  {
    id: 1,
    name: 'General Enquiries',
    role: 'Customer Support',
    number: '254727202093',
    message: 'Hello! I have a general enquiry about Fexty Safaris.',
    status: 'Online'
  },
  {
    id: 2,
    name: 'Tour Bookings',
    role: 'Travel Specialist',
    number: '254727202093',
    message: 'Hi, I would like to book a safari package.',
    status: 'Online'
  },
  {
    id: 3,
    name: 'Corporate & Groups',
    role: 'Event Coordinator',
    number: '254727202093',
    message: 'Hello, I am interested in corporate or group travel arrangements.',
    status: 'Online'
  }
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popup Window */}
      <div 
        className={`absolute bottom-20 right-0 w-[340px] bg-white rounded-2xl shadow-2xl border border-sand-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 visible' : 'scale-75 opacity-0 invisible'
        }`}
      >
        <div className="bg-[#128C7E] p-6 text-white relative overflow-hidden">
          {/* Background pattern/decoration */}
          <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
            <WhatsAppIcon className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-xl mb-1">Chat with us!</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Hi! Click one of our representatives below to chat on WhatsApp. We typically reply within a few minutes.
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors bg-black/10 hover:bg-black/20 p-1.5 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-sand-50 space-y-3 max-h-[400px] overflow-y-auto">
          {CONTACTS.map(contact => (
            <a 
              key={contact.id}
              href={`https://wa.me/${contact.number}?text=${encodeURIComponent(contact.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-sand-100 hover:shadow-md hover:border-[#25D366] transition-all group"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-savanna-950 text-sm truncate">{contact.name}</h4>
                <p className="text-xs text-sand-500 truncate">{contact.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-sand-50 flex items-center justify-center group-hover:bg-green-50 transition-colors shrink-0">
                <Send className="w-4 h-4 text-sand-400 group-hover:text-[#25D366] transition-colors translate-x-0 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  );
}
