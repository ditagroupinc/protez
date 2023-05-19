import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./veteranFBIframe.module.css";
import icons from "./icons";

import texts from "@/texts&svg";

export default function VeteranFBIframe({}) {
  const { lang } = useContext(LanguageContext);
  const { tablet, tabletLarge, mobile } = useContext(ScreenModeAndSizeContext);
  return (
    <section className={`${style.section} section`} id="donorBox">
      <iframe
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fprostheticsforukrainians%2Fposts%2Fpfbid0aHYsUMeZ7nFiP9CooFoC8zYifXDU1SJU3TN9s1nmEzKvvurrHmv8QLqFQbQ2oZgVl&show_text=true&width=500"
        width="500"
        height="752"
        // style="border:none;overflow:hidden"
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className={style.iframe}
      />
      {/*         
        <iframe
          src="https://donorbox.org/embed/website-donation-64"
          name="donorbox"
          allowpaymentrequest="allowpaymentrequest"
          seamless="seamless"
          frameBorder="0"
          scrolling="no"
          height="900px"
          width="100%"
          className={style.form}
          style={{
            maxWidth: 425,
            minWidth: 250,
            maxHeight: "none!important",
          }}
        /> */}
    </section>
  );
}
