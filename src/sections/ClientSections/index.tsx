'use client'

import {
  useEffect,
  // Suspense,
  // useRef,
  // useState,
  // lazy
} from 'react'

import { SingleNews, Statistics, SingleEvent, SinglePressRelease } from '@/utils/parsers'

import ProtezHeader from '../protez/ProtezHeader'
import LetsGiveHope from '@/sections/protez/1-LetsGiveHope/LetsGiveHope'

// const OurMission = lazy(() => import('@/sections/OurMission'))

import style from './style.module.scss'
import SmokeBackground from '@/components/SmokeBackground'

import { useLanguage } from '@/contexts/LanguageContext'

// import { usePageSettings } from '@/contexts/PageSettingsContext'
import { Languages } from '@/types'

import ProstheticsForUkrainians from '../protez/3-ProstheticsForUkrainians/ProstheticsForUkrainians'
import SampleProsthesesCosts from '../protez/6-SampleProsthesesCosts/SampleProsthesesCosts'
import ProtezAcademy from '../protez/7-ProtezAcademy/ProtezAcademy'
import PeopleTrustUs from '../protez/2-PeopleTrustUs/PeopleTrustUs'

import OurPatients from '../protez/11-OurPatients/OurPatients'
import OfficeLocations from '../protez/13-OfficeLocations/OfficeLocations'

import Footer from '../protez/Footer'
import Image from 'next/image'
import VideoBlock from './VideoBlock'
import Veterans from '../protez/8-Veterans/Veterans'
import Events from '../protez/9-Events/Events'
import PressRelease from '../protez/10-PressRelease/PressRelease'
import MeetOurTeam from '../protez/12-MeetOurTeam/MeetOurTeam'
import OurStarSupporters from '../protez/15-OurStarSupporters/OurStarSupporters'
import Merch from '../protez/17-Merch/Merch'
import SpecialThanksToAllOurPartners from '../protez/14-SpecialThanksToAllOurPartners/SpecialThanksToAllOurPartners'
import MailingList from '../protez/16-MailingList/MailingList'

export default function ClientSections({
  news,
  statistics,
  events,
  pressReleases,
  country,
}: {
  news: SingleNews[] | null
  statistics: Statistics | null
  events: SingleEvent[] | null
  pressReleases: SinglePressRelease[] | null
  country: string
}) {
  const { setLang } = useLanguage()

  useEffect(() => {
    if (country === 'Ukraine') setLang(Languages.Ukrainian)
  }, [])

  useEffect(() => {
    const sectionsToDisable = []

    if (!news || news.length === 0) sectionsToDisable.push('news')
    if (!statistics) sectionsToDisable.push('results')
    if (!events || events.length === 0) sectionsToDisable.push('events')
    if (!pressReleases || pressReleases.length === 0) sectionsToDisable.push('pressReleases')
    if (sectionsToDisable.length > 0) {
      // setDisabledSections(sectionsToDisable)
    }
  }, [news])

  return (
    <>
      <ProtezHeader />
      {/* <Suspense fallback={<div className={style.fallback}></div>}> */}
      <main className={style.main}>
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smokeTop} />
          <div className={style.flagsBlock}>
            <LetsGiveHope />

            <Image
              // TODO: remove after review
              src={`/protez/flag-usa.png`}
              object-fit="contain"
              alt="Picture of the author"
              priority
              width={620}
              height={927}
              className={style.americanFlag}
            />

            <PeopleTrustUs />
          </div>
        </div>
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <ProstheticsForUkrainians />
        </div>
        <VideoBlock />

        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <SampleProsthesesCosts />
        </div>
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <ProtezAcademy />
        </div>
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <Veterans />
        </div>
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <Events />
        </div>
        <PressRelease />
        <OurPatients />
        <MeetOurTeam />
        <OfficeLocations />
        <SpecialThanksToAllOurPartners />
        <OurStarSupporters />
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <MailingList />
        </div>
        <Merch />
        <Footer />
      </main>
      {/* </Suspense> */}
    </>
  )
}

// {
//    {statistics && <OurResults results={statistics} />}

//    {pressReleases && pressReleases.length > 0 && (
//               <PressRelease pressReleases={pressReleases} />
//             )}

//    {events && events.length > 0 && <Events events={events} />}

//    {news && news.length > 0 && <News news={news} />}
// }
