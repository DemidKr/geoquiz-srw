import React, {FC, ReactNode} from 'react';
import {Grid} from "@mui/material";

interface ImageBackgroundProps {
    imageUrl: any,
    children?: ReactNode
}

const ImageBackground: FC<ImageBackgroundProps> = ({imageUrl, children}) => {
    return (
        <Grid
            container
            component="main"
            sx={{
                height: '100vh',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'
            }}
        >
            {children}
        </Grid>
    );
};

export default ImageBackground;