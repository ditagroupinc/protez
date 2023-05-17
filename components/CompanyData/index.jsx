import { useContext, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import SquareButton from "@/components/SquareButton";
import { Divider } from "@/components/Divider";

import style from "./companyData.module.css";

const companyDataText = {
  actionButtons: {
    makeDonation: {
      eng: "Make Donation!",
    },
    needAProtez: {
      eng: "Потрібен протез",
    },
  },
  organizationData: {
    nonProfitOrganization: {
      eng: "Nonprofit organization 501(c)(3)",
    },
    ein: {
      eng: "EIN: 88-2437069",
    },
    adress: {
      eng: "PROTEZ Foundation 3510 Hopkins Pl, W130D Oakdale, MN 55128 United States of America",
    },
  },
};

export default function CompanyData({ className = "", black }) {
  const { lang, changeLang } = useContext(LanguageContext);
  const { mobile } = useContext(ScreenModeAndSizeContext);

  const handleClick = () => {};

  return (
    <div
      className={`${style.container} ${black ? style.black : ""} ${className}`}
    >
      <div className={`${style.adressContainer} ${mobile ? style.mobile : ""}`}>
        <p>
          <span className={"h6 "}>
            {companyDataText.organizationData.nonProfitOrganization[lang]}
          </span>
          <span className={"h6 "}>
            {companyDataText.organizationData.ein[lang]}
          </span>
        </p>
        <Divider />
        <p className={"h5 "}>{companyDataText.organizationData.adress[lang]}</p>
      </div>
      <div
        className={`${style.buttonsContainer} ${mobile ? style.mobile : ""}`}
      >
        <SquareButton
          link
          href="Donate"
          pink
          onClick={handleClick}
          text={companyDataText.actionButtons.makeDonation[lang]}
        />

        <SquareButton
          onClick={handleClick}
          text={companyDataText.actionButtons.needAProtez[lang]}
          emptyBlack={black}
          link
          blank
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_ESrB0vY6973GQSYfDY-WtWYE8UXnaeHJzxIQrEWPaQ_UXw/viewform"
        />
      </div>
    </div>
  );
}
