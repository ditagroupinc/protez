'use client'

import style from './style.module.scss'
import icons from './icons'
import Link from 'next/link'

import { useLocale } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import Section from '@/components/Section'
import Footer from '@/sections/_shared/Footer'
import ProtezImage from '@/components/ProtezImage'

const partnersLogos = [
  'direct-relief',
  'brain-robotics',
  'ottobock',
  'exp',
  'blatchfold',
  'chalice-of-mercy',
  'xtremity',
  'cozen',
  'st-constantin',
  'paradize',
  'klmb',
  'united-help-ukraine',
  'mhp',
  'ua',
  'cerebral',
  'slumberland',
  'biznes',
  'st-maron',
  'humana-travel',
  'smak',
  'ukrainian-habitat-fund',
  'ticket-to-america',
  'evangelical-church',
  'highlight-printing',
  '4-front',
  'proteor',
  'monarch',
  'ukrsibbank',
  'dita-group',
  'ossur',
]

export default function Partners() {
  const locale = useLocale()
  const lang = localeToLanguage(locale)

  return (
    <>
      <main>
        <Section className={style.section} id="allOurPartners">
          {icons.partnersLogo.desktop[lang](style.title)}
          <div className={style.container}>
            {partnersLogos.slice(0, -2).map((icon, index) => (
              <TextAppearanceWrapper key={index} className={style.partnerCard}>
                <ProtezImage
                  src={`partners/dark/${icon}_dark.svg`}
                  alt={icon}
                  width={300}
                  height={150}
                  className={style.partnerLogo}
                />
                <ProtezImage
                  src={`partners/colored/${icon}_colored.svg`}
                  alt={icon}
                  width={300}
                  height={150}
                  className={style.partnerLogoColor}
                />
              </TextAppearanceWrapper>
            ))}
            <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
              <ProtezImage
                src={`partners/dark/${partnersLogos[28]}_dark.svg`}
                alt="Dita Group"
                width={300}
                height={150}
                className={style.partnerLogo}
              />
              <ProtezImage
                src={`partners/colored/${partnersLogos[28]}_colored.svg`}
                alt="Dita Group"
                width={300}
                height={150}
                className={style.partnerLogoColor}
              />
            </Link>
            <TextAppearanceWrapper className={style.partnerCard}>
              <ProtezImage
                src={`partners/dark/${partnersLogos[29]}_dark.svg`}
                alt={partnersLogos[29]}
                width={300}
                height={150}
                className={style.partnerLogo}
              />
              <ProtezImage
                src={`partners/colored/${partnersLogos[29]}_colored.svg`}
                alt={partnersLogos[29]}
                width={300}
                height={150}
                className={style.partnerLogoColor}
              />
            </TextAppearanceWrapper>
          </div>
        </Section>
      </main>
      <Footer layout="protezPage" />
    </>
  )
}
