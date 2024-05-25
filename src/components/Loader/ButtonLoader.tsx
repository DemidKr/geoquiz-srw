import React from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { Theme } from "../../store/reducers/ThemeSlice";
import { CircularProgress } from "@mui/material";

const ButtonLoader = () => {
  const { theme } = useAppSelector(state => state.theme);

  return (
    <CircularProgress
      size={20}
      sx={{
        color: theme === Theme.LIGHT ? "black" : "white",
      }}
    />
  );
};

export default ButtonLoader;
