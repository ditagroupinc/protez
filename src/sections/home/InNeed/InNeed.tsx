'use client'

import { forwardRef, ForwardedRef } from 'react'
import { useTranslations } from 'next-intl'

import SectionTitle from '@/components/SectionTitle'
import { playfairDisplayItalic } from '../../../../app/fonts'
import style from './style.module.scss'
import { icons } from './icons'
import Section from '@/components/Section'

import { ProtezIDs } from '@/consts'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import ProtezImage from '@/components/ProtezImage'

const InNeed = forwardRef(function (_, ref: ForwardedRef<HTMLDivElement>) {
  const t = useTranslations('home.inNeed')

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
          <SectionTitle className={style.title}>
            <span className={style.number}>{t('number')}</span>{' '}
            <span className={style.titleLine}>{t('people')}</span>{' '}
            {(['need', 'prosthetics', 'result'] as const).map((line, index) => (
              <span key={line}>
                {index > 0 && ' '}
                <span className={style.titleLine}>
                  {t.rich(line, {
                    accent: chunks => (
                      <span className={`${style.accent} ${playfairDisplayItalic.className}`}>
                        {chunks}
                      </span>
                    ),
                  })}
                </span>
              </span>
            ))}
          </SectionTitle>
        </div>
      </TextAppearanceWrapper>
    </Section>
  )
})

InNeed.displayName = 'InNeed'
export default InNeed
