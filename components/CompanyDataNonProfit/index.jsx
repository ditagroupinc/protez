import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SquareButton from "@/components/SquareButton";
import Divider from "@/components/Divider";
import texts from "@/texts&svg";
import icons from "./icons";

import style from "./companyDataNonProfit.module.scss";

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
        <SquareButton link href="donate" pink>
          {texts.companyData.actionButtons.makeDonation[lang]}
        </SquareButton>

        <SquareButton
          emptyBlack={black}
          link
          blank
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_ESrB0vY6973GQSYfDY-WtWYE8UXnaeHJzxIQrEWPaQ_UXw/viewform"
        >
          {texts.companyData.actionButtons.needAProtez[lang]}
        </SquareButton>

        <SquareButton
          emptyBlack={black}
          link
          blank
          href="https://a.co/1DFbVIa?fbclid=IwAR26aMbpS7n8oVD2YlJu6fgSHf9BzRihSkHd19MhB4tNsFRcNLU6-Ja0hFc"
          className={style.amazonButton}
        >
          <span className={style.amazonButtonText}>
            {texts.companyData.actionButtons.supportWith[lang]}
          </span>
          {black ? icons.amazonBlack() : icons.amazon()}
        </SquareButton>
      </div>
    </div>
  );
}
