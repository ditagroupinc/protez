import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import SquareButton from "@/components/SquareButton";
import Divider from "@/components/Divider";
import texts from "@/texts&svg";

import style from "./companyData.module.css";

export default function CompanyData({ className = "", black, colorInverted }) {
  const { lang } = useContext(LanguageContext);

  return (
    <div
      className={`${style.container} ${black ? style.black : ""} ${className}`}
    >
      <Divider className={style.divider} />
      <div className={`${style.buttonsContainer}`}>
        <SquareButton
          link
          href="donate"
          pink
          black={colorInverted}
          text={texts.companyData.actionButtons.makeDonation[lang]}
        />

        <SquareButton
          text={texts.companyData.actionButtons.needAProtez[lang]}
          emptyBlack={black}
          link
          blank
          href="https://docs.google.com/forms/d/e/1FAIpQLSf_ESrB0vY6973GQSYfDY-WtWYE8UXnaeHJzxIQrEWPaQ_UXw/viewform"
        />

        <SquareButton
          text={texts.companyData.actionButtons.protezAcademy[lang]}
          emptyBlack={black}
          link
          blank
          black
          href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
          className={`${style.thirdButton}`}
        />
      </div>
    </div>
  );
}
