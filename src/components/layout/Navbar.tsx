'use client'

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, Search, ChevronDown, X, MapPin, Compass, Briefcase } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useCurrencyStore } from '@/store/currencyStore';
import { useState, useEffect } from 'react';

const DESTINATION_KEYS = {
  kenya: {
    titleKey: 'DestinationsMenu.kenyaTitle',
    items: [
      { key: 'DestinationsMenu.maasaiMara', slug: 'maasai-mara' },
      { key: 'DestinationsMenu.amboseli', slug: 'amboseli' },
      { key: 'DestinationsMenu.naivasha', slug: 'naivasha' },
      { key: 'DestinationsMenu.nakuru', slug: 'nakuru' },
      { key: 'DestinationsMenu.nairobiStaycations', slug: 'nairobi-staycations' }
    ]
  },
  coast: {
    titleKey: 'DestinationsMenu.coastTitle',
    items: [
      { key: 'DestinationsMenu.dianiBeach', slug: 'diani-beach' },
      { key: 'DestinationsMenu.mombasa', slug: 'mombasa' },
      { key: 'DestinationsMenu.malindi', slug: 'malindi' },
      { key: 'DestinationsMenu.watamu', slug: 'watamu' },
      { key: 'DestinationsMenu.lamu', slug: 'lamu' }
    ]
  },
  borders: {
    titleKey: 'DestinationsMenu.bordersTitle',
    items: [
      { key: 'DestinationsMenu.dubai', slug: 'dubai' },
      { key: 'DestinationsMenu.maldives', slug: 'maldives' },
      { key: 'DestinationsMenu.bali', slug: 'bali' },
      { key: 'DestinationsMenu.malaysiaSingapore', slug: 'malaysia-singapore' },
      { key: 'DestinationsMenu.europe', slug: 'europe' },
      { key: 'DestinationsMenu.capeTown', slug: 'cape-town' }
    ]
  }
};

const THEME_KEYS = [
  { key: 'DealsMenu.bushSafari', slug: 'bush-safari' },
  { key: 'DealsMenu.beachEscapes', slug: 'beach-escapes' },
  { key: 'DealsMenu.romanceHoneymoons', slug: 'romance-honeymoons' },
  { key: 'DealsMenu.adventureAlpine', slug: 'adventure-alpine' },
  { key: 'DealsMenu.corporateMice', slug: 'corporate-mice' }
];

const SERVICE_KEYS = [
  { key: 'ServicesMenu.flightBookings', slug: 'flight-bookings' },
  { key: 'ServicesMenu.visaPassport', slug: 'visa-passport' }
];

