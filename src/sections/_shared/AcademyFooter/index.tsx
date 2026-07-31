'use client'

import styles from './style.module.scss'

import ProtezImage from '@/components/ProtezImage'
import { useTranslations } from 'next-intl'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'

import Divider from '@/components/Divider'

import { AcademyIDs } from '@academy/consts'
import { Link } from '@/lib/i18n'
import { DONATE_URL } from '@academy/consts/links'

import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academy')
  const { desktop: titleDesktop } = useAcademyTitle('footer')

  return (
    <footer ref={ref} id={AcademyIDs.Footer} className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopContent}>
          <div className={styles.right}>
            <ProtezImage {...titleDesktop} className={styles.title} />
            <div className={styles.buttonGroup}>
              <Link href={DONATE_URL} className={styles.supportAcademyButton}>
                {t('cta.support')}
              </Link>
            </div>
          </div>
          <div className={styles.left}>
            <p>{t('footer.nonprofit')}</p>
            <Divider className={styles.divider} />
            <p className={styles.descTitle}>{t('footer.legalAddressLabel')}</p>
            <p className={styles.descAddress}>{t('footer.legalAddress')}</p>
            <a href="tel:+380509843356" className={styles.descTitle}>
              {t('footer.phone')}
            </a>
            <p className={styles.descTitle}>{t('footer.email')}</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>{t('footer.copyright')}</span>
        <Link href="/academy/terms-conditions" className={styles.termsLink}>
          {t('footer.terms')}
        </Link>
      </div>
    </footer>
  )
})

Footer.displayName = 'AcademyFooter'

export default Footer
