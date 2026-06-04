'use client'

import styles from './style.module.scss'

import { useTranslations } from 'next-intl'

import { AcademyAboutIDs } from '@academy/consts/about'

import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useTranslations('academyAbout')

  return (
    <footer ref={ref} id={AcademyAboutIDs.Footer} className={styles.footer}>
      <div className={styles.footerBottom}>
        <span>{t('footer.copyright')}</span>
        <a href="/about/terms-conditions" className={styles.termsLink}>
          {t('footer.terms')}
        </a>
      </div>
    </footer>
  )
})

Footer.displayName = 'AcademyAboutFooter'

export default Footer
