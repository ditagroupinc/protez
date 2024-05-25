import styles from './style.module.scss'

import Button from '@/components/Button'

import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { icons } from './icons'
import Divider from '@/components/Divider'

const Footer = () => {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopContent}>
          <div className={styles.right}>
            {width < 800
              ? icons.footerLogo.mobile[lang](styles.footerLogo)
              : icons.footerLogo.desktop[lang](styles.footerLogo)}

            <div className={styles.buttonGroup}>
              <Button as="link" variant="primary-white" href="/" className={styles.button}>
                Subscribe
              </Button>
              <Button as="link" variant="secondary-fill-black" href="/" className={styles.button}>
                Support Academy
              </Button>
            </div>
          </div>
          <div className={styles.left}>
            <p>Nonprofit organization 501(c)(3) EIN: 88-2437069</p>
            <Divider className={styles.divider} />
            <p className={styles.descTitle}>Please send checks to:</p>
            <p className={styles.descAddress}>
              Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America
            </p>
            <p className={styles.descTitle}>info@protezfoundation.com</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>2024 © Made by DITA GROUP Inc.</div>
    </footer>
  )
}

export default Footer
