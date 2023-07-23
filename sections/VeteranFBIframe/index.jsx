"use client";
import { useContext } from "react";

import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./veteranFBIframe.module.css";
import icons from "./icons";

export default function VeteranFBIframe({ iframeLink }) {
  const { mobile } = useContext(ScreenModeAndSizeContext);
  return (
    <section className={`${style.section} section`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogoMobile(`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo(`${style.logo} svgTextBlock`)}
      <iframe
        src={iframeLink}
        width="500"
        height="752"
        allowFullScreen
        // style="border:none;overflow:hidden"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className={style.iframe}
      />
    </section>
  );
}
