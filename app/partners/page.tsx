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
  'dita',
  'ottobock',
  'antonov',
  'blatchford',
  'chaliceOfMercy',
  'xtremity',
  'cozen',
  'sTconstantine',
  'paradise',
  'klmb',
  'ukraine',
  'cerebral',
  'slumberland',
  'businessBus',
  'stMaron',
  'humanaTravel',
  'smak',
  'uhf',
  'ticketToAmerica',
  'fubcom',
  'highlightPrinting',
  '4front',
  'proteor',
  'monarch',
  'ukrsib',
  'ossur',
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
            <TextAppearanceWrapper className={style.partnerCard}>
              <ProtezImage
                src={`partnersLogos/${partnersLogos[0]}.svg`}
                alt={partnersLogos[0]}
                width={300}
                height={230}
                className={style.partnerLogo}
              />
              <ProtezImage
                src={`partnersLogos/${partnersLogos[0]}-color.svg`}
                alt={partnersLogos[0]}
                width={300}
                height={230}
                className={style.partnerLogoColor}
              />
            </TextAppearanceWrapper>

            <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
              <ProtezImage
                src={`partnersLogos/${partnersLogos[1]}.svg`}
                alt={'Dita Group'}
                width={300}
                height={230}
                className={style.partnerLogo}
              />
              <ProtezImage
                src={`partnersLogos/${partnersLogos[1]}-color.svg`}
                alt={'Dita Group'}
                width={300}
                height={230}
                className={style.partnerLogoColor}
              />
            </Link>
            {partnersLogos.slice(2, 27).map((icon, index) => (
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
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
