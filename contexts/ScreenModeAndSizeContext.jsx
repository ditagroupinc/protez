import { createContext } from "react";

export const ScreenModeAndSizeContext = createContext({
  width: null,
  height: null,
  mobile: false,
  tablet: false,
  desktop: false,
  screenModeClass: "",
});
