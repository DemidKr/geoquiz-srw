import {
  Box,
  CircularProgress,
  styled,
  Typography,
  Input,
  Button,
} from "@mui/material";
import secondPic from "../../shared/images/TempPic2.jpg";

export const QuestionCardContainer = styled(Box)<{
  imageUrl?: string;
  isLoading?: boolean;
}>(({ theme, imageUrl, isLoading }) => ({
  position: "relative",
  width: "288px",
  height: "512px",
  borderRadius: "10px",
  flexShrink: 0,
  backgroundImage: isLoading
    ? "linear-gradient(360deg, rgba(0, 0, 0, 0.54) 0%, rgba(255, 255, 255, 0.00) 67.71%)"
    : `url(${imageUrl}), url(${secondPic})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const Container = styled(Box)<{
  imageUrl?: string;
  isLoading?: boolean;
}>(({ theme, imageUrl, isLoading }) => ({
  position: "relative",
  width: "288px",
  height: "512px",
  borderRadius: "10px",
  backgroundImage: isLoading
    ? "linear-gradient(360deg, rgba(0, 0, 0, 0.54) 0%, rgba(255, 255, 255, 0.00) 67.71%)"
    : `url(${imageUrl}), url(${secondPic})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const QuestionCardColumn = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "22px",
  left: "22px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "9px",
}));

export const QuestionCardWarningContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  position: "absolute",
  top: "22px",
  right: "22px",
}));

export const QuestionCardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "4px",
  alignItems: "center",
}));

export const QuestionCardBtnWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  gap: "6px",
  alignItems: "center",
  bottom: "22px",
  right: "22px",
}));

export const QuestionCardTitle = styled(Typography)(({ theme }) => ({
  color: "#FFF",
  fontFamily: "Montserrat",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
}));

export const QuestionCardDescription = styled(Typography)(({ theme }) => ({
  color: "#FFF",
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
}));

export const QuestionCardInfo = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.60)",
  fontFamily: "Montserrat",
  fontSize: "17px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
}));

export const QuestionCardLoader = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "calc(50% - 40px)",
  left: "calc(50% - 40px)",
}));
