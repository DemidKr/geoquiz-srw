import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {IMainPageCard} from "../../shared/interfaces/IMainPageCard";

interface MainPageCardProps {
    props: IMainPageCard
}

const MainPageCard: FC<MainPageCardProps> = ({props}) => {
    return (
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
                    fontFamily: 'Montserrat',
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
                {props.title}
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
                    fontFamily: 'Montserrat',
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
                {props.desc}
            </Typography>
        </Box>
    );
};

export default MainPageCard;