const LOCALES = ['en', 'sw', 'fr', 'es', 'de', 'zh', 'ar'];

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { currency, setCurrency } = useCurrencyStore();
  
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const toggleAccordion = (name: string) => {
    setActiveMobileAccordion(prev => prev === name ? null : name);
  };

  return (
    <>
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 nav-header-container ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md border-b border-sand-200 shadow-sm text-sand-800' 
          : 'bg-gradient-to-r from-savanna-950 via-savanna-900 to-savanna-800 text-white shadow-xl border-b-2 border-sunset-500/20'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 xl:gap-8 h-full">
          <Link href="/" className="flex items-center h-full -ml-4 nav-logo">
            <img 
              src={isScrolled || isMobileMenuOpen ? "/logo-dark.png" : "/logo-light.png"} 
              alt="Fexty Safaris" 
              className="h-full w-auto object-cover transition-opacity duration-300" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 h-full nav-desktop-menu">
            
            <Link href="/" className={`px-2 xl:px-3 font-medium transition-colors ${isScrolled ? 'text-sand-800 hover:text-sunset-500' : 'text-sand-200 hover:text-white'}`}>
              {t('Home')}
            </Link>

            {/* Mega Menu: Destinations */}
            <div className="group h-full flex items-center px-2 xl:px-3 mega-menu-trigger">
              <button className={`flex items-center gap-1 font-medium transition-colors h-full outline-none ${isScrolled ? 'text-sand-800 hover:text-sunset-500' : 'text-sand-200 hover:text-white'}`}>
                {t('Destinations')} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-sand-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 mega-menu-panel">
                <div className="container mx-auto px-4 py-10">
                  <div className="grid grid-cols-3 gap-12">
                    <div>
                      <Link href="/destinations/kenya" className="flex items-center gap-2 mb-6 group/title">
                        <MapPin className="w-5 h-5 text-sunset-500" />
                        <h3 className="text-xl font-bold text-savanna-900 group-hover/title:text-sunset-500 transition-colors">{t(DESTINATION_KEYS.kenya.titleKey as any)}</h3>
                      </Link>
                      <ul className="space-y-3">
                        {DESTINATION_KEYS.kenya.items.map(item => (
                          <li key={item.slug} className="mega-menu-item">
                            <Link href={`/destinations/kenya#${item.slug}`} className="text-sand-700 hover:text-sunset-500 hover:translate-x-1 inline-block transition-transform">
                              {t(item.key as any)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Link href="/destinations/coast" className="flex items-center gap-2 mb-6 group/title">
                        <Compass className="w-5 h-5 text-sunset-500" />
                        <h3 className="text-xl font-bold text-savanna-900 group-hover/title:text-sunset-500 transition-colors">{t(DESTINATION_KEYS.coast.titleKey as any)}</h3>
                      </Link>
                      <ul className="space-y-3">
                        {DESTINATION_KEYS.coast.items.map(item => (
                          <li key={item.slug} className="mega-menu-item">
                            <Link href={`/destinations/coast#${item.slug}`} className="text-sand-700 hover:text-sunset-500 hover:translate-x-1 inline-block transition-transform">
                              {t(item.key as any)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Link href="/destinations/borders" className="flex items-center gap-2 mb-6 group/title">
                        <Briefcase className="w-5 h-5 text-sunset-500" />
                        <h3 className="text-xl font-bold text-savanna-900 group-hover/title:text-sunset-500 transition-colors">{t(DESTINATION_KEYS.borders.titleKey as any)}</h3>
                      </Link>
                      <ul className="space-y-3">
                        {DESTINATION_KEYS.borders.items.map(item => (
                          <li key={item.slug} className="mega-menu-item">
                            <Link href={`/destinations/borders#${item.slug}`} className="text-sand-700 hover:text-sunset-500 hover:translate-x-1 inline-block transition-transform">
                              {t(item.key as any)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mega Menu: Themes */}
            <div className="group h-full flex items-center px-2 xl:px-3 mega-menu-trigger">
              <Link href="/deals" className={`flex items-center gap-1 font-medium transition-colors h-full outline-none ${isScrolled ? 'text-sand-800 hover:text-sunset-500' : 'text-sand-200 hover:text-white'}`}>
                {t('Deals')} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-sand-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 mega-menu-panel">
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-5 gap-6">
                    {THEME_KEYS.map(theme => (
                      <Link href={`/deals#${theme.slug}`} key={theme.slug} className="bg-sand-50 rounded-xl p-6 hover:bg-sunset-50 transition-colors group/card cursor-pointer mega-menu-item block">
                        <h4 className="font-bold text-savanna-900 group-hover/card:text-sunset-600 transition-colors mb-2">{t(theme.key as any)}</h4>
                        <p className="text-sm text-sand-600">{t('DealsMenu.desc')}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mega Menu: Services */}
            <div className="group h-full flex items-center px-2 xl:px-3 mega-menu-trigger">
              <button className={`flex items-center gap-1 font-medium transition-colors h-full outline-none ${isScrolled ? 'text-sand-800 hover:text-sunset-500' : 'text-sand-200 hover:text-white'}`}>
                {t('Services')} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-sand-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 mega-menu-panel">
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-2 gap-8 max-w-4xl">
                    {SERVICE_KEYS.map(service => (
                      <Link href={`/services/${service.slug}`} key={service.slug} className="flex items-center gap-6 p-6 border border-sand-200 rounded-2xl hover:border-sunset-500 hover:shadow-md transition-all mega-menu-item">
                        <div className="w-16 h-16 bg-savanna-50 rounded-full flex items-center justify-center shrink-0">
                          <Briefcase className="w-8 h-8 text-sunset-500" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-savanna-900 mb-2">{t(service.key as any)}</h4>
                          <p className="text-sand-600">{t('ServicesMenu.desc')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/about" className={`px-2 xl:px-3 font-medium transition-colors ${isScrolled ? 'text-sand-800 hover:text-sunset-500' : 'text-sand-200 hover:text-white'}`}>
              {t('About')}
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 mr-2">
            {/* Currency Toggle */}
            {mounted && (
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as 'KSH' | 'USD')}
                className={`bg-transparent text-sm font-medium focus:outline-none cursor-pointer nav-currency-toggle ${isScrolled || isMobileMenuOpen ? 'text-sand-800' : 'text-white'}`}
              >
                <option value="KSH" className="text-black">KSH</option>
                <option value="USD" className="text-black">USD</option>
              </select>
            )}
            
            {/* Language Toggle (Hover Dropdown) */}
            <div className="relative group/lang flex items-center h-full cursor-pointer">
              <button className={`flex items-center gap-1 text-sm font-medium focus:outline-none uppercase ${isScrolled || isMobileMenuOpen ? 'text-sand-800' : 'text-white'}`}>
                {locale} <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-[150%] right-0 mt-1 w-32 bg-white shadow-xl border border-sand-100 rounded-lg opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 transform -translate-y-2 group-hover/lang:translate-y-0 overflow-hidden py-1 z-50">
                {LOCALES.map(l => (
                  <button 
                    key={l}
                    onClick={() => router.replace(pathname, { locale: l })}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${locale === l ? 'bg-sunset-50 text-sunset-600 font-bold' : 'text-sand-700 hover:bg-sand-50 hover:text-savanna-900'}`}
                  >
                    {t(`Languages.${l}` as any)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className={`p-2 transition-colors hidden lg:block nav-search-btn ${isScrolled ? 'text-sand-700 hover:text-sunset-500' : 'text-sand-200 hover:text-white'}`} aria-label={t('Search')}>
            <Search className="w-5 h-5" />
          </button>
          
          <div className="hidden lg:flex items-center gap-3 nav-cta-btn">
            <Link href="/contact" className="btn-primary rounded-full px-6 py-2.5">
              {t('InquireNow')}
            </Link>
          </div>
          
          <button 
            className={`lg:hidden p-2 transition-colors nav-mobile-btn ${isScrolled || isMobileMenuOpen ? 'text-sand-800' : 'text-white'}`} 
            aria-label="Mobile Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-white z-[60] overflow-y-auto transition-transform duration-300 lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sand-100 shadow-sm h-20">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="h-full flex items-center">
            <img src="/logo-dark.png" alt="Fexty Safaris" className="h-10 w-auto object-cover" />
          </Link>
          <button 
            className="p-2 text-sand-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-1 mobile-menu-container flex-grow text-left">
          
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base font-medium text-savanna-900 border-b border-sand-100 text-left">
            {t('Home')}
          </Link>

          {/* Mobile Accordion: Destinations */}
          <div className="border-b border-sand-100 py-1">
            <button 
              onClick={() => toggleAccordion('destinations')}
              className="flex items-center justify-between w-full py-3 text-base font-medium text-savanna-900 text-left text-left"
            >
              {t('Destinations')}
              <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileAccordion === 'destinations' ? 'rotate-180 text-sunset-500' : 'text-sand-400'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileAccordion === 'destinations' ? 'max-h-[1000px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
              <div className="pl-3 space-y-5 pt-1 text-left">
                <div>
                  <Link href="/destinations/kenya" onClick={() => setIsMobileMenuOpen(false)} className="block text-left">
                    <h4 className="text-sunset-600 font-medium mb-1.5 text-sm">{t(DESTINATION_KEYS.kenya.titleKey as any)}</h4>
                  </Link>
                  <ul className="space-y-1 border-l border-sand-200 pl-4 text-left">
                    {DESTINATION_KEYS.kenya.items.map(item => (
                      <li key={item.slug}><Link onClick={() => setIsMobileMenuOpen(false)} href={`/destinations/kenya#${item.slug}`} className="block py-1 text-sand-700 text-sm hover:text-sunset-500">{t(item.key as any)}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Link href="/destinations/coast" onClick={() => setIsMobileMenuOpen(false)} className="block text-left">
                    <h4 className="text-sunset-600 font-medium mb-1.5 text-sm">{t(DESTINATION_KEYS.coast.titleKey as any)}</h4>
                  </Link>
                  <ul className="space-y-1 border-l border-sand-200 pl-4 text-left">
                    {DESTINATION_KEYS.coast.items.map(item => (
                      <li key={item.slug}><Link onClick={() => setIsMobileMenuOpen(false)} href={`/destinations/coast#${item.slug}`} className="block py-1 text-sand-700 text-sm hover:text-sunset-500">{t(item.key as any)}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Link href="/destinations/borders" onClick={() => setIsMobileMenuOpen(false)} className="block text-left">
                    <h4 className="text-sunset-600 font-medium mb-1.5 text-sm">{t(DESTINATION_KEYS.borders.titleKey as any)}</h4>
                  </Link>
                  <ul className="space-y-1 border-l border-sand-200 pl-4 text-left">
                    {DESTINATION_KEYS.borders.items.map(item => (
                      <li key={item.slug}><Link onClick={() => setIsMobileMenuOpen(false)} href={`/destinations/borders#${item.slug}`} className="block py-1 text-sand-700 text-sm hover:text-sunset-500">{t(item.key as any)}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Accordion: Deals */}
          <div className="border-b border-sand-100 py-1">
            <button 
              onClick={() => toggleAccordion('themes')}
              className="flex items-center justify-between w-full py-3 text-base font-medium text-savanna-900 text-left text-left"
            >
              <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)} className="text-left flex-1">{t('Deals')}</Link>
              <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileAccordion === 'themes' ? 'rotate-180 text-sunset-500' : 'text-sand-400'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileAccordion === 'themes' ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
              <ul className="space-y-1 pl-3 pt-1 border-l border-sand-200 ml-3 text-left">
                {THEME_KEYS.map(theme => (
                  <li key={theme.slug}><Link onClick={() => setIsMobileMenuOpen(false)} href={`/deals#${theme.slug}`} className="block py-1 text-sand-700 text-sm hover:text-sunset-500">{t(theme.key as any)}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Accordion: Services */}
          <div className="border-b border-sand-100 py-1">
            <button 
              onClick={() => toggleAccordion('services')}
              className="flex items-center justify-between w-full py-3 text-base font-medium text-savanna-900 text-left text-left"
            >
              {t('Services')}
              <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileAccordion === 'services' ? 'rotate-180 text-sunset-500' : 'text-sand-400'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeMobileAccordion === 'services' ? 'max-h-48 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
              <ul className="space-y-1 pl-3 pt-1 border-l border-sand-200 ml-3 text-left">
                {SERVICE_KEYS.map(service => (
                  <li key={service.slug}><Link onClick={() => setIsMobileMenuOpen(false)} href={`/services/${service.slug}`} className="block py-1 text-sand-700 text-sm hover:text-sunset-500">{t(service.key as any)}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base font-medium text-savanna-900 border-b border-sand-100 text-left">
            {t('About')}
          </Link>
          
        </div>

        <div className="p-6 mt-auto">
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary rounded-xl py-3 block text-center w-full shadow-md text-base">
            {t('InquireNow')}
          </Link>
        </div>
      </div>
    </>
  );
}
