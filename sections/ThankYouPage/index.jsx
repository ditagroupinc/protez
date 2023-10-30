import icons from "./icons";
import style from "./thankYouPage.module.css";
import Link from "next/link";
import texts from "@/texts&svg";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SquareButton from "@/components/SquareButton";

export default function ThankYouPage() {
  const { lang } = useContext(LanguageContext);
  return (
    <div className={style.container}>
      <div className={style.contentWrapper}>
        {icons.heart(style.heart)}
        <h1 className={style.heading}>{texts.thankYouPage.thankYou[lang]}</h1>
        <p className={style.message}>
          {texts.thankYouPage.message[lang]}
          <span>{texts.thankYouPage.pink[lang]}</span>
        </p>

        <SquareButton
          className={style.backToWebsiteButton}
          emptyBlack
          link
          href="/"
        >
          {texts.thankYouPage.backToWebsite[lang]}
        </SquareButton>

        {/* <Link href="/" className={style.protezLogo}>
          {icons.protezLogo()}
        </Link> */}
      </div>
    </div>
  );
}
