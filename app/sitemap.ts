// app/sitemap.ts
import type { MetadataRoute } from 'next'

const BASE = 'https://www.protezfoundation.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/academy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/donate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/partners`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/academy/terms-conditions`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE}/academy/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    // pacient stories — додайте всі публічні URL, наприклад:
    { url: `${BASE}/VadymFedorov`, lastModified: now, priority: 0.5 },
    { url: `${BASE}/ArtemSvergun`, lastModified: now, priority: 0.5 },
    { url: `${BASE}/volodymyrKostyria`, lastModified: now, priority: 0.5 },
  ]
}
