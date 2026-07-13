import type { MetadataRoute } from 'next'

const BASE = 'https://www.protezfoundation.org'

type RouteConfig = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const routes: RouteConfig[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/academy', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/academy/about', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/academy/terms-conditions', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/donate', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/dytyache-protezuvannya', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/stories/vadym-fedorov', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/stories/artem-svergun', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/thank-you', changeFrequency: 'yearly', priority: 0.1 },
]

const enUrl = (path: string) => `${BASE}${path}`
const ukUrl = (path: string) => `${BASE}/ua${path === '/' ? '' : path}`

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return routes.flatMap(({ path, changeFrequency, priority }) => {
    const alternates = {
      languages: {
        en: enUrl(path),
        'uk-UA': ukUrl(path),
        'x-default': enUrl(path),
      },
    }

    return [
      {
        url: enUrl(path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates,
      },
      {
        url: ukUrl(path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates,
      },
    ]
  })
}
