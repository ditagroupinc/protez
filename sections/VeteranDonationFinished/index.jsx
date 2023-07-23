"use client";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import DonorBox from "../Donorbox";

import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./VeteranDonationFinished.module.css";
import icons from "./icons";
import globalIcons from "@/texts&svg/icons";
import texts from "@/texts&svg";

export default function VeteranDonationFinished({ iframeLink }) {
  const { lang } = useContext(LanguageContext);
  const { mobile } = useContext(ScreenModeAndSizeContext);

  const vadymFedorovTexts = texts.veterans.veterans[0];
  return (
    <>
      <section className={`${style.section} section`}>
        {mobile
          ? icons.letsGiveHopeLogoMobile(`${style.logo} svgTextBlock`)
          : icons.letsGiveHopeLogo(`${style.logo} svgTextBlock`)}
        <div className={style.container}>
          <div className={`${style.leftSide}`}>
            {icons.vadymFedorov(`${style.veteranLogo} svgTextBlock`)}
            <h5 className={`h5 ${style.ageRank}`}>
              {vadymFedorovTexts.ageRank[lang]}
            </h5>
            <h4 className={`h2 ${style.cardTitle}`}>
              {vadymFedorovTexts.title[lang]}
            </h4>
            <p className={`p ${style.cardText}`}>
              {vadymFedorovTexts.text[lang]}
            </p>

            <div className={`${style.socialMediaLinksBox}`}>
              <a
                href="https://www.facebook.com/donate/238890858497931/199310116131457/"
                target="blank"
              >
                {globalIcons.iconFaceBookSquare(style.icon, "black")}
              </a>
              <a
                href="https://www.instagram.com/reel/CqPla3pO_nT/?igshid=MzRlODBiNWFlZA=="
                target="blank"
              >
                {globalIcons.iconInstagramSquare(style.icon, "black")}
              </a>
            </div>
          </div>
          {/* --- */}
          <div className={style.iframeContainer}>
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fvideos%2F3490463647948673%2F%3Fidorvanity%3D238890858497931&show_text=false&width=267&t=0"
              width="267"
              height="476"
              allowFullScreen
              // style="border:none;overflow:hidden"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className={style.iframe}
            />
          </div>
        </div>
      </section>
      <DonorBox className={style.donorBox} />
    </>
  );
}
