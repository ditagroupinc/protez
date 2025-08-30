'use client'

import style from './style.module.scss'
import icons from './icons'
import Link from 'next/link'

import { useLanguage } from '@/contexts/LanguageContext'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import Section from '@/components/Section'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import ProtezImage from '@/components/ProtezImage'

const partnersLogos = [
  'directRelief',
  'brainRobotics',
  'ottobock',
  'exp',
  'blatchfold',
  'chaliceOfMercy',
  'xtremity',
  'cozen',
  'stconstantin',
  'paradize',
  'klmb',
  'unitedhelpukraine',
  'mhp',
  'ua',
  'cerebral',
  'slumberland',
  'biznes',
  'stMaron',
  'humanaTravel',
  'smak',
  'ukrainianhabitatFund',
  'ticketToAmerica',
  'evangelicalchurch',
  'highlightPrinting',
  '4front',
  'proteor',
  'monarch',
  'ukrsibbank',
  'ditagroup',
  'ossur',
  // New elements not in original partnersLogos
  // 'donorbox',
]

export default function AllOurPartners() {
  const { lang } = useLanguage()

  return (
    <>
      <Header layout="protezPage" ancorLinks={false} arrowUp={false} />
      <main>
        <Section className={style.section} id="allOurPartners">
          {icons.partnersLogo.desktop[lang](style.title)}
          <div className={style.container}>
            {partnersLogos.slice(0, -2).map((icon, index) => (
              <TextAppearanceWrapper key={index} className={style.partnerCard}>
                <ProtezImage
                  src={`partnersLogos/${icon}.svg`}
                  alt={icon}
                  width={300}
                  height={150}
                  className={style.partnerLogo}
                />
                <ProtezImage
                  src={`partnersLogos/${icon}-color.svg`}
                  alt={icon}
                  width={300}
                  height={150}
                  className={style.partnerLogoColor}
                />
              </TextAppearanceWrapper>
            ))}
            <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
              <ProtezImage
                src={`partnersLogos/${partnersLogos[28]}.svg`}
                alt={'Dita Group'}
                width={300}
                height={150}
                className={style.partnerLogo}
              />
              <ProtezImage
                src={`partnersLogos/${partnersLogos[28]}-color.svg`}
                alt={'Dita Group'}
                width={300}
                height={150}
                className={style.partnerLogoColor}
              />
            </Link>
            <TextAppearanceWrapper className={style.partnerCard}>
              <ProtezImage
                src={`partnersLogos/${partnersLogos[29]}.svg`}
                alt={partnersLogos[29]}
                width={300}
                height={150}
                className={style.partnerLogo}
              />
              <ProtezImage
                src={`partnersLogos/${partnersLogos[29]}-color.svg`}
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
