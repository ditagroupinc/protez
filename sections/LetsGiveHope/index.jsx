import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./LetsGiveHope.module.css";
import { icons } from "./icons";
import CompanyData from "@/components/CompanyData";
import VideoAndFilter from "@/components/VideoAndFilter";

const LetsGiveHope = forwardRef(function ({ id }, ref) {
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );
  return (
    <section className={`${style.section} section`} id={id} ref={ref}>
      <VideoAndFilter src={"flag-ukraine.mp4"} />
      <div className={style.filter} />
      {icons.letsGiveHopeLogo(`${style.mainTitle} svgTextBlock`)}
      {width < 700 && <CompanyData className={style.companyData} />}
    </section>
  );
});
LetsGiveHope.displayName = "LetsGiveHope";
export default LetsGiveHope;
