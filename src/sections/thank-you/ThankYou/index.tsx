'use client'

import { useLocale, useTranslations } from 'next-intl'

import Button from '@/components/Button'
import Section from '@/components/Section'
import { localeToLanguage } from '@/lib/locale'
import style from './style.module.scss'
import { icons } from './icons'
import { H2 } from '@/components/Typography'

export default function ThankYou() {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('thankYou')

  return (
    <>
      <Section className={style.section}>
        <div className={style.container}>
          {icons.heart(style.heart)}
          {icons.thankYouLogo.desktop[lang](style.title)}

          <H2 className={style.description}>
            {t('description')} <span className={style.redText}>{t('colorText')}</span>
          </H2>

          <Button
            className={style.backToWebsiteButton}
            as="link"
            href="/"
            variant="secondary-black"
            size="normal"
          >
            {t('backToWebsite')}
          </Button>
        </div>
      </Section>
    </>
  )
}
