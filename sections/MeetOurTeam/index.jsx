import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import style from "./MeetOurTeam.module.css";
import TeamCard from "@/components/TeamCard";
import { icons } from "./icons";

const MeetOurTeamText = {
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
  ],
};

const MeetOurTeam = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  const { height, width, mobile, tablet, screenModeClass } = useContext(
    ScreenModeAndSizeContext
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <div className={style.container}>
        <div className="textContainer">
          {icons.meetOurTeamLogo(`${style.logo} svgTextBlock`)}
        </div>
        <div className={style.membersContainer}>
          {MeetOurTeamText.executives.map((card, index) => (
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
          mobile ? style.scrollable : ""
        }`}
      >
        {MeetOurTeamText.members.map((card, index) => (
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

MeetOurTeam.displayName = "MeetOurTeam";
export default MeetOurTeam;
