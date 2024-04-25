import {Box, Button, Grid, Paper, styled, TextField, Typography} from "@mui/material";

export const PaperBackground = styled(Paper)(({ theme }) => ({
    margin: 'auto',
    maxWidth: 1200,
    borderRadius: '16px',
})) as typeof Paper

export const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '22px',
    width: '100%',
})) as typeof Box

export const GridColumn = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
})) as typeof Grid

export const MainTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Montserrat',
    fontSize: '20px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '2px',
    fontWeight: 600,
    textDecoration: 'none',
    textTransform: 'uppercase'
})) as typeof Typography

export const Input = styled(TextField)(({ theme }) => ({
    maxWidth: '500px',
    width: '100%',
    '& label': {
        fontFamily: 'Montserrat',
        fontWeight: '500',
    },
    '& .MuiInputBase-root': {
        fontFamily: 'Montserrat',
        fontWeight: '500',
    }
})) as typeof TextField

export const ImgInputButton = styled(Button)(({ theme}) => ({
    borderRadius: '5px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
})) as typeof Button;

export const SubmitButton = styled(Button)(({ theme}) => ({
    borderRadius: '5px',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
})) as typeof Button;