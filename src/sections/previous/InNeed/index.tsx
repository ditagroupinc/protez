import { forwardRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from '@/types'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { icons } from './icons'
import texts from '@/texts&svg'
import style from './style.module.css'

const InNeed = forwardRef<HTMLDivElement>(function (_, ref) {
  const { lang } = useLanguage()
  const { mobile, tabletLarge } = useScreenModeAndSize()

  const getTitle = () => {
    if (mobile) {
      return icons.inNeedLogo.mobile[lang]('svgTextBlock')
    } else if (tabletLarge) {
      return icons.inNeedLogo.tablet[lang]('svgTextBlock')
    } else {
      return icons.inNeedLogo.desktop[lang]('svgTextBlock')
    }
  }

  return (
    <section className={`${style.section} section`} id="inNeed" ref={ref}>
      <div className={style.block}>
        <TextAppearanceWrapper className={style.title}>{getTitle()}</TextAppearanceWrapper>
        <div className={`${style.text} h2`}>
          <TextAppearanceWrapper className={`h2 ${lang === Languages.Ukrainian && style.ua}`}>
            {texts.inNeed.paragraph[lang]}
          </TextAppearanceWrapper>
        </div>
      </div>
    </section>
  )
})

InNeed.displayName = 'InNeed'

export default InNeed
