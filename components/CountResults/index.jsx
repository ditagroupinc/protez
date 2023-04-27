import "@/app/globals.css";
import styles from "./CountResults.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { ScreenModeAndSizeContext } from "@/contexts/ScreenModeAndSizeContext";
import CountUp from "react-countup";
import { Divider } from "../Divider";
const CountResults = ({ count, text, dividerSize }) => {
  const { mobile } = useContext(ScreenModeAndSizeContext);
  const [inViewport, setInViewport] = useState(false);
  const ref = useRef(null);

  const mobileDesktopClass = () => {
    if (mobile) return "mobile";
    return "desktop";
  };

  const MyCounter = () => {
    return (
      <CountUp start={0} end={count} delay={1} duration={5} separator=" " />
    );
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
      <div
        className={`h2 ${styles.counter} ${mobileDesktopClass()} ${
          inViewport ? styles.visible : ""
        }`}
      >
        <span>{text}</span>{" "}
        <span ref={ref} className={styles.digit}>
          {inViewport ? MyCounter() : 0}
        </span>
      </div>
      <Divider dividerSize={dividerSize} />
    </>
  );
};

export default CountResults;
