import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./ourPartners.module.css";
import { icons } from "./icons";
import Image from "next/image";
import Link from "next/link";

const partnersLogos = [
  "antonovGroup.png",
  "businessBus.png",
  "chaliceOfMercy.png",
  "ditaGrey.png",
  "klmb.png",
  "klmbGrey.png",
  "ossur.png",
  "ottobock.png",
  "paradise.png",
  "proteor.png",
  "slumberland.png",
  "ukraine.png",
];

const PartnerCard = ({ image, mobile }) => (
  <div
    className={`${mobile ? style.mobile : style.desktop} ${style.partnerCard}`}
  >
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

export default function AllOurPartners({}) {
  const { lang } = useContext(LanguageContext);
  const { tablet, tabletLarge, mobile } = useContext(ScreenModeAndSizeContext);
  return (
    <section className={`${style.section} section `} id="allOurPartners">
      <div className={style.specialThanks}>
        {tabletLarge
          ? icons.specialThanksTablet(`${style.logo} svgTextBlock`)
          : icons.specialThanks(`${style.logo} svgTextBlock`)}
      </div>
      <div className={style.container}>
        {partnersLogos.map((logo, index) => (
          <PartnerCard key={index} image={logo} mobile={mobile} />
        ))}
      </div>
    </section>
  );
}
