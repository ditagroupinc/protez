import { forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
import Section from '@/components/Section'

import { ProtezIDs } from '@/consts'

import Link from 'next/link'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

const inNeedText = {
  viewStatisticsSource: {
    english: 'View statistics source',
    ukrainian: 'View statistics source',
  },
}

const InNeed = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  const isDesktopLayout = width > 800

  const inNeedLogo = isDesktopLayout ? icons.inNeedLogo.desktop : icons.inNeedLogo.mobile

  return (
    <Section id={ProtezIDs.InNeed} className={style.section} ref={ref}>
      {isDesktopLayout && icons.ukrainanMap(style.map)}
      <div className={style.left}>
        <ProtezImage
          src={`protezPage/inNeed/prostheticsForUkrainians.png`}
          alt="veterans with their fa"
          width={1794}
          height={1956}
          className={style.image}
        />
      </div>

      <TextAppearanceWrapper className={style.right}>
        {icons.ukrainianMapSmall(style.mapSmall)}
        <div className={style.textBlock}>
          {inNeedLogo[lang](style.title)}
          <Link as="link" href="/" className={style.link}>
            {inNeedText.viewStatisticsSource[lang]}
            {icons.arrowRight(style.icon)}
          </Link>
        </div>
      </TextAppearanceWrapper>
    </Section>
  )
})

InNeed.displayName = 'InNeed'
export default InNeed
