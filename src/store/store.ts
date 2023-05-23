import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./reducers/UserSlice";
import {coordinatesSlice} from "./reducers/CoordinatesSlice";
import {snackbarSlice} from "./reducers/SnackbarSlice";
import {questionsSlice} from "./reducers/QuestionsSlice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    coordinates: coordinatesSlice.reducer,
    snackbar: snackbarSlice.reducer,
    questions: questionsSlice.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                //regionApi.middleware
            ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']