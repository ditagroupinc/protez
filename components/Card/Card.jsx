import styles from "./Card.module.css";
import "../../app/globals.css";

const Card = ({ text, icon, style = "" }) => {
  return (
    <div className={`${styles.block} ${styles.style}`}>
      <h5 className={`h5 desktop `}>{text}</h5>
      {icon}
    </div>
  );
};

export default Card;
