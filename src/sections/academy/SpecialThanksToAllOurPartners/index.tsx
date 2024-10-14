import Section from '@/components/Section'

import Button from '@/components/Button'

import Image from 'next/image'

import style from './style.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { AcademyIDs } from '../../../../app/academy/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import Link from 'next/link'

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

const PartnerCard = ({ icon }: { icon: string }): React.ReactElement => (
  <TextAppearanceWrapper className={style.partnerCard}>
    <Image
      // TODO: remove after review

      src={`/protez/partnersLogos/${icon}`}
      alt={icon}
      width={300}
      height={230}
      className={style.partnerLogo}
    />
  </TextAppearanceWrapper>
)

const SpecialThanksToAllOurPartners = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <Section
      id={AcademyIDs.SpecialThanksToAllOurPartners}
      className={style.specialThanksToAllOurPartners}
    >
      <div className={style.buttonCell}>
        <Button as="link" href="/" variant="secondary-fill-black" className={style.button}>
          Discover all <br />
          Partners
          {icons.arrowUp()}
        </Button>
      </div>
      <div className={style.titleCell}>
        {width < 600
          ? icons.specialThanksToAllOurPartnersLogo.mobile[lang](style.title)
          : icons.specialThanksToAllOurPartnersLogo.desktop[lang](style.title)}
      </div>
      {partnersIcons.map((icon, index) => (
        <PartnerCard icon={icon} key={index} />
      ))}
      {/* <TextAppearanceWrapper>
        <Link
          href="https://dita-group.com/"
          target="blank"
          className={`${style.partnerCard} ${dita && style.dita}`}
        >
          {globalIcons.ditaLogo(`${style.partnerLogo}`)}
        </Link>
      </TextAppearanceWrapper> */}
      <Link href="https://dita-group.com/" target="blank" className={style.partnerCard}>
        {icons.ditaLogo(style.ditaLogo)}
      </Link>
    </Section>
  )
}

export default SpecialThanksToAllOurPartners
