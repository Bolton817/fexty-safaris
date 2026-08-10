'use client'

import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';

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
            <MessageCircle className="w-32 h-32" />
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
                  <MessageCircle className="w-6 h-6" />
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
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  );
}
