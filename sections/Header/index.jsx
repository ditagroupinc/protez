import { useContext, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import useOutsideClick from "@/hooks/useOutsideClick";
import { icons } from "./icons";
import texts from "@/texts&svg";
import SquareButton from "@/components/SquareButton";
import SocialMediaLinks from "@/components/SocialMediaLinks";

import Divider from "@/components/Divider";
import Link from "next/link";

import style from "./header.module.scss";

const BurgerButton = ({ close, onClick }) => {
  if (!close) {
    return (
      <button className={`${style.burgerButton}`} onClick={onClick}>
        <span />
        <span />
        <span />
      </button>
    );
  } else {
    return (
      <button className={style.burgerButton} onClick={onClick}>
        {icons.menuClose()}
      </button>
    );
  }
};

export default function Header({ notMainPage, black }) {
  const { lang, setLang } = useContext(LanguageContext);
  const handleLanguageChange = () => {
    const langToSet = lang === "english" ? "ukrainian" : "english";
    setLang(langToSet);
    localStorage.setItem("lang", langToSet);
  };

  const { width, mobile } = useContext(ScreenModeAndSizeContext);
  const [headerIsOpened, setHeaderIsOpened] = useState(false);
  const ref = useOutsideClick(() => setHeaderIsOpened(false));

  const navLinks = Object.keys(texts.header.navigation).map(
    (el) => texts.header.navigation[el]
  );
  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened);
  };

  const blackClassName = () => {
    if (notMainPage || black || (width <= 750 && headerIsOpened))
      return style.black;
    return "";
  };

  return (
    <>
      <header
        className={`${style.header} ${
          notMainPage ? style.notMainPage : ""
        } ${blackClassName()}`}
        id="header"
      >
        {notMainPage ? (
          <Link href={"/"}>
            {icons.protezFoundationLogo(
              `${style.foundationLogo} ${mobile ? style.small : ""}`
            )}
          </Link>
        ) : (
          <a href={"#letsGiveHope"}>
            {icons.protezFoundationLogo(
              `${style.foundationLogo} ${mobile ? style.small : ""}`
            )}
          </a>
        )}
        {mobile ? (
          <BurgerButton onClick={toggleHeader} close={headerIsOpened} />
        ) : (
          <div
            className={`${style.headerActionLang} ${
              headerIsOpened ? style.transparent : ""
            }`}
          >
            <a
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target="blank"
              className={`${style.protezAcademy}`}
            >
              {texts.header.actionButtons.protezAcademy[lang]}
            </a>
            <Divider vertical />
            <button
              className={`${style.languageButton} ${style.upper}`}
              onClick={handleLanguageChange}
            >
              {icons.iconWorld(style.languageButtonIcon)}
              <span className={`h6 ${style.languageButtonText}`}>{lang}</span>
            </button>
            <Divider vertical />
            <BurgerButton onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}
        <nav
          ref={ref}
          className={`${style.headerNav} ${headerIsOpened ? style.opened : ""}`}
        >
          <div>
            <span className={style.menuText}>{texts.header.menu[lang]}</span>
            <ul className={style.ancorList}>
              {navLinks.map((link, index) => (
                <li key={index} className={"h4"}>
                  {notMainPage ? (
                    <Link
                      className={style.navAncor}
                      href="/"
                      onClick={toggleHeader}
                    >
                      {link[lang]}
                    </Link>
                  ) : (
                    <a
                      className={style.navAncor}
                      href={`#${link.id}`}
                      onClick={toggleHeader}
                    >
                      {link[lang]}
                    </a>
                  )}
                </li>
              ))}
              {/* {mobile && (
              <li className={"h4"}>
                <button className={style.navAncor + " " + style.underlined}>
                  {texts.header.actionButtons.lang[lang]}
                </button>
              </li>
            )} */}
            </ul>
          </div>
          <div>
            <SquareButton link href="donate" pink>
              {texts.header.actionButtons.makeDonation[lang]}
            </SquareButton>

            <SquareButton
              link
              blank
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              black
              className={style.protezAcademyMenuButton}
            >
              {texts.header.actionButtons.protezAcademy[lang]}
            </SquareButton>

            <Divider className={style.headerDivider} />
            <span className={style.menuText}>
              {texts.header.getInTouch[lang]}
            </span>
            <div className={style.socialMediaLinks}>
              {texts.socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.address}
                  className={style.socialMediaLink}
                  target="blank"
                >
                  {link.icon(style.socialMediaIcon)}
                </a>
              ))}
            </div>
            <a className={`${style.phoneNumber} h6`} href="tel:+16127724777">
              +1 612-772-4777
            </a>
          </div>
          <div className={style.languageButtonContainer}>
            <button
              className={style.languageButton}
              onClick={handleLanguageChange}
            >
              {icons.iconWorld(style.languageButtonIcon)}{" "}
              <span className={`h6 ${style.languageButtonText}`}>
                {/* {texts.header.actionButtons.lang[lang]} */}
                {lang}
              </span>
            </button>
          </div>
        </nav>
      </header>
      <SocialMediaLinks className={headerIsOpened ? " hidden" : ""} />
    </>
  );
}
