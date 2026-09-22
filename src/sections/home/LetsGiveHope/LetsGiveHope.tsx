'use client'

import { forwardRef, ForwardedRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import VideoAndFilter from '@/components/VideoAndFilter'
import Section from '@/components/Section'
import { Body } from '@/components/Typography'
import Button, { MakeDonationButton } from '@/components/Button'

import { ProtezIDs } from '@/consts'
import style from './style.module.scss'

const LetsGiveHope = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const locale = useLocale()
  const t = useTranslations('home.letsGiveHope')

  return (
    <Section id={ProtezIDs.LetsGiveHope} className={style.section} ref={ref}>
      <VideoAndFilter src={'flag-ukraine.mp4'} />
      <div className={style.overlay} />
      <div className={style.container}>
        <div className={`${style.left} ${locale === 'uk' ? style.ukrainianLang : ''}`}>
          <div>
            <Body className={style.description}>{t('description.prosthetics')}</Body>
            <Body className={style.description}>{t('description.rehabilitation')}</Body>
            <Body className={style.description}>{t('description.expertise')}</Body>
          </div>
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
            <Button
              variant="secondary-white"
              as="link"
              target="_blank"
              href="https://forms.gle/WUVBvfZhYJsanGVbA"
              size="normal"
              className={style.academyButton}
            >
              {t('protezAcademy')}
            </Button>
          </div>
        </div>
        <div className={style.right}>
          <h1 className={`${style.title} ${locale === 'uk' ? style.ukrainianTitle : ''}`}>
            {locale === 'uk' ? (
              <>
                <span className={style.titleLine}>{t('title.plain')}</span>{' '}
                <span className={style.titleAccent}>[{t('title.accent')}]</span>
              </>
            ) : (
              <>
                <span className={style.titleAccent}>[{t('title.accent')}]</span>{' '}
                <span className={style.titleLine}>{t('title.plain')}</span>
              </>
            )}
          </h1>
        </div>
      </div>
    </Section>
  )
})

LetsGiveHope.displayName = 'LetsGiveHope'
export default LetsGiveHope
