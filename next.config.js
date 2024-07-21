/** @type {import('next').NextConfig} */

const environment = process.env.ENVIRONMENT

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['protez.wpengine.com'],
    unoptimized: true,
  },

  reactStrictMode: false,
  output: 'export',
  basePath: '/protez',
  // basePath: environment === 'local' ? '' : '/protez',
}

module.exports = nextConfig
