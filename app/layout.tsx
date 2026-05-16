import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/styles/resetCSS.css'
import './globals.css'
import Script from 'next/script'
import LanguageContextProvider from '@/contexts/LanguageContext'
import FacebookPixelEvents from '@/components/FacebookPixelEvents'
import { nunitoSans } from './fonts'

import { ReactElement } from 'react'
import { Metadata, Viewport } from 'next'

const GTM_ID = process.env.GTM_ID
// https://www.rodyvansambeek.com/blog/easiest-ga4-integration-nextjs-13-gtm-guide

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
export const metadata: Metadata = {
  metadataBase: new URL('https://www.protezfoundation.org'),
  title: {
    default: 'Protez Foundation — Free Prosthetics for Ukrainians',
    template: '%s | Protez Foundation',
  },
  description:
    'Nonprofit 501(c)(3) providing state-of-the-art prosthetics, personalized training and rehabilitation in the US for Ukrainians who have lost limbs in the war. Free of charge.',
  applicationName: 'Protez Foundation',
  authors: [{ name: 'Protez Foundation' }],
  creator: 'Protez Foundation',
  publisher: 'Protez Foundation',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'uk-UA': '/uk', // якщо введете окремий маршрут для UA
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['uk_UA'],
    url: 'https://www.protezfoundation.org',
    siteName: 'Protez Foundation',
    title: 'Protez Foundation — Free Prosthetics for Ukrainians',
    description: 'Free prosthetics and rehabilitation in the US for Ukrainians injured in the war.',
    images: [
      {
        url: '/og/protez-foundation-og.png', // покладіть у /public/og/
        width: 1200,
        height: 630,
        alt: 'Protez Foundation — prosthetics for Ukrainians',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protez Foundation — Free Prosthetics for Ukrainians',
    description: 'Free prosthetics and rehabilitation in the US for Ukrainians injured in the war.',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      <LanguageContextProvider>
        <html lang="en" className={nunitoSans.className}>
          <body>
            {children}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
            <FacebookPixelEvents />
          </body>
        </html>
      </LanguageContextProvider>
    </>
  )
}
