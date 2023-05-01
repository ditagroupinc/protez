import Image from "next/image";
import style from "./TeamCard.module.css";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";

export default function TeamCard({ photo, links, name, position }) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );
  console.log(links);
  return (
    <div className={`${screenModeClass} ${style.teamCard}`}>
      <Image
        src={`/team/${photo}`}
        object-fit="contain"
        priority
        alt="Picture of the author"
        width={264}
        height={220}
        className={style.photo}
      />
      <div className={`${screenModeClass} ${style.container}`}>
        <div className={`${screenModeClass} ${style.linksList}`}>
          {Object.keys(links).map((key, index) => (
            <a href={links[key]} key={index}>
              <Image
                src={`/socialMediaIcons/${key}.svg`}
                object-fit="contain"
                priority
                alt="Picture of the author"
                width={33}
                height={33}
                className={style.photo}
              />
            </a>
          ))}
        </div>
        <h5 className={`h5 ${screenModeClass} ${style.name}`}>{name}</h5>

        <h6 className={`h6 ${screenModeClass} ${style.position}`}>
          {position}
        </h6>
      </div>
    </div>
  );
}
