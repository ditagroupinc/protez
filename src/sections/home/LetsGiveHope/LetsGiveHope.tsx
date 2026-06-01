'use client'

import { forwardRef, ForwardedRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

import VideoAndFilter from '@/components/VideoAndFilter'
import Section from '@/components/Section'
import { Body } from '@/components/Typography'
import Button, { MakeDonationButton } from '@/components/Button'

import { ProtezIDs } from '@/consts'
import style from './style.module.scss'
import { icons } from './icons'

const LetsGiveHope = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const { width } = useScreenModeAndSize()
  const t = useTranslations('home.letsGiveHope')

  const isDesktop = width > 1180

  const title = width > 800 ? icons.letsGiveHopeLogo.desktop : icons.letsGiveHopeLogo.mobile

  return (
    <Section id={ProtezIDs.LetsGiveHope} className={style.section} ref={ref}>
      <VideoAndFilter src={'flag-ukraine.mp4'} />
      <div className={style.overlay} />
      <div className={style.container}>
        <div className={`${style.left} ${locale === 'uk' ? style.ukrainianLang : ''}`}>
          {icons.protezLogo(style.logo)}
          <Body large={isDesktop} className={style.description}>
            {t('description')}
          </Body>
          <div className={style.buttonsContainer}>
            <MakeDonationButton size="normal" />
            <Button
              variant="secondary-white"
              as="link"
              target="_blank"
              href="https://forms.gle/WUVBvfZhYJsanGVbA"
              size="normal"
              arrow
            >
              {t('needAProthesis')}
            </Button>
            {!isDesktop && (
              <Button
                variant="secondary-white"
                as="link"
                target="_blank"
                href="https://forms.gle/WUVBvfZhYJsanGVbA"
                size="normal"
              >
                {t('protezAcademy')}
              </Button>
            )}
          </div>
        </div>
        <div className={style.right}>{title[lang](style.title)}</div>
      </div>
    </Section>
  )
})

LetsGiveHope.displayName = 'LetsGiveHope'
export default LetsGiveHope
