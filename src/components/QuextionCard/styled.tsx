import {styled, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";

export const CardTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "textColor",
})<{ textColor?: string }>(({ theme, textColor }) => ({
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
