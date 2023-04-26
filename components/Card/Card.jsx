import styles from "./Card.module.css";
import { useContext } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
const Card = ({ text, icon, style = "", reverse }) => {
  // prop 'reverse" used to reverse the component's text and icon
  const { width, length, mobile } = useContext(ScreenModeAndSizeContext);
  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };
  const ifStyle = () => {
    if (style) return styles.style;
    return "";
  };
  const ifReverse = () => {
    if (reverse) return styles.reverseBlock;
    return "";
  };
  return (
    <div className={`${styles.block} ${ifStyle()} ${ifReverse()}`}>
      <h5 className={`h5 ` + mobileDesktopClass()}>{text}</h5>
      {icon()}
    </div>
  );
};

export default Card;
