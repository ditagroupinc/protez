'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

// import { notFound } from 'next/navigation'

import BackToTopButton from '@academy/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from './Header'
import AcademyIntro from './Intro'

import FullScreenFallback from '../components/fallback'

const MissionAndValues = lazy(() => import('./MissionAndValues'))
const OurGoals = lazy(() => import('./OurGoals'))
const OurSponsors = lazy(() => import('./OurSponsors'))
const OurResults = lazy(() => import('./OurResults'))
// const TheoryLectures = lazy(() => import('./TheoryLectures'))
const SpecialThanksToAllOurPartners = lazy(() => import('./SpecialThanksToAllOurPartners'))
// const OurTeachers = lazy(() => import('./OurTeachers'))
const Footer = lazy(() => import('./Footer'))
const Chief = lazy(() => import('./Chief'))
const AmputeeRehab = lazy(() => import('./AmputeeRehab'))
const SummitResults = lazy(() => import('./SummitResults'))
const Academy = lazy(() => import('./Academy'))
// const PracticeSessions = lazy(() => import('./PracticeSessions'))
const AcademyStudents = lazy(() => import('./AcademyStudents'))
// const WeAreInNews = lazy(() => import('./WeAreInNews'))
const Events = lazy(() => import('./Events'))

import style from './style.module.scss'

// JSON-LD: дає Google структуроване розуміння сутності
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

  const { mobile, width } = useScreenModeAndSize()
  const isMobile = mobile || width < 768

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

        {/* <Suspense fallback={<FullScreenFallback />}>
          <OurTeachers />
        </Suspense> */}

        <Suspense fallback={<FullScreenFallback />}>
          <Chief ref={refChief} />
        </Suspense>

        {/* <Suspense fallback={<FullScreenFallback />}>
          <TheoryLectures />
        </Suspense> */}

        {/* <Suspense fallback={<FullScreenFallback />}>
          <PracticeSessions />
        </Suspense> */}

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

        {width > 600 ? (
          <>
            {/* <Suspense fallback={<FullScreenFallback />}>
              <WeAreInNews ref={refWeAreInNews} />
            </Suspense> */}

            <Suspense fallback={<FullScreenFallback />}>
              <SpecialThanksToAllOurPartners />
            </Suspense>

            <Suspense fallback={<FullScreenFallback />}>
              <OurSponsors />
            </Suspense>
          </>
        ) : (
          <>
            <Suspense fallback={<FullScreenFallback />}>
              <SpecialThanksToAllOurPartners />
            </Suspense>

            <Suspense fallback={<FullScreenFallback />}>
              <OurSponsors />
            </Suspense>

            {/* <Suspense fallback={<FullScreenFallback />}>
              <WeAreInNews ref={refWeAreInNews} />
            </Suspense> */}
          </>
        )}

        {!isMobile && (
          <BackToTopButton href={'academyIntro'} color="blue" black={showBlackBackToTopButton} />
        )}
      </main>

      <Suspense fallback={<FullScreenFallback />}>
        <Footer ref={refThankYou} />
      </Suspense>
    </>
  )
}
