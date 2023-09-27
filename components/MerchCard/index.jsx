import style from "./merchCard.module.scss";
import Image from "next/image";

export default function MarchCard({
  href,
  photoSrc,
  title,
  prevPrice,
  price,
  currency,
}) {
  return (
    <a href={href} className={style.container} target="blank">
      <Image
        src={photoSrc}
        alt={title}
        width={372}
        height={374}
        className={`${style.picture}`}
      />
      <div className={`textContainer ${style.textContainer}`}>
        <h5 className={`h5 ${style.title}`}>{title}</h5>
        <div className={`${style.priceBlock}`}>
          {prevPrice ? (
            <h5 className={`h5 ${style.prevPrice}`}>
              {prevPrice}
              {currency}
            </h5>
          ) : (
            ""
          )}
          <h5 className={`h5 ${style.price}`}>
            {price}
            {currency}
          </h5>
        </div>
      </div>
    </a>
  );
}
