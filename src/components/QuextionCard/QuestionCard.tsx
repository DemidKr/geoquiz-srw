import React from 'react';
import {Box} from "@mui/material";
import pic from "../../shared/images/TemporaryPicture.jpg"

const QuestionCard = () => {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '300px',
                    height: '530px',
                    flexShrink: 0,
                    borderRadius: '10px',
                    backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.54) 0%, rgba(255, 255, 255, 0.00) 67.71%), url(${pic})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.54) 0%, rgba(255, 255, 255, 0.00) 67.71%),  #C4C4C4',
                }}
            >

            </Box>
        </>
    );
};

export default QuestionCard;