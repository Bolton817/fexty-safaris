'use client'

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-8 md:left-10 z-50 w-12 h-12 bg-savanna-900 hover:bg-sunset-500 text-white flex items-center justify-center shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100 visible' : 'translate-y-4 opacity-0 invisible'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
