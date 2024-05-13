import style from './style.module.css'
import SquareButton from '@/components/SquareButton'
import { icons } from './icons'
import { useLanguage } from '@/contexts/LanguageContext'
import { forwardRef, ForwardedRef } from 'react'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import texts from '@/texts&svg'

import Copyright from '@/components/Copyright'

const ThankYou = forwardRef(function (_, ref: ForwardedRef<HTMLElement>) {
  const { lang } = useLanguage()
  const { mobile } = useScreenModeAndSize()

  const handleClick = () => {}

  return (
    <footer id="thankYou" ref={ref}>
      <div className={`${style.colorContainer} ${style.colorContainer}`}>
        <div className={style.container}>
          <TextAppearanceWrapper>
            {mobile
              ? icons.thankYouLogo.mobile[lang]('svgTextBlock')
              : icons.thankYouLogo.desktop[lang]('svgTextBlock')}
          </TextAppearanceWrapper>
          <div className={style.buttonsContainer}>
            <SquareButton link href="donate" black onClick={handleClick} className={style.button}>
              {texts.thankYou.giveHope[lang]}
            </SquareButton>
            <SquareButton
              blank
              link
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              onClick={handleClick}
              className={style.button}
            >
              {texts.thankYou.becomeAVolunteer[lang]}
            </SquareButton>
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  )
})

ThankYou.displayName = 'ThankYou'
export default ThankYou
