import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./donorbox.module.css";
import icons from "./icons";
import Script from "next/script";
import texts from "@/texts&svg";
import Divider from "@/components/Divider";

const CompanyData = ({ className = "" }) => {
  const { lang, changeLang } = useContext(LanguageContext);

  return (
    <div className={`${style.companyData} ${className}`}>
      <div className={`${style.adressContainer}`}>
        <p>
          <span className={"h6 "}>
            {texts.donate.organizationData.nonProfitOrganization[lang]}
          </span>
          <span className={"h6 "}>
            {texts.donate.organizationData.ein[lang]}
          </span>
        </p>
        <Divider className={style.divider} />
        <p className={style.sendChecks}>
          {texts.donate.organizationData.sendChecks[lang]}
        </p>
        <p className={"h5 "}>
          <span className={style.block}>Protez Foundation</span>
          <span className={style.block}>3510 Hopkins Pl, W130D</span>
          <span className={style.block}>Oakdale, MN 55128</span>
          <span className={style.block}>United States of America</span>
          {/* {texts.donate.organizationData.adress[lang]} */}
        </p>
      </div>
      <a
        href={`mailto:${texts.donate.organizationData.email}`}
        className={`${style.emailLink} h6`}
      >
        {texts.donate.organizationData.email}
      </a>
    </div>
  );
};

export default function DonorBox({}) {
  const { lang } = useContext(LanguageContext);
  const { tablet, tabletLarge, mobile } = useContext(ScreenModeAndSizeContext);
  return (
    <section className={`${style.section}`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogoMobile(`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo(`${style.logo} svgTextBlock`)}
      <h1 className={style.title}>{texts.donate.title[lang]}</h1>
      <div className={style.flexContainer}>
        <CompanyData />

        <Script src="https://donorbox.org/widget.js" paypalExpress="false" />
        <iframe
          src="https://donorbox.org/embed/website-donation-64"
          name="donorbox"
          allowpaymentrequest="allowpaymentrequest"
          seamless="seamless"
          frameBorder="0"
          scrolling="no"
          height="900px"
          width="100%"
          className={style.form}
          style={{
            maxWidth: 425,
            minWidth: 250,
            maxHeight: "none!important",
          }}
        />
      </div>
    </section>
  );
}
