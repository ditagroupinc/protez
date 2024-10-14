import Section from '@/components/Section'

import Image from 'next/image'

import style from './style.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { ProtezIDs } from '../../../app/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Link from 'next/link'
import ProtezButton from '@/components/ProtezButton'

const specialThanksToAllOurPartnersSection = {
  discoverAllPartners: {
    english: 'Discover all partners',
    ukrainian: 'Discover all partners',
  },
}

const partnersIcons: string[] = [
  'directRelief',
  'chaliceOfMercy',
  'ottobock',
  'paradise',
  'klmb',
  'monarch',
  'antonov',
  'cozen',
  'blatchford',
]

const SpecialThanksToAllOurPartners = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <Section id={ProtezIDs.SpecialThanksToAllOurPartners} className={style.section}>
      <div className={style.buttonCell}>
        <ProtezButton
          squared
          as="link"
          href="/"
          variant="primary-black"
          arrow
          className={style.discoverAllButton}
          target="_blank"
        >
          <span className={style.buttonText}>
            {specialThanksToAllOurPartnersSection.discoverAllPartners[lang]}
          </span>
        </ProtezButton>
      </div>
      <div className={style.titleCell}>
        {width < 600
          ? icons.specialThanksToAllOurPartnersLogo.mobile[lang](style.title)
          : icons.specialThanksToAllOurPartnersLogo.desktop[lang](style.title)}
      </div>
      {partnersIcons.map((icon, index) => (
        <TextAppearanceWrapper key={index} className={style.partnerCard}>
          <Image
            // TODO: remove after review

            src={`/protez/protezPage/partnersLogos/${icon}.svg`}
            alt={icon}
            width={300}
            height={230}
            className={style.partnerLogo}
          />
          <Image
            // TODO: remove after review

            src={`/protez/protezPage/partnersLogos/${icon}-color.svg`}
            alt={icon}
            width={300}
            height={230}
            className={style.partnerLogoColor}
          />
        </TextAppearanceWrapper>
      ))}

      <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
        <Image
          // TODO: remove after review

          src={`/protez/protezPage/partnersLogos/dita.svg`}
          alt={'Dita Group'}
          width={300}
          height={230}
          className={style.partnerLogo}
        />
        <Image
          // TODO: remove after review

          src={`/protez/protezPage/partnersLogos/dita-color.svg`}
          alt={'Dita Group'}
          width={300}
          height={230}
          className={style.partnerLogoColor}
        />
      </Link>
    </Section>
  )
}

export default SpecialThanksToAllOurPartners
