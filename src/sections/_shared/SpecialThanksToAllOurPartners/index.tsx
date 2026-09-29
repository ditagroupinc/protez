'use client'

import Section from '@/components/Section'

import SectionTitle from '@/components/SectionTitle'
import { playfairDisplayItalic } from '../../../../app/fonts'
import style from './style.module.scss'

import { useTranslations } from 'next-intl'

import { ProtezIDs } from '@/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { SeeAllButton } from '@/components/Button'
import ProtezImage from '@/components/ProtezImage'

const partnersIcons: string[] = [
  'direct-relief',
  'brain-robotics',
  'ottobock',
  'paradize',
  'klmb',
  'monarch',
  'chalice-of-mercy',
  'exp',
  'cozen',
  'blatchfold',
  'fabtech',
  'xtremity',
  'st-constantin',
  'united-help-ukraine',
  'mhp',
]

const SpecialThanksToAllOurPartners = () => {
  const t = useTranslations('shared.specialThanksToAllOurPartners')

  return (
    <Section id={ProtezIDs.SpecialThanksToAllOurPartners} className={style.section}>
      <div className={style.buttonCell}>
        <SeeAllButton href="/partners" className={style.discoverAllButton}>
          <span className={style.buttonText}>{t('discoverAllPartners')}</span>
        </SeeAllButton>
      </div>
      <div className={style.titleCell}>
        <SectionTitle className={style.title}>
          <span className={style.titleLine}>{t('title.first')}</span>{' '}
          <span
            className={`${style.titleLine} ${style.titleAccent} ${playfairDisplayItalic.className}`}
          >
            {t('title.accent')}
          </span>{' '}
          <span className={style.titleLine}>{t('title.plain')}</span>
        </SectionTitle>
      </div>
      {partnersIcons.map((icon, index) => (
        <TextAppearanceWrapper key={index} className={style.partnerCard}>
          <ProtezImage
            src={`partners/dark/${icon}_dark.svg`}
            alt={icon}
            width={300}
            height={230}
            className={style.partnerLogo}
          />
          <ProtezImage
            src={`partners/colored/${icon}_colored.svg`}
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
