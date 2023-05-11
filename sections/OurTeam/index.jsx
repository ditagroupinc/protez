import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import { useRef, useEffect } from "react";
import style from "./ourTeam.module.css";
import TeamCard from "@/components/TeamCard";
import { icons } from "./icons.js";

const ourTeamText = {
  lets: {
    eng: "Let’s",
  },
  giveHope: {
    eng: "give hope",
  },
  together: {
    eng: "together",
  },
  executives: [
    {
      photo: "yuryA.png",
      links: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
      },
      name: {
        eng: "Yury Aroshidze",
      },
      position: {
        eng: "CEO “PROTEZ Foundation”",
      },
    },
    {
      photo: "yakovG.png",
      links: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
      },
      name: {
        eng: "Yakov Gradinar",
      },
      position: {
        eng: "Certified Prosthetist and Orthotist. Chief Medical Officer",
      },
    },
  ],
  members: [
    {
      photo: "andreyM.png",
      links: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
      },
      name: {
        eng: "Andrey Madan",
      },
      position: {
        eng: "Executive Program Director",
      },
    },
    {
      photo: "ivannaG.png",
      links: {},
      name: {
        eng: "Ivanna Gradinar",
      },
      position: {
        eng: "Financial Director",
      },
    },
    {
      photo: "valentynaP.png",
      links: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
      },

      name: {
        eng: "Valentyna Pavsyukova",
      },
      position: {
        eng: "Strategic Advisor",
      },
    },
    {
      photo: "ruslanSychov.png",
      links: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
      },

      name: {
        eng: "Ruslan Sychov",
      },
      position: {
        eng: "Digital/IT Advisor",
      },
    },
  ],
};

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
          {ourTeamText.executives.map((card, index) => (
            <TeamCard
              key={index}
              photo={card.photo}
              links={card.links}
              name={card.name[lang]}
              position={card.position[lang]}
              black={tablet}
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
        {ourTeamText.members.map((card, index) => (
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
