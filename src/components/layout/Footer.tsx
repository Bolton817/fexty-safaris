import Link from 'next/link';
import { Share2, Camera, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-savanna-950 text-sand-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Fexty Safaris</h3>
            <p className="text-sand-400 mb-6 leading-relaxed">
              Experience the untamed beauty of nature with premium, curated safaris and tours tailored to your wildest dreams.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-savanna-800 flex items-center justify-center hover:bg-sunset-500 transition-colors text-white">
                <Share2 className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-savanna-800 flex items-center justify-center hover:bg-sunset-500 transition-colors text-white">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-savanna-800 flex items-center justify-center hover:bg-sunset-500 transition-colors text-white">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/destinations" className="hover:text-sunset-400 transition-colors">Destinations</Link></li>
              <li><Link href="/deals" className="hover:text-sunset-400 transition-colors">Local Deals</Link></li>
              <li><Link href="/themed-holidays" className="hover:text-sunset-400 transition-colors">Themed Holidays</Link></li>
              <li><Link href="/about" className="hover:text-sunset-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-sunset-500 shrink-0" />
                <span>123 Safari Way, Nairobi, Kenya</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-sunset-500 shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-sunset-500 shrink-0" />
                <span>hello@fextysafaris.com</span>
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
                className="bg-savanna-900 border border-savanna-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-sunset-500 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-sunset-500 hover:bg-sunset-600 text-white rounded-md px-4 py-3 font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-savanna-800 mt-16 pt-8 text-center text-sand-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Fexty Safaris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
