import style from "./socialMediaLinks.module.css";
import icons from "./icons";

import texts from "@/texts&svg";

export default function SocialMediaLinks({ className = "" }) {
  console.log(texts.socialMediaLinks);
  return (
    <div className={`${style.container} ${className}`}>
      {texts.socialMediaLinks.map((link, index) => (
        <a key={index} href={link.adress} className={style.link} target="blank">
          {link.icon(style.icon)}
        </a>
      ))}
    </div>
  );
}
