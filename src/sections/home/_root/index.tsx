'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Suspense, lazy } from 'react'

import style from './style.module.scss'

import { SingleNews, Statistics, SingleEvent, SinglePressRelease } from '@/utils/parsers'

import FullScreenFallback from '@/components/FullScreenFallback'
import ProtezImage from '@/components/ProtezImage'
import SuspenseSection from '@/components/SuspenseSection'

import Header from '@/sections/_shared/Header'
import VideoBlock from './VideoBlock'

import LetsGiveHope from '@/sections/home/LetsGiveHope/LetsGiveHope'
const ProstheticsForUkrainians = lazy(
  () => import('@/sections/home/ProstheticsForUkrainians/ProstheticsForUkrainians')
)
const SampleProsthesesCosts = lazy(
  () => import('@/sections/home/SampleProsthesesCosts/SampleProsthesesCosts')
)
const ProtezAcademy = lazy(() => import('@/sections/home/ProtezAcademyPromo/ProtezAcademy'))
const PeopleTrustUs = lazy(() => import('@/sections/home/PeopleTrustUs/PeopleTrustUs'))
const InNeed = lazy(() => import('@/sections/home/InNeed/InNeed'))
const OurResults = lazy(() => import('@/sections/home/OurResults/OurResults'))
const OurPatients = lazy(() => import('@/sections/home/OurPatients/OurPatients'))
const OfficeLocations = lazy(() => import('@/sections/home/OfficeLocations/OfficeLocations'))
const Veterans = lazy(() => import('@/sections/home/Veterans/Veterans'))
const Events = lazy(() => import('@/sections/home/Events/Events'))
const PressRelease = lazy(() => import('@/sections/home/PressRelease/PressRelease'))
const MeetOurTeam = lazy(() => import('@/sections/home/MeetOurTeam/MeetOurTeam'))
const SpecialThanksToAllOurPartners = lazy(
  () => import('@/sections/_shared/SpecialThanksToAllOurPartners')
)
const MailingList = lazy(() => import('@/sections/_shared/MailingList/MailingList'))
const Merch = lazy(() => import('@/sections/home/Merch/Merch'))
const Footer = lazy(() => import('@/sections/_shared/Footer'))

export default function ProtezHomePage({
  // news,
  statistics,
  events,
}: // pressReleases,
{
  news: SingleNews[] | null
  statistics: Statistics
  events: SingleEvent[] | null
  pressReleases: SinglePressRelease[] | null
}) {
  return (
    <>
      <Header layout="protezPage" />

      <main className={style.main}>
        <SuspenseSection withSmoke>
          <h1 className={style.srOnly}>
            Protez Foundation — free prosthetics and rehabilitation for Ukrainians
          </h1>
          <div className={style.flagsBlock}>
            <LetsGiveHope />

            <ProtezImage
              src={`flag-usa.png`}
              alt="American flag"
              priority
              width={1306}
              height={1890}
              className={style.americanFlag}
            />
            {/* Independent Suspense so LetsGiveHope and the flag render immediately
                while PeopleTrustUs hydrates above the fold. */}
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
