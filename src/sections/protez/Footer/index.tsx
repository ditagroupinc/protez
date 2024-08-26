import style from './style.module.scss'

import { useLanguage } from '@/contexts/LanguageContext'

import { icons } from './icons'
import Divider from '@/components/Divider'

import { forwardRef } from 'react'
import { ProtezIDs } from '../consts'
import ProtezButton from '@/components/ProtezButton'
import { Body } from '@/components/Typography'

const footerSection = {
  giveHope: {
    english: 'Give Hope!',
    ukrainian: 'Give Hope!',
  },
  protezAcademy: {
    english: 'Protez Academy',
    ukrainian: 'Protez Academy',
  },
  nonprofitOrganization: {
    english: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
    ukrainian: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
  },
  sendChecks: {
    english: 'Please send checks to:',
    ukrainian: 'Please send checks to:',
  },
  address: {
    english:
      'Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America',
    ukrainian:
      'Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America',
  },
  email: 'info@protezfoundation.com',
  madeBy: '2024 © Made by DITA GROUP Inc.',
}

const Footer = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()

  return (
    <footer ref={ref} id={ProtezIDs.Footer} className={style.footer}>
      <div className={style.footerTop}>
        <div className={style.footerTopContent}>
          <div className={style.right}>
            {icons.footerLogo.desktop[lang](style.footerLogo)}

            <div className={style.buttonGroup}>
              <ProtezButton as="link" href="/" variant="primary-black">
                {footerSection.giveHope[lang]}
              </ProtezButton>
              <ProtezButton as="link" href="/" variant="secondary-white">
                {footerSection.protezAcademy[lang]}
              </ProtezButton>
            </div>
          </div>
          <div className={style.left}>
            <Body>{footerSection.nonprofitOrganization[lang]}</Body>
            <Divider className={style.divider} />
            <Body className={style.descTitle}>{footerSection.sendChecks[lang]}</Body>
            <Body className={style.descAddress}>{footerSection.address[lang]}</Body>
            <Body className={style.descTitle}>{footerSection.email}</Body>
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>{footerSection.madeBy}</div>
    </footer>
  )
})

export default Footer
