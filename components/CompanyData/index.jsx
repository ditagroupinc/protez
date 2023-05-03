import { useContext, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";

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

export default function CompanyData({ className }) {
  const { lang, changeLang } = useContext(LanguageContext);
  const { width, length, mobile, tablet, desktop, screenModeClass } =
    useContext(ScreenModeAndSizeContext);
  return (
    <div className={style.container + " " + className}>
      <div className={style.adressContainer}>
        <p>
          <span className={"h6 " + screenModeClass}>
            {companyDataText.organizationData.nonProfitOrganization[lang]}
          </span>
          <span className={"h6 " + screenModeClass}>
            {companyDataText.organizationData.ein[lang]}
          </span>
        </p>
        <Divider />
        <p className={"h5 " + screenModeClass}>
          {companyDataText.organizationData.adress[lang]}
        </p>
      </div>
      <div className={style.buttonsContainer}>
        <button
          className={`squareButton h6 ${screenModeClass} ${style.pinkButton}`}
        >
          {companyDataText.actionButtons.makeDonation[lang]}
        </button>
        <button
          className={`squareButton h6 ${screenModeClass} ${style.transparentButton}`}
        >
          {companyDataText.actionButtons.needAProtez[lang]}
        </button>
      </div>
    </div>
  );
}
