'use client'

import style from './style.module.scss'
import icons from './icons'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '@/contexts/LanguageContext'
// import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import Section from '@/components/Section'
import ProtezHeader from '@/sections/protez/ProtezHeader'
import Footer from '@/sections/Footer'

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
  // const { width } = useScreenModeAndSize()

  return (
    <>
      <ProtezHeader ancorLinks={false} arrowUp={false} />
      <main>
        <Section className={style.section} id="allOurPartners">
          {icons.partnersLogo.desktop[lang](style.title)}
          <div className={style.container}>
            <TextAppearanceWrapper className={style.partnerCard}>
              <Image
                // TODO: remove after review
                src={`/protez/partnersLogos/${partnersLogos[0]}.svg`}
                alt={partnersLogos[0]}
                width={300}
                height={230}
                className={style.partnerLogo}
              />
              <Image
                // TODO: remove after review
                src={`/protez/partnersLogos/${partnersLogos[0]}-color.svg`}
                alt={partnersLogos[0]}
                width={300}
                height={230}
                className={style.partnerLogoColor}
              />
            </TextAppearanceWrapper>

            <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
              <Image
                // TODO: remove after review
                src={`/protez/partnersLogos/dita.svg`}
                alt={'Dita Group'}
                width={300}
                height={230}
                className={style.partnerLogo}
              />
              <Image
                // TODO: remove after review
                src={`/protez/partnersLogos/dita-color.svg`}
                alt={'Dita Group'}
                width={300}
                height={230}
                className={style.partnerLogoColor}
              />
            </Link>
            {partnersLogos.slice(2, 27).map((icon, index) => (
              <TextAppearanceWrapper key={index} className={style.partnerCard}>
                <Image
                  // TODO: remove after review
                  src={`/protez/partnersLogos/${icon}.svg`}
                  alt={icon}
                  width={300}
                  height={230}
                  className={style.partnerLogo}
                />
                <Image
                  // TODO: remove after review
                  src={`/protez/partnersLogos/${icon}-color.svg`}
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
