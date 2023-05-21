import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    isAuth: boolean;
    username: string;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    isAuth: false,
    username: '',
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true
        },
        userFetchingSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = ''
            state.username = action.payload
            state.isAuth = true
        },
        userFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        removeUser(state) {
            state.isLoading = false
            state.error = ''
            state.username = ''
            state.isAuth = false
        }
    }
})