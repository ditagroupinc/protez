import "@/app/globals.css";
import styles from "./CountResults.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import CountUp from "react-countup";

const CountResults = ({ count, text }) => {
  const { mobile } = useContext(ScreenModeAndSizeContext);
  const [inViewport, setInViewport] = useState(false);
  const [digitLength, setDigitLength] = useState("");
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current?.childNodes?.length >= 6) {
  //     setDigitLength(ref.current.childNodes.length);
  //   }
  //   styleModForBigNumber();
  //   console.log(digitLength);
  // }, [ref.current]);

  const styleModForBigNumber = () => {
    return styles.styleMod;
  };
  console.log(ref.current?.childNodes?.length);
  if (ref.current?.childNodes?.length == "8") {
    styleModForBigNumber();
  }

  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };

  const digitArray = count.split("");

  const MyCounter = () => {
    return digitArray.map((digit, index) => (
      <CountUp
        key={index}
        start={null}
        end={digit}
        delay={2}
        duration={7}
        separator=" "
        scrollSpyOnce={true}
      />
    ));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInViewport(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <>
      <div className={`h2 ${styles.counter} ${mobileDesktopClass()}`}>
        <span>{text}</span>{" "}
        <span
          ref={ref}
          id="styleMod"
          className={`${styles.digit} ${styleModForBigNumber()}`}
        >
          {inViewport ? MyCounter() : 0}
        </span>
      </div>
    </>
  );
};

export default CountResults;
