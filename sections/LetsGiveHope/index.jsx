import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./LetsGiveHope.module.css";
import { icons } from "./icons";
import CompanyData from "@/components/CompanyData";

export default function LetsGiveHope({}) {
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );
  return (
    <section className={style.section + " section"} style={{ height: height }}>
      <video autoPlay loop muted className={style.video}>
        <source src="flag-ukraine.mp4" type="video/mp4" />
      </video>
      <div className={style.filter} />
      {icons.letsGiveHopeLogo(`${style.mainTitle} svgTextBlock`)}
      {tablet && <CompanyData className={style.companyData} />}
    </section>
  );
}
