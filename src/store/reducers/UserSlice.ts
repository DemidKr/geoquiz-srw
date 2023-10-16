import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RoleTypes} from "../../shared/entities/role";

interface UserState {
    isAuth: boolean;
    username: string;
    role: RoleTypes,
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    isAuth: false,
    username: '',
    role: 'user',
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
        userFetchingSuccess(state, action: PayloadAction<{ username: string, role: RoleTypes }>) {
            const {username, role} = action.payload
            state.isLoading = false
            state.error = ''
            state.username = username
            state.role = role
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
            state.role = 'user'
            state.isAuth = false
        }
    }
})