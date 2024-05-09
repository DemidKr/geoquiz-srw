import React, { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AppPaths } from "../../shared/consts";
import MainPageBackground from "./PageBackgrounds/MainPageBackground";
import AuthPageBackground from "./PageBackgrounds/AuthPageBackground";

interface ImageBackgroundProps {
  children?: ReactNode;
}

const Background: FC<ImageBackgroundProps> = ({ children }) => {
  const { pathname } = useLocation();

  switch (pathname) {
    case AppPaths.MAIN:
      return <MainPageBackground>{children}</MainPageBackground>;
    case AppPaths.AUTH:
      return <AuthPageBackground>{children}</AuthPageBackground>;
    default:
      return <>{children}</>;
  }
};

export default Background;
