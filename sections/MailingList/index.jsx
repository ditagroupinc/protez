import styles from "./MailingList.module.css";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import Image from "next/image";

const MailingListText = {
  titleText: {
    join: {
      eng: "Join our",
    },
    mailing: {
      eng: "Mailing ",
    },
    list: {
      eng: "list",
    },
    subcribe: {
      eng: "Subcribe!",
    },
    email: {
      eng: "Your email",
    },
  },
};

const imgRoute = [
  "/veterans/troops1.png",
  "/veterans/troops2.png",
  "/veterans/troops5.png",
  "/veterans/troops1.png",
  "/veterans/troops3.png",
  "/veterans/troops4.png",
  "/veterans/troops1.png",
  "/veterans/troops1.png",
  "/veterans/troops5.png",
  "/veterans/troops2.png",
  "/veterans/troops3.png",
  "/veterans/troops4.png",
];

const MailingList = () => {
  const { lang } = useContext(LanguageContext);
  const { height } = useContext(ScreenModeAndSizeContext);
  const { mobile } = useContext(ScreenModeAndSizeContext);
  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };

  const Images = () => {
    return imgRoute.map((path, i) => {
      return (
        <div key={i}>
          <Image
            src={path}
            alt="troops"
            width={2560}
            height={1440}
            className={styles.troopsImg}
          />
        </div>
      );
    });
  };

  return (
    <section style={{ height: height }} className={`${styles.section} `}>
      <div className={styles.images}>
        <Images />
      </div>
      <div className={`${styles.title} `}>
        <h2>{MailingListText.titleText.join[lang]}</h2>
        <h2>
          {MailingListText.titleText.mailing[lang]}
          <span className={`${styles.uppercase} `}>
            {MailingListText.titleText.list[lang]}
          </span>
        </h2>
        <form className={`${styles.form} h6`} action="POST">
          <input
            placeholder={MailingListText.titleText.email[lang]}
            type="email"
            name="email"
            required
          />
          <button
            className={`squareButton  ${mobileDesktopClass()} ${
              styles.pinkButton
            }`}
          >
            {MailingListText.titleText.subcribe[lang]}
          </button>
        </form>
      </div>
    </section>
  );
};
export default MailingList;
