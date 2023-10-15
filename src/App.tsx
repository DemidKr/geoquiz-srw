import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AppRouter from "./routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./shared/hooks/redux";
import {userSlice} from "./store/reducers/UserSlice";
import {getAuthDataFromLS} from "./store/action-creators/auth";
import {createTheme, ThemeProvider} from "@mui/material";
import {LOCAL_STORAGE_THEME_KEY, Theme, themeSlice} from "./store/reducers/ThemeSlice";
import {RoleTypes} from "./shared/entities/role";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

const App: FC = () => {
    const {theme} = useAppSelector(state => state.theme)

    const dispatch = useAppDispatch()

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    useEffect(() => {
        if (theme !== defaultTheme) {
            dispatch(themeSlice.actions.setTheme(defaultTheme))
        }

        const auth = dispatch(getAuthDataFromLS());

        if (!auth || !auth.access_token || !auth.refresh_token) {
            dispatch(userSlice.actions.removeUser())
        } else {
            // ToDo: get role from backend
            dispatch(userSlice.actions.userFetchingSuccess({ username: auth.username, role: 'user' }))
        }
    }, [])

    return (
        <ThemeProvider theme={theme === Theme.DARK ? darkTheme : lightTheme}>
            <Router>
                <AppRouter/>
            </Router>
        </ThemeProvider>
    );
};

export default App;