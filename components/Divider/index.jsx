import style from "./divider.module.css";
export const Divider = ({ vertical, dividerSize }) => {
  const ifDividerSize = () => {
    if (dividerSize) {
      return { width: dividerSize.width, height: dividerSize.height };
    }
  };
  return (
    <div
      style={ifDividerSize()}
      className={`${style.divider} ${
        vertical ? style.vertical : style.horizontal
      }`}
    />
  );
};
