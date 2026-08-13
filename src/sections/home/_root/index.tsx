'use client'

import { Suspense, lazy } from 'react'

import style from './style.module.scss'

import { SingleEvent } from '@/utils/parsers'
import type { CurrentMonth } from '@/lib/date'

import FullScreenFallback from '@/components/FullScreenFallback'
import ProtezImage from '@/components/ProtezImage'
import SuspenseSection from '@/components/SuspenseSection'

import VideoBlock from './VideoBlock'

import { useTranslations } from 'next-intl'

import LetsGiveHope from '@/sections/home/LetsGiveHope/LetsGiveHope'
const ProstheticsForUkrainians = lazy(
  () => import('@/sections/home/ProstheticsForUkrainians/ProstheticsForUkrainians')
)
const ChildrensProstheticsPromo = lazy(() => import('@/sections/home/ChildrensProstheticsPromo'))
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
// const Merch = lazy(() => import('@/sections/home/Merch/Merch'))
const Footer = lazy(() => import('@/sections/_shared/Footer'))

export default function ProtezHomePage({
  currentMonth,
  events,
}: {
  currentMonth: CurrentMonth
  events: SingleEvent[] | null
}) {
  const t = useTranslations('home.root')

  return (
    <>
      <main className={style.main}>
        <SuspenseSection withSmoke>
          <h1 className={style.srOnly}>{t('heroH1')}</h1>
          <div className={style.flagsBlock}>
            <LetsGiveHope />

            <ProtezImage
              src={`flag-usa.png`}
              alt={t('alts.americanFlag')}
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
            ourResultsSection={<OurResults currentMonth={currentMonth} />}
          />
        </SuspenseSection>

        <SuspenseSection>
          <ChildrensProstheticsPromo currentMonth={currentMonth} />
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

        {/* <SuspenseSection>
          <Merch />
        </SuspenseSection> */}

        <SuspenseSection>
          <Footer layout="protezPage" />
        </SuspenseSection>
      </main>
    </>
  )
}
