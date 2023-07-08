import { useContext, forwardRef } from "react";

import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./veteranFBIframe.module.css";
import icons from "./icons";

export default function VeteranFBIframe({}) {
  const { mobile } = useContext(ScreenModeAndSizeContext);
  return (
    <section className={`${style.section} section`} id="donorBox">
      {mobile
        ? icons.letsGiveHopeLogoMobile(`${style.logo} svgTextBlock`)
        : icons.letsGiveHopeLogo(`${style.logo} svgTextBlock`)}
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fposts%2Fpfbid0aHYsUMeZ7nFiP9CooFoC8zYifXDU1SJU3TN9s1nmEzKvvurrHmv8QLqFQbQ2oZgVl&show_text=true&width=500"
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
