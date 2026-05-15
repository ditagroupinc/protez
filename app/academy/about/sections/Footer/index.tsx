import styles from './style.module.scss'

import { useAcademyAboutTexts } from '@/hooks/useAcademyAboutTexts'

import { AcademyAboutIDs } from '../../consts'

import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const t = useAcademyAboutTexts()

  return (
    <footer ref={ref} id={AcademyAboutIDs.Footer} className={styles.footer}>
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
