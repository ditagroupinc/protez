import Section from '@/components/Section'

import style from './style.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import { useSharedTexts } from '@/hooks/useSharedTexts'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { ProtezIDs } from '@/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { SeeAllButton } from '@/components/Button'
import ProtezImage from '@/components/ProtezImage'

const partnersIcons: string[] = [
  'directRelief',
  'brainRobotics',
  'ottobock',
  'paradize',
  'klmb',
  'monarch',
  'chaliceOfMercy',
  'exp',
  'cozen',
  'blatchfold',
  'fabtech',
  'xtremity',
  'stconstantin',
  'unitedhelpukraine',
  'mhp',
]

const SpecialThanksToAllOurPartners = () => {
  const { lang } = useLanguage()
  const t = useSharedTexts().specialThanksToAllOurPartners
  const { width } = useScreenModeAndSize()

  return (
    <Section id={ProtezIDs.SpecialThanksToAllOurPartners} className={style.section}>
      <div className={style.buttonCell}>
        <SeeAllButton href="/partners" className={style.discoverAllButton}>
          <span className={style.buttonText}>{t.discoverAllPartners}</span>
        </SeeAllButton>
      </div>
      <div className={style.titleCell}>
        {width < 600
          ? icons.specialThanksToAllOurPartnersLogo.mobile[lang](style.title)
          : icons.specialThanksToAllOurPartnersLogo.desktop[lang](style.title)}
      </div>
      {partnersIcons.map((icon, index) => (
        <TextAppearanceWrapper key={index} className={style.partnerCard}>
          <ProtezImage
            src={`partnersLogos/${icon}.svg`}
            alt={icon}
            width={300}
            height={230}
            className={style.partnerLogo}
          />
          <ProtezImage
            src={`partnersLogos/${icon}-color.svg`}
            alt={icon}
            width={300}
            height={230}
            className={style.partnerLogoColor}
          />
        </TextAppearanceWrapper>
      ))}
    </Section>
  )
}

export default SpecialThanksToAllOurPartners
