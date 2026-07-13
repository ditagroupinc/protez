import { icons } from './icons'
import { ProtezIDs } from '@/consts'
import { AcademyIDs } from '@academy/consts'

export type HeaderVariant = 'home' | 'academy'
export type HeaderSideMenu = HeaderVariant | 'none'

type VariantConfig = {
  accent: 'red' | 'blue'
  logoRender: (className?: string) => JSX.Element
  homeAnchor: string
}

export const headerConfig: Record<HeaderVariant, VariantConfig> = {
  home: {
    accent: 'red',
    logoRender: icons.protezPage.logo,
    homeAnchor: ProtezIDs.LetsGiveHope,
  },
  academy: {
    accent: 'blue',
    logoRender: icons.academyPage.logo,
    homeAnchor: AcademyIDs.Intro,
  },
}

export const HOME_NAV_IDS = [
  ProtezIDs.LetsGiveHope,
  ProtezIDs.PeopleTrustUs,
  ProtezIDs.ProstheticsForUkrainians,
  ProtezIDs.InNeed,
  ProtezIDs.OurResults,
  ProtezIDs.ChildrensProstheticsPromo,
  ProtezIDs.SampleProsthesesCosts,
  ProtezIDs.ProtezAcademy,
  ProtezIDs.Veterans,
  ProtezIDs.Events,
  ProtezIDs.PressRelease,
  ProtezIDs.OurPatients,
  ProtezIDs.MeetOurTeam,
  ProtezIDs.OfficeLocations,
  ProtezIDs.SpecialThanksToAllOurPartners,
  ProtezIDs.MailingList,
  ProtezIDs.Merch,
] as const

export const ACADEMY_NAV_IDS = [
  AcademyIDs.Intro,
  AcademyIDs.MissionAndValues,
  AcademyIDs.OurGoals,
  AcademyIDs.Academy,
  AcademyIDs.OurResults,
  AcademyIDs.Chief,
  AcademyIDs.PastAndUpcomingEvents,
  AcademyIDs.AcademyStudents,
  AcademyIDs.SummitResults,
  AcademyIDs.SpecialThanksToAllOurPartners,
  AcademyIDs.OurSponsors,
] as const

export const NEED_A_PROTHESIS_URL = 'https://forms.gle/WUVBvfZhYJsanGVbA'
export const HOME_PHONE = '+1 612-997-2005'
export const HOME_PHONE_TEL = 'tel:+16129972005'
export const ACADEMY_PHONE_TEL = 'tel:+16127724777'
