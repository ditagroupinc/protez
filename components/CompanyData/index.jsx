import { useContext, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import SquareButton from "@/components/SquareButton";
import Divider from "@/components/Divider";

import style from "./companyData.module.css";

const companyDataText = {
  actionButtons: {
    makeDonation: {
      eng: "Make Donation!",
    },
    needAProtez: {
      eng: "Потрібен протез",
    },
    protezAcademy: {
      eng: "Protez Academy",
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

export default function CompanyData({ className = "", black, colorInverted }) {
  const { lang, changeLang } = useContext(LanguageContext);
  const { width } = useContext(ScreenModeAndSizeContext);

  const handleClick = () => {};

  return (
    <div className={`${style.container} ${black && style.black} ${className}`}>
      {width > 700 && <Divider />}
      <div className={`${style.buttonsContainer}`}>
        <SquareButton
          link
          href="Donate"
          pink
          black={colorInverted}
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
        {width < 700 && (
          <SquareButton
            onClick={handleClick}
            text={companyDataText.actionButtons.protezAcademy[lang]}
            emptyBlack={black}
            link
            blank
            black
            href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
          />
        )}
      </div>
    </div>
  );
}
