/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  images: {
    domains: ["protez.wpengine.com"],
  },

  reactStrictMode: false,
};

module.exports = nextConfig;
