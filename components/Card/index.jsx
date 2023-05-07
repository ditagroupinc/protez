import styles from "./Card.module.css";
import { useContext } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
const Card = ({ text, icon, reverse }) => {
  // prop 'reverse" used to reverse the component's text and icon
  const { mobile } = useContext(ScreenModeAndSizeContext);
  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };
  const ifReverse = () => {
    if (reverse) return styles.reverseBlock;
    return "";
  };
  return (
    <div
      className={` h5  ${mobileDesktopClass()} ${styles.block} ${ifReverse()}`}
    >
      <div className="textContainer">
        <h5>{text}</h5>
      </div>
      {icon()}
    </div>
  );
};

export default Card;
