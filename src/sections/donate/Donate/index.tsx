'use client'

import { useTranslations } from 'next-intl'

import Footer from '@/sections/_shared/Footer'

import { Body, H2 } from '@/components/Typography'
import Divider from '@/components/Divider'

import style from './style.module.scss'
import Script from 'next/script'
import Section from '@/components/Section'
import Header from '@/sections/_shared/Header'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'
import { useDonateTitle } from '@/hooks/useDonateTitle'

export default function Donate() {
  const { width } = useScreenModeAndSize()
  const t = useTranslations('donate')
  const title = useDonateTitle()

  return (
    <>
      <Header layout="protezPage" ancorLinks={false} arrowUp={false} />
      <main>
        <Section className={style.section} id="donorBox">
          <div className={style.topContainer}>
            <ProtezImage {...title} className={style.title} priority />

            <H2 className={style.description}>
              <span className={style.block}>{t('description1')}</span>
              <span>
                {t('description3')} <span className={style.redText}>{t('coloredText')}</span>
              </span>
            </H2>
          </div>
          <div className={style.bottomContainer}>
            <div className={style.left}>
              {width <= 800 && (
                <>
                  <p className={'h6 '}>{t('sendDonations')}</p>
                  <div className={style.bankButtonContainer}>
                    <a
                      target="_blank"
                      href="https://next.privat24.ua/payments/form/%7B%22token%22:%22f7dfa6a1-d8f6-4602-9f21-9b1c99d61cb5%22%7D?fbclid=PAAaYO7jJkvqk11ELkvBzSn4XYumcT4TtR7w8hug3JdXPX7oZM67guqdNAUxI_aem_ASDuFPVJU_RL-637DNh004o5oAYju01DczwND11fGmX4Hn-s0aPgzb3b_RvBPxzDtkQ"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>
                        <ProtezImage
                          src="donatePage/icons/privat24.svg"
                          alt={t('privat24Alt')}
                          width={112}
                          height={36}
                        />
                      </button>
                    </a>
                    <a
                      target="_blank"
                      href="https://send.monobank.ua/jar/9vWarQiax"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>
                        <ProtezImage
                          src="donatePage/icons/monobank.svg"
                          alt={t('monobankAlt')}
                          width={129}
                          height={24}
                        />
                      </button>
                    </a>
                  </div>

                  <Divider className={style.divider} />

                  <div className={style.zelleContainer}>
                    <div className={style.zelleContainerLeft}>
                      <ProtezImage
                        src="donatePage/icons/zelle.svg"
                        alt={t('zelleAlt')}
                        width={58}
                        height={25}
                      />
                      <Body className={style.zelleText}>{t('zelle')}</Body>
                      <Body className={style.emailPhone}>{t('financeEmail')}</Body>
                    </div>
                    <div className={style.zelleContainerRight}>
                      <ProtezImage
                        src={`donatePage/zelle-qr.png`}
                        alt={t('zelleAlt')}
                        width={112}
                        height={109}
                        className={style.zelleQr}
                      />
                    </div>
                  </div>

                  <Divider className={style.divider} />
                </>
              )}
              <div className={style.aboveDivider}>
                <Body>{t('nonprofitOrganization')}</Body>
              </div>

              <Divider className={style.divider} />
              <div className={style.belowDivider}>
                <Body className={style.descTitle}>{t('sendChecks')}</Body>
                <br />
                {t('address.orgName')}
                <br />
                {t('address.line1')}
                <br />
                {t('address.line2')}
                <br />
                {t('address.country')}
                <br />
                <br />
                <Body className={style.emailPhone}>{t('phone')}</Body>
                <Body className={style.emailPhone}>{t('email')}</Body>
              </div>
              {width > 800 && (
                <>
                  <Divider className={style.divider} />

                  <p className={'h6 '}>{t('sendDonations')}</p>

                  <Divider className={style.divider} />

                  <div className={style.zelleContainer}>
                    <div className={style.zelleContainerLeft}>
                      <ProtezImage
                        src="donatePage/icons/zelle.svg"
                        alt={t('zelleAlt')}
                        width={58}
                        height={25}
                      />
                      <Body className={style.zelleText}>{t('zelle')}</Body>
                      <Body className={style.emailPhone}>{t('financeEmail')}</Body>
                    </div>
                    <div className={style.zelleContainerRight}>
                      <ProtezImage
                        src={`donatePage/zelle-qr.png`}
                        alt={t('zelleAlt')}
                        width={112}
                        height={109}
                        className={style.zelleQr}
                      />
                    </div>
                  </div>

                  <div className={style.bankButtonContainer}>
                    <a
                      target="_blank"
                      href="https://send.monobank.ua/jar/9vWarQiax"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>
                        <ProtezImage
                          src="donatePage/icons/monobank.svg"
                          alt={t('monobankAlt')}
                          width={129}
                          height={24}
                        />
                      </button>
                    </a>
                    <a
                      target="_blank"
                      href="https://next.privat24.ua/payments/form/%7B%22token%22:%22f7dfa6a1-d8f6-4602-9f21-9b1c99d61cb5%22%7D?fbclid=PAAaYO7jJkvqk11ELkvBzSn4XYumcT4TtR7w8hug3JdXPX7oZM67guqdNAUxI_aem_ASDuFPVJU_RL-637DNh004o5oAYju01DczwND11fGmX4Hn-s0aPgzb3b_RvBPxzDtkQ"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>
                        <ProtezImage
                          src="donatePage/icons/privat24.svg"
                          alt={t('privat24Alt')}
                          width={112}
                          height={36}
                        />
                      </button>
                    </a>
                  </div>
                </>
              )}
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
        </Section>
      </main>
      <Footer layout="protezPage" />
    </>
  )
}
