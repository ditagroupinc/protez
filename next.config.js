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
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
