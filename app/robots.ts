// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/thank-you', '/ua/thank-you'],
      },
    ],
    sitemap: 'https://www.protezfoundation.org/sitemap.xml',
  }
}
