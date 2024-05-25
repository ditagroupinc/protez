import AcademySection from '../AcademySection'

import Button from '@/components/Button'

import Image from 'next/image'

import styles from './styles.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const partnersIcons: string[] = [
  'directRelief.svg',
  'chaliceOfMercy.svg',
  'ottobock.svg',
  'paradise.svg',
  'klmb.svg',
  'monarch.svg',
  'dita.svg',
  'antonovGroup.svg',
  'cozen.svg',
  'blatchfold.svg',
]

const PartnerCard = ({ icon }: { icon: string }): React.ReactElement => (
  <div className={styles.partnerCard}>
    <Image
      src={`/partnersLogos/${icon}`}
      alt={icon}
      width={300}
      height={230}
      className={styles.partnerLogo}
    />
  </div>
)

const SpecialThanksToAllOurPartners = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <AcademySection
      id="specialThanksToAllOurPartners"
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
    </AcademySection>
  )
}

export default SpecialThanksToAllOurPartners
