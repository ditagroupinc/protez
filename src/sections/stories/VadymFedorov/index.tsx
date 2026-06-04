'use client'

import { useLocale, useTranslations } from 'next-intl'

import { localeToLanguage } from '@/lib/locale'

import style from './style.module.scss'

import { icons } from './icons'
import Section from '@/components/Section'
import { Body, H3 } from '@/components/Typography'

import Header from '@/sections/_shared/Header'
import Footer from '@/sections/_shared/Footer'
import Divider from '@/components/Divider'
import Script from 'next/script'
import SmokeWrapper from '@/sections/home/_root/SmokeWrapper'
import ProtezImage from '@/components/ProtezImage'

const VETERAN_ICON: keyof typeof icons.titles = 'vadymFedorov'
const EMAIL = 'info@protezfoundation.com'

export default function VadymFedorov() {
  const locale = useLocale()
  const lang = localeToLanguage(locale)
  const t = useTranslations('stories.vadymFedorov')

  return (
    <>
      <Header layout="protezPage" ancorLinks={false} arrowUp={false} />
      <main>
        <SmokeWrapper>
          <Section className={style.section}>
            <div className={style.card}>
              <div className={style.imageContainer}>
                <ProtezImage
                  src={`vadymFedorovPage/vadymFedorov.png`}
                  alt={'vadymFedorov'}
                  className={style.image}
                  width={3146}
                  height={4086}
                  priority
                />
              </div>
              <div className={style.contentContainer}>
                <div className={style.descriptionContainer}>
                  <div className={style.logoContainer}>
                    {icons.titles[VETERAN_ICON][lang](style.veteranLogo)}
                    <Body className={style.ageRank}>{t('veteran.ageRank')}</Body>
                  </div>
                  <H3 className={style.cardTitle}>{t('veteran.title')}</H3>
                  <Body>{t('veteran.text')}</Body>
                </div>

                <div className={style.donationContainer}>
                  <div className={style.left}>
                    <div className={style.aboveDivider}>
                      <Body className={`${style.description} ${style.largeOnDesktop}`}>
                        <span className={style.block}>{t('donatePage.description1')}</span>
                      </Body>
                      <Body className={style.largeOnDesktop}>
                        {t('donatePage.description3')}{' '}
                        <span className={style.redText}>{t('donatePage.coloredText')}</span>
                      </Body>
                      <Body>{t('donatePage.nonprofitOrganization')}</Body>
                    </div>

                    <Divider className={style.divider} />
                    <div className={style.belowDivider}>
                      <div>
                        <Body className={style.descTitle}>{t('donatePage.sendChecks')}</Body>
                        <Body className={style.descAddress}>{t('donatePage.address')}</Body>
                      </div>
                      <Body className={style.descTitle}>{EMAIL}</Body>
                    </div>
                  </div>
                  <div className={style.right}>
                    {/* @ts-ignore @eslint-disable-next-line */}
                    <Script src="https://donorbox.org/widget.js" paypalExpress="false" />
                    <iframe
                      src="https://donorbox.org/embed/website-donation-64"
                      name="donorbox"
                      seamless={true}
                      className={style.donationForm}
                      style={{
                        maxWidth: 425,
                        minWidth: 250,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </SmokeWrapper>
      </main>
      <Footer layout="protezPage" />
    </>
  )
}
