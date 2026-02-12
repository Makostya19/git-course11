import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',

  ...(isDev
    ? {}
    : {
        basePath: '/git-course11',
        assetPrefix: '/git-course11/',
      }),

  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
