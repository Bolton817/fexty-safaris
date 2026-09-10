import { MetadataRoute } from 'next';
import { fetchPackages } from '@/lib/actions';
import { routing } from '@/i18n/routing';

export const revalidate = 3600; // Revalidate every hour

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  }
  return 'https://fextysafaris.com';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const { data: packages } = await fetchPackages();

  const staticPages = [
    {
      path: '',
      changeFrequency: 'daily' as const,
      priority: 1.0,
      image: `${baseUrl}/logo-dark.png`,
    },
    {
      path: '/destinations/kenya',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      image: `${baseUrl}/images/magical-kenya-hero.jpg`,
    },
    {
      path: '/destinations/coast',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      image: `${baseUrl}/images/tembo-coast-hero.jpg`,
    },
    {
      path: '/destinations/borders',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      image: `${baseUrl}/images/beyond-borders-hero.jpg`,
    },
    {
      path: '/deals',
      changeFrequency: 'daily' as const,
      priority: 0.9,
      image: `${baseUrl}/images/deals-hero.jpg`,
    },
    {
      path: '/services',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      image: `${baseUrl}/images/services-hero.jpg`,
    },
    {
      path: '/gallery',
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      image: `${baseUrl}/images/gallery%20images/diani-ocean-golden-hour.jpeg`,
    },
    {
      path: '/about',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      image: `${baseUrl}/images/about-us-hero.jpg`,
    },
    {
      path: '/contact',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      image: `${baseUrl}/images/contact-us-hero.jpg`,
    },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Generate localized entries for static pages
  for (const page of staticPages) {
    for (const locale of routing.locales) {
      const languageAlternates: Record<string, string> = {};
      for (const l of routing.locales) {
        languageAlternates[l] = `${baseUrl}/${l}${page.path}`;
      }

      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: languageAlternates,
        },
        images: page.image ? [page.image] : undefined,
      });
    }
  }

  // Generate localized entries for dynamic database packages
  if (packages && packages.length > 0) {
    for (const pkg of packages) {
      for (const locale of routing.locales) {
        const languageAlternates: Record<string, string> = {};
        for (const l of routing.locales) {
          languageAlternates[l] = `${baseUrl}/${l}/packages/${pkg.id}`;
        }

        const packageImage = pkg.image_url || `${baseUrl}/images/hero-safari.jpg`;
        const escapedImage = packageImage.replace(/&/g, '&amp;');

        entries.push({
          url: `${baseUrl}/${locale}/packages/${pkg.id}`,
          lastModified: pkg.created_at ? new Date(pkg.created_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: {
            languages: languageAlternates,
          },
          images: [escapedImage],
        });
      }
    }
  }

  return entries;
}
