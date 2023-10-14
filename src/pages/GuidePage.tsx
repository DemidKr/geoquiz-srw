import React from 'react';
import {Container, CssBaseline, Typography} from "@mui/material";
import Header from "../components/Header/Header";

const GuidePage = () => {
    return (
        <>
            <CssBaseline/>
            <Header themeSwitcherOn={true} small={true}/>
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:'100%',
                    height: 'calc(100vh - 160px)'
                }}
            >
                <Typography
                    component="div"
                    sx={{
                        marginTop: '27px',
                        fontFamily: 'Montserrat',
                        fontSize: '46px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: '3.6px',
                        fontWeight: 700,
                        // color: '#2D2D2D',
                        textDecoration: 'uppercase',
                    }}
                >
                    Coming soon...
                </Typography>
            </Container>
        </>
    );
};

export default GuidePage;