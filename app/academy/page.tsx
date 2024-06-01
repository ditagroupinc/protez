'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import { notFound } from 'next/navigation'

import BackToTopButton from '@/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from '@/sections/academy/Header'
import AcademyIntro from '@/sections/academy/Intro'

// =================================================================
// LAZY LOADING IMPORT

const OurGoals = lazy(() => import('@/sections/academy/OurGoals'))
const OurResults = lazy(() => import('@/sections/academy/OurResults'))
const TheoryLectures = lazy(() => import('@/sections/academy/TheoryLectures'))
const SpecialThanksToAllOurPartners = lazy(
  () => import('@/sections/academy/SpecialThanksToAllOurPartners')
)

// =================================================================

import style from './style.module.scss'
import OurTeachers from '@/sections/academy/OurTeachers'
import Footer from '@/sections/academy/Footer'
import Chief from '@/sections/academy/Chief'
import AmputeeRehab from '@/sections/academy/AmputeeRehab'
import SummitResults from '@/sections/academy/SummitResults'
import Academy from '@/sections/academy/Academy'
import PracticeSessions from '@/sections/academy/PracticeSessions'
import AcademyStudents from '@/sections/academy/AcademyStudents'
import WeAreInNews from '@/sections/academy/WeAreInNews'

import PastAndUpcomingEvents from '@/sections/academy/PastAndUpcomingEvents'

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
  const [refPastAndUpcomingEvents, inViewPastAndUpcomingEvents] = useInView({ triggerOnce: false })
  const [refSummit, inViewSummit] = useInView({ triggerOnce: false })
  const [refWeAreInNews, inViewWeAreInNews] = useInView({ triggerOnce: false })
  const [refThankYou, inViewThankYou] = useInView({ triggerOnce: false })

  const showBlackBackToTopButton =
    !inViewIntro &&
    !inViewChief &&
    !inViewPastAndUpcomingEvents &&
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
          <PastAndUpcomingEvents ref={refPastAndUpcomingEvents} />
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
