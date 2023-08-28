import {Box, Button, styled, Typography} from "@mui/material";

export const GameBox = styled(Box)(({ theme }) => ({
    width: '450px',
    position: "fixed",
    right: "35px",
    bottom: "50px",
    borderRadius: '16px',
    opacity: '.6',
    padding: '22px',

    backgroundColor: theme.palette.background.default,
    zIndex: "450",
    transition: 'opacity 0.25s ease',
    '&:hover': {
        opacity: '1'
    },
})) as typeof Box

export const GameTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Montserrat',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    textTransform: 'uppercase',
})) as typeof Typography

export const HintText = styled(Typography)(({ theme }) => ({
    color: '#6D6D6D',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '20px',
    textTransform: 'uppercase',
})) as typeof Typography

export const HideHintButton = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '20px',
    textTransform: 'uppercase',
    marginLeft: '3px',
    padding: '0px',
    '&:hover': {
        cursor: 'pointer'
    },
})) as typeof Typography

export const GameText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
})) as typeof Typography

export const GameButton = styled(Button)(({ theme }) => ({
    borderRadius: '5px',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    ontWeight: '600',
    lineHeight: 'normal',
    letterSpacing: '3px',
    marginBottom: '10px',
})) as typeof Button