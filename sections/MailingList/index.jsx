import styles from "./MailingList.module.css";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import Image from "next/image";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";
import SquareButton from "@/components/SquareButton";

const MailingListText = {
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
};

const imgRoute = [
  "/veterans/troops1.png",
  "/veterans/troops2.png",
  "/veterans/troops4.png",
  "/veterans/troops5.png",
  "/veterans/troops3.png",
  "/veterans/troops4.png",
  "/veterans/troops5.png",
  "/veterans/troops1.png",
  "/veterans/troops2.png",
  "/veterans/troops4.png",
  "/veterans/troops5.png",
  "/veterans/troops3.png",
];

const MailingList = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, mobile, tablet, tabletLarge, desktopSmall } = useContext(
    ScreenModeAndSizeContext
  );

  const handleClick = () => console.log("click");

  const Images = () => {
    return imgRoute.map((path, i) => {
      return (
        <div key={i}>
          <Image
            src={path}
            alt="troops"
            priority
            width={2560}
            height={1440}
            className={styles.troopsImg}
          />
        </div>
      );
    });
  };

  return (
    <section
      className={`${styles.section} ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      {/* <SmokeBackground /> */}
      <div className={`${styles.images}`}>
        <Images />
      </div>
      <div className={`${styles.title} h6`}>
        <div className="textContainer">{icons.titleSVG("svgTextBlock")}</div>
        <form className={`${styles.form} h6`} action="POST">
          <input
            className="p"
            placeholder={MailingListText.email[lang]}
            type="email"
            name="email"
            required
          />
          <SquareButton
            pink
            onClick={handleClick}
            text={MailingListText.subcribe[lang]}
          />
        </form>
      </div>
    </section>
  );
});

MailingList.displayName = "MailingList";
export default MailingList;
