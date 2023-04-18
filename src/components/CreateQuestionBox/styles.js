import { Box, styled } from '@mui/material';

export const FormWrapper = styled(Box)(({ theme }) => ({
    width: '450px',
    position: "fixed",
    right: "35px",
    bottom: "50px",
    // create theme later
    backgroundColor: 'white',
    zIndex: "450",
    borderRadius: "8px",
    padding: "10px 15px"
}))
