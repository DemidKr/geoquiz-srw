import {Box, styled, Typography} from "@mui/material";

export const QuestionCardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "imageUrl",
})<{ imageUrl?: string }>(({ theme, imageUrl }) => ({
    position: 'relative',
    width: '300px',
    height: '530px',
    flexShrink: 0,
    borderRadius: '10px',
    backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.54) 0%, rgba(255, 255, 255, 0.00) 67.71%), url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const QuestionCardColumn = styled(Box, )(({ theme}) => ({
    position: 'absolute',
    bottom: '22px',
    left: '22px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '9px'
}));

export const QuestionCardWrapper = styled(Box)(({ theme}) => ({
    display: 'flex',
    gap: '4px',
    alignItems: 'center'
}));

export const QuestionCardBtnWrapper = styled(Box)(({ theme}) => ({
    position: 'absolute',
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    bottom: '22px',
    right: '22px',
}));


export const QuestionCardTitle = styled(Typography)(({ theme }) => ({
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
}));

export const QuestionCardDescription = styled(Typography)(({ theme }) => ({
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontSize: '17px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
}));

export const QuestionCardInfo = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.60)',
    fontFamily: 'Montserrat',
    fontSize: '17px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
}));







