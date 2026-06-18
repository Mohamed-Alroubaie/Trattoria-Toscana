import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  output: 'export', // Tells Next.js to build a static site
  images: {
    unoptimized: true, // Needed because GitHub Pages does not support image optimization
  },
};

export default nextConfig;
