'use client'

import { useTranslations } from 'next-intl'

import { icons } from './icons'
import styles from './styles.module.scss'

import Button from '@/components/AcademyButton'

import ProtezImage from '@/components/ProtezImage'

import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'

import { useAcademyTitle } from '@/hooks/useAcademyTitle'
import { AcademyIDs } from '@academy/consts'
import { ACADEMY_APPLY_FORM_URL, DONATE_URL } from '@academy/consts/links'

type Partner = { src: string; alt: string }

const AmputeeRehab = () => {
  const t = useTranslations('academy')
  const { desktop: titleDesktop } = useAcademyTitle('summit')
  const partners = t.raw('amputeeRehab.partners') as Partner[]

  return (
    <section id={AcademyIDs.AmputeeRehab} className={styles.amputeeRehab}>
      <ProtezImage
        src="academyPage/amputeeRehab/summit.png"
        alt={t('amputeeRehab.imageAlt')}
        width={1280}
        height={960}
        className={styles.amputeeRehabImage}
      />

      <div className={styles.amputeeRehabOverlay}>
        <div className={styles.amputeeRehabContent}>
          <div className={styles.left}>
            <TextAppearanceWrapper>
              <ProtezImage {...titleDesktop} className={styles.title} />
            </TextAppearanceWrapper>
            <TextAppearanceWrapper>
              <p className={styles.description}>{t('amputeeRehab.description')}</p>
            </TextAppearanceWrapper>
            <TextAppearanceWrapper className={styles.buttons}>
              <Button
                as={'link'}
                variant="primary-blue"
                size="big"
                href={ACADEMY_APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                {t('cta.apply')}
              </Button>
              <Button
                as={'link'}
                variant="secondary-white"
                size="big"
                href={DONATE_URL}
                className={styles.button}
              >
                {t('cta.support')}
                {icons.arrowUp(styles.arrowUp)}
              </Button>
            </TextAppearanceWrapper>
          </div>
          <div className={styles.right}>
            {partners.map(({ src, alt }, index) => (
              <TextAppearanceWrapper key={index} className={styles.card}>
                <ProtezImage
                  src={`partners/white/${src}`}
                  alt={alt}
                  width={300}
                  height={150}
                  className={styles.partnerLogo}
                />
              </TextAppearanceWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AmputeeRehab
