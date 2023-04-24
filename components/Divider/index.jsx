import style from "./divider.module.css";
export const Divider = ({ vertical }) => {
  return (
    <div
      className={`${style.divider} ${
        vertical ? style.vertical : style.horizontal
      }`}
    />
  );
};
