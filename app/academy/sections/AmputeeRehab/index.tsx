import { icons } from './icons'
import styles from './styles.module.scss'

import Button from '@academy/components/Button'

import ProtezImage from '@/components/ProtezImage'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useLanguage } from '@/contexts/LanguageContext'
import { AcademyIDs } from '../../consts'

const partnersLogos = [
  { src: 'esper_white.svg', alt: 'Esper' },
  { src: 'direct-relief_white.svg', alt: 'Direct Relief' },
  { src: 'dita-group_white.svg', alt: 'Dita Group' },
]

const AmputeeRehab = () => {
  const { lang } = useLanguage()

  return (
    <section id={AcademyIDs.AmputeeRehab} className={styles.amputeeRehab}>
      <ProtezImage
        // TODO: remove after review
        src="academyPage/amputeeRehab/summit.png"
        alt="summit"
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
            <TextAppearanceWrapper>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam.
                Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc
                suspendisse donec varius integer nisi urna eu. Egestas et id nunc ultrices sit ut
              </p>
            </TextAppearanceWrapper>
            <TextAppearanceWrapper className={styles.buttons}>
              <Button
                as={'link'}
                variant="primary-blue"
                size="big"
                href={'/'}
                className={styles.button}
              >
                Apply to Academy
              </Button>
              <Button
                as={'link'}
                variant="secondary-white"
                size="big"
                href={'/'}
                className={styles.button}
              >
                Support Academy
                {icons.arrowUp(styles.arrowUp)}
              </Button>
            </TextAppearanceWrapper>
          </div>
          <div className={styles.right}>
            {partnersLogos.map(({ src, alt }, index) => (
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
