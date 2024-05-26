import { icons } from './icons'
import styles from './styles.module.scss'

import Button from '@/components/Button'

import Image from 'next/image'

import { useLanguage } from '@/contexts/LanguageContext'

const AmputeeRehab = () => {
  const { lang } = useLanguage()

  return (
    <section id="amputeeRehab" className={styles.amputeeRehab}>
      <Image
        src="/summit.jpg"
        alt="summit"
        width={1920}
        height={880}
        layout="responsive"
        className={styles.amputeeRehabImage}
      />

      <div className={styles.amputeeRehabOverlay}>
        <div className={styles.amputeeRehabContent}>
          <div className={styles.left}>
            {icons.amputeeRehabLogo.desktop[lang]()}
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam.
              Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc
              suspendisse donec varius integer nisi urna eu. Egestas et id nunc ultrices sit ut
            </p>
            <div className={styles.buttons}>
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
            </div>
          </div>
          <div className={styles.right}>
            {icons.partnersLogos.map((logo, index) => (
              <div key={index} className={styles.card}>
                {logo(styles.partnerLogo)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AmputeeRehab
