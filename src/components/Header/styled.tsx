import {styled, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
interface CustomAppBarProps {
    transparent: boolean
}

export const CustomAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => {
        return prop !== "transparent";
    }})((prop: CustomAppBarProps) => ({
    backgroundImage: 'none',
    height: prop.transparent ? '130px' : '80px',
    backgroundColor: prop.transparent ? 'transparent' : '',
    boxShadow: prop.transparent ? 'none' : '',
}))

export const LogoTypography = styled(Typography)(({theme}) => ({
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '3.6px',
    mr: 0,
    fontWeight: 900,
    color: '#FFF',
    textDecoration: 'none',
})) as typeof Typography

export const UsernameTypography = styled(Typography)(({theme}) => ({
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    mr: 0,
    fontWeight: 600,
    color: '#FFF',
    textDecoration: 'none',
})) as typeof Typography