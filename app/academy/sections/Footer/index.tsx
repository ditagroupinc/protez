import style from './style.module.scss'

import Button from '@/components/Button'

import { useLanguage } from '@/contexts/LanguageContext'
// import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import { icons } from './icons'
import Divider from '@/components/Divider'

import { AcademyIDs } from '../../consts'

import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  // const { width } = useScreenModeAndSize()

  return (
    <footer ref={ref} id={AcademyIDs.Footer} className={style.footer}>
      <div className={style.footerTop}>
        <div className={style.footerTopContent}>
          <div className={style.right}>
            {/* {width < 800
              ? icons.footerLogo.mobile[lang](style.footerLogo)
              : icons.footerLogo.desktop[lang](style.footerLogo)} */}
            {icons.footerLogo.mobile[lang](style.footerLogo)}

            <div className={style.buttonGroup}>
              <Button as="link" variant="primary-white" href="/" className={style.button}>
                Subscribe
              </Button>
              {/* <Button as="link" variant="secondary-fill-black" href="/" className={style.button}>
                Support Academy
              </Button> */}
              <button className={style.supportAcademyButton}>Support Academy</button>
            </div>
          </div>
          <div className={style.left}>
            <p>Nonprofit organization 501(c)(3) EIN: 88-2437069</p>
            <Divider className={style.divider} />
            <p className={style.descTitle}>Please send checks to:</p>
            <p className={style.descAddress}>
              Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America
            </p>
            <p className={style.descTitle}>info@protezfoundation.com</p>
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>2024 © Made by DITA GROUP Inc.</div>
    </footer>
  )
})

export default Footer
