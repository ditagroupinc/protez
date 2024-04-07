'use client'

import Image from 'next/image'

import { useEffect, Suspense, lazy } from 'react'
import { useInView } from 'react-intersection-observer'

import { SingleNews, Statistics, SingleEvent, SinglePressRelease } from '@/utils/parsers'

import Header from '@/sections/Header'
import LetsGiveHope from '@/sections/LetsGiveHope'

const Veterans = lazy(() => import('@/sections/Veterans'))
const PressRelease = lazy(() => import('@/sections/PressRelease'))
const Events = lazy(() => import('@/sections/Events'))
const OurMission = lazy(() => import('@/sections/OurMission'))
const OurTeam = lazy(() => import('@/sections/OurTeam'))
const OurPartners = lazy(() => import('@/sections/OurPartners'))
const News = lazy(() => import('@/sections/News'))
const InNeed = lazy(() => import('@/sections/InNeed'))
const OurResults = lazy(() => import('@/sections/OurResults'))
const MailingList = lazy(() => import('@/sections/MailingList'))
const Merch = lazy(() => import('@/sections/Merch'))
const Prosthetics = lazy(() => import('@/sections/Prosthetics'))

import ThankYou from '@/sections/ThankYou'

import BackToTopButton from '@/components/BackToTopButton'
import style from './style.module.scss'
import SmokeBackground from '@/components/SmokeBackground'

import CompanyDataNonProfit from '@/components/CompanyDataNonProfit'

import { useLanguage } from '@/contexts/LanguageContext'

import { usePageSettings } from '@/contexts/PageSettingsContext'
import { Languages } from '@/types'

export default function ClientSections({
  news,
  statistics,
  events,
  pressReleases,
  country,
}: {
  news: SingleNews[]
  statistics: Statistics
  events: SingleEvent[]
  pressReleases: SinglePressRelease[]
  country: string
}) {
  const { setLang } = useLanguage()

  const { isBackgroundWhite, setIsBackgroundWhite } = usePageSettings()

  const [refLetsGiveHope, inViewLetsGiveHope] = useInView({ triggerOnce: false })
  const [refOurTeam, inViewOurTeam] = useInView({ triggerOnce: false })

  const [refInNeed, inViewInNeed] = useInView({ triggerOnce: false })
  const [refOurPartners, inViewOurPartners] = useInView({ triggerOnce: false })
  const [refMerch, inViewMerch] = useInView({ triggerOnce: false })
  const [refMailingList, inViewMailingList] = useInView({ triggerOnce: true })
  const [refThankYou, inViewThankYou] = useInView({ triggerOnce: false })

  const showCompanyData = !(inViewMerch || inViewThankYou)

  useEffect(() => {
    setIsBackgroundWhite(inViewOurTeam || inViewOurPartners || inViewMerch || inViewThankYou)
  }, [inViewOurTeam, inViewOurPartners, inViewMerch, inViewThankYou, setIsBackgroundWhite])

  useEffect(() => {
    if (country === 'Ukraine') setLang(Languages.Ukrainian)
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <main className={style.main}>
        <CompanyDataNonProfit
          black={isBackgroundWhite}
          bgIsPink={inViewInNeed}
          className={`${style.companyDataNonProfit} ${showCompanyData ? '' : 'hidden'}`}
        />

        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smokeTop} />
          <div className={style.flagsBlock}>
            <LetsGiveHope ref={refLetsGiveHope} />
            <OurMission />
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
          <PressRelease pressReleases={pressReleases} />
          <Events events={events} />
        </div>
        <OurTeam ref={refOurTeam} />
        <OurPartners ref={refOurPartners} />
        <div className={style.smokeBlock}>
          <SmokeBackground className={style.smoke} />
          <News news={news} />
          <MailingList ref={refMailingList} inView={inViewMailingList} />
        </div>
        <Merch ref={refMerch} />
        {!inViewLetsGiveHope && <BackToTopButton href={'letsGiveHope'} black={isBackgroundWhite} />}
      </main>
      <ThankYou ref={refThankYou} />
    </Suspense>
  )
}
