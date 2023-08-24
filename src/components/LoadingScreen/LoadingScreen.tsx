import React from 'react';
import {Box, CircularProgress, CssBaseline} from "@mui/material";
import Header from "../Header/Header";

const LoadingScreen = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh'
            }}
        >
            <CssBaseline/>
            <Header small={true}/>
            <CircularProgress
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%'
                }}
            />
        </Box>
    );
};

export default LoadingScreen;