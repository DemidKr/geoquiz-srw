import React, { FC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import {
  TranslucentButtonBackground,
  TranslucentButtonContainer,
} from "./TranslucentButton.styled";

interface TranslucentButtonProps {
  link?: string;
}

const TranslucentButton: FC<TranslucentButtonProps> = ({ link }) => {
  const navigate = useNavigate();

  const handleNavigateToLink = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <TranslucentButtonContainer onClick={handleNavigateToLink}>
        <TranslucentButtonBackground />
        <PlayArrowIcon sx={{ color: "#FFF" }} />
      </TranslucentButtonContainer>
    </>
  );
};

export default TranslucentButton;
