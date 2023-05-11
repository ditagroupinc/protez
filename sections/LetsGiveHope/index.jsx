import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./LetsGiveHope.module.css";
import { icons } from "./icons";
import CompanyData from "@/components/CompanyData";
import VideoAndFilter from "@/components/VideoAndFilter";

export default function LetsGiveHope({ id }) {
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );
  return (
    <section className={`${style.section} section`} id={id}>
      <VideoAndFilter src={"flag-ukraine.mp4"} />
      <div className={style.filter} />
      {icons.letsGiveHopeLogo(`${style.mainTitle} svgTextBlock`)}
      {tablet && <CompanyData className={style.companyData} />}
    </section>
  );
}
