/** @type {import('next').NextConfig} */

const environment = process.env.ENVIRONMENT

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
    unoptimized: environment === 'pages' ? true : false,
  },
  reactStrictMode: false,
  output: environment === 'pages' ? 'export' : undefined,
  basePath: environment === 'pages' ? '/protez' : undefined,
}

module.exports = nextConfig
