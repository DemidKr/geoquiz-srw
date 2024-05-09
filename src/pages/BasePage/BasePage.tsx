import React, { FC } from "react";
import { CssBaseline } from "@mui/material";
import Header from "../../components/Header/Header";
import Background from "../../components/Background/Background";

interface IBasePage {
  children: React.ReactNode;
}

const BasePage: FC<IBasePage> = ({ children }) => {
  return (
    <Background>
      <CssBaseline />
      <Header />
      {children}
    </Background>
  );
};

export default BasePage;
