import React, {FC} from 'react';
import StarIcon from "@mui/icons-material/Star";
import {Box} from "@mui/material";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import {IStars} from "../../shared/interfaces/IStars";

interface StarsProps {
    stars: IStars
}

const Stars: FC<StarsProps> = ({stars}) => {
    return (
        <>
            {Array.from({length: stars.fullStar}, (_, index) => {
                return  <StarIcon key={index} sx={{color: '#FF9921'}}/>;
            })}
            {stars.halfStar !== 0 && <Box sx={{position: 'relative', width: '24px', height: '24px'}}>
                <StarHalfIcon sx={{
                    color: '#FF9921',
                    position: 'absolute',
                    zIndex: '2'
                }}/>
                <StarIcon sx={{
                    color: 'rgba(255, 255, 255, 0.60)',
                    position: 'absolute',
                    zIndex: '1'
                }}/>
            </Box>}
            {Array.from({length: stars.emptyStar}, (_, index) => {
                return  <StarIcon key={index} sx={{color: 'rgba(255, 255, 255, 0.60)'}}/>;
            })}
        </>
    );
};

export default Stars;