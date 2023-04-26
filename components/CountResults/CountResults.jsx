import "@/app/globals.css";
import styles from "./CountResults.module.css";
import { useContext } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import CountUp from "react-countup";
const CountResults = ({ count, text }) => {
  const { width, length, mobile } = useContext(ScreenModeAndSizeContext);
  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };

  const MyCounter = () => {
    return <CountUp start={0} end={count} duration={2.75} separator=" " />;
  };

  return (
    <div className={` h2 ${styles.counter}   ${mobileDesktopClass()}`}>
      <span>{text}</span> <span className={styles.digit}>{MyCounter()}</span>
    </div>
  );
};

export default CountResults;
