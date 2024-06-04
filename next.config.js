/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['protez.wpengine.com'],
    path: '/',
  },

  reactStrictMode: false,
  output: 'export',
  basePath: '/protez',
}

module.exports = nextConfig
