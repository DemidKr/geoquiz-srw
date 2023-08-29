import {Button, Dialog, DialogContent, DialogContentText, DialogTitle, styled, Typography} from "@mui/material";

export const CustomDialogBox = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        width: '500px'
    }
})) as typeof Dialog

export const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontFamily: 'Montserrat',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    textTransform: 'uppercase',
})) as typeof DialogTitle

export const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '500px',

})) as typeof DialogContent

export const CustomDialogContentText = styled(DialogContentText)(({ theme }) => ({
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    textAlign: 'center',
    marginBottom: '10px'
})) as typeof DialogContentText

export const DialogButton = styled(Button)(({ theme }) => ({
    borderRadius: '5px',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    letterSpacing: '3px',
    marginBottom: '10px',
})) as typeof Button