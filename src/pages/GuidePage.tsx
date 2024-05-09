import React from "react";
import { Container, Typography } from "@mui/material";

const GuidePage = () => {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 160px)",
        }}>
        <Typography
          component="div"
          sx={{
            marginTop: "27px",
            fontFamily: "Montserrat",
            fontSize: "46px",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "3.6px",
            fontWeight: 700,
            textDecoration: "uppercase",
          }}>
          Coming soon...
        </Typography>
      </Container>
    </>
  );
};

export default GuidePage;
