import "@/app/globals.css";
import styles from "./CountResults.module.css";
import React, { useRef, useState, useEffect, useContext } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import CountUp from "react-countup";

const CountResults = ({ count, text }) => {
  const { mobile } = useContext(ScreenModeAndSizeContext);
  const [inViewport, setInViewport] = useState(false);
  const ref = useRef(null);

  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };

  const digitArray = count.split("");

  const MyCounter = () => {
    return digitArray.map((digit, index) => (
      <React.Fragment key={index}>
        {(digitArray.length == "7" && index === 1) ||
        (digitArray.length == "7" && index === 4) ? (
          <span> </span>
        ) : null}
        <CountUp
          start={null}
          end={digit}
          delay={1}
          duration={7}
          separator=" "
          scrollSpyOnce={true}
        />
      </React.Fragment>
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
        <span className={`${styles.title}`}>{text}</span>
        <span ref={ref} className={`bigNumb`}>
          {inViewport ? MyCounter() : 0}
        </span>
      </div>
    </>
  );
};

export default CountResults;
