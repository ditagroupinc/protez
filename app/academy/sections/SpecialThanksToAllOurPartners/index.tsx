import AcademySection from '@/components/AcademySection'

import Button from '@/components/Button'

import Image from 'next/image'

import styles from './styles.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { AcademyIDs } from '../../consts'

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
  <TextAppearanceWrapper className={styles.partnerCard}>
    <Image
      // TODO: remove after review

      src={`/protez/partnersLogos/${icon}`}
      alt={icon}
      width={300}
      height={230}
      className={styles.partnerLogo}
    />
  </TextAppearanceWrapper>
)

const SpecialThanksToAllOurPartners = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <AcademySection
      id={AcademyIDs.SpecialThanksToAllOurPartners}
      className={styles.specialThanksToAllOurPartners}
    >
      <div className={styles.buttonCell}>
        <Button as="link" href="/" variant="secondary-fill-black" className={styles.button}>
          Discover all <br />
          Partners
          {icons.arrowUp()}
        </Button>
      </div>
      <div className={styles.titleCell}>
        {width < 600
          ? icons.specialThanksToAllOurPartnersLogo.mobile[lang]()
          : icons.specialThanksToAllOurPartnersLogo.desktop[lang]()}
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
      <Link href="https://dita-group.com/" target="blank" className={styles.partnerCard}>
        {icons.ditaLogo(styles.ditaLogo)}
      </Link>
    </AcademySection>
  )
}

export default SpecialThanksToAllOurPartners
