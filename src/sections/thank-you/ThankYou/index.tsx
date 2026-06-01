'use client'
import Button from '@/components/Button'
import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
import { H2 } from '@/components/Typography'
import { useThankYouTexts } from '@/hooks/useThankYouTexts'

export default function ThankYou() {
  const { lang } = useLanguage()
  const t = useThankYouTexts()

  return (
    <>
      <Section className={style.section}>
        <div className={style.container}>
          {icons.heart(style.heart)}
          {icons.thankYouLogo.desktop[lang](style.title)}

          <H2 className={style.description}>
            {t.description} <span className={style.redText}>{t.colorText}</span>
          </H2>

          <Button
            className={style.backToWebsiteButton}
            as="link"
            href="/"
            variant="secondary-black"
            size="normal"
          >
            {t.backToWebsite}
          </Button>
        </div>
      </Section>
    </>
  )
}
