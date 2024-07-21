import { forwardRef, ForwardedRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import style from './style.module.scss'
import { icons } from './icons'
import Section from '@/components/Section'

import { ProtezIDs } from '../consts'

import Image from 'next/image'
import Link from 'next/link'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

const inNeedText = {
  viewStatisticsSource: {
    english: 'View statistics source',
    ukrainian: 'View statistics source',
  },
}

const InNeed = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const { lang } = useLanguage()

  return (
    <Section id={ProtezIDs.InNeed} className={style.section} ref={ref}>
      <div className={style.left}>
        <Image
          // TODO: remove after review
          src={`/protez/protezPage/inNeed/prostheticsForUkrainians.png`}
          alt="veterans with their fa"
          width={1794}
          height={1956}
          className={style.image}
        />
      </div>
      <TextAppearanceWrapper className={style.right}>
        {icons.inNeedLogo.desktop[lang](style.title)}
        <Link as="link" href="/" className={style.link}>
          {inNeedText.viewStatisticsSource[lang]}
          {icons.arrowRight(style.icon)}
        </Link>
      </TextAppearanceWrapper>
    </Section>
  )
})

InNeed.displayName = 'InNeed'
export default InNeed
