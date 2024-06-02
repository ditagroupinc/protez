'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import { notFound } from 'next/navigation'

import BackToTopButton from '@/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from './sections/Header'
import AcademyIntro from './sections/Intro'

// =================================================================
// LAZY LOADING IMPORT

const OurGoals = lazy(() => import('./sections/OurGoals'))
const OurResults = lazy(() => import('./sections/OurResults'))
const TheoryLectures = lazy(() => import('./sections/TheoryLectures'))
const SpecialThanksToAllOurPartners = lazy(() => import('./sections/SpecialThanksToAllOurPartners'))

// =================================================================

import style from './style.module.scss'
import OurTeachers from './sections/OurTeachers'
import Footer from './sections/Footer'
import Chief from './sections/Chief'
import AmputeeRehab from './sections/AmputeeRehab'
import SummitResults from './sections/SummitResults'
import Academy from './sections/Academy'
import PracticeSessions from './sections/PracticeSessions'
import AcademyStudents from './sections/AcademyStudents'
import WeAreInNews from './sections/WeAreInNews'

import Events from './sections/Events'

const hidePage = false

// sections:
//todo AcademyHeader
//* Welcome to the Academy
//* Our Goals
//* slide Protez Academy
//* Our Results
//* Academy Teachers
//* Yakov Gradinar
//* Theory Lectures
//* slide Practice Sessions
// slide Past and Upcoming Events
// * slide Academy Students
//* Amputee rehab
//* Summit Results
//* slide We're in the News
//* All our Partners
//* Thank you

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

  return hidePage ? (
    notFound()
  ) : (
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
