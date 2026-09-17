'use client'

import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'
import type { CurrentMonth } from '@/lib/date'
import { useStatsRange } from '@/hooks/useStatsRange'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import CountUp from 'react-countup'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '@/consts'
import { Body, H2 } from '@/components/Typography'
import { MakeDonationButton } from '@/components/Button'
import { ForwardedRef, forwardRef } from 'react'

type ResultCard = {
  prefix?: string
  value: number
  decimals?: number
  suffix?: string
  label: string
}

interface OurResultsProps {
  currentMonth: CurrentMonth
}

const OurResults = forwardRef<HTMLDivElement, OurResultsProps>(function OurResults(
  { currentMonth },
  ref: ForwardedRef<HTMLDivElement>
) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.ourResults')

  const dateText = useStatsRange(currentMonth, 'rangeNote')
  const cardsData = t.raw('cards') as ResultCard[]
  const separator = locale === 'uk' ? ' ' : ','
  const decimal = locale === 'uk' ? ',' : '.'

  return (
    <>
      <Section id={ProtezIDs.OurResults} className={style.section} ref={ref}>
        <div className={style.left}>
          {icons.ourResultsLogo.desktop[lang](style.title)}
          <Body large className={style.date}>
            {dateText}
          </Body>

          <Body large className={style.text}>
            {t('text')}
          </Body>

          <TextAppearanceWrapper
            className={`${style.buttonsContainer} ${style.buttonsContainerDesktop}`}
          >
            <MakeDonationButton size="normal" />
          </TextAppearanceWrapper>
        </div>
        <div className={style.right}>
          {cardsData.map((card, index) => (
            <TextAppearanceWrapper key={index} className={style.card}>
              <div className={style.count}>
                <CountUp
                  end={card.value}
                  decimals={card.decimals ?? 0}
                  decimal={decimal}
                  separator={separator}
                  prefix={card.prefix}
                  suffix={card.suffix}
                  duration={2}
                />
              </div>
              <H2 className={style.description}>{card.label}</H2>
            </TextAppearanceWrapper>
          ))}
        </div>
        <TextAppearanceWrapper
          className={`${style.buttonsContainer} ${style.buttonsContainerMobile}`}
        >
          <MakeDonationButton size="normal" />
        </TextAppearanceWrapper>
      </Section>
    </>
  )
})

OurResults.displayName = 'OurResults'
export default OurResults
