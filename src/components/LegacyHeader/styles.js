import {alpha, InputBase, styled, TextField, Toolbar, Typography} from "@mui/material";

export const HeaderToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex', justifyContent: 'space-between',
}))

export const HeaderInput = styled(TextField)(({theme}) => ({
    '& .MuiFilledInput-root': {
        backgroundColor: 'white',
    },
    '& .MuiFilledInput-underline': {
        color: 'black',
        borderBottom: '2px solid black'
    }
}))

export const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

export const SearchBox = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}))

export const HeaderTypography = styled(Typography)(({theme}) => ({
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}))



