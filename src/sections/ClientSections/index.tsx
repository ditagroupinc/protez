'use client'

import {
  Suspense,
  useEffect,
  // Suspense,
  // useRef,
  // useState,
  lazy,
} from 'react'
// import { usePageSettings } from '@/contexts/PageSettingsContext'

import style from './style.module.scss'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'

import VideoBlock from './VideoBlock'
import SmokeWrapper from './SmokeWrapper'

import { SingleNews, Statistics, SingleEvent, SinglePressRelease } from '@/utils/parsers'

import ProtezHeader from '../protez/ProtezHeader'

import FullScreenFallback from '@/components/FullScreenFallback'

import LetsGiveHope from '../protez/1-LetsGiveHope/LetsGiveHope'
import ProtezImage from '@/components/ProtezImage'
const ProstheticsForUkrainians = lazy(
  () => import('@/sections/protez/3-ProstheticsForUkrainians/ProstheticsForUkrainians')
)
const SampleProsthesesCosts = lazy(
  () => import('@/sections/protez/6-SampleProsthesesCosts/SampleProsthesesCosts')
)
const ProtezAcademy = lazy(() => import('@/sections/protez/7-ProtezAcademy/ProtezAcademy'))
const PeopleTrustUs = lazy(() => import('@/sections/protez/2-PeopleTrustUs/PeopleTrustUs'))
const OurPatients = lazy(() => import('@/sections/protez/11-OurPatients/OurPatients'))
const OfficeLocations = lazy(() => import('@/sections/protez/13-OfficeLocations/OfficeLocations'))
const Veterans = lazy(() => import('@/sections/protez/8-Veterans/Veterans'))
const Events = lazy(() => import('@/sections/protez/9-Events/Events'))
const PressRelease = lazy(() => import('@/sections/protez/10-PressRelease/PressRelease'))
const MeetOurTeam = lazy(() => import('@/sections/protez/12-MeetOurTeam/MeetOurTeam'))
const OurStarSupporters = lazy(
  () => import('@/sections/protez/15-OurStarSupporters/OurStarSupporters')
)
const SpecialThanksToAllOurPartners = lazy(() => import('@/sections/SpecialThanksToAllOurPartners'))
const MailingList = lazy(() => import('@/sections/protez/16-MailingList/MailingList'))
const Merch = lazy(() => import('@/sections/protez/17-Merch/Merch'))
const Footer = lazy(() => import('@/sections/Footer'))

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

      <main className={style.main}>
        <SmokeWrapper>
          <div className={style.flagsBlock}>
            <LetsGiveHope />

            <ProtezImage
              src={`flag-usa.png`}
              object-fit="contain"
              alt="Picture of the author"
              priority
              width={620}
              height={927}
              className={style.americanFlag}
            />
            <Suspense fallback={<FullScreenFallback />}>
              <PeopleTrustUs />
            </Suspense>
          </div>
        </SmokeWrapper>

        <Suspense fallback={<FullScreenFallback />}>
          <SmokeWrapper>
            <ProstheticsForUkrainians />
          </SmokeWrapper>
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <VideoBlock />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SmokeWrapper>
            <SampleProsthesesCosts />
          </SmokeWrapper>
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SmokeWrapper>
            <ProtezAcademy />
          </SmokeWrapper>
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SmokeWrapper>
            <Veterans />
          </SmokeWrapper>
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SmokeWrapper>
            <Events />
          </SmokeWrapper>
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <PressRelease />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <OurPatients />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <MeetOurTeam />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <OfficeLocations />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SpecialThanksToAllOurPartners />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <OurStarSupporters />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <SmokeWrapper>
            <MailingList />
          </SmokeWrapper>
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Merch />
        </Suspense>

        <Suspense fallback={<FullScreenFallback />}>
          <Footer />
        </Suspense>
      </main>
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
