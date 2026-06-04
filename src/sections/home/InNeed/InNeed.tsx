'use client'

import { forwardRef, ForwardedRef } from 'react'
import { useLocale } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'
import style from './style.module.scss'
import { icons } from './icons'
import Section from '@/components/Section'

import { ProtezIDs } from '@/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import ProtezImage from '@/components/ProtezImage'

const InNeed = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)

  return (
    <Section id={ProtezIDs.InNeed} className={style.section} ref={ref}>
      {icons.ukrainanMap(style.map)}
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
        <div className={style.textBlock}>
          {icons.inNeedLogo.desktop[lang](`${style.title} ${style.titleDesktop}`)}
          {icons.inNeedLogo.mobile[lang](`${style.title} ${style.titleMobile}`)}
        </div>
      </TextAppearanceWrapper>
    </Section>
  )
})

InNeed.displayName = 'InNeed'
export default InNeed
