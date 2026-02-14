/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',

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
    NEXT_PUBLIC_MOVIEDB_API_KEY:
      process.env.NEXT_PUBLIC_MOVIEDB_API_KEY,
    NEXT_PUBLIC_MOVIEDB_API_BASE_URL:
      process.env.NEXT_PUBLIC_MOVIEDB_API_BASE_URL,
  },
};

module.exports = nextConfig;
