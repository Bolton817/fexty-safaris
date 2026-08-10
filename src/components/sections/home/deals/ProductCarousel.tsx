import { createClient } from '@/lib/supabase/server';
import ProductCarouselClient from './ProductCarouselClient';

export default async function ProductCarousel() {
  const supabase = await createClient();
  // Fetch latest packages, you can refine this later to filter by 'deals' or 'special-offers'
  const { data: latestPackages } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const packages = latestPackages || [];

  return <ProductCarouselClient packages={packages} />;
}
