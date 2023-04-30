import Image from "next/image";

export default function TeamCard({ photo, links, name, position }) {
  return (
    <div>
      <Image
        src="/flag-usa.png"
        object-fit="contain"
        priority
        alt="Picture of the author"
        width={264}
        height={220}
        className={style.photo}
      />
      <div className={`${screenModeClass} ${style.container}`}>
        <div className={`${screenModeClass} ${style.linksList}`}>
          {links.map((link, index) => (
            <a href="" key={index}>
              <Image
                src="/flag-usa.png"
                object-fit="contain"
                priority
                alt="Picture of the author"
                width={264}
                height={220}
                className={style.photo}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
