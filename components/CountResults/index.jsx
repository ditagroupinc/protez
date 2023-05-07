import styles from "./CountResults.module.css";
import React, { useRef, useState, useEffect } from "react";

import CountUp from "react-countup";

const CountResults = ({ count, text }) => {
  const [inViewport, setInViewport] = useState(false);
  const ref = useRef(null);

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
    <div className={`h2 ${styles.counter}`}>
      <div>
        <span className={`${styles.title} h2`}>{text}</span>
      </div>

      <span ref={ref} className={`${styles.bigNumb}`}>
        {inViewport ? MyCounter() : 0}
      </span>
    </div>
  );
};

export default CountResults;
