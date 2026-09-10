import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemaps.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
