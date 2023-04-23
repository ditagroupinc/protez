import styles from "./TextBlock.module.css";
import "../../app/globals.css";

const TextBlock = ({ text, icon }) => {
  return (
    <div className={`${styles.block}`}>
      <h5 className={`h5 `}>{text}</h5>
      <div>{icon}</div>
    </div>
  );
};

export default TextBlock;
