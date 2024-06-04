/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['protez.wpengine.com'],
    unoptimized: true,
    loader: 'custom',
    loaderFile: './ImageLoader.js',
  },

  reactStrictMode: false,
  // output: 'export',
  basePath: '/protez',
  // assetPrefix: '/protez/',
}

module.exports = nextConfig
