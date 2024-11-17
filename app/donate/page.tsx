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
  email: 'info@protezfoundation.com',
  madeBy: '2024 © Made by DITA GROUP Inc.',
}

export default function Donate() {
  const { lang } = useLanguage()

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
              <div className={style.aboveDivider}>
                <Body>{donatePage.nonprofitOrganization[lang]}</Body>
              </div>

              <Divider className={style.divider} />
              <div className={style.belowDivider}>
                <div>
                  <Body className={style.descTitle}>{donatePage.sendChecks[lang]}</Body>
                  <Body className={style.descAddress}>{donatePage.address[lang]}</Body>
                </div>
                <Body className={style.descTitle}>{donatePage.email}</Body>
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
        </Section>
      </main>
      <Footer />
    </>
  )
}
