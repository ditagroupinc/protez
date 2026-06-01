const path = require('path')
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n.ts')

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
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    additionalData: `@use 'variables' as *; @use 'mixins' as *;`,
  },
  reactStrictMode: false,
}

module.exports = withNextIntl(nextConfig)
