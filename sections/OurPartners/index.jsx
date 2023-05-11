import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./ourPartners.module.css";
import { icons } from "./icons";
import Image from "next/image";

const ourPartners = {
  discover: {
    eng: "Discover all Partners",
  },
};

const PartnerCard = ({ image }) => (
  <div className={style.partnerCard + " textContainer"}>
    <Image
      src={`/partnersLogos/${image}`}
      object-fit="contain"
      priority
      alt="Picture of the author"
      width={300}
      height={230}
      className={style.partnerLogo}
    />
  </div>
);

const OurPartners = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { tablet, tabletLarge } = useContext(ScreenModeAndSizeContext);
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.container}>
        <div className={style.specialThanks + " textContainer"}>
          {tabletLarge
            ? icons.specialThanksTablet(`${style.logo} svgTextBlock`)
            : icons.specialThanks(`${style.logo} svgTextBlock`)}
        </div>
        <PartnerCard image="ottobock.png" />
        <div>
          <a className={`${style.discoverCard} h3`}>
            <p>{ourPartners.discover[lang]}</p>
            {icons.arrow()}
          </a>
        </div>
        <PartnerCard image="paradise.png" />
        <PartnerCard image="klmb.png" />
        <PartnerCard image="antonovGroup.png" />
        <PartnerCard image="ditaGroup.png" />
        <PartnerCard image="chaliceOfMercy.png" />
      </div>
    </section>
  );
});

OurPartners.displayName = "OurPartners";
export default OurPartners;
