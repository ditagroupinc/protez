import styles from './style.module.scss'

import { useLanguage } from '@/contexts/LanguageContext'

import { icons } from './icons'
import Divider from '@/components/Divider'

import { AcademyIDs } from '../../consts'

import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  // const { width } = useScreenModeAndSize()

  return (
    <footer ref={ref} id={AcademyIDs.Footer} className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopContent}>
          <div className={styles.right}>
            {icons.footerLogo.desktop[lang](styles.footerLogo)}
            <div className={styles.buttonGroup}>
              <button className={styles.supportAcademyButton}>Support Academy</button>
            </div>
          </div>
          <div className={styles.left}>
            <p>Nonprofit organization 501(c)(3) EIN: 88-2437069</p>
            <Divider className={styles.divider} />
            <p className={styles.descTitle}>Юридична адреса:</p>
            <p className={styles.descAddress}>вул. Хрещатик, 7/11</p>
            <a href="tel:+380509843356" className={styles.descTitle}>
              +38 050 984 33 56
            </a>
            <p className={styles.descTitle}>info@protezfoundation.com</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>2026 © Made by DITA GROUP Inc.</span>
        <a href="/termsConditions" className={styles.termsLink}>
          Умови та правила сайту
        </a>
      </div>
    </footer>
  )
})

export default Footer
