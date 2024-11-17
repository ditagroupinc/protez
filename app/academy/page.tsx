'use client'

import { Suspense, lazy } from 'react'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyIntro from '@/sections/academy/Intro'

import FullScreenFallback from '@/components/FullScreenFallback'

const OurGoals = lazy(() => import('@/sections/academy/OurGoals'))
const OurResults = lazy(() => import('@/sections/academy/OurResults'))
const TheoryLectures = lazy(() => import('@/sections/academy/TheoryLectures'))
const SpecialThanksToAllOurPartners = lazy(() => import('@/sections/SpecialThanksToAllOurPartners'))
const OurTeachers = lazy(() => import('@/sections/academy/OurTeachers'))
const Footer = lazy(() => import('@/sections/Footer'))
const Chief = lazy(() => import('@/sections/academy/Chief'))
const AmputeeRehab = lazy(() => import('@/sections/academy/AmputeeRehab'))
const SummitResults = lazy(() => import('@/sections/academy/SummitResults'))
const Academy = lazy(() => import('@/sections/academy/Academy'))
const PracticeSessions = lazy(() => import('@/sections/academy/PracticeSessions'))
const AcademyStudents = lazy(() => import('@/sections/academy/AcademyStudents'))
const WeAreInNews = lazy(() => import('@/sections/academy/WeAreInNews'))
const Events = lazy(() => import('@/sections/academy/Events'))

import style from './style.module.scss'
import Header from '@/sections/Header'

export default function AcademyPage() {
  const { width } = useScreenModeAndSize()

  return (
    <>
      <Header layout="academyPage" />
      <main className={style.main}>
        <AcademyIntro />

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
          <OurTeachers />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Chief />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <TheoryLectures />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <PracticeSessions />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Events />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <AcademyStudents />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <AmputeeRehab />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SummitResults />
        </Suspense>

        {width > 600 ? (
          <>
            <Suspense fallback={<FullScreenFallback />}>
              <WeAreInNews />
            </Suspense>

            <Suspense fallback={<FullScreenFallback />}>
              <SpecialThanksToAllOurPartners />
            </Suspense>
          </>
        ) : (
          <>
            <Suspense fallback={<FullScreenFallback />}>
              <SpecialThanksToAllOurPartners />
            </Suspense>

            <Suspense fallback={<FullScreenFallback />}>
              <WeAreInNews />
            </Suspense>
          </>
        )}
      </main>

      <Suspense fallback={<FullScreenFallback />}>
        <Footer layout="academyPage" />
      </Suspense>
    </>
  )
}
