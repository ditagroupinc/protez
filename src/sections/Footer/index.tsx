import style from './style.module.scss'
import React from 'react'

import { useLanguage } from '@/contexts/LanguageContext'

import { icons } from './icons'
import Divider from '@/components/Divider'

import { ProtezIDs } from '@/consts'
import Button from '@/components/Button'
import { Body } from '@/components/Typography'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { forwardRef } from 'react'

const footerSection = {
  giveHope: {
    english: 'Give Hope!',
    ukrainian: 'Дати надію!',
  },
  protezAcademy: {
    english: 'Protez Academy',
    ukrainian: 'Protez Academy',
  },
  subscribe: {
    english: 'Subscribe',
    ukrainian: 'Підписатись',
  },
  supportAcademy: {
    english: 'Support Academy',
    ukrainian: 'Support Academy',
  },

  nonprofitOrganization: {
    english: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
    ukrainian: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
  },
  sendChecks: {
    english: 'Please send checks to:',
    ukrainian: 'Надсилайте чеки на адресу:',
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
const Footer = forwardRef<HTMLDivElement, { layout: 'protezPage' | 'academyPage' }>(function (
  { layout },
  ref
) {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()
  const isDesktopLayout = width > 800
  const accentColor = layout === 'protezPage' ? 'red' : 'blue'

  return (
    <footer ref={ref} id={ProtezIDs.Footer} className={style.footer}>
      <div className={`${style.footerTop} ${style[accentColor]}`}>
        <div className={style.footerTopContent}>
          <div className={style.left}>
            {isDesktopLayout
              ? icons.footerLogo.desktop[lang](style.footerLogo)
              : icons.footerLogo.mobile[lang](`${style.footerLogo} ${style.ukrainian}`)}

            <div className={style.buttonGroup}>
              {layout === 'protezPage' ? (
                <>
                  <Button as="link" href="/donate" variant="primary-black" size="normal">
                    {footerSection.giveHope[lang]}
                  </Button>
                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    target="_blank"
                    variant="secondary-white"
                    size="normal"
                  >
                    {footerSection.protezAcademy[lang]}
                  </Button>
                </>
              ) : (
                <>
                  <Button as="link" href="/" variant="primary-white" size="normal">
                    {footerSection.subscribe[lang]}
                  </Button>
                  <Button as="link" href="/" variant="primary-black" size="normal">
                    {footerSection.supportAcademy[lang]}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={style.right}>
            <Body>{footerSection.nonprofitOrganization[lang]}</Body>
            <Divider className={style.divider} />
            <div>
              <Body className={style.descTitle}>{footerSection.sendChecks[lang]}</Body>
              <Body className={style.descAddress}>{footerSection.address[lang]}</Body>
            </div>
            <Body className={style.descTitle}>{footerSection.email}</Body>
            <a
              aria-label="Protez Foundation"
              href="https://app.candid.org/profile/14058903/protez-foundation-88-2437069/?pkId=5383b219-0323-4c41-a06c-73d362f764a7"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt=""
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/14058903/svg"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>{footerSection.madeBy}</div>
    </footer>
  )
})

export default Footer
