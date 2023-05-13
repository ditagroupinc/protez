import { useContext, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { icons } from "./icons";
import texts from "@/texts&svg";

import { Divider } from "@/components/Divider";
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

const BurgerButton = ({ close, onClick, black }) => {
  if (!close) {
    return (
      <button
        className={`${style.burgerButton} ${black ? style.black : ""}`}
        onClick={onClick}
      >
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

export default function Header({ notMainPage }) {
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
        className={`${style.header} ${notMainPage ? style.notMainPage : ""}`}
        id="header"
      >
        <Link href="/">
          {icons.protezFoundationLogo(
            `${style.foundationLogo} ${
              (width <= 920 && headerIsOpened) || notMainPage ? style.black : ""
            } ${mobile ? style.small : ""}`
          )}
        </Link>

        {mobile ? (
          <BurgerButton
            onClick={toggleHeader}
            close={headerIsOpened}
            black={notMainPage}
          />
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
            <BurgerButton
              onClick={toggleHeader}
              close={headerIsOpened}
              black={notMainPage}
            />
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
    </>
  );
}
