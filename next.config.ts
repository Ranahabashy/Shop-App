import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.dummyjson.com' },
      { protocol: 'https', hostname: 'dummyjson.com' }
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ],
  
  redirects: async () => [
    {
      source: '/',
      destination: '/products',
      permanent: false
    }
  ]
};

export default nextConfig;
