'use client'

import { Fragment } from 'react'

import BackToTopButton from '@/components/BackToTopButton'

import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import AcademyHeader from '@/sections/AcademyHeader'
import AcademyIntro from '@/sections/AcademyIntro'

import style from './style.module.scss'

export default function AcademyPage() {
  const { mobile, width } = useScreenModeAndSize()

  const isMobile = mobile || width < 768

  return (
    <Fragment>
      <AcademyHeader />
      <main className={style.main}>
        <AcademyIntro />
        {!isMobile && <BackToTopButton href={'#academyIntro'} color="blue" />}
      </main>
      {/* footer section */}
    </Fragment>
  )
}
