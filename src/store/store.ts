import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./reducers/UserSlice";
import {coordinatesSlice} from "./reducers/CoordinatesSlice";
import {snackbarSlice} from "./reducers/SnackbarSlice";
import {questionsSlice} from "./reducers/QuestionsSlice";
import {themeSlice} from "./reducers/ThemeSlice";
import {authApi} from "./api/authApi";
import {questionApi} from "./api/questionApi";
import {coordinatesApi} from "./api/coordinatesApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [coordinatesApi.reducerPath]: coordinatesApi.reducer,
    user: userSlice.reducer,
    coordinates: coordinatesSlice.reducer,
    snackbar: snackbarSlice.reducer,
    questions: questionsSlice.reducer,
    theme: themeSlice.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                authApi.middleware,
                questionApi.middleware,
                coordinatesApi.middleware,
            ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']