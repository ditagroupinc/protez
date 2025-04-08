/** @type {import('next').NextConfig} */

const environment = process.env.ENVIRONMENT

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['protez.wpengine.com'],
    unoptimized: environment === 'pages' ? true : false,
  },
  reactStrictMode: false,
  output: environment === 'pages' ? 'export' : undefined,
  basePath: environment === 'pages' ? '/protez' : undefined,
}

module.exports = nextConfig
