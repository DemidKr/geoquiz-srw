import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const LOCAL_STORAGE_THEME_KEY = "theme";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: Theme.LIGHT,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});
