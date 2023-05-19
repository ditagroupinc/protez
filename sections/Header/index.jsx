import { useContext, useState, useRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import useOutsideClick from "@/hooks/useOutsideClick";
import { icons } from "./icons";
import texts from "@/texts&svg";
import SquareButton from "@/components/SquareButton";

import Divider from "@/components/Divider";
import Link from "next/link";

import style from "./header.module.css";

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
  const { lang, changeLang } = useContext(LanguageContext);
  const { width, length, mobile, tablet, desktop, screenModeClass } =
    useContext(ScreenModeAndSizeContext);
  const [headerIsOpened, setHeaderIsOpened] = useState(false);
  const ref = useOutsideClick(() => setHeaderIsOpened(false));

  const navLinks = Object.keys(texts.header.navigation).map(
    (el) => texts.header.navigation[el]
  );
  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened);
  };

  const blackClassName = () => {
    if (notMainPage || black || (width <= 920 && headerIsOpened))
      return style.black;
    return "";
  };

  return (
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
        <div className={style.headerActionLang}>
          <a
            href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
            target="blank"
            className={`${style.protezAcademy}`}
          >
            {texts.header.actionButtons.protezAcademy[lang]}
          </a>
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
          <SquareButton
            link
            href="donate"
            pink
            text={texts.header.actionButtons.makeDonation[lang]}
          />

          <SquareButton
            link
            blank
            href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
            black
            text={texts.header.actionButtons.protezAcademy[lang]}
            className={style.protezAcademyMenuButton}
          />

          <Divider className={style.headerDivider} />
          <span className={style.menuText}>
            {texts.header.getInTouch[lang]}
          </span>
          <div className={style.socialMediaLinks}>
            {texts.socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.adress}
                className={style.socialMediaLink}
                target="blank"
              >
                {link.icon(style.socialMediaIcon)}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
