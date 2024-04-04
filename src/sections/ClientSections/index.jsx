'use client'
import Image from 'next/image'

import { throttle } from '@/utils'
import { useContext, useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import Header from '@/sections/Header'
import LetsGiveHope from '@/sections/LetsGiveHope'
import Veterans from '@/sections/Veterans'
import PressRelease from '@/sections/PressRelease'
import Events from '@/sections/Events'
import OurMission from '@/sections/OurMission'
import OurTeam from '@/sections/OurTeam'
import OurPartners from '@/sections/OurPartners'

import News from '@/sections/News'
import InNeed from '@/sections/InNeed'
import OurResults from '@/sections/OurResults'

import MailingList from '@/sections/MailingList'
import Merch from '@/sections/Merch'
import Prosthetics from '@/sections/Prosthetics'
import ThankYou from '@/sections/ThankYou'

import { LanguageContext } from '@/contexts/LanguageContext'

import BackToTopButton from '@/components/BackToTopButton'
import style from './style.module.scss'
import SmokeBackground from '@/components/SmokeBackground'

import CompanyDataNonProfit from '@/components/CompanyDataNonProfit'

import { usePageSettings } from '@/contexts/PageSettingsContext'

const homeText = {
  backToTop: {
    english: 'back to top  →',
  },
  exploreMore: {
    english: '← Explore more about us',
  },
}

export default function ClientSections({ news, statistics, events, pressReleases, country }) {
  const { lang, setLang } = useContext(LanguageContext)

  const [visitedSections, setVisitedSections] = useState({})

  // const showCompanyData = !(sectionInViewPort === 'merch' || sectionInViewPort === 'thankYou')

  const { isBackgroundWhite, setIsBackgroundWhite } = usePageSettings()

  const [refOurTeam, inViewOurTeam] = useInView({ triggerOnce: false })
  const [refOurMission, inViewOurMission] = useInView({ triggerOnce: false })
  const [refInNeed, inViewInNeed] = useInView({ triggerOnce: false })
  const [refOurPartners, inViewOurPartners] = useInView({ triggerOnce: false })
  const [refMerch, inViewMerch] = useInView({ triggerOnce: false })
  const [refThankYou, inViewThankYou] = useInView({ triggerOnce: false })

  const showCompanyData = !(inViewMerch || inViewThankYou)

  useEffect(() => {
    setIsBackgroundWhite(inViewOurTeam || inViewOurPartners || inViewMerch || inViewThankYou)
  }, [inViewOurTeam, inViewOurPartners, inViewMerch, inViewThankYou, setIsBackgroundWhite])

  useEffect(() => {
    if (country === 'Ukraine') setLang('ukrainian')
  }, [])

  console.log(inViewOurMission)

  return (
    <>
      <main className={style.main}>
        <CompanyDataNonProfit
          black={isBackgroundWhite}
          bgIsPink={inViewInNeed}
          className={`${style.companyDataNonProfit} ${showCompanyData ? '' : 'hidden'}`}
        />

        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smokeTop} />
          <div className={style.flagsBlock}>
            <LetsGiveHope id={'letsGiveHope'} />
            <OurMission ref={refOurMission} />
            <Image
              src="/flag-usa.png"
              object-fit="contain"
              alt="Picture of the author"
              width={1306}
              height={1890}
              className={style.americanFlag}
            />
          </div>
          <OurResults results={statistics} />
        </div>

        <InNeed ref={refInNeed} />

        <Prosthetics />
        <div className={`${style.smokeBlock} ${style.veteransAndEventsBlock}`}>
          <SmokeBackground className={style.smoke} />
          <Veterans />
          <PressRelease
            //
            pressReleases={pressReleases}
          />
          {/*<Events
            events={events}
            ref={sectionRefs.events}
            id="events"
            visible={isVisible('events')}
          /> */}
        </div>
        {/* <OurTeam ref={sectionRefs.ourTeam} id="ourTeam" visible={isVisible('ourTeam')} /> */}
        {/* <OurPartners
          ref={sectionRefs.ourPartners}
          id="ourPartners"
          visible={isVisible('ourPartners')}
        /> */}
        {/* <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <News ref={sectionRefs.news} id="news" news={news} visible={isVisible('news')} />
          <MailingList
            ref={sectionRefs.mailingList}
            id="mailingList"
            visible={isVisible('mailingList')}
          />
        </div> */}
        {/* <Merch ref={sectionRefs.merch} visible={isVisible('merch')} id="merch" /> */}
        {/* {sectionInViewPort !== 'letsGiveHope' && (
          <BackToTopButton
            text={homeText.backToTop[lang]}
            href={'letsGiveHope'}
            onClick={sectionIsVisible}
            black={bgIsWhite()}
          />
        )} */}
      </main>
      {/* <ThankYou ref={sectionRefs.thankYou} id="thankYou" visible={isVisible('thankYou')} /> */}
    </>
  )
}
