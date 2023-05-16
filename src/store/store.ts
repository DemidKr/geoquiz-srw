import {combineReducers, configureStore} from "@reduxjs/toolkit";
import coordinatesReducer from "./reducers/CoordinatesSlice"

const rootReducer = combineReducers({
    coordinatesReducer
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