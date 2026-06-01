'use client'

import { forwardRef, ForwardedRef } from 'react'
import { useLocale } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'
import style from './style.module.scss'
import { icons } from './icons'
import Section from '@/components/Section'

import { ProtezIDs } from '@/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

const InNeed = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const { width } = useScreenModeAndSize()

  const isDesktopLayout = width > 800

  const inNeedLogo = isDesktopLayout ? icons.inNeedLogo.desktop : icons.inNeedLogo.mobile

  return (
    <Section id={ProtezIDs.InNeed} className={style.section} ref={ref}>
      {isDesktopLayout && icons.ukrainanMap(style.map)}
      <div className={style.left}>
        <ProtezImage
          src={`protezPage/inNeed/inNeed.png`}
          alt="veterans"
          width={845}
          height={1053}
          className={style.image}
        />
      </div>

      <TextAppearanceWrapper className={style.right}>
        {icons.ukrainianMapSmall(style.mapSmall)}
        <div className={style.textBlock}>{inNeedLogo[lang](style.title)}</div>
      </TextAppearanceWrapper>
    </Section>
  )
})

InNeed.displayName = 'InNeed'
export default InNeed
