/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'protez.wpengine.com',
      },
      {
        protocol: 'https',
        hostname: 'widgets.guidestar.org',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
