import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./ourPartners.module.css";
import icons from "./icons";
import globalIcons from "@/texts&svg/icons";
import Image from "next/image";
import Link from "next/link";
import texts from "@/texts&svg";

const PartnerCard = ({ image, dita }) => {
  if (dita)
    return (
      <div>
        <Link
          href="https://dita-group.com/"
          target="blank"
          className={`${style.partnerCard} textContainer ${dita && style.dita}`}
        >
          {globalIcons.ditaLogo(`${style.partnerLogo}`)}
        </Link>
      </div>
    );
  return (
    <div className={`${style.partnerCard} textContainer`}>
      <Image
        src={`/partnersLogos/${image}`}
        object-fit="contain"
        alt={image}
        width={300}
        height={230}
        className={style.partnerLogo}
      />
    </div>
  );
};

const OurPartners = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { tabletLarge } = useContext(ScreenModeAndSizeContext);
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.container}>
        <div className={style.specialThanks + " textContainer"}>
          {tabletLarge
            ? icons.specialThanksLogo.tablet[lang](`${style.logo} svgTextBlock`)
            : icons.specialThanksLogo.desktop[lang](
                `${style.logo} svgTextBlock`
              )}
        </div>
        <PartnerCard image="ottobock.svg" />
        <div>
          <Link href="/partners" className={`${style.discoverCard} h3`}>
            <p>{texts.ourPartners.discover[lang]}</p>
            {icons.arrow()}
          </Link>
        </div>
        {/* <PartnerCard image="paradise.svg" /> */}
        {/* <PartnerCard image="directRelief.svg" /> */}
        <PartnerCard image="esper.svg" />
        <PartnerCard image="klmb.svg" />
        <PartnerCard image="antonovGroup.svg" />
        <PartnerCard dita />
        <PartnerCard image="chaliceOfMercy.svg" />
      </div>
    </section>
  );
});

OurPartners.displayName = "OurPartners";
export default OurPartners;
