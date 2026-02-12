/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
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

  env: {
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    NEXT_PUBLIC_MOVIEDB_API_BASE_URL: process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL,
  },
};

module.exports = nextConfig;
