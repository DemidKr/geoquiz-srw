import React, { FC, ReactNode } from "react";
import { Grid } from "@mui/material";

interface IAuthPageBackgroundProps {
  children?: ReactNode;
}

const AuthPageBackground: FC<IAuthPageBackgroundProps> = ({ children }) => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2458&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "0 80px",
        overflow: "hidden",
      }}>
      {children}
    </Grid>
  );
};

export default AuthPageBackground;
