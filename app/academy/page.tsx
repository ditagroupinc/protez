import type { Metadata } from 'next'
import AcademyHomePage from './sections'

export const metadata: Metadata = {
  title: 'Protez Academy — Education in Prosthetics and Rehabilitation',
  description:
    'Protez Academy is an educational project by Protez Foundation in collaboration with Century College, University of Minnesota, and Concordia University. We train Ukrainian prosthetists, orthotists, and rehabilitation specialists in evidence-based clinical practice.',
  keywords: [
    'Protez Academy',
    'prosthetics education',
    'rehabilitation training',
    'Ukraine prosthetics',
    'amputee rehab',
    'orthotics training',
  ],
  alternates: {
    canonical: '/academy',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.protezfoundation.org/academy',
    title: 'Protez Academy — Education in Prosthetics and Rehabilitation',
    description:
      'Educational project by Protez Foundation training Ukrainian specialists in modern prosthetics and rehabilitation. Partners: Century College, University of Minnesota, Concordia University.',
    images: [
      {
        url: '/og/protez-academy-og.png',
        width: 1200,
        height: 630,
        alt: 'Protez Academy — Education in Prosthetics and Rehabilitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protez Academy — Education in Prosthetics and Rehabilitation',
    description:
      'Educational project training Ukrainian specialists in modern prosthetics and rehabilitation.',
    images: ['/og/protez-academy-og.png'],
  },
}

export default function AcademyPage() {
  return <AcademyHomePage />
}
