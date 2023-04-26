import React from "react";
import styles from "./Title.module.css";
const Title = ({ italicText, normalText, style }) => {
  return (
    <p className={style}>
      <span className={styles.italic}>{italicText}</span>
      <span className={styles.normal}>{normalText}</span>
    </p>
  );
};

export default Title;
