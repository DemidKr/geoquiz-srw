import {Box, styled} from "@mui/material";

export const TranslucentButtonContainer = styled(Box)(({ theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '35px',
    position: 'relative',
}));

export const TranslucentButtonBackground = styled(Box)(({ theme}) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'rgba(200, 200, 200, 0.25)',
    filter: 'blur(3px)',
    borderRadius: 2,
    '&:hover': {
        background: 'rgba(200, 200, 200, 0.25)',
        opacity: [0.9, 0.8, 0.7],
        cursor: 'pointer'
    },
    zIndex: '99999',
}));

