import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./ourPartners.module.css";
import TeamCard from "@/components/TeamCard";
import { icons } from "./icons";
import Image from "next/image";

const ourPartners = {
  discover: {
    eng: "Discover all Partners",
  },
};

const PartnerCard = ({ image }) => (
  <div className={style.partnerCard}>
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

export default function OurPartners({}) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );
  return (
    <section className={style.section + " section"} style={{ height: height }}>
      <div className={style.container}>
        <div className={style.specialThanks}>
          {icons.specialThanks("svgTextBlock")}
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
        <PartnerCard image="chaliceOfMercy.png" />
      </div>
    </section>
  );
}
