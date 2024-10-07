import Section from '@/components/Section'

import Image from 'next/image'

import style from './style.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { ProtezIDs } from '../consts'

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
  'directRelief.svg',
  'chaliceOfMercy.svg',
  'ottobock.svg',
  'paradise.svg',
  'klmb.svg',
  'monarch.svg',
  // 'dita.svg',
  'antonovGroup.svg',
  'cozen.svg',
  'blatchfold.svg',
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

            src={`/protez/partnersLogos/${icon}`}
            alt={icon}
            width={300}
            height={230}
            className={style.partnerLogo}
          />
        </TextAppearanceWrapper>
      ))}

      <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
        {icons.ditaLogo(`${style.partnerLogo} ${style.ditaLogo}`)}
      </Link>
    </Section>
  )
}

export default SpecialThanksToAllOurPartners
