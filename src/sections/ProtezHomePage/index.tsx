'use client'

import { Suspense, lazy } from 'react'

import style from './style.module.scss'

import { SingleNews, Statistics, SingleEvent, SinglePressRelease } from '@/utils/parsers'

import FullScreenFallback from '@/components/FullScreenFallback'
import ProtezImage from '@/components/ProtezImage'
import SuspenseSection from '@/components/SuspenseSection'

import { useCountryLanguage } from '@/hooks/useCountryLanguage'

import Header from '../Header'
import VideoBlock from './VideoBlock'

import LetsGiveHope from '../protez/1-LetsGiveHope/LetsGiveHope'
const ProstheticsForUkrainians = lazy(
  () => import('@/sections/protez/3-ProstheticsForUkrainians/ProstheticsForUkrainians')
)
const SampleProsthesesCosts = lazy(
  () => import('@/sections/protez/6-SampleProsthesesCosts/SampleProsthesesCosts')
)
const ProtezAcademy = lazy(() => import('@/sections/protez/7-ProtezAcademy/ProtezAcademy'))
const PeopleTrustUs = lazy(() => import('@/sections/protez/2-PeopleTrustUs/PeopleTrustUs'))
const InNeed = lazy(() => import('@/sections/protez/4-InNeed/InNeed'))
const OurResults = lazy(() => import('@/sections/protez/5-OurResults/OurResults'))
const OurPatients = lazy(() => import('@/sections/protez/11-OurPatients/OurPatients'))
const OfficeLocations = lazy(() => import('@/sections/protez/13-OfficeLocations/OfficeLocations'))
const Veterans = lazy(() => import('@/sections/protez/8-Veterans/Veterans'))
const Events = lazy(() => import('@/sections/protez/9-Events/Events'))
const PressRelease = lazy(() => import('@/sections/protez/10-PressRelease/PressRelease'))
const MeetOurTeam = lazy(() => import('@/sections/protez/12-MeetOurTeam/MeetOurTeam'))
const SpecialThanksToAllOurPartners = lazy(() => import('@/sections/SpecialThanksToAllOurPartners'))
const MailingList = lazy(() => import('@/sections/protez/16-MailingList/MailingList'))
const Merch = lazy(() => import('@/sections/protez/17-Merch/Merch'))
const Footer = lazy(() => import('@/sections/Footer'))

export default function ProtezHomePage({
  // news,
  statistics,
  events,
  // pressReleases,
  country,
}: {
  news: SingleNews[] | null
  statistics: Statistics
  events: SingleEvent[] | null
  pressReleases: SinglePressRelease[] | null
  country: string
}) {
  useCountryLanguage(country)

  return (
    <>
      <Header layout="protezPage" />

      <main className={style.main}>
        <SuspenseSection withSmoke>
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
        </SuspenseSection>

        <SuspenseSection withSmoke>
          <ProstheticsForUkrainians />
        </SuspenseSection>

        <SuspenseSection>
          <VideoBlock
            inNeedSection={<InNeed />}
            ourResultsSection={<OurResults results={statistics} />}
          />
        </SuspenseSection>

        <SuspenseSection withSmoke>
          <SampleProsthesesCosts />
        </SuspenseSection>

        <SuspenseSection withSmoke>
          <ProtezAcademy />
        </SuspenseSection>

        <SuspenseSection withSmoke>
          <Veterans />
        </SuspenseSection>

        {events && events.length > 0 && (
          <SuspenseSection withSmoke>
            <Events events={events} />
          </SuspenseSection>
        )}

        <SuspenseSection>
          <PressRelease />
        </SuspenseSection>

        <SuspenseSection>
          <OurPatients />
        </SuspenseSection>

        <SuspenseSection>
          <MeetOurTeam />
        </SuspenseSection>

        <SuspenseSection>
          <OfficeLocations />
        </SuspenseSection>

        <SuspenseSection>
          <SpecialThanksToAllOurPartners />
        </SuspenseSection>

        <SuspenseSection withSmoke>
          <MailingList />
        </SuspenseSection>

        <SuspenseSection>
          <Merch />
        </SuspenseSection>

        <SuspenseSection>
          <Footer layout="protezPage" />
        </SuspenseSection>
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
