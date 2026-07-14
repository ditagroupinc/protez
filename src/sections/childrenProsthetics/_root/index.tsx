'use client'

import { Suspense, lazy } from 'react'

import SuspenseSection from '@/components/SuspenseSection'
import FullScreenFallback from '@/components/FullScreenFallback'

import HeroSection from '../HeroSection'
import style from './style.module.scss'

const OurApproach = lazy(() => import('../OurApproach'))
const ChildrenStories = lazy(() => import('../ChildrenStories'))
const ApplyAndSupport = lazy(() => import('../ApplyAndSupport'))

export default function ChildrenProstheticsPage() {
  return (
    <main className={style.main}>
      <SuspenseSection>
        <HeroSection />
      </SuspenseSection>

      <SuspenseSection>
        <OurApproach />
      </SuspenseSection>

      <SuspenseSection>
        <Suspense fallback={<FullScreenFallback />}>
          <ChildrenStories />
        </Suspense>
      </SuspenseSection>

      <SuspenseSection>
        <ApplyAndSupport />
      </SuspenseSection>
    </main>
  )
}
