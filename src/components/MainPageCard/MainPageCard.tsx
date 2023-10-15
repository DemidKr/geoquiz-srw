import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {IMainPageCard} from "../../shared/entities/IMainPageCard";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../shared/hooks/redux";

interface MainPageCardProps {
    props: IMainPageCard,
}

const MainPageCard: FC<MainPageCardProps> = ({props}) => {
    const {isAuth} = useAppSelector(state => state.user)

    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '430px',
                height: '108px',
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
                        cursor: 'pointer'
                    },
                    zIndex: '9999',
                }}
                onClick={() =>  navigate(props.isAuthRequired && !isAuth ? '/login' : props.link)}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: '25px',
                    width: '100%',
                    height: '100%',
                }}
            >
                {props.icon}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        ml: '18px',

                    }}
                >
                    <Typography
                        component="div"
                        sx={{
                            // position: 'absolute',
                            // top: '30%',
                            // left: '50%',
                            // transform: 'translatex(-50%) translatey(-50%)',
                            margin: 0,
                            fontFamily: 'Montserrat',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            mb: '4px',
                            fontWeight: 700,
                            color: '#FFF',
                            textDecoration: 'none',
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        component="div"
                        sx={{
                            // position: 'absolute',
                            // top: '50%',
                            // left: '50%',
                            // transform: 'translatex(-50%) translatey(-50%)',
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.30)',
                            textDecoration: 'none',
                        }}
                    >
                        {props.desc}
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default MainPageCard;