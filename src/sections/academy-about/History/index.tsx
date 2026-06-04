'use client'

import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

import ProtezImage from '@/components/ProtezImage'

import AcademySection from '@/components/AcademySection'

import style from './style.module.scss'

import { AcademyAboutIDs } from '@academy/consts/about'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { useAcademyTitle } from '@/hooks/useAcademyTitle'
import Button from '@/components/AcademyButton'
import { icons } from './icons'
import { ACADEMY_CHARTER_URL } from '@academy/consts/links'

interface Props {
  id: AcademyAboutIDs
}

const History = forwardRef<HTMLDivElement, Props>(function ({ id }, ref) {
  const t = useTranslations('academyAbout.history')
  const paragraphs = t.raw('paragraphs') as string[]
  const { desktop: titleDesktop } = useAcademyTitle('about-academy')

  return (
    <AcademySection ref={ref} id={id} className={style.academyGoals}>
      <ProtezImage {...titleDesktop} className={style.mainTitle} />
      <div className={style.container}>
        <div className={style.right}>
          <TextAppearanceWrapper>
            <h2 className={style.title}>{t('title')}</h2>
          </TextAppearanceWrapper>
          <TextAppearanceWrapper>
            <div className={style.description}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </TextAppearanceWrapper>

          <Button
            as="link"
            href={ACADEMY_CHARTER_URL}
            variant="normal-black"
            size="big"
            target="_blank"
            className={style.button}
          >
            {t('button')}
            {icons.arrowUp(`${style.arrowUpIcon}`)}
          </Button>
        </div>
        <div className={style.left}>
          <ProtezImage
            src="academyPage/about-history.png"
            alt={t('imageAlt')}
            width={762}
            height={620}
            className={style.image}
          />
        </div>
      </div>
    </AcademySection>
  )
})

if (process.env.NODE_ENV !== 'production') {
  History.displayName = 'History'
}

export default History
