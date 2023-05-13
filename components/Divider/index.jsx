import style from "./divider.module.css";
export const Divider = ({ vertical, className = "" }) => {
  return (
    <div
      className={`${style.divider} ${
        vertical ? style.vertical : style.horizontal
      } ${className}`}
    />
  );
};
