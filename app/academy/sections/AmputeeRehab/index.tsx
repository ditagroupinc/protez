import { icons } from './icons'
import styles from './styles.module.scss'

import Button from '@academy/components/Button'

import ProtezImage from '@/components/ProtezImage'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useLanguage } from '@/contexts/LanguageContext'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { AcademyIDs } from '../../consts'

const AmputeeRehab = () => {
  const { lang } = useLanguage()
  const t = useAcademyTexts()

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
              {icons.amputeeRehabLogo.desktop[lang](styles.title)}
            </TextAppearanceWrapper>
            <TextAppearanceWrapper className={styles.buttons}>
              <Button
                as={'link'}
                variant="primary-blue"
                size="big"
                href={'/'}
                className={styles.button}
              >
                {t.amputeeRehab.cta.apply}
              </Button>
              <Button
                as={'link'}
                variant="secondary-white"
                size="big"
                href={'/'}
                className={styles.button}
              >
                {t.amputeeRehab.cta.support}
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
