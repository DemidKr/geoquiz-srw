import React from "react";
import { Container, Typography } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import { IMainPageCard } from "../shared/types/IMainPageCard";
import MainPageCard from "../components/MainPageCard/MainPageCard";
import { AppPaths } from "../shared/consts";
import { useAppSelector } from "../shared/hooks/redux";

const MainPage = () => {
  const { isAuth, role, isLoading } = useAppSelector(store => store.user);

  const cardItems: IMainPageCard[] = [
    {
      title: "Обучение",
      desc: "Прокачай свои знания",
      link: AppPaths.GUIDE,
      icon: <SchoolOutlinedIcon sx={{ color: "#FFF", fontSize: "32px" }} />,
    },
    {
      title: "Все викторины",
      desc: "Открой огромный выбор",
      link: AppPaths.QUESTIONS,
      icon: (
        <TravelExploreOutlinedIcon sx={{ color: "#FFF", fontSize: "32px" }} />
      ),
    },
    {
      title: "Конструктор викторин",
      desc: "Создай свою викторину",
      link: isAuth ? AppPaths.CREATE_QUIZ : AppPaths.AUTH,
      icon: (
        <AddLocationAltOutlinedIcon sx={{ color: "#FFF", fontSize: "32px" }} />
      ),
    },
  ];

  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "310px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          component="div"
          sx={{
            fontFamily: "Montserrat",
            fontSize: "30px",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "16.5px",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.70)",
            textDecoration: "none",
          }}>
          Исследуй
        </Typography>
        <Typography
          component="div"
          sx={{
            fontFamily: "Montserrat",
            fontSize: "250px",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "3.6px",
            fontWeight: 700,
            color: "#FFF",
            textDecoration: "none",
          }}>
          Россию
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
        }}>
        {cardItems.map((card, index) => (
          <MainPageCard key={index} card={card} />
        ))}
      </Container>
    </>
  );
};

export default MainPage;
