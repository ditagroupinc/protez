import styles from "./TextBlock.module.css";
import "../../app/globals.css";

const TextBlock = ({ text, icon }) => {
  return (
    <div className={`${styles.block}`}>
      <h5 className={`h5 desktop `}>{text}</h5>
      {icon}
    </div>
  );
};

export default TextBlock;
