"use client";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./veteranFBIframe.module.css";
import icons from "./icons";

export default function VeteranFBIframe({ iframeLink }) {
  const { mobile } = useContext(ScreenModeAndSizeContext);
  const { lang } = useContext(LanguageContext);
  return (
    <section className={`${style.section} section`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogo.mobile[lang](`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo.desktop[lang](`${style.logo} svgTextBlock`)}
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
