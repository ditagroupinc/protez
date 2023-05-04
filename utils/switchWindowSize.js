export const switchWindowSize = (mobile, tablet, tabletLarge, desktopSmall) => {
  switch (true) {
    case mobile:
      return "mobile";
    case tablet:
      return "tablet";
    case tabletLarge:
      return "tabletLarge";
    case desktopSmall:
      return "desktopSmall";
    default:
      return "desktop";
  }
};
