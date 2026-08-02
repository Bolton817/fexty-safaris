'use client'

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, Search } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useCurrencyStore } from '@/store/currencyStore';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { currency, setCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-sand-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-savanna-800">
            Fexty Safaris
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/destinations" className="text-sand-800 hover:text-sunset-500 font-medium transition-colors">
              {t('Destinations')}
            </Link>
            <Link href="/deals" className="text-sand-800 hover:text-sunset-500 font-medium transition-colors">
              {t('Deals')}
            </Link>
            <Link href="/about" className="text-sand-800 hover:text-sunset-500 font-medium transition-colors">
              {t('About')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 mr-2">
            {/* Currency Toggle */}
            {mounted && (
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as 'KSH' | 'USD')}
                className="bg-transparent text-sm font-medium text-sand-800 focus:outline-none cursor-pointer"
              >
                <option value="KSH">KSH</option>
                <option value="USD">USD</option>
              </select>
            )}
            
            {/* Language Toggle */}
            <select 
              value={locale}
              onChange={(e) => router.replace(pathname, { locale: e.target.value })}
              className="bg-transparent text-sm font-medium text-sand-800 focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="sw">SW</option>
            </select>
          </div>

          <button className="p-2 text-sand-700 hover:text-sunset-500 transition-colors hidden md:block" aria-label={t('Search')}>
            <Search className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md transform hover:-translate-y-0.5">
              {t('InquireNow')}
            </Link>
          </div>
          
          <button className="md:hidden p-2 text-sand-800" aria-label="Mobile Menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
