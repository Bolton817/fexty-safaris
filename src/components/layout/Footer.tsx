import { Link } from '@/i18n/routing';
import { Share2, Camera, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  
  return (
    <footer className="bg-savanna-950 text-sand-200 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & About */}
          <div className="flex flex-col">
            <img src="/logo-light.png" alt="Fexty Safaris" className="h-16 w-auto object-contain object-left mb-6" />
            <p className="text-sand-300 mb-8 leading-relaxed">
              {t('desc')}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-savanna-800 flex items-center justify-center hover:bg-sunset-500 transition-colors text-white shadow-sm hover:shadow-sunset-500/50">
                <Share2 className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-savanna-800 flex items-center justify-center hover:bg-sunset-500 transition-colors text-white shadow-sm hover:shadow-sunset-500/50">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-savanna-800 flex items-center justify-center hover:bg-sunset-500 transition-colors text-white shadow-sm hover:shadow-sunset-500/50">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-4">
              <li><Link href="/destinations" className="hover:text-sunset-400 transition-colors">{tNav('Destinations')}</Link></li>
              <li><Link href="/deals" className="hover:text-sunset-400 transition-colors">{tNav('Deals')}</Link></li>
              <li><Link href="/services" className="hover:text-sunset-400 transition-colors">{tNav('Services')}</Link></li>
              <li><Link href="/gallery" className="hover:text-sunset-400 transition-colors">{tNav('Gallery')}</Link></li>
              <li><Link href="/about" className="hover:text-sunset-400 transition-colors">{tNav('About')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t('contactInfo')}</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-sunset-500 shrink-0" />
                <span>Ngara Road, Nairobi Kenya</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-sunset-500 shrink-0" />
                <span>+254 727 202093</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-sunset-500 shrink-0" />
                <span>deals@fextysafaris.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
            <p className="text-sand-400 mb-4">Subscribe for the latest deals and wild adventures.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-savanna-900 border border-savanna-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-sunset-500 transition-colors shadow-inner"
                required
              />
              <button type="submit" className="btn-primary rounded-md px-4 py-3 shadow-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-savanna-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sand-500 text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Fexty Safaris. {t('rights')}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
