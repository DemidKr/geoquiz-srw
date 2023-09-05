import {AppDispatch} from "../store";
import {userSlice} from "../reducers/UserSlice";
import api from "../../services/axiosClient";

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await api.post('/auth/login', {username, password})
        console.log("response", response)

        dispatch(userSlice.actions.userFetchingSuccess(response.data.username))
        localStorage.setItem('auth', JSON.stringify(response.data));
        return response
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.message))
        return e
    }
}

export const registration = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await api.post('/auth/registration', {username, password})
        console.log("response", response)

        dispatch(userSlice.actions.userFetchingSuccess(response.data.username))
        localStorage.setItem('auth', JSON.stringify(response.data));
        return response
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.message))
        return e
    }
}

export const getAuthDataFromLS = () => (dispatch: AppDispatch) => {
    try {
        const lSData = JSON.parse(localStorage.getItem('auth') as string);

        if (!lSData) {
            dispatch(userSlice.actions.removeUser())
            return false;
        }

        return lSData;
    } catch (error) {
        dispatch(userSlice.actions.removeUser())
    }
}
