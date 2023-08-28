import { Box, styled } from '@mui/material';

export const FormWrapper = styled(Box)(({ theme }) => ({
    width: '450px',
    position: "fixed",
    right: "35px",
    bottom: "50px",
    borderRadius: '16px',
    opacity: '.6',
    // border: `4px solid ${theme.palette.mode === 'light' ? '#000' : '#FFF'}`,

    // create theme later
    backgroundColor: theme.palette.background.default,
    zIndex: "450",
    transition: 'opacity 0.25s ease',
    '&:hover': {
        opacity: '1'
    },
}))
