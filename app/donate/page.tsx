'use client'

import Footer from '@/sections/Footer'

import { Body, H2 } from '@/components/Typography'
import Divider from '@/components/Divider'

import style from './style.module.scss'
import { icons } from './icons'
import { useLanguage } from '@/contexts/LanguageContext'
import Script from 'next/script'
import Section from '@/components/Section'
import Header from '@/sections/Header'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'
import ProtezImage from '@/components/ProtezImage'

const donatePage = {
  description1: {
    english: 'All charitable contributions are tax-deductible.',
    ukrainian: 'All charitable contributions are tax-deductible.',
  },
  description3: {
    english:
      'Strong support from community volunteers and partners around the globe allowed us to cap our administrative expenses',
    ukrainian:
      'Strong support from community volunteers and partners around the globe allowed us to cap our administrative expenses',
  },
  coloredText: {
    english: 'under 8%',
    ukrainian: 'under 8%',
  },
  nonprofitOrganization: {
    english: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
    ukrainian: 'Nonprofit organization 501(c)(3) EIN: 88-2437069',
  },
  sendChecks: {
    english: 'Please send checks to:',
    ukrainian: 'Please send checks to:',
  },
  address: {
    english:
      'Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America',
    ukrainian:
      'Protez Foundation 3510 Hopkins Pl, W130D, Oakdale, MN 55128, United States of America',
  },
  sendDonations: {
    english: 'You can also send a donation through PrivatBank or Monobank',
    ukrainian: 'Надіслати донат ви також можете через сервіс ПриватБанк або Монобанк',
  },
  zelle: {
    english:
      'Please include your email in comments to the transaction, so we could send you donation receipt',
    ukrainian:
      'Please include your email in comments to the transaction, so we could send you donation receipt',
  },
  financeEmail: 'finance@protezfoundation.com',
  email: 'info@protezfoundation.com',
  phone: '+1 612-997-2005',
  madeBy: '2024 © Made by DITA GROUP Inc.',
}

export default function Donate() {
  const { lang } = useLanguage()
  const { width } = useScreenModeAndSize()

  return (
    <>
      <Header layout="protezPage" ancorLinks={false} arrowUp={false} />
      <main>
        <Section className={style.section} id="donorBox">
          <div className={style.topContainer}>
            {icons.donateLogo.desktop[lang](style.title)}

            <H2 className={style.description}>
              <span className={style.block}>{donatePage.description1[lang]}</span>
              <span>
                {donatePage.description3[lang]}{' '}
                <span className={style.redText}>{donatePage.coloredText[lang]}</span>
              </span>
            </H2>
          </div>
          <div className={style.bottomContainer}>
            <div className={style.left}>
              {width <= 800 && (
                <>
                  <p className={'h6 '}>{donatePage.sendDonations[lang]}</p>
                  <div className={style.bankButtonContainer}>
                    <a
                      target="_blank"
                      href="https://next.privat24.ua/payments/form/%7B%22token%22:%22f7dfa6a1-d8f6-4602-9f21-9b1c99d61cb5%22%7D?fbclid=PAAaYO7jJkvqk11ELkvBzSn4XYumcT4TtR7w8hug3JdXPX7oZM67guqdNAUxI_aem_ASDuFPVJU_RL-637DNh004o5oAYju01DczwND11fGmX4Hn-s0aPgzb3b_RvBPxzDtkQ"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>{icons.privat24Logo()}</button>
                    </a>
                    <a
                      target="_blank"
                      href="https://send.monobank.ua/jar/9vWarQiax"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>{icons.monobankLogo()}</button>
                    </a>
                  </div>

                  <Divider className={style.divider} />

                  <div className={style.zelleContainer}>
                    <div className={style.zelleContainerLeft}>
                      {icons.zelleLogo()}
                      <Body className={style.zelleText}>{donatePage.zelle[lang]}</Body>
                      <Body className={style.emailPhone}>{donatePage.financeEmail}</Body>
                    </div>
                    <div className={style.zelleContainerRight}>
                      <ProtezImage
                        src={`donatePage/zelle-qr.png`}
                        alt={'zelle logo'}
                        width={110}
                        height={110}
                        className={style.zelleQr}
                      />
                    </div>
                  </div>

                  <Divider className={style.divider} />
                </>
              )}
              <div className={style.aboveDivider}>
                <Body>{donatePage.nonprofitOrganization[lang]}</Body>
              </div>

              <Divider className={style.divider} />
              <div className={style.belowDivider}>
                <Body className={style.descTitle}>{donatePage.sendChecks[lang]}</Body>
                <br />
                Protez Foundation
                <br />
                3510 Hopkins Pl, W130D
                <br />
                Oakdale, MN 55128
                <br />
                United States of America
                <br />
                <br />
                <Body className={style.emailPhone}>{donatePage.phone}</Body>
                <Body className={style.emailPhone}>{donatePage.email}</Body>
              </div>
              {width > 800 && (
                <>
                  <Divider className={style.divider} />

                  <p className={'h6 '}>{donatePage.sendDonations[lang]}</p>

                  <div className={style.bankButtonContainer}>
                    <a
                      target="_blank"
                      href="https://next.privat24.ua/payments/form/%7B%22token%22:%22f7dfa6a1-d8f6-4602-9f21-9b1c99d61cb5%22%7D?fbclid=PAAaYO7jJkvqk11ELkvBzSn4XYumcT4TtR7w8hug3JdXPX7oZM67guqdNAUxI_aem_ASDuFPVJU_RL-637DNh004o5oAYju01DczwND11fGmX4Hn-s0aPgzb3b_RvBPxzDtkQ"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>{icons.privat24Logo()}</button>
                    </a>
                    <a
                      target="_blank"
                      href="https://send.monobank.ua/jar/9vWarQiax"
                      className={style.bankButton}
                      rel="noreferrer"
                    >
                      <button>{icons.monobankLogo()}</button>
                    </a>
                  </div>

                  <Divider className={style.divider} />

                  <div className={style.zelleContainer}>
                    <div className={style.zelleContainerLeft}>
                      {icons.zelleLogo()}
                      <Body className={style.zelleText}>{donatePage.zelle[lang]}</Body>
                      <Body className={style.emailPhone}>{donatePage.financeEmail}</Body>
                    </div>
                    <div className={style.zelleContainerRight}>
                      <ProtezImage
                        src={`donatePage/zelle-qr.png`}
                        alt={'zelle logo'}
                        width={110}
                        height={110}
                        className={style.zelleQr}
                      />
                    </div>
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
