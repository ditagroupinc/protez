'use client'

import { Fragment, Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import BackToTopButton from '@/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from '@/sections/AcademyHeader'
import AcademyIntro from '@/sections/AcademyIntro'

// =================================================================
// LAZY LOADING IMPORT

const AcademyGoals = lazy(() => import('@/sections/AcademyGoals'))

// =================================================================

import style from './style.module.scss'

export default function AcademyPage() {
  const [refIntro, inViewIntro] = useInView({ triggerOnce: false })

  const { mobile, width } = useScreenModeAndSize()
  const isMobile = mobile || width < 768

  return (
    <Fragment>
      <AcademyHeader />
      <main className={style.main}>
        <AcademyIntro ref={refIntro} />
        {!isMobile && <BackToTopButton href={'#academyIntro'} color="blue" black={!inViewIntro} />}

        {/* OTHER SECTIONS ARE RENDERED AFTER THIS PAGE IS RENDRERED*/}
        {/* THE WHOLE SECTION IS NOT WRAPPERED WITH SUSPENSE TO PREVENT FLICKERING EFFECT OF THE PAGE */}
        <Suspense fallback={<h1>Loading...</h1>}>
          <AcademyGoals />
        </Suspense>
      </main>
      {/* footer section */}
    </Fragment>
  )
}
