import styles from "./Card.module.css";
const Card = ({ text, icon, reverse }) => {
  const ifReverse = () => {
    if (reverse) return styles.reverseBlock;
    return "";
  };
  return (
    <div className={` h5 ${styles.block} ${ifReverse()}`}>
      <div className="textContainer">
        <h5>{text}</h5>
      </div>
      {icon()}
    </div>
  );
};

export default Card;
