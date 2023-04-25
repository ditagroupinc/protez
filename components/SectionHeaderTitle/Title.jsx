import styles from "./Title.module.css";
const Title = ({ italicText, normalText, style }) => {
  const ifStyle = () => {
    if (style) return style;
    return "";
  };
  return (
    <p className={`${ifStyle()} ${styles.title}`}>
      <h2 className={styles.italic}>{italicText}</h2>
      <h2 className={styles.normal}>{normalText}</h2>
    </p>
  );
};

export default Title;
