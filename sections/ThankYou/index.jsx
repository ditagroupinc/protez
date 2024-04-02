import style from './thankYou.module.css'
import SquareButton from '@/components/SquareButton'
import { icons } from './icons'
import { LanguageContext } from '@/contexts/LanguageContext'
import { useContext, forwardRef } from 'react'
import { ScreenModeAndSizeContext } from '@/contexts/ScreenModeAndSizeContext'

import texts from '@/texts&svg'

import Copyright from '@/components/Copyright'

const ThankYou = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext)
  const { mobile } = useContext(ScreenModeAndSizeContext)

  const handleClick = () => {}
  return (
    <footer className={`${visible ? 'showText' : ''}`} id={id} ref={ref}>
      <div className={`${style.colorContainer} ${style.colorContainer}`}>
        <div className={style.container}>
          <div className="textContainer">
            {mobile
              ? icons.thankYouLogo.mobile[lang]('svgTextBlock')
              : icons.thankYouLogo.desktop[lang]('svgTextBlock')}
          </div>
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
