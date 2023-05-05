export const switchWindowSize = (
  styles,
  mobile,
  tablet,
  tabletLarge,
  desktopSmall
) => {
  const SwitchCaseSize = () => {
    switch (true) {
      case mobile:
        return ["mobile", "tablet", "tabletLarge", "desktopSmall"];
      case tablet:
        return ["tablet", "tabletLarge", "desktopSmall"];
      case tabletLarge:
        return ["tabletLarge", "desktopSmall"];
      case desktopSmall:
        return ["desktopSmall"];
      default:
        return null;
    }
  };

  const sizeArray = SwitchCaseSize();
  if (sizeArray) {
    const classArr = sizeArray.map((cls) => styles[cls]);
    return classArr.join(" ");
  }
  return "";
};
