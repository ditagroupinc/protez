import { forwardRef } from "react";

import style from "./LetsGiveHope.module.css";
import { icons } from "./icons";
import CompanyData from "@/components/CompanyData";
import VideoAndFilter from "@/components/VideoAndFilter";

const LetsGiveHope = forwardRef(function ({ id }, ref) {
  return (
    <section className={`${style.section} section`} id={id} ref={ref}>
      <VideoAndFilter src={"flag-ukraine.mp4"} />
      <div className={style.logoContainer}>
        {icons.letsGiveHopeLogo(`${style.mainTitle} svgTextBlock`)}
      </div>
      <CompanyData className={style.companyData} />
    </section>
  );
});
LetsGiveHope.displayName = "LetsGiveHope";
export default LetsGiveHope;
