import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { IMainPageCard } from "../../shared/types/IMainPageCard";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks/redux";

const MainPageCard: FC<IMainPageCard> = ({
  title,
  desc,
  icon,
  link,
  isAuthRequired,
}) => {
  const { isAuth } = useAppSelector(state => state.user);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "430px",
        height: "108px",
        position: "relative",
      }}>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.10)",
          filter: "blur(3px)",
          borderRadius: 5,
          "&:hover": {
            background: "rgba(255, 255, 255, 0.10)",
            opacity: [0.9, 0.8, 0.7],
            cursor: "pointer",
          },
          zIndex: "9999",
        }}
        onClick={() => navigate(isAuthRequired && !isAuth ? "/login" : link)}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: "25px",
          width: "100%",
          height: "100%",
        }}>
        {icon}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            ml: "18px",
          }}>
          <Typography
            component="div"
            sx={{
              // position: 'absolute',
              // top: '30%',
              // left: '50%',
              // transform: 'translatex(-50%) translatey(-50%)',
              margin: 0,
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontStyle: "normal",
              lineHeight: "normal",
              mb: "4px",
              fontWeight: 700,
              color: "#FFF",
              textDecoration: "none",
            }}>
            {title}
          </Typography>
          <Typography
            component="div"
            sx={{
              // position: 'absolute',
              // top: '50%',
              // left: '50%',
              // transform: 'translatex(-50%) translatey(-50%)',
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontStyle: "normal",
              lineHeight: "normal",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.30)",
              textDecoration: "none",
            }}>
            {desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPageCard;
