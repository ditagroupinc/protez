import '@/styles/resetCSS.css'
import '../globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import FacebookPixelEvents from '@/components/FacebookPixelEvents'
import LanguageSelectionModal from '@/components/LanguageSelectionModal'
import { nunitoSans } from '../fonts'
import { routing, type Locale } from '@/lib/i18n'
import { SITE_URL, buildAlternates, localeUrl } from '@/lib/seo'

import { ReactNode } from 'react'
import { Metadata, Viewport } from 'next'

const GTM_ID = process.env.GTM_ID

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params)
  const isUk = locale === 'uk'

  const title = isUk
    ? 'Protez Foundation — Безкоштовні протези для українців'
    : 'Protez Foundation — Free Prosthetics for Ukrainians'

  const description = isUk
    ? 'Неприбуткова організація 501(c)(3), яка надає сучасні протези, індивідуальне навчання та реабілітацію в США для українців, які втратили кінцівки на війні. Безкоштовно.'
    : 'Nonprofit 501(c)(3) providing state-of-the-art prosthetics, personalized training and rehabilitation in the US for Ukrainians who have lost limbs in the war. Free of charge.'

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | Protez Foundation',
    },
    description,
    applicationName: 'Protez Foundation',
    authors: [{ name: 'Protez Foundation' }],
    creator: 'Protez Foundation',
    publisher: 'Protez Foundation',
    alternates: buildAlternates(locale, '/'),
    openGraph: {
      type: 'website',
      locale: isUk ? 'uk_UA' : 'en_US',
      alternateLocale: isUk ? ['en_US'] : ['uk_UA'],
      url: localeUrl(locale, '/'),
      siteName: 'Protez Foundation',
      title,
      description,
      images: [
        {
          url: '/og/protez-foundation-og.png',
          width: 1200,
          height: 630,
          alt: 'Protez Foundation — prosthetics for Ukrainians',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/protez-foundation-og.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    verification: {
      google: 'TP3IS0vJ2ArAXC2SpQWPTuVSJ2DbHzsubyGnQtT0k1M',
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: Locale }
}) {
  const { locale } = await Promise.resolve(params)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  const isUk = locale === 'uk'
  const orgDescription = isUk
    ? 'Неприбуткова організація 501(c)(3), яка надає сучасні протези, індивідуальне навчання та реабілітацію в США для українців, які втратили кінцівки на війні.'
    : 'Nonprofit 501(c)(3) providing state-of-the-art prosthetics, personalized training, and rehabilitation in the US for Ukrainians who have lost limbs in the war.'

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: 'Protez Foundation',
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description: orgDescription,
    inLanguage: isUk ? 'uk-UA' : 'en-US',
    // TODO: fill in real values
    // taxID: 'XX-XXXXXXX', // 501(c)(3) EIN
    // sameAs: [ 'https://www.facebook.com/…', 'https://www.instagram.com/…', 'https://www.linkedin.com/company/…' ],
  }

  return (
    <html lang={locale === 'uk' ? 'uk' : 'en'} className={nunitoSans.className}>
      <head>
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <LanguageSelectionModal />
        </NextIntlClientProvider>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <FacebookPixelEvents />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
