import { useContext, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { icons } from "./icons";

import { Divider } from "@/components/Divider";
import CompanyData from "@/components/CompanyData";
import Link from "next/link";

import style from "./header.module.css";

const headerText = {
  menu: {
    eng: "Menu",
  },
  getInTouch: {
    eng: "Get in touch",
  },
  navigation: {
    giveHope: {
      eng: "Give hope",
      id: "letsGiveHope",
    },
    mission: {
      eng: "Mission",
      id: "ourMission",
    },
    results: {
      eng: "Results",
      id: "ourResults",
    },
    ukraine: {
      eng: "Ukraine",
      id: "inNeed",
    },
    whatWeDo: {
      eng: "Prosthetics for Ukrainians",
      id: "prosthetics",
    },
    stories: {
      eng: "Stories",
      id: "veterans",
    },
    team: {
      eng: "Team",
      id: "ourTeam",
    },
    partners: {
      eng: "Partners",
      id: "ourPartners",
    },
    news: {
      eng: "News",
      id: "news",
    },
    getInvolved: {
      eng: "Get Involved",
      id: "mailingList",
    },
  },

  actionButtons: {
    protezAcademy: {
      eng: "Protez Academy",
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
  { adress: "https://youtube.com", icon: icons.iconYoutube },
  { adress: "https://facebook.com", icon: icons.iconFaceBook },
  { adress: "https://instagram.com", icon: icons.iconInstagram },
  { adress: "https://linkedin.com", icon: icons.iconLinkedin },
];

export default function Header({ backToMain }) {
  const { lang, changeLang } = useContext(LanguageContext);
  const { width, length, mobile, tablet, desktop, screenModeClass } =
    useContext(ScreenModeAndSizeContext);
  const [headerIsOpened, setHeaderIsOpened] = useState(false);

  const navLinks = Object.keys(headerText.navigation).map(
    (el) => headerText.navigation[el]
  );
  const toggleHeader = () => {
    setHeaderIsOpened(!headerIsOpened);
  };
  return (
    <>
      <header
        className={`${style.header} ${backToMain ? style.backToMain : ""}`}
        id="header"
      >
        {icons.protezFoundationLogo(
          `${style.foundationLogo} ${
            width <= 920 && headerIsOpened ? style.black : ""
          } ${mobile ? style.small : ""}`
        )}

        {mobile ? (
          <BurgerButton onClick={toggleHeader} close={headerIsOpened} />
        ) : (
          <div className={style.headerActionLang}>
            <a
              href="https://forms.gle/Wr3Tf9UJCLCq4sAQ6"
              target="blank"
              className={style.protezAcademy}
            >
              {headerText.actionButtons.protezAcademy[lang]}
            </a>
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
                <li key={index} className={"h4"}>
                  {backToMain ? (
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
              {mobile && (
                <li className={"h4"}>
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
                style.protezAcademy + " " + style.short + " " + style.black
              }
            >
              {headerText.actionButtons.protezAcademy[lang]}
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
                  {link.icon(style.socialMediaIcon)}
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
                {link.icon(style.socialMediaIcon)}
              </a>
            ))}
          </div>
        </>
      )}

      <a
        className={`${style.backToTopButton} h6 ${mobile ? style.mobile : ""}`}
        href={`#${headerText.navigation.giveHope.id}`}
      >
        {headerText.actionButtons.back2top[lang]}
      </a>
    </>
  );
}
