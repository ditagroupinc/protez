import styles from './style.module.scss'

import ProtezImage from '@/components/ProtezImage'
import { useAcademyTexts } from '@/hooks/useAcademyTexts'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import Divider from '@/components/Divider'

import { AcademyIDs } from '../../consts'
import { DONATE_URL } from '../../consts/links'

import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyTexts()
  const { desktop: titleDesktop } = useAcademyTitle('footer')

  return (
    <footer ref={ref} id={AcademyIDs.Footer} className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopContent}>
          <div className={styles.right}>
            <ProtezImage {...titleDesktop} className={styles.footerLogo} />
            <div className={styles.buttonGroup}>
              <a href={DONATE_URL} className={styles.supportAcademyButton}>
                {t.cta.support}
              </a>
            </div>
          </div>
          <div className={styles.left}>
            <p>{t.footer.nonprofit}</p>
            <Divider className={styles.divider} />
            <p className={styles.descTitle}>{t.footer.legalAddressLabel}</p>
            <p className={styles.descAddress}>{t.footer.legalAddress}</p>
            <a href="tel:+380509843356" className={styles.descTitle}>
              {t.footer.phone}
            </a>
            <p className={styles.descTitle}>{t.footer.email}</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>{t.footer.copyright}</span>
        <a href="/termsConditions" className={styles.termsLink}>
          {t.footer.terms}
        </a>
      </div>
    </footer>
  )
})

export default Footer
