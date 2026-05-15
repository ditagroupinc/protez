import AcademySection from '@academy/components/AcademySection'

import ProtezImage from '@/components/ProtezImage'

import styles from './styles.module.scss'

import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

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
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('special-thanks-to-all-our-partners')

  return (
    <AcademySection
      id={AcademyIDs.SpecialThanksToAllOurPartners}
      className={styles.specialThanksToAllOurPartners}
    >
      <TextAppearanceWrapper className={styles.titleCell}>
        <ProtezImage {...titleDesktop} className={styles.title} />
      </TextAppearanceWrapper>
      {t.specialThanksToAllOurPartners.items.map((icon, index) => (
        <Card icon={icon} key={index} />
      ))}
    </AcademySection>
  )
}

export default SpecialThanksToAllOurPartners
