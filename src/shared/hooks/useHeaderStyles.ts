import { useLocation } from "react-router-dom";

interface IHeaderStyles {
  color: "transparent" | "primary" | "default" | "inherit" | "secondary";
  // TODO: change to Size: "S", "M"...
  small: boolean;
  isThemeSwitcherOn: boolean;
  textColor?: string;
}

export const useHeaderStyles = (): IHeaderStyles => {
  const location = useLocation();

  console.log("location", location.pathname);
  if (location.pathname === "/main") {
    return {
      color: "transparent",
      small: false,
      isThemeSwitcherOn: false,
      textColor: "#FFF",
    };
  }

  return {
    color: "default",
    small: true,
    isThemeSwitcherOn: true,
  };
};
