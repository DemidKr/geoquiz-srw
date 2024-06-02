import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/UserSlice";
import { coordinatesSlice } from "./reducers/CoordinatesSlice";
import { snackbarSlice } from "./reducers/SnackbarSlice";
import { questionsSlice } from "./reducers/QuestionsSlice";
import { themeSlice } from "./reducers/ThemeSlice";
import { authApi } from "./api/authApi";
import { questionApi } from "./api/questionApi";
import { coordinatesApi } from "./api/coordinatesApi";
import { starsApi } from "./api/starsApi";
import { resultApi } from "./api/resultApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [coordinatesApi.reducerPath]: coordinatesApi.reducer,
  [starsApi.reducerPath]: starsApi.reducer,
  [resultApi.reducerPath]: resultApi.reducer,
  user: userSlice.reducer,
  coordinates: coordinatesSlice.reducer,
  snackbar: snackbarSlice.reducer,
  questions: questionsSlice.reducer,
  theme: themeSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        starsApi.middleware,
        questionApi.middleware,
        coordinatesApi.middleware,
        resultApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
