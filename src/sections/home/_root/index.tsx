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

import Hero from '@/sections/home/Hero/Hero'
const ProstheticsForUkrainians = lazy(
  () => import('@/sections/home/ProstheticsForUkrainians/ProstheticsForUkrainians')
)
const ChildrensProstheticsPromo = lazy(() => import('@/sections/home/ChildrensProstheticsPromo'))
const SampleProsthesesCosts = lazy(
  () => import('@/sections/home/SampleProsthesesCosts/SampleProsthesesCosts')
)
const ProtezAcademy = lazy(() => import('@/sections/home/ProtezAcademyPromo/ProtezAcademy'))
const PartnershipsGovernmentSupport = lazy(
  () => import('@/sections/home/PartnershipsGovernmentSupport/PartnershipsGovernmentSupport')
)
const InNeed = lazy(() => import('@/sections/home/InNeed/InNeed'))
const OurResults = lazy(() => import('@/sections/home/OurResults/OurResults'))
const OurPatients = lazy(() => import('@/sections/home/OurPatients/OurPatients'))
const OfficeLocations = lazy(() => import('@/sections/home/OfficeLocations/OfficeLocations'))
const Veterans = lazy(() => import('@/sections/home/Veterans/Veterans'))
const OurEvents = lazy(() => import('@/sections/home/OurEvents/OurEvents'))
const PritezFoundationNews = lazy(
  () => import('@/sections/home/PritezFoundationNews/PritezFoundationNews')
)
const MeetOurTeam = lazy(() => import('@/sections/home/MeetOurTeam/MeetOurTeam'))
const SpecialThanksToAllOurPartners = lazy(
  () => import('@/sections/_shared/SpecialThanksToAllOurPartners')
)
const MailingList = lazy(() => import('@/sections/_shared/MailingList/MailingList'))
// const Merch = lazy(() => import('@/sections/home/Merch/Merch'))
const Footer = lazy(() => import('@/sections/_shared/Footer'))

export default function ProtezHomePage({
  currentMonth,
  ourEvents,
}: {
  currentMonth: CurrentMonth
  ourEvents: SingleEvent[] | null
}) {
  const t = useTranslations('home.root')

  return (
    <>
      <main className={style.main}>
        <SuspenseSection withSmoke>
          <div className={style.flagsBlock}>
            <Hero />

            <ProtezImage
              src={`flag-usa.png`}
              alt={t('alts.americanFlag')}
              priority
              width={1306}
              height={1890}
              className={style.americanFlag}
            />
            {/* Independent Suspense so Hero and the flag render immediately
                while PartnershipsGovernmentSupport hydrates above the fold. */}
            <Suspense fallback={<FullScreenFallback />}>
              <PartnershipsGovernmentSupport />
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

        {ourEvents && ourEvents.length > 0 && (
          <SuspenseSection withSmoke>
            <OurEvents ourEvents={ourEvents} />
          </SuspenseSection>
        )}

        <SuspenseSection>
          <PritezFoundationNews />
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
