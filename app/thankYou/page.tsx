'use client'
import ProtezButton from '@/components/ProtezButton'
import Section from '@/components/Section'
import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
import { H2 } from '@/components/Typography'

const texts = {
  description: {
    english: 'You have offered someone a new shot at life, and',
    ukrainian: 'You have offered someone a new shot at life, and',
  },
  colorText: {
    english: 'your gift has been successful.',
    ukrainian: 'your gift has been successful.',
  },
  backToWebsite: {
    english: 'Back to website',
    ukrainian: 'Back to website',
  },
}

export default function Partners() {
  const { lang } = useLanguage()

  return (
    <>
      <Section className={style.section}>
        <div className={style.container}>
          {icons.heart(style.heart)}
          {icons.thankYouLogo.desktop[lang](style.title)}

          <H2 className={style.description}>
            {texts.description[lang]} <span className={style.redText}>{texts.colorText[lang]}</span>
          </H2>

          <ProtezButton
            className={style.backToWebsiteButton}
            as="link"
            href="/"
            variant="secondary-black"
            size="normal"
          >
            {texts.backToWebsite[lang]}
          </ProtezButton>
        </div>
      </Section>
    </>
  )
}
