import AcademySection from '@academy/components/AcademySection'

import ProtezImage from '@/components/ProtezImage'

import styles from './styles.module.scss'
import { icons } from './icons'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'

import { AcademyIDs } from '../../consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const Card = ({ icon }: { icon: string }): React.ReactElement => (
  <TextAppearanceWrapper className={styles.card}>
    <ProtezImage
      src={`academyPage/partners/dark/${icon}`}
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
  const t = useAcademyTexts()

  return (
    <AcademySection
      id={AcademyIDs.SpecialThanksToAllOurPartners}
      className={styles.specialThanksToAllOurPartners}
    >
      <TextAppearanceWrapper className={styles.titleCell}>
        {width < 600
          ? icons.specialThanksToAllOurPartnersLogo.mobile[lang](styles.title)
          : icons.specialThanksToAllOurPartnersLogo.desktop[lang](styles.title)}
      </TextAppearanceWrapper>
      {t.specialThanksToAllOurPartners.items.map((icon, index) => (
        <Card icon={icon} key={index} />
      ))}
    </AcademySection>
  )
}

export default SpecialThanksToAllOurPartners
