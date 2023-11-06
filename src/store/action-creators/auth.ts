import {AppDispatch} from "../store";
import {userSlice} from "../reducers/UserSlice";
import api from "../../services/axiosClient";
import {IGetUserQuestions} from "../../shared/types/IGetQuestions";
import {questionsSlice} from "../reducers/QuestionsSlice";

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await api.post('/auth/login', {username, password})
        console.log("response", response)

        dispatch(userSlice.actions.userFetchingSuccess({
            username: response.data.username,
            role: response.data.role
        }))
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

        dispatch(userSlice.actions.userFetchingSuccess({
            username: response.data.username,
            role: response.data.role
        }))
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

export const getUserByToken = ( token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await api.get('/auth/verify', {headers: {'Authorization': `Bearer ${token}`}});
        console.log("response verify", response.data)
        dispatch(userSlice.actions.userFetchingSuccess({
            username: response.data.username,
            role: response.data.role
        }))

        return response;
    } catch (e: any) {
        dispatch(userSlice.actions.removeUser())
    }
}
