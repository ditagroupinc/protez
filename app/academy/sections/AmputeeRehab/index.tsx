import { icons } from './icons'
import styles from './styles.module.scss'

import Button from '@academy/components/Button'

import ProtezImage from '@/components/ProtezImage'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'
import { AcademyIDs } from '../../consts'
import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '../../consts/links'

const AmputeeRehab = () => {
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('amputeeRehab')

  return (
    <section id={AcademyIDs.AmputeeRehab} className={styles.amputeeRehab}>
      <ProtezImage
        src="academyPage/amputeeRehab/summit.png"
        alt={t.amputeeRehab.imageAlt}
        width={1920}
        height={880}
        className={styles.amputeeRehabImage}
      />

      <div className={styles.amputeeRehabOverlay}>
        <div className={styles.amputeeRehabContent}>
          <div className={styles.left}>
            <TextAppearanceWrapper>
              <ProtezImage {...titleDesktop} className={styles.title} />
            </TextAppearanceWrapper>
            <TextAppearanceWrapper>
              <p className={styles.description}>{t.amputeeRehab.description}</p>
            </TextAppearanceWrapper>
            <TextAppearanceWrapper className={styles.buttons}>
              <Button
                as={'link'}
                variant="primary-blue"
                size="big"
                href={ACADEMY_APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                {t.cta.apply}
              </Button>
              <Button
                as={'link'}
                variant="secondary-white"
                size="big"
                href={DONATE_URL}
                className={styles.button}
              >
                {t.cta.support}
                {icons.arrowUp(styles.arrowUp)}
              </Button>
            </TextAppearanceWrapper>
          </div>
          <div className={styles.right}>
            {t.amputeeRehab.partners.map(({ src, alt }, index) => (
              <TextAppearanceWrapper key={index} className={styles.card}>
                <ProtezImage
                  src={`academyPage/partners/white/${src}`}
                  alt={alt}
                  width={300}
                  height={150}
                  className={styles.partnerLogo}
                />
              </TextAppearanceWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AmputeeRehab
