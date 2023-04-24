"use client";
import { useEffect, useRef } from "react";
import "../../app/globals.css";
import styles from "./CountResults.module.css";

const CountResults = ({ count, text }) => {
  const countupRef = useRef(null);
  let countUpAnim;

  useEffect(() => {
    // create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // start the countUp animation
            setTimeout(() => {
              initCountUp();
            }, 2000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // observe the countupRef
    observer.observe(countupRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    countUpAnim = new countUpModule.CountUp(countupRef.current, count);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }
  return (
    <p className={`${styles.fontStyle} h2 desktop`}>
      {text} <span ref={countupRef}>0</span>
    </p>
  );
};

export default CountResults;
