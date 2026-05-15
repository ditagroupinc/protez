'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import BackToTopButton from './components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from './sections/Header'

import FullScreenFallback from '@academy/components/fallback'

import { AcademyAboutIDs } from './consts'

const AboutUs = lazy(() => import('./sections/AboutUs'))
const History = lazy(() => import('./sections/History'))
const WeTrain = lazy(() => import('./sections/WeTrain'))
const Footer = lazy(() => import('./sections/Footer'))

import style from './style.module.scss'

export default function AcademyAboutPage() {
  const [refMission1, inViewMission1] = useInView({ triggerOnce: false })
  const [refFooter, inViewFooter] = useInView({ triggerOnce: false })

  const showBlackBackToTopButton = !inViewMission1 && !inViewFooter

  const { mobile, width } = useScreenModeAndSize()
  const isMobile = mobile || width < 768

  return (
    <>
      <AcademyHeader />
      <main className={style.main}>
        <Suspense fallback={<FullScreenFallback />}>
          <History id={AcademyAboutIDs.History} />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <AboutUs ref={refMission1} id={AcademyAboutIDs.AboutUs} />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <WeTrain />
        </Suspense>

        {!isMobile && (
          <BackToTopButton
            href={AcademyAboutIDs.AboutUs}
            color="blue"
            black={showBlackBackToTopButton}
          />
        )}
      </main>

      <Suspense fallback={<FullScreenFallback />}>
        <Footer ref={refFooter} />
      </Suspense>
    </>
  )
}
