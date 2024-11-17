import Section from '@/components/Section'

import style from './style.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { ProtezIDs } from '../../../app/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Link from 'next/link'
import { SeeAllButton } from '@/components/ProtezButton'
import ProtezImage from '@/components/ProtezImage'

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
        <SeeAllButton className={style.discoverAllButton}>
          <span className={style.buttonText}>
            {specialThanksToAllOurPartnersSection.discoverAllPartners[lang]}
          </span>
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

      <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
        <ProtezImage
          src={`partnersLogos/dita.svg`}
          alt={'Dita Group'}
          width={300}
          height={230}
          className={style.partnerLogo}
        />
        <ProtezImage
          src={`partnersLogos/dita-color.svg`}
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
