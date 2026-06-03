'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import BackToTopButton from '@/components/BackToTopButton'

import AcademyHeader from '@/sections/_shared/AcademyHeader'
import AcademyIntro from '../Intro'

import FullScreenFallback from '@/components/FullScreenFallback'

const MissionAndValues = lazy(() => import('../MissionAndValues'))
const OurGoals = lazy(() => import('../OurGoals'))
const OurSponsors = lazy(() => import('../OurSponsors'))
const OurResults = lazy(() => import('../OurResults'))
const SpecialThanksToAllOurPartners = lazy(
  () => import('@/sections/_shared/SpecialThanksToAllOurPartners')
)
const Footer = lazy(() => import('@/sections/_shared/AcademyFooter'))
const Chief = lazy(() => import('../Chief'))
const AmputeeRehab = lazy(() => import('../AmputeeRehab'))
const SummitResults = lazy(() => import('../SummitResults'))
const Academy = lazy(() => import('../Academy'))
const AcademyStudents = lazy(() => import('../AcademyStudents'))
const Events = lazy(() => import('../Events'))

import style from './style.module.scss'

const academyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Protez Academy',
  url: 'https://www.protezfoundation.org/academy',
  logo: 'https://www.protezfoundation.org/og/protez-academy-logo.png',
  description:
    'Educational project by Protez Foundation training Ukrainian specialists in prosthetics, orthotics, and rehabilitation in collaboration with US universities.',
  parentOrganization: {
    '@type': 'NGO',
    name: 'Protez Foundation',
    url: 'https://www.protezfoundation.org',
  },
  sameAs: [
    'https://www.facebook.com/prostheticsforukrainians/',
    'https://www.instagram.com/protezfoundation/',
    'https://www.linkedin.com/company/protez-foundation/',
    'https://www.youtube.com/@Protezfoundation',
  ],
}

export default function AcademyHomePage() {
  const [refIntro, inViewIntro] = useInView({ triggerOnce: false })
  const [refChief, inViewChief] = useInView({ triggerOnce: false })
  const [refEvents, inViewEvents] = useInView({ triggerOnce: false })
  const [refSummit, inViewSummit] = useInView({ triggerOnce: false })
  const [refThankYou, inViewThankYou] = useInView({ triggerOnce: false })

  const showBlackBackToTopButton =
    !inViewIntro && !inViewChief && !inViewEvents && !inViewSummit && !inViewThankYou

  return (
    <>
      <AcademyHeader />
      <main className={style.main}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(academyJsonLd) }}
        />
        <h1 className={style.srOnly}>
          Protez Academy — Education in Prosthetics and Rehabilitation
        </h1>
        <AcademyIntro ref={refIntro} />

        <Suspense fallback={<FullScreenFallback />}>
          <MissionAndValues />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <OurGoals />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Academy />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <OurResults />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Chief ref={refChief} />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Events ref={refEvents} />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <AcademyStudents />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <AmputeeRehab />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SummitResults ref={refSummit} />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SpecialThanksToAllOurPartners />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <OurSponsors />
        </Suspense>

        <div className={style.backToTopWrapper}>
          <BackToTopButton href={'academyIntro'} color="blue" black={showBlackBackToTopButton} />
        </div>
      </main>

      <Suspense fallback={<FullScreenFallback />}>
        <Footer ref={refThankYou} />
      </Suspense>
    </>
  )
}
