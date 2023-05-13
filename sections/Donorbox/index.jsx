import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./donorbox.module.css";
import icons from "./icons";
import Script from "next/script";
import CompanyData from "@/components/CompanyData";
const donorBoxText = {
  title: {
    eng: "All charitable contributions are tax-deductible.",
  },
};

export default function DonorBox({}) {
  const { lang } = useContext(LanguageContext);
  const { tablet, tabletLarge, mobile } = useContext(ScreenModeAndSizeContext);
  return (
    <section className={`${style.section}`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogoMobile(`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo(`${style.logo} svgTextBlock`)}
      <h1 className={style.title}>{donorBoxText.title[lang]}</h1>
      <div className={style.flexContainer}>
        <CompanyData className={style.companyData} black />

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
