'use client'

import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import Section from '@/components/Section'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import CountUp from 'react-countup'

import { icons } from './icons'
import style from './style.module.scss'

import { ProtezIDs } from '@/consts'
import { Body, H2 } from '@/components/Typography'
import Button, { MakeDonationButton } from '@/components/Button'
import { ForwardedRef, forwardRef } from 'react'
import { extractNumber, extractPrefixSuffix } from './utils'

interface StatisticsDataItem {
  statisticsDataLabel: {
    english: string
    ukrainian: string
  }
  statisticsDataValue: string
}

interface Results {
  statisticsDate: {
    english: string
    ukrainian: string
  }
  statisticsData: StatisticsDataItem[]
}

interface OurResultsProps {
  results: Results
}

const OurResults = forwardRef<HTMLDivElement, OurResultsProps>(function OurResults(
  { results },
  ref: ForwardedRef<HTMLDivElement>
) {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('home.ourResults')

  const dateText = results.statisticsDate
  const cardsData = results.statisticsData

  return (
    <>
      <Section id={ProtezIDs.OurResults} className={style.section} ref={ref}>
        <div className={style.left}>
          {icons.ourResultsLogo.desktop[lang](style.title)}
          <Body large className={style.date}>
            {dateText[lang]}
          </Body>

          <Body large className={style.text}>
            {t('text')}
          </Body>

          <TextAppearanceWrapper
            className={`${style.buttonsContainer} ${style.buttonsContainerDesktop}`}
          >
            <MakeDonationButton size="normal" />
            <Button as="link" href="/" variant="secondary-white" size="normal" arrow>
              {t('moreResults')}
            </Button>
          </TextAppearanceWrapper>
        </div>
        <div className={style.right}>
          {cardsData.map((card, index) => {
            const { prefix, suffix } = extractPrefixSuffix(card.statisticsDataValue)
            const number = extractNumber(card.statisticsDataValue)

            return (
              <TextAppearanceWrapper key={index} className={style.card}>
                <div className={style.count}>
                  {prefix && <span>{prefix}</span>}
                  {number > 0 ? (
                    <CountUp end={number} duration={2} className={style.count} />
                  ) : (
                    <span>{card.statisticsDataValue}</span>
                  )}
                  {suffix && <span>{suffix}</span>}
                </div>
                <H2 className={style.description}>{card.statisticsDataLabel[lang]}</H2>
              </TextAppearanceWrapper>
            )
          })}
        </div>
        <TextAppearanceWrapper
          className={`${style.buttonsContainer} ${style.buttonsContainerMobile}`}
        >
          <MakeDonationButton size="normal" />
          <Button as="link" href="/" variant="secondary-white" size="normal" arrow>
            {t('moreResults')}
          </Button>
        </TextAppearanceWrapper>
      </Section>
    </>
  )
})

OurResults.displayName = 'OurResults'
export default OurResults
