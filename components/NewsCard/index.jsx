import Image from "next/image";
import style from "./newsCard.module.css";
import { icons } from "./icons";

export default function NewsCard({
  link,
  photo,
  time,
  adress,
  logo,
  title,
  text,
  short,
}) {
  const shortClass = () => (short ? style.short : "");

  return (
    <a
      href={link}
      target="blank"
      className={`${style.newsCard} ${shortClass()}`}
    >
      <Image
        src={`/news/photos/${photo}`}
        alt="article picture"
        width={390}
        height={544}
        className={`${style.newsPicture} ${shortClass()}`}
      />
      <div className={`${style.date} h6 textContainer`}>
        <span>{time}</span>|<span>{adress}</span>
      </div>
      <div className="textContainer">{icons[logo](style.logo)}</div>
      <div className="textContainer">
        <h3 className={`h3 ${style.title}`}>{title}</h3>
      </div>
      <div className="textContainer">
        <p className={`p ${style.text}`}>{text}</p>
      </div>
      {icons.arrow(`${style.icon} arrow`)}
    </a>
  );
}
