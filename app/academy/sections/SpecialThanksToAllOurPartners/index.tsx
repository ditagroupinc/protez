import AcademySection from '@/components/AcademySection'

import Button from '@/components/Button'

import Image from 'next/image'

import styles from './styles.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { AcademyIDs } from '../../consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const partnersIcons: string[] = [
  'concordia_dark.svg',
  'minnesota_dark.svg',
  'century-collage_dark.svg',
  'school-of-medicine_dark.svg',
  'esper_dark.svg',
  'rotary_dark.svg',
  'kpi_dark.svg',
  'shupika_dark.svg',
  'beetroot_dark.svg',
  'fizychna-associasion_dark.svg',
]

const Card = ({ icon }: { icon: string }): React.ReactElement => (
  <TextAppearanceWrapper className={styles.card}>
    <Image
      // TODO: remove after review

      src={`/protez/academyPage/partners/dark/${icon}`}
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
      <div className={styles.titleCell}>
        {width < 600
          ? icons.specialThanksToAllOurPartnersLogo.mobile[lang](styles.title)
          : icons.specialThanksToAllOurPartnersLogo.desktop[lang](styles.title)}
      </div>
      {partnersIcons.map((icon, index) => (
        <Card icon={icon} key={index} />
      ))}
    </AcademySection>
  )
}

export default SpecialThanksToAllOurPartners
