import { useContext, useState } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { icons } from "./icons";

import { Divider } from "@/components/Divider";
import CompanyData from "@/components/CompanyData";

import style from "./header.module.css";

const headerText = {
  menu: {
    eng: "Menu",
  },
  getInTouch: {
    eng: "Get in touch",
  },
  navigation: {
    aboutUs: {
      eng: "About us",
    },
    prostheticsForUkrainians: {
      eng: "Prosthetics for Ukrainians",
    },
    stories: {
      eng: "Stories",
    },
    news: {
      eng: "News",
    },
    getInvolved: {
      eng: "Get Involved",
    },
    partners: {
      eng: "Partners",
    },
    team: {
      eng: "Team",
    },
  },
  actionButtons: {
    becomeAVolunteer: {
      eng: "Become a Volunteer",
    },

    back2top: {
      eng: "Back to top   →",
    },
    lang: {
      eng: "Language",
    },
  },
};

const BurgerButton = ({ close, onClick }) => {
  if (!close) {
    return (
      <button className={style.burgerButton} onClick={onClick}>
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

const socialMediaLinks = [
  { adress: "facebook.com", icon: icons.iconFaceBook },
  { adress: "instagram.com", icon: icons.iconInstagram },
  { adress: "linkedin.com", icon: icons.iconLinkedin },
];

export default function Header() {
  const { lang, changeLang } = useContext(LanguageContext);
  const { width, length, mobile, tablet, desktop, screenModeClass } =
    useContext(ScreenModeAndSizeContext);
  const [headerIsOpened, setHeaderIsOpened] = useState(false);
  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };
  const navLinks = Object.keys(headerText.navigation).map(
    (el) => headerText.navigation[el]
  );
  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened);
  };
  return (
    <>
      <header className={style.header}>
        {icons.protezFoundationLogo(
          `${style.foundationLogo} ${
            width <= 920 && headerIsOpened ? style.black : ""
          } ${mobile ? style.small : ""}`
        )}

        {mobile ? (
          <BurgerButton onClick={toggleHeader} close={headerIsOpened} />
        ) : (
          <div className={style.headerActionLang}>
            <button
              className={"h6 " + screenModeClass + " " + style.becomeAVolunteer}
            >
              {headerText.actionButtons.becomeAVolunteer[lang]}
            </button>
            <Divider vertical />
            <BurgerButton onClick={toggleHeader} close={headerIsOpened} />
          </div>
        )}
        <nav
          className={`${style.headerNav} ${headerIsOpened ? style.opened : ""}`}
        >
          <div>
            <span className={style.menuText}>{headerText.menu[lang]}</span>
            <ul className={style.ancorList}>
              {navLinks.map((link, index) => (
                <li key={index} className={"h4 " + screenModeClass}>
                  <button className={style.navAncor}>{link[lang]}</button>
                </li>
              ))}
              {mobile && (
                <li className={"h4 " + screenModeClass}>
                  <button className={style.navAncor + " " + style.underlined}>
                    {headerText.actionButtons.lang[lang]}
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <span className={style.menuText}>
              {headerText.getInTouch[lang]}
            </span>
            <button
              className={
                screenModeClass +
                " " +
                style.becomeAVolunteer +
                " " +
                style.short +
                " " +
                style.black
              }
            >
              {headerText.actionButtons.becomeAVolunteer[lang]}
            </button>
            <Divider className={style.headerDivider} />
            <div className={style.socialMediaLinksHeader}>
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.adress}
                  className={style.socialMediaLink}
                  target="blank"
                >
                  {link.icon()}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
      {desktop && (
        <>
          <CompanyData />
          <div className={`${style.socialMediaLinksFixed}`}>
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.adress}
                className={style.socialMediaLink}
                target="blank"
              >
                {link.icon()}
              </a>
            ))}
          </div>
        </>
      )}

      <button
        className={`${style.backToTopButton} h6 ${mobile ? style.mobile : ""}`}
      >
        {headerText.actionButtons.back2top[lang]}
      </button>
    </>
  );
}
