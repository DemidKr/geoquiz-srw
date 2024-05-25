import { Box, Button, styled, Typography } from "@mui/material";

export const StepBoxesWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "15px",
  width: "100%",
  overflowX: "scroll",
  paddingBottom: "10px",
})) as typeof Box;

export const AddStepBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "120px",
  height: "72px",
  border: "2px solid",
  borderRadius: "6px",
  "&:hover": {
    cursor: "pointer",
  },
})) as typeof Box;

export const LoaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "72px",
  width: "100%",
})) as typeof Box;

export const StepBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "120px",
  height: "72px",
  border: "2px solid",
  borderRadius: "6px",
  transition: "border-color 0.25s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
})) as typeof Box;

export const DeleteButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "20px",
  width: "20px",
  maxHeight: "20px",
  padding: 0,
  bottom: "4px",
  right: "4px",
  borderRadius: "4px",
})) as typeof Button;

export const SettingButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "20px",
  width: "20px",
  height: "20px",
  padding: 0,
  top: "4px",
  right: "4px",
  borderRadius: "4px",
})) as typeof Button;

export const AbsolutButton = styled(Button, {
  shouldForwardProp: prop =>
    prop !== "top" && prop !== "bottom" && prop !== "right" && prop !== "left",
})<{ top?: string; bottom?: string; right?: string; left?: string }>(
  ({ theme, top, bottom, right, left }) => ({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "20px",
    width: "22px",
    height: "22px",
    padding: 0,
    top: top ? top : "",
    bottom: bottom ? bottom : "",
    right: right ? right : "",
    left: left ? left : "",
    borderRadius: "4px",
  }),
);
