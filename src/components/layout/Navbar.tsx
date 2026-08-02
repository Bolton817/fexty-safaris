import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-sand-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-savanna-800">
            Fexty Safaris
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/destinations" className="text-sand-800 hover:text-sunset-500 font-medium transition-colors">
              Destinations
            </Link>
            <Link href="/deals" className="text-sand-800 hover:text-sunset-500 font-medium transition-colors">
              Deals
            </Link>
            <Link href="/about" className="text-sand-800 hover:text-sunset-500 font-medium transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-sand-700 hover:text-sunset-500 transition-colors hidden md:block" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sand-700 hover:text-savanna-600 font-medium transition-colors px-4 py-2">
              Login
            </Link>
            <Link href="/signup" className="bg-sunset-500 hover:bg-sunset-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
              Sign Up
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
