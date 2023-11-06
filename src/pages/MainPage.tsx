import React from 'react';
import {Container, CssBaseline, Typography} from "@mui/material";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import backgroundImg from "../shared/images/moscow.jpg"
import Header from "../components/Header/Header";
import ImageBackground from "../components/ImageBackground/ImageBackground";
import {IMainPageCard} from "../shared/types/IMainPageCard";
import MainPageCard from "../components/MainPageCard/MainPageCard";

const cardItems: IMainPageCard[] = [
    {title: 'Обучение', desc: 'Прокачай свои знания', link: '/guide', icon: <SchoolOutlinedIcon sx={{color: '#FFF', fontSize: '32px'}}/>},
    {title: 'Все викторины', desc: 'Открой огромный выбор', link: '/questions', icon: <TravelExploreOutlinedIcon sx={{color: '#FFF', fontSize: '32px'}}/>},
    {title: 'Конструктор викторин', desc: 'Создай свою викторину', link: '/createQuestion', icon: <AddLocationAltOutlinedIcon sx={{color: '#FFF', fontSize: '32px'}}/>, isAuthRequired: true},
];

const MainPage = () => {
    return (
        <ImageBackground imageUrl={backgroundImg}>
            <CssBaseline />
            <Header textColor='#FFF'/>
            <Container
                sx={{
                    width:'100%',
                    height: '310px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    component="div"
                    sx={{
                        fontFamily: 'Montserrat',
                        fontSize: '30px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '16.5px',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.70)',
                        textDecoration: 'none',
                    }}
                >
                    Исследуй
                </Typography>
                <Typography
                    component="div"
                    sx={{
                        fontFamily: 'Montserrat',
                        fontSize: '250px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '3.6px',
                        fontWeight: 700,
                        color: '#FFF',
                        textDecoration: 'none',
                    }}
                >
                    Россию
                </Typography>
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    gap: '50px',
                    alignItems: 'center',
                }}
            >
                {cardItems.map((item, index) => (
                    <MainPageCard key={index} props={item}/>
                ))}
            </Container>

        </ImageBackground>
    );
};

export default MainPage;