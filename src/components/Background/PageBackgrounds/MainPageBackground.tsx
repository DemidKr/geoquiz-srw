import React, {FC, ReactNode} from 'react';
import moscowImg from "../../../shared/images/moscow.jpg";
import {Grid} from "@mui/material";

interface IMainPageBackgroundProps {
    children?: ReactNode
}

const MainPageBackground: FC<IMainPageBackgroundProps> = ({children}) => {
    return <Grid
        container
        component="main"
        sx={{
            height: '100vh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${moscowImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden'
        }}
    >
        {children}
    </Grid>;
};

export default MainPageBackground;