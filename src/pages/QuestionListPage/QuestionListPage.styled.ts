import { Box, Container, Grid, styled, Typography } from "@mui/material";

export const TitlesContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "103px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})) as typeof Container;

export const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "11.2px",
  fontWeight: 600,
  textDecoration: "none",
  textTransform: "uppercase",
})) as typeof Typography;

export const SubTitle = styled(Typography)(({ theme }) => ({
  marginTop: "27px",
  fontFamily: "Montserrat",
  fontSize: "46px",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "3.6px",
  fontWeight: 700,
  textDecoration: "none",
  textTransform: "uppercase",
})) as typeof Typography;

export const CardsContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "25px",
  justifyContent: "center",
  maxWidth: "1350px",
  marginTop: "50px",
  marginLeft: "auto",
  marginRight: "auto",
})) as typeof Grid;

export const PaginationContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "25px",
  marginBottom: "25px",
  marginLeft: "auto",
  marginRight: "auto",
})) as typeof Grid;
