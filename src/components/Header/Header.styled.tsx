import {styled, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
interface CustomAppBarProps {
    small: boolean,
}

interface TypographyProps {
    textColor?: string,
}


export const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) =>
        prop !== "small"
    })((prop: CustomAppBarProps) => ({
    backgroundImage: 'none',
    backgroundColor: 'transparent',
    height: prop.small ? '80px' : '130px',
    boxShadow: 'none' ,
}))

export const LogoTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "textColor",
})<TypographyProps>(({ theme, textColor }) => ({
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '3.6px',
    mr: 0,
    fontWeight: 600,
    color: textColor ? textColor : theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
        cursor: 'pointer'
    },
}));

export const UsernameTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "textColor",
})<{ textColor?: string }>(({theme, textColor}) => ({
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    mr: 0,
    fontWeight: 600,
    color: textColor ? textColor : theme.palette.text.primary,
    textDecoration: 'none',
}))