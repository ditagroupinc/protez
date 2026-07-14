'use client'

import { useTranslations } from 'next-intl'

import Section from '@/components/Section'
import ProtezImage from '@/components/ProtezImage'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { ChildrenProstheticsIDs } from '@/consts'

import { playfairDisplayItalic } from '../../../../app/fonts'
import style from './style.module.scss'

const OurApproach = () => {
  const t = useTranslations('childrenProsthetics.approach')

  return (
    <Section id={ChildrenProstheticsIDs.Approach} className={style.section}>
      <div className={style.inner}>
        <TextAppearanceWrapper className={style.head}>
          <h2>{t('title')}</h2>
        </TextAppearanceWrapper>

        <div className={style.split}>
          <div className={style.photo}>
            <ProtezImage
              src="dytyacheProtezuvannyaPage/approach-photo.jpg"
              alt={t('photoAlt')}
              width={800}
              height={1067}
            />
          </div>

          <div>
            <div className={style.missionLabel}>{t('missionLabel')}</div>
            <p className={`${style.missionBig} ${playfairDisplayItalic.className}`}>
              {t('missionBig')}
            </p>
          </div>

          <div className={style.body}>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <div className={style.callout}>{t('callout')}</div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default OurApproach
