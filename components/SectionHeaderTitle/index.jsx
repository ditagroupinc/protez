import styles from "./Title.module.css";
const Title = ({ italicText, normalText, style = "" }) => {
  return (
    <h2 className={` ${styles.title}` + " " + `${style}`}>
      <span className={styles.italic}>{italicText}</span>
      <span className={styles.normal}>{normalText}</span>
    </h2>
  );
};

export default Title;
