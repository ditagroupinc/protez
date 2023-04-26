import styles from "./Title.module.css";
const Title = ({ italicText, normalText }) => {
  return (
    <h2 className={` ${styles.title}  `}>
      <span className={styles.italic}>{italicText}</span>
      <span className={styles.normal}>{normalText}</span>
    </h2>
  );
};

export default Title;
