'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

// import { notFound } from 'next/navigation'

import BackToTopButton from '@academy/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from './sections/Header'
import AcademyIntro from './sections/Intro'

import FullScreenFallback from './components/fallback'

const MissionAndValues = lazy(() => import('./sections/MissionAndValues'))
const OurGoals = lazy(() => import('./sections/OurGoals'))
const OurSponsors = lazy(() => import('./sections/OurSponsors'))
const OurResults = lazy(() => import('./sections/OurResults'))
// const TheoryLectures = lazy(() => import('./sections/TheoryLectures'))
const SpecialThanksToAllOurPartners = lazy(() => import('./sections/SpecialThanksToAllOurPartners'))
// const OurTeachers = lazy(() => import('./sections/OurTeachers'))
const Footer = lazy(() => import('./sections/Footer'))
const Chief = lazy(() => import('./sections/Chief'))
const AmputeeRehab = lazy(() => import('./sections/AmputeeRehab'))
const SummitResults = lazy(() => import('./sections/SummitResults'))
const Academy = lazy(() => import('./sections/Academy'))
// const PracticeSessions = lazy(() => import('./sections/PracticeSessions'))
const AcademyStudents = lazy(() => import('./sections/AcademyStudents'))
// const WeAreInNews = lazy(() => import('./sections/WeAreInNews'))
const Events = lazy(() => import('./sections/Events'))

import style from './style.module.scss'

export default function AcademyPage() {
  const [refIntro, inViewIntro] = useInView({ triggerOnce: false })
  const [refChief, inViewChief] = useInView({ triggerOnce: false })
  const [refEvents, inViewEvents] = useInView({ triggerOnce: false })
  const [refSummit, inViewSummit] = useInView({ triggerOnce: false })
  const [, inViewWeAreInNews] = useInView({ triggerOnce: false })
  const [refThankYou, inViewThankYou] = useInView({ triggerOnce: false })

  const showBlackBackToTopButton =
    !inViewIntro &&
    !inViewChief &&
    !inViewEvents &&
    !inViewSummit &&
    !inViewWeAreInNews &&
    !inViewThankYou

  const { mobile, width } = useScreenModeAndSize()
  const isMobile = mobile || width < 768

  return (
    <>
      <AcademyHeader />
      <main className={style.main}>
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
