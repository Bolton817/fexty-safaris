import Hero from '@/components/sections/home/hero/Hero';
import DestinationsMasonry from '@/components/sections/home/destinations/DestinationsMasonry';
import ProductCarousel from '@/components/sections/home/deals/ProductCarousel';
import CuratedStyles from '@/components/sections/home/styles/CuratedStyles';
import CorporateAndServices from '@/components/sections/home/services/CorporateAndServices';
import TestimonialsWall from '@/components/sections/home/testimonials/TestimonialsWall';
import PreFooterCTA from '@/components/sections/home/cta/PreFooterCTA';

export const revalidate = 3600; // ISR cache every hour

export default async function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <DestinationsMasonry />
      <ProductCarousel />
      <CuratedStyles />
      <CorporateAndServices />
      <TestimonialsWall />
      <PreFooterCTA />
    </div>
  );
}
