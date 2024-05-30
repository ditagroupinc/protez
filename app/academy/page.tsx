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
import SummitResults from '@/sections/academy/SummitResults/SummitResults'
import Academy from '@/sections/academy/Academy'
import PracticeSessions from '@/sections/academy/PracticeSessions'
import AcademyStudents from '@/sections/academy/AcademyStudents'

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
// todo slide Academy Students
//* Amputee rehab
//* Summit Results
// slide We're in the News
//* All our Partners
//* Thank you

export default function AcademyPage() {
  const [refIntro, inViewIntro] = useInView({ triggerOnce: false })

  const { mobile, width } = useScreenModeAndSize()
  const isMobile = mobile || width < 768

  return hidePage ? (
    notFound()
  ) : (
    <>
      <AcademyHeader />
      <main className={style.main}>
        {/* <AcademyIntro ref={refIntro} />
        {!isMobile && <BackToTopButton href={'#academyIntro'} color="blue" black={!inViewIntro} />} */}

        {/* OTHER SECTIONS ARE RENDERED AFTER THIS PAGE IS RENDRERED*/}
        {/* THE WHOLE SECTION IS NOT WRAPPERED WITH SUSPENSE TO PREVENT FLICKERING EFFECT OF THE PAGE */}
        <Suspense fallback={<h1>Loading...</h1>}>
          {/* <OurGoals /> */}
          {/* <OurResults /> */}
          {/* <TheoryLectures /> */}
          {/* <SpecialThanksToAllOurPartners /> */}
          {/* <OurTeachers /> */}
          {/* <Chief /> */}
          {/* <AmputeeRehab /> */}
          <SummitResults />
          <Academy />
          <PracticeSessions />
          <AcademyStudents />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
