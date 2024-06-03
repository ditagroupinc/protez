'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

// import { notFound } from 'next/navigation'

import BackToTopButton from '@/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from './sections/Header'
import AcademyIntro from './sections/Intro'

const OurGoals = lazy(() => import('./sections/OurGoals'))
const OurResults = lazy(() => import('./sections/OurResults'))
const TheoryLectures = lazy(() => import('./sections/TheoryLectures'))
const SpecialThanksToAllOurPartners = lazy(() => import('./sections/SpecialThanksToAllOurPartners'))
const OurTeachers = lazy(() => import('./sections/OurTeachers'))
const Footer = lazy(() => import('./sections/Footer'))
const Chief = lazy(() => import('./sections/Chief'))
const AmputeeRehab = lazy(() => import('./sections/AmputeeRehab'))
const SummitResults = lazy(() => import('./sections/SummitResults'))
const Academy = lazy(() => import('./sections/Academy'))
const PracticeSessions = lazy(() => import('./sections/PracticeSessions'))
const AcademyStudents = lazy(() => import('./sections/AcademyStudents'))
const WeAreInNews = lazy(() => import('./sections/WeAreInNews'))
const Events = lazy(() => import('./sections/Events'))

import style from './style.module.scss'

export default function AcademyPage() {
  const [refIntro, inViewIntro] = useInView({ triggerOnce: false })
  const [refChief, inViewChief] = useInView({ triggerOnce: false })
  const [refEvents, inViewEvents] = useInView({ triggerOnce: false })
  const [refSummit, inViewSummit] = useInView({ triggerOnce: false })
  const [refWeAreInNews, inViewWeAreInNews] = useInView({ triggerOnce: false })
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

        <Suspense fallback={<h1>Loading...</h1>}>
          <OurGoals />
          <Academy />
          <OurResults />
          <OurTeachers />
          <Chief ref={refChief} />
          <TheoryLectures />
          <PracticeSessions />
          <Events ref={refEvents} />
          <AcademyStudents />
          <AmputeeRehab />
          <SummitResults ref={refSummit} />
          <WeAreInNews ref={refWeAreInNews} />
          <SpecialThanksToAllOurPartners />
        </Suspense>
        {!isMobile && (
          <BackToTopButton href={'academyIntro'} color="blue" black={showBlackBackToTopButton} />
        )}
      </main>
      <Footer ref={refThankYou} />
    </>
  )
}
