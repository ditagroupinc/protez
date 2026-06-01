'use client'

import style from './style.module.scss'
import React from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { localeToLanguage } from '@/lib/locale'

import { icons } from './icons'
import Divider from '@/components/Divider'
import ProtezImage from '@/components/ProtezImage'

import { ProtezIDs } from '@/consts'
import Button from '@/components/Button'
import { Body } from '@/components/Typography'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { forwardRef } from 'react'

const Footer = forwardRef<HTMLDivElement, { layout: 'protezPage' | 'academyPage' }>(function (
  { layout },
  ref
) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('shared.footer')
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
                    {t('giveHope')}
                  </Button>
                  <Button
                    as="link"
                    href="https://forms.gle/WUVBvfZhYJsanGVbA"
                    target="_blank"
                    variant="secondary-white"
                    size="normal"
                  >
                    {t('protezAcademy')}
                  </Button>
                </>
              ) : (
                <>
                  <Button as="link" href="/" variant="primary-white" size="normal">
                    {t('subscribe')}
                  </Button>
                  <Button as="link" href="/" variant="primary-black" size="normal">
                    {t('supportAcademy')}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={style.right}>
            <Body>{t('nonprofitOrganization')}</Body>
            <Divider className={style.divider} />
            <div>
              <Body className={style.descTitle}>{t('sendChecks')}</Body>
              <Body className={style.descAddress}>{t('address')}</Body>
            </div>
            <Body className={style.descTitle}>{t('email')}</Body>
            <a
              aria-label="Protez Foundation"
              href="https://app.candid.org/profile/14058903/protez-foundation-88-2437069/?pkId=5383b219-0323-4c41-a06c-73d362f764a7"
              target="_blank"
              rel="noreferrer"
            >
              <ProtezImage
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/14058903/svg"
                alt="Candid Platinum Transparency seal"
                width={138}
                height={46}
                external
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>{t('madeBy')}</div>
    </footer>
  )
})

export default Footer
