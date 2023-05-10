import styles from "./CountResults.module.css";
import React from "react";

import CountUp from "react-countup";

const CountResults = ({ count, text, inViewport }) => {
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

  return (
    <div className={`${styles.counter}`}>
      <div>
        <span className={`${styles.title} h2`}>{text}</span>
      </div>

      <span className={`${styles.bigNumb}`}>
        {inViewport ? MyCounter() : 0}
      </span>
    </div>
  );
};

export default CountResults;
