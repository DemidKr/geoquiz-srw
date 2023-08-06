import React from 'react';
import {Box, Container, CssBaseline, Grid, Typography} from "@mui/material";

import backgroundImg from "../../src/shared/static/moscow.jpg"
import TransparentHeader from "../components/TransparentHeader/TransparentHeader";


const MainPage = () => {
    return (
        <Grid
            container
            component="main"
            sx={{
                height: '100vh',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'

            }}
        >
            <CssBaseline />
            <TransparentHeader/>
            <Container
                sx={{
                    width:'100%',
                    height: 'calc(100% - 137px - 180px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        fontFamily: 'Inter',
                        fontSize: '30px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '16.5px',
                        mr: 2,
                        display: { md: 'flex' },
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.70)',
                        textDecoration: 'none',
                    }}
                >
                    Исследуй
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        fontFamily: 'Inter',
                        fontSize: '250px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '3.6px',
                        mr: 2,
                        display: { md: 'flex' },
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 417,
                        height: 108,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.10)',
                            filter: 'blur(3px)',
                            borderRadius: 5,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.10)',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            top: '30%',
                            left: '50%',
                            transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Inter',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mr: 2,
                            display: { md: 'flex' },
                            fontWeight: 700,
                            color: '#FFF',
                            textDecoration: 'none',
                        }}
                    >
                        Trondheim
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mr: 2,
                            display: { md: 'flex' },
                            fontWeight: 400,
                            color: '#FFF',
                            textDecoration: 'none',
                            opacity: '0.4',
                        }}
                    >
                        Plan a trip
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 417,
                        height: 108,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.10)',
                            filter: 'blur(3px)',
                            borderRadius: 5,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.10)',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            top: '30%',
                            left: '50%',
                            transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Inter',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mr: 2,
                            display: { md: 'flex' },
                            fontWeight: 700,
                            color: '#FFF',
                            textDecoration: 'none',
                        }}
                    >
                        Trondheim
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mr: 2,
                            display: { md: 'flex' },
                            fontWeight: 400,
                            color: '#FFF',
                            textDecoration: 'none',
                            opacity: '0.4',
                        }}
                    >
                        Plan a trip
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 417,
                        height: 108,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.10)',
                            filter: 'blur(3px)',
                            borderRadius: 5,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.10)',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            top: '30%',
                            left: '50%',
                            transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Inter',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mr: 2,
                            display: { md: 'flex' },
                            fontWeight: 700,
                            color: '#FFF',
                            textDecoration: 'none',
                        }}
                    >
                        Trondheim
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mr: 2,
                            display: { md: 'flex' },
                            fontWeight: 400,
                            color: '#FFF',
                            textDecoration: 'none',
                            opacity: '0.4',
                        }}
                    >
                        Plan a trip
                    </Typography>
                </Box>
            </Container>

        </Grid>
    );
};

export default MainPage;