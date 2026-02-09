/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,

  ...(isDev
    ? {}
    : {
        output: "export",
        basePath: "/movie-search",
        assetPrefix: "/movie-search/",
      }),

  images: {
    domains: ["image.tmdb.org"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],

    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
};

module.exports = nextConfig;
