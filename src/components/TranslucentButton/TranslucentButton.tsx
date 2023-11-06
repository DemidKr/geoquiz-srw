import React, {FC} from 'react';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {useNavigate} from "react-router-dom";
import {TranslucentButtonBackground, TranslucentButtonContainer} from "./TranslucentButton.styled";

interface TranslucentButtonProps {
    link: string
}

const TranslucentButton: FC<TranslucentButtonProps> = ({link}) => {
    const navigate = useNavigate()

    return (
        <>
            <TranslucentButtonContainer
                onClick={() => navigate(link)}
            >
                <TranslucentButtonBackground/>
                <PlayArrowIcon sx={{color: '#FFF'}}/>
            </TranslucentButtonContainer>
        </>
    );
};

export default TranslucentButton;