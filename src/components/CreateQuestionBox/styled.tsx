import {Box, Button, styled} from '@mui/material';

export const StepBoxesWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    width: '100%',
    overflowX: 'scroll',
    paddingBottom: '10px',
})) as typeof Box

export const AddStepBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100px',
    height: '60px',
    border: '2px solid',
    borderRadius: '4px',
    '&:hover': {
        cursor: 'pointer'
    }
})) as typeof Box

export const StepBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100px',
    height: '60px',
    border: '2px solid',
    borderRadius: '4px',
    transition: 'border-color 0.25s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main
    }
})) as typeof Box

export const DeleteButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '20px',
    width: '20px',
    maxHeight: '20px',
    padding: 0,
    bottom: '4px',
    right: '4px',
    borderRadius: '4px',
})) as typeof Button

