'use client'

import { Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import BackToTopButton from '@/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import Header from '@/sections/_shared/AcademyHeaderMinimal'

import FullScreenFallback from '@/components/FullScreenFallback'

import { AcademyAboutIDs } from './consts'

const AboutUs = lazy(() => import('@/sections/academy-about/AboutUs'))
const History = lazy(() => import('@/sections/academy-about/History'))
const WeTrain = lazy(() => import('@/sections/academy-about/WeTrain'))
const Footer = lazy(() => import('@/sections/_shared/AcademyAboutFooter'))

import style from './style.module.scss'

export default function AcademyAboutPage() {
  const [refMission1, inViewMission1] = useInView({ triggerOnce: false })
  const [refFooter, inViewFooter] = useInView({ triggerOnce: false })

  const showBlackBackToTopButton = !inViewMission1 && !inViewFooter

  const { mobile, width } = useScreenModeAndSize()
  const isMobile = mobile || width < 768

  return (
    <>
      <Header />
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
