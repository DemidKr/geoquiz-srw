import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ThemeState {
    theme: "light" | "dark"
}

const initialState: ThemeState = {
    theme: "light"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
        setTheme(state,action: PayloadAction<"light" | "dark">) {
            state.theme = action.payload
        }
    }
})