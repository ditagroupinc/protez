'use client'

import { useTranslations } from 'next-intl'

import Section from '@/components/Section'
import ProtezImage from '@/components/ProtezImage'
import Button, { MakeDonationButton } from '@/components/Button'
import { TextAppearanceWrapper } from '@/components/TextAppearanceWrapper'
import { ChildrenProstheticsIDs } from '@/consts'

import style from './style.module.scss'

const ApplyAndSupport = () => {
  const t = useTranslations('childrenProsthetics')

  return (
    <Section id={ChildrenProstheticsIDs.Apply} className={style.section}>
      <div className={style.inner}>
        <TextAppearanceWrapper className={style.grid}>
          <div className={style.card}>
            <h3>{t('apply.title')}</h3>
            <p>{t('apply.text')}</p>
            <div className={style.btns}>
              <Button
                as="link"
                href={t('apply.formHref')}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary-black"
                size="normal"
              >
                {t('apply.fillForm')}
              </Button>
              <MakeDonationButton
                size="normal"
                variant="primary-teal"
                className={style.makeDonationButton}
              />
            </div>
          </div>

          <div className={style.card}>
            <h3>{t('support.title')}</h3>
            <p>{t('support.text')}</p>
            <MakeDonationButton
              size="normal"
              variant="primary-teal"
              className={style.makeDonationButton}
            />

            <div className={style.payMethods}>
              <div className={style.zelle}>
                <span className={style.zelleBrand}>Zelle</span>
                <p>{t('support.zelleText')}</p>
                <span className={style.zelleEmail}>{t('support.zelleEmail')}</span>
              </div>
              <div className={style.payRow}>
                <a
                  className={style.payBox}
                  href="/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProtezImage
                    src="icons/monobank.png"
                    alt="Монобанк"
                    width={16}
                    height={16}
                    className={style.payIcon}
                  />
                  monobank
                </a>
                <a
                  className={style.payBox}
                  href="/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProtezImage
                    src="icons/privat24.svg"
                    alt="Privat24"
                    width={16}
                    height={16}
                    className={style.payIcon}
                  />
                  Privat24
                </a>
              </div>
            </div>
          </div>
        </TextAppearanceWrapper>
      </div>
    </Section>
  )
}

export default ApplyAndSupport
