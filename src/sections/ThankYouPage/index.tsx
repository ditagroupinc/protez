import icons from './icons'
import style from './style.module.css'
import { useLanguage } from '@/contexts/LanguageContext'

import texts from '@/texts&svg'

import SquareButton from '@/components/SquareButton'

export default function ThankYouPage() {
  const { lang } = useLanguage()

  return (
    <div className={style.container}>
      <div className={style.contentWrapper}>
        {icons.heart(style.heart)}
        <h1 className={style.heading}>{texts.thankYouPage.thankYou[lang]}</h1>
        <p className={style.message}>
          {texts.thankYouPage.message[lang]}
          <span>{texts.thankYouPage.pink[lang]}</span>
        </p>

        <SquareButton className={style.backToWebsiteButton} emptyBlack link href="/">
          {texts.thankYouPage.backToWebsite[lang]}
        </SquareButton>
      </div>
    </div>
  )
}
