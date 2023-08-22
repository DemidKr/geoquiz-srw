import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AppRouter from "./routes/AppRouter";
import {useAppDispatch, useAppSelector} from "./shared/hooks/redux";
import {userSlice} from "./store/reducers/UserSlice";
import {getAuthDataFromLS} from "./store/action-creators/auth";
import {createTheme, ThemeProvider} from "@mui/material";
import {themeSlice} from "./store/reducers/ThemeSlice";

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
        const theme = JSON.parse(localStorage.getItem('theme') as string);

        if (theme === 'dark' || 'light') {
            dispatch(themeSlice.actions.setTheme(theme))
        }

        const auth: any = dispatch(getAuthDataFromLS());
        console.log('auth', auth)

        if (!auth || !auth.access_token || !auth.refresh_token) {
            dispatch(userSlice.actions.removeUser())
        } else {

            dispatch(userSlice.actions.userFetchingSuccess(auth.username))
        }
    }, [])

    return (
        <ThemeProvider theme={theme === 'light' ? darkTheme : lightTheme}>
            <Router>
                <AppRouter/>
            </Router>
        </ThemeProvider>
    );
};

export default App;