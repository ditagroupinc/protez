import Card from "@/components/Card";
import style from "./OurMission.module.css";
import { useContext, forwardRef } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import SmokeBackground from "@/components/SmokeBackground";
import { icons } from "./icons";

const OurMissionText = {
  blockInfo: {
    ourGoal: {
      eng: `Our goal is to help people who
      have lost limbs to restore their quality of life`,
    },
    providingState: {
      eng: `Providing state of the art prosthetic devices with personalized training and support in the USA with follow up in Ukraine`,
    },
    providePsychological: {
      eng: `Provide psychological support and emotional recovery.`,
    },
    unite: {
      eng: `Unite as many people as possible to help victims of war.`,
    },
  },
  titleText: {
    our: {
      eng: "Our",
    },
    mission: {
      eng: "MISSION",
    },
  },
};

const iconsObj = [
  icons.iconDisabledPerson,
  icons.iconHand,
  icons.iconHelpHeart,
  icons.iconPeople,
];
const OurMission = forwardRef(function ({ visible, id }, ref) {
  const { lang } = useContext(LanguageContext);
  return (
    <section
      className={`${style.section} section ${visible ? "showText" : ""}`}
      id={id}
      ref={ref}
    >
      <SmokeBackground />
      <div className={`${style.block}`}>
        <div className="textContainer">
          {icons.TitleSVG(`"svgTextBlock" ${style.logo}`)}
        </div>
        {Object.keys(OurMissionText.blockInfo).map((key, i) => (
          <Card
            key={i}
            icon={iconsObj[i]}
            text={OurMissionText.blockInfo[key][lang]}
          />
        ))}
      </div>
    </section>
  );
});

OurMission.displayName = "OurMission";
export default OurMission;
