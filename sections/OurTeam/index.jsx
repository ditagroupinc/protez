import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { useRef, useEffect } from "react";
import style from "./ourTeam.module.css";
import TeamCard from "@/components/TeamCard";
import { icons } from "./icons.js";
import texts from "@/texts&svg";

const OurTeam = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );
  const scrollableContainer = useRef(null);
  useEffect(() => {
    if (width < 600) scrollableContainer.current.scrollLeft += 50;
  }, [width]);
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.container}>
        <div className="textContainer">
          {icons.ourTeamLogo(`${style.logo} svgTextBlock`)}
        </div>
        <div className={style.membersContainer}>
          {texts.ourTeam.executives.map((card, index) => (
            <TeamCard
              key={index}
              photo={card.photo}
              links={card.links}
              name={card.name[lang]}
              position={card.position[lang]}
              black
            />
          ))}
        </div>
      </div>
      <div
        className={`${style.membersContainer} ${
          width < 600 ? style.scrollable : ""
        }`}
        ref={scrollableContainer}
      >
        {texts.ourTeam.members.map((card, index) => (
          <TeamCard
            key={index}
            photo={card.photo}
            links={card.links}
            name={card.name[lang]}
            position={card.position[lang]}
            black
          />
        ))}
      </div>
    </section>
  );
});

OurTeam.displayName = "OurTeam";
export default OurTeam;
