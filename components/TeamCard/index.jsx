import Image from "next/image";
import style from "./TeamCard.module.css";

import globalIcons from "@/texts&svg/icons";
export default function TeamCard({ photo, links = {}, name, position, black }) {
  const cardColor = () => (black ? "#0D1125" : "#fff");

  return (
    <div className={`${style.teamCard}`}>
      <Image
        src={`/team/${photo}`}
        object-fit="contain"
        alt="Picture of the author"
        width={264}
        height={220}
      />
      <div
        className={`${style.container} ${black && style.black} textContainer`}
      >
        <div className={`${style.linksList}`}>
          {"facebook" in links ? (
            <a href={links.facebook.href} target="blank">
              {globalIcons[links.facebook.icon](style.icon, cardColor())}
            </a>
          ) : (
            <div className={style.placeholder} />
          )}
          {"instagram" in links ? (
            <a href={links.instagram.href} target="blank">
              {globalIcons[links.instagram.icon](style.icon, cardColor())}
            </a>
          ) : (
            <div className={style.placeholder} />
          )}
          {"linkedin" in links ? (
            <a href={links.linkedin.href} target="blank">
              {globalIcons[links.linkedin.icon](style.icon, cardColor())}
            </a>
          ) : (
            <div className={style.placeholder} />
          )}
          {"email" in links ? (
            <a href={links.email.href} target="blank">
              {globalIcons[links.email.icon](style.icon, cardColor())}
            </a>
          ) : (
            <div className={style.placeholder} />
          )}
          {/*
          {Object.keys(links).map((key, index) => ( 
          <a href={links[key].href} target="blank" key={index}>
            {globalIcons[links[key].icon](style.icon, cardColor())}
          </a> ))}
          */}
        </div>
        <h5 className={`h5 ${style.name}`}>{name}</h5>

        <h6 className={`h6 ${style.position}`}>{position}</h6>
      </div>
    </div>
  );
}
