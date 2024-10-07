'use client'

import {
  useEffect,
  // Suspense,
  // useRef,
  // useState,
  // lazy
} from 'react'
// import { useInView } from 'react-intersection-observer'

import { SingleNews, Statistics, SingleEvent, SinglePressRelease } from '@/utils/parsers'

import ProtezHeader from '../protez/ProtezHeader'
import LetsGiveHope from '@/sections/protez/1-LetsGiveHope/LetsGiveHope'

// const OurMission = lazy(() => import('@/sections/OurMission'))

// import BackToTopButton from '@/components/BackToTopButton'
import style from './style.module.scss'
import SmokeBackground from '@/components/SmokeBackground'

import { useLanguage } from '@/contexts/LanguageContext'

// import { usePageSettings } from '@/contexts/PageSettingsContext'
import { Languages } from '@/types'

import ProstheticsForUkrainians from '../protez/3-ProstheticsForUkrainians/ProstheticsForUkrainians'

// import InNeed from '../protez/4-InNeed/InNeed'
// import OurResults from '../protez/5-OurResults'
import SampleProsthesesCosts from '../protez/6-SampleProsthesesCosts/SampleProsthesesCosts'
import ProtezAcademy from '../protez/7-ProtezAcademy/ProtezAcademy'
import PeopleTrustUs from '../protez/2-PeopleTrustUs/PeopleTrustUs'
// import Veterans from '../protez/Veterans'
// import Events from '../protez/Events'
// import PressRelease from '../protez/PressRelease'
import OurPatients from '../protez/11-OurPatients/OurPatients'
import OfficeLocations from '../protez/13-OfficeLocations/OfficeLocations'
// import OurStarSupporters from '../protez/OurStarSupporters'
// import MeetOurTeam from '../protez/MeetOurTeam'
// import Merch from '../protez/Merch'
import Footer from '../protez/Footer'
import Image from 'next/image'
import VideoBlock from './VideoBlock'
import Veterans from '../protez/8-Veterans/Veterans'
import Events from '../protez/9-Events/Events'
import PressRelease from '../protez/10-PressRelease/PressRelease'
import MeetOurTeam from '../protez/12-MeetOurTeam/MeetOurTeam'
import OurStarSupporters from '../protez/15-OurStarSupporters/OurStarSupporters'
import Merch from '../protez/16-Merch/Merch'
import SpecialThanksToAllOurPartners from '../protez/14-SpecialThanksToAllOurPartners/SpecialThanksToAllOurPartners'

// import { useInView } from 'framer-motion'

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
  // const refOurResults = useRef<HTMLDivElement | null>(null)

  // const {
  //   ref: refOurResults,
  //   // inView,
  //   // entry,
  // } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // })

  // const { isBackgroundWhite, setIsBackgroundWhite, setDisabledSections } = usePageSettings()

  // const [refLetsGiveHope, inViewLetsGiveHope] = useInView({ triggerOnce: false })
  // const [refOurTeam, inViewOurTeam] = useInView({ triggerOnce: false })

  // const [refInNeed, inViewInNeed] = useInView({ triggerOnce: false })
  // const [refOurPartners, inViewOurPartners] = useInView({ triggerOnce: false })
  // const [refMerch, inViewMerch] = useInView({ triggerOnce: false })
  // const [refMailingList, inViewMailingList] = useInView({ triggerOnce: true })
  // const [refThankYou, inViewThankYou] = useInView({ triggerOnce: false })

  // const showCompanyData = !(inViewMerch || inViewThankYou)

  // useEffect(() => {
  //   setIsBackgroundWhite(inViewOurTeam || inViewOurPartners || inViewMerch || inViewThankYou)
  // }, [inViewOurTeam, inViewOurPartners, inViewMerch, inViewThankYou, setIsBackgroundWhite])

  // console.log(refOurResults?.current?.offsetHeight)

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
            {/* ref={refLetsGiveHope} */}

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
        <Merch />
        <Footer />

        {/* <OurMission /> */}
        {/* </div> */}
        {/* {statistics && <OurResults results={statistics} />} */}
        {/* </div> */}

        {/* <InNeed ref={refInNeed} /> */}

        {/* <Prosthetics /> */}
        <div className={`${style.smokeBlock} ${style.veteransAndEventsBlock}`}>
          {/* <SmokeBackground className={style.smoke} /> */}
          {/* <Veterans /> */}
          {/* {pressReleases && pressReleases.length > 0 && (
              <PressRelease pressReleases={pressReleases} />
            )} */}
          {/* {events && events.length > 0 && <Events events={events} />} */}
        </div>
        {/* <OurTeam ref={refOurTeam} /> */}
        {/* <OurPartners ref={refOurPartners} /> */}
        <div className={style.smokeBlock}>
          {/* <SmokeBackground className={style.smoke} /> */}
          {/* {news && news.length > 0 && <News news={news} />} */}

          {/* <MailingList ref={refMailingList} inView={inViewMailingList} /> */}
        </div>
        {/* <Merch ref={refMerch} /> */}
        {/* {!inViewLetsGiveHope && (
            <BackToTopButton href={'letsGiveHope'} black={isBackgroundWhite} />
          )} */}
      </main>
      {/* </Suspense> */}
    </>
  )
}
