import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SquareButton from "@/components/SquareButton";
import Divider from "@/components/Divider";
import texts from "@/texts&svg";

import style from "./companyDataNonProfit.module.css";

export default function CompanyDataNonProfit({ className = "", black }) {
  const { lang } = useContext(LanguageContext);

  return (
    <div
      className={`${style.container} ${black ? style.black : ""} ${className}`}
    >
      <div className={style.addressContainer}>
        <p>
          <span className={"h6 "}>
            {texts.companyData.organizationData.nonProfitOrganization[lang]}
          </span>
          <span className={"h6 "}>
            {texts.companyData.organizationData.ein[lang]}
          </span>
        </p>
        <Divider />
      </div>
      <div className={style.buttonsContainer}>
        <SquareButton
          link
          href="donate"
          pink
          text={texts.companyData.actionButtons.makeDonation[lang]}
        />

        <SquareButton
          text={texts.companyData.actionButtons.needAProtez[lang]}
          emptyBlack={black}
          link
          blank
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_ESrB0vY6973GQSYfDY-WtWYE8UXnaeHJzxIQrEWPaQ_UXw/viewform"
        />
      </div>
    </div>
  );
}
