import style from "./Card.module.css";
const Card = ({ text, icon, reverse }) => {
  const ifReverse = () => {
    if (reverse) return style.reverseBlock;
    return "";
  };
  return (
    <div className={` h5 ${style.block} ${ifReverse()}`}>
      <div className="textContainer">
        <h5>{text}</h5>
      </div>
      {icon()}
    </div>
  );
};

export default Card;
