import style from "./socialMediaLinks.module.css";

import texts from "@/texts&svg";

export default function SocialMediaLinks({ className = "" }) {
  return (
    <div className={`${style.container} ${className}`}>
      {texts.socialMediaLinks.map((link, index) => (
        <a
          key={index}
          href={link.address}
          className={style.link}
          target="blank"
        >
          {link.icon(style.icon)}
        </a>
      ))}
    </div>
  );
}
