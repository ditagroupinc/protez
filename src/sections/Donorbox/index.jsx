import style from './donorbox.module.scss'
import icons from './icons'
import Script from 'next/script'
import texts from '@/texts&svg'
import Divider from '@/components/Divider'
import { useLanguage } from '@/contexts/LanguageContext'
import useScreenModeAndSize from '@/hooks/useScreenModeAndSize'

const CompanyData = ({ className = '' }) => {
  const { lang } = useLanguage()
  const { mobile } = useScreenModeAndSize()

  return (
    <div className={`${style.companyData} ${className}`}>
      {mobile && (
        <>
          <div>
            <p className={'h6 '}>{texts.donate.organizationData.sendDonations[lang]}</p>
          </div>

          <a
            target="_blank"
            href="https://next.privat24.ua/payments/form/%7B%22token%22:%22f7dfa6a1-d8f6-4602-9f21-9b1c99d61cb5%22%7D?fbclid=PAAaYO7jJkvqk11ELkvBzSn4XYumcT4TtR7w8hug3JdXPX7oZM67guqdNAUxI_aem_ASDuFPVJU_RL-637DNh004o5oAYju01DczwND11fGmX4Hn-s0aPgzb3b_RvBPxzDtkQ"
            className={style.privatButton}
            rel="noreferrer"
          >
            <button>{icons.privat24Logo()}</button>
          </a>

          <Divider className={style.divider} />
        </>
      )}
      <div className={`${style.addressContainer}`}>
        <p>
          <span className={'h6 '}>{texts.donate.organizationData.nonProfitOrganization[lang]}</span>
          <span className={'h6 '}>{texts.donate.organizationData.ein[lang]}</span>
        </p>
        <Divider className={style.divider} />
        <p className={style.sendChecks}>{texts.donate.organizationData.sendChecks[lang]}</p>
        <p className={'h5 '}>
          <span className={style.block}>Protez Foundation</span>
          <span className={style.block}>3510 Hopkins Pl, W130D</span>
          <span className={style.block}>Oakdale, MN 55128</span>
          <span className={style.block}>United States of America</span>
          {/* {texts.donate.organizationData.address[lang]} */}
        </p>
      </div>
      <div className={style.links}>
        <a className={`${style.link} h6`} href="tel:+16127724777">
          +1 612-772-4777
        </a>

        <a href={`mailto:${texts.donate.organizationData.email}`} className={`${style.link} h6`}>
          {texts.donate.organizationData.email}
        </a>
      </div>

      {!mobile && (
        <>
          <Divider className={style.divider} />

          <div>
            <p className={'h6 '}>{texts.donate.organizationData.sendDonations[lang]}</p>
          </div>

          <a
            target="_blank"
            href="https://next.privat24.ua/payments/form/%7B%22token%22:%22f7dfa6a1-d8f6-4602-9f21-9b1c99d61cb5%22%7D?fbclid=PAAaYO7jJkvqk11ELkvBzSn4XYumcT4TtR7w8hug3JdXPX7oZM67guqdNAUxI_aem_ASDuFPVJU_RL-637DNh004o5oAYju01DczwND11fGmX4Hn-s0aPgzb3b_RvBPxzDtkQ"
            className={style.privatButton}
            rel="noreferrer"
          >
            <button>{icons.privat24Logo()}</button>
          </a>
        </>
      )}
    </div>
  )
}

export default function DonorBox({ monthly = false, className }) {
  const { lang } = useLanguage()
  const { mobile } = useScreenModeAndSize()

  return (
    <section className={`${style.section} ${className}`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogo.mobile[lang](`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo.desktop[lang](`${style.logo} svgTextBlock`)}
      <h1 className={style.title}>{texts.donate.title[lang]}</h1>
      {monthly ? (
        <h2 className={`${style.title} ${style.monthlyPayment}`}>
          {texts.donate.monthlyPayment[lang]}
        </h2>
      ) : (
        ''
      )}
      <h5 className={`h5 ${style.support}`}>
        {texts.donate.strongSupport[lang]}{' '}
        <span className={style.pink}>{texts.donate.under8[lang]}</span>.
      </h5>

      <div className={style.flexContainer}>
        <CompanyData />

        <Script src="https://donorbox.org/widget.js" paypalExpress="false" />
        <iframe
          src={
            monthly
              ? 'https://donorbox.org/embed/website-donation-64-2'
              : 'https://donorbox.org/embed/website-donation-64'
          }
          name="donorbox"
          /* eslint-disable-next-line react/no-unknown-property */
          allowpaymentrequest="allowpaymentrequest"
          seamless="seamless"
          scrolling="no"
          className={style.form}
          style={{
            height: '685px',
            maxWidth: 425,
            minWidth: 250,
          }}
        />
      </div>
    </section>
  )
}
