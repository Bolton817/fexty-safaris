import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center bg-savanna-900 overflow-hidden">
        {/* Placeholder Background (Will be replaced with image/video) */}
        <div className="absolute inset-0 bg-gradient-to-br from-savanna-800 to-savanna-950 opacity-90" />
        
        {/* Abstract shapes to make it look premium even without images yet */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sunset-500/10 blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-savanna-500/20 blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-sunset-500/20 text-sunset-300 font-medium text-sm tracking-wider mb-6 border border-sunset-500/30">
            DISCOVER THE WILD
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Premium Safaris <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-300 to-sunset-500">
              Beyond Imagination
            </span>
          </h1>
          <p className="text-lg md:text-xl text-sand-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Embark on curated adventures across breathtaking landscapes. Witness nature's greatest spectacles with uncompromised luxury and expert guides.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/destinations" 
              className="w-full sm:w-auto px-8 py-4 bg-sunset-500 hover:bg-sunset-600 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-sunset-500/25"
            >
              Explore Destinations
            </Link>
            <Link 
              href="/deals" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm transition-all border border-white/10"
            >
              View Local Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Placeholder */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-savanna-900 mb-4">Curated Experiences</h2>
            <p className="text-sand-700 max-w-2xl mx-auto">From thrilling migrations to serene beach escapes, find the perfect journey tailored to your desires.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="aspect-[4/5] rounded-2xl bg-sand-200 border border-sand-300 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-savanna-900/80 to-transparent z-10" />
                <div className="relative z-20 text-center mt-auto pb-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">Category {item}</h3>
                  <p className="text-sand-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Tours &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